import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Beacon of Hope – Bucas Grande",
  description:
    "Leave a light in the dark. A beacon of hope built with love and alignment for anonymous messages of hope, gratitude, and dreams on the shores of Bucas Grande, Socorro.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${playfair.variable} min-h-screen bg-[#0a0a0f] text-[#e8e0d4] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
