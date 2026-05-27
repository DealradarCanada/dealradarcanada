import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DealRadar Canada",
  description: "Best deals and discounts in Canada",
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