import type { Metadata } from "next";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        <CategoryNav />
        <main className="flex-1">{children}</main>
        <SeoSection />
        <PopularSearches />
        <Footer />
        <FloatingWhatsApp />
        <WelcomePopup />
      </body>
    </html>
  );
}
