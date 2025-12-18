import type { Metadata } from "next";
import { Cormorant } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const cormorant = Cormorant({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
});

const optima = localFont({
  src: "./fonts/Optima Medium.ttf",
  variable: "--font-optima",
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
        className={`${optima.variable} ${cormorant.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
