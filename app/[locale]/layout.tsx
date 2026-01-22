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
  title: "Alef Website",
  description: "Alef Website",
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
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

          <Script id="brevo-conversations" strategy="afterInteractive">
            {`
              (function(d, w, c) {
                  w.BrevoConversationsID = '6968edf2dc70a39db501446f';
                  w[c] = w[c] || function() {
                      (w[c].q = w[c].q || []).push(arguments);
                  };
                  var s = d.createElement('script');
                  s.async = true;
                  s.src = 'https://conversations-widget.brevo.com/brevo-conversations.js';
                  if (d.head) d.head.appendChild(s);
              })(document, window, 'BrevoConversations');
            `}
          </Script>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
