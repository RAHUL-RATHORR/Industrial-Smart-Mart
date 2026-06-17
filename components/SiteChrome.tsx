"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import CategoryNav from "@/components/CategoryNav";
import Footer from "@/components/Footer";
import SeoSection from "@/components/SeoSection";
import PopularSearches from "@/components/PopularSearches";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ScrollToTop from "@/components/ScrollToTop";
import WelcomePopup from "@/components/WelcomePopup";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <CategoryNav visibility="desktop" />
      <main className="flex-1 min-w-0 w-full">{children}</main>
      <SeoSection />
      <PopularSearches />
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
      <WelcomePopup />
    </>
  );
}
