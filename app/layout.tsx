import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CategoryNav from "@/components/CategoryNav";
import Footer from "@/components/Footer";
import SeoSection from "@/components/SeoSection";
import PopularSearches from "@/components/PopularSearches";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ScrollToTop from "@/components/ScrollToTop";
import WelcomePopup from "@/components/WelcomePopup";

export const metadata: Metadata = {
  title: "Industrial Safety Mart | B2B Industrial Supplies",
  description: "Your trusted partner for industrial safety equipment, power tools, and B2B supplies. PAN India delivery.",
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    shortcut: ["/icon.png"],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
};

export const viewport: Viewport = {
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
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className={`${inter.className} min-h-full flex flex-col font-sans min-w-0 leading-relaxed`}>
        <Navbar />
        <CategoryNav visibility="desktop" />
        <main className="flex-1 min-w-0 w-full">{children}</main>
        <SeoSection />
        <PopularSearches />
        <Footer />
        <FloatingWhatsApp />
        <ScrollToTop />
        <WelcomePopup />
      </body>
    </html>
  );
}
