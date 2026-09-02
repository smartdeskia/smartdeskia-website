import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import "../styles/base.css";
import "../styles/sections.css";
import "../styles/enhancements.css";
import "../styles/pages.css";
import "../styles/responsive-type.css";
import "../styles/calculator.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://smartdeskia.com"),
  title: "SmartDeskia | Your phone, answered.",
  description: "Sofia is the AI receptionist who answers every call, books appointments and follows up automatically—24/7.",
  openGraph: {
    title: "SmartDeskia | Your phone, answered.",
    description: "Meet Sofia, the AI receptionist who answers, books and follows up 24/7.",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartDeskia | Your phone, answered.",
    description: "Meet Sofia, the AI receptionist who answers, books and follows up 24/7.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
