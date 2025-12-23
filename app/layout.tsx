import type { Metadata } from "next";
import { Cormorant, Bebas_Neue, Oswald } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import SmoothScroll from "./components/CommonCom/SmoothScroll";
import Preloader from "./components/CommonCom/Preloader";

import { ThemeProvider } from "./components/CommonCom/ThemeProvider";

const cormorant = Cormorant({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${oswald.variable} ${cormorant.variable} ${bebas.variable} antialiased`}
      >
        <ThemeProvider>
          <SmoothScroll />
          <Preloader />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
