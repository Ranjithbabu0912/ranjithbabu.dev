import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ranjith Babu | Developer & Creator",
  description: "Personal portfolio of Ranjith Babu. Inspired by speed, design, and innovation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${syne.variable} antialiased bg-background text-foreground overflow-x-hidden`}
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
