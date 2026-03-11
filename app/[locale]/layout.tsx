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


        </NextIntlClientProvider>
      </body>
    </html>
  );
}
