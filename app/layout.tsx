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
  title: "SmartDeskia | Enquiry and Quote Follow-Up",
  description: "Keep enquiries, quotations and follow-ups in one clear workflow, from first contact to won or lost.",
  openGraph: {
    title: "SmartDeskia | Enquiry and Quote Follow-Up",
    description: "A practical back-office service that keeps enquiries, quotations and follow-ups moving.",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartDeskia | Enquiry and Quote Follow-Up",
    description: "A practical back-office service that keeps enquiries, quotations and follow-ups moving.",
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
