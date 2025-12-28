import type { Metadata } from "next";
import { Bebas_Neue, Oswald } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import SmoothScroll from "./components/CommonCom/SmoothScroll";
import Preloader from "./components/CommonCom/Preloader";
import Navbar from "./components/CommonCom/Navbar";
import Footer from "./components/CommonCom/Footer";
import JoinUs from "./components/CommonCom/JoinUs";
import { ThemeProvider } from "./components/CommonCom/ThemeProvider";

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
        className={`${oswald.variable} ${bebas.variable} antialiased`}
      >
        <ThemeProvider>
          <SmoothScroll />
          {/* <Preloader /> */}
          <Navbar />
          {children}
          <JoinUs />
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
