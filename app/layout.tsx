import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CategoryNav from "@/components/CategoryNav";
import Footer from "@/components/Footer";
import SeoSection from "@/components/SeoSection";
import PopularSearches from "@/components/PopularSearches";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import WelcomePopup from "@/components/WelcomePopup";

export const metadata: Metadata = {
  title: "Industrial Safety Mart | B2B Industrial Supplies",
  description: "Your trusted partner for industrial safety equipment, power tools, and B2B supplies. PAN India delivery.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans min-w-0">
        <Navbar />
        <CategoryNav visibility="desktop" />
        <main className="flex-1 min-w-0 w-full">{children}</main>
        <SeoSection />
        <PopularSearches />
        <Footer />
        <FloatingWhatsApp />
        <WelcomePopup />
      </body>
    </html>
  );
}
