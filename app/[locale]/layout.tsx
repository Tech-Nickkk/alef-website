import type { Metadata } from "next";
import { Bebas_Neue, Oswald } from "next/font/google";
import "../globals.css";
import { Analytics } from "@vercel/analytics/react";
import LayoutWrapper from "../components/CommonCom/LayoutWrapper";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["200", "300", "400", "500", "600", "700"],
});

import { headers } from "next/headers";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const headerList = await headers();
  const rawPathname = headerList.get("x-pathname") || "/";

  const alternateLocales = ['fr', 'ar', 'es'];
  const segments = rawPathname.split('/').filter(Boolean);

  let currentLocale = locale;
  let basePathSegments = [...segments];

  if (segments.length > 0 && alternateLocales.includes(segments[0])) {
    basePathSegments = segments.slice(1);
  }

  const basePath = '/' + basePathSegments.join('/');

  const formatUrl = (loc: string, path: string) => {
    const cleanPath = path === '/' ? '' : path;
    if (loc === 'en') {
      return `https://www.usalef.org${cleanPath}`;
    }
    return `https://www.usalef.org/${loc}${cleanPath}`;
  };

  const canonical = formatUrl(currentLocale, basePath);
  const alternates = {
    canonical,
    languages: {
      en: formatUrl('en', basePath),
      fr: formatUrl('fr', basePath),
      ar: formatUrl('ar', basePath),
      es: formatUrl('es', basePath),
      'x-default': formatUrl('en', basePath),
    }
  };

  const noIndexPatterns = [
    '/login',
    '/profile',
    '/donate/success',
    '/submit-article',
    '/submit-podcast',
    '/submit-webinar',
    '/submit-video',
    '/submit-short',
  ];

  const isNoIndex = noIndexPatterns.some(pattern => basePath.startsWith(pattern));
  const robots = isNoIndex ? { index: false, follow: false } : undefined;

  let title = "American Lebanon Education Foundation (ALEF)";
  let description = "ALEF is a global, non-partisan initiative advocating for a free, sovereign Lebanon — exposing corruption, combating Hezbollah, and driving policy reform.";

  try {
    const t = await getTranslations({ locale: currentLocale, namespace: 'Metadata' });
    const pageKey = basePathSegments.length > 0 ? basePathSegments[0] : 'home';

    if (t.has(`pages.${pageKey}.title`)) {
      title = t(`pages.${pageKey}.title`);
      description = t(`pages.${pageKey}.description`);
    } else {
      title = t('defaultTitle');
      description = t('defaultDescription');
    }
  } catch (e) {
    // Fail-safe default fallback
  }

  return {
    title,
    description,
    robots,
    alternates,
    icons: {
      icon: "/home/profile-logo-2.png",
      shortcut: "/home/profile-logo-2.png",
      apple: "/home/profile-logo-2.png",
    },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: "ALEF — American Lebanon Education Foundation",
      images: [
        {
          url: "https://www.usalef.org/home/logo.png",
          width: 1200,
          height: 630,
          alt: "American Lebanon Education Foundation (ALEF) Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://www.usalef.org/home/logo.png"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <body
        className={`${oswald.variable} ${bebas.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
          <Analytics />
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ''} />

          {/* GoHighLevel Chat Widget — site-wide */}
          <Script
            src="https://widgets.leadconnectorhq.com/loader.js"
            data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
            data-widget-id="69b5448351635e260d0a4878"
            strategy="lazyOnload"
          />

        </NextIntlClientProvider>
      </body>
    </html>
  );
}
