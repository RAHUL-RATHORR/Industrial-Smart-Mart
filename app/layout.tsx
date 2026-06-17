import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import { CatalogProvider } from "@/contexts/CatalogContext";
import { readCatalog } from "@/lib/catalog/store";

export const metadata: Metadata = {
  title: "Industrial Safety Mart | B2B Industrial Supplies",
  description: "Your trusted partner for industrial safety equipment, power tools, and B2B supplies. PAN India delivery.",
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    shortcut: ["/icon.png"],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const catalog = readCatalog();

  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className={`${inter.className} min-h-full flex flex-col font-sans min-w-0 leading-relaxed`}>
        <CatalogProvider initial={catalog}>
          <SiteChrome>{children}</SiteChrome>
        </CatalogProvider>
      </body>
    </html>
  );
}
