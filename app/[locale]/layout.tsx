import type { Metadata } from "next";
import { Bebas_Neue, Oswald } from "next/font/google";
import "../globals.css";
import { Analytics } from "@vercel/analytics/react";
import LayoutWrapper from "../components/CommonCom/LayoutWrapper";
import Script from "next/script";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { GoogleAnalytics } from '@next/third-parties/google';

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

export const metadata: Metadata = {
  title: "American Lebanon Education Foundation (ALEF)",
  description: "ALEF is a global, non-partisan initiative advocating for a free, sovereign Lebanon — exposing corruption, combating Hezbollah, and driving policy reform. Anyone who supports the cause can donate and participate.",
  icons: {
    icon: "/home/profile-logo-2.png",
    shortcut: "/home/profile-logo-2.png",
    apple: "/home/profile-logo-2.png",
  },
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
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

          <Script id="tawk-to" strategy="afterInteractive">
            {`
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/69ad85b77ac1721c399123ef/1jj6t4lhm';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `}
          </Script>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
