import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DealRadar Canada",
  description: "Best deals and discounts in Canada",
  verification: {
    other: {
      "impact-site-verification": "f9e182b5-49ff-44f1-931d-0cfe25f9c51e",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <html lang="en">
    <head>
      <meta
  name="impact-site-verification"
  content="f9e182b5-49ff-44f1-931d-0cfe25f9c51e"
/>
    </head>

    <body className="min-h-full flex flex-col">
      {children}
    </body>
  </html>
);
}
