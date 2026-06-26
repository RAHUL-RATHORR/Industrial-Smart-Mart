"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import CategoryNav from "@/components/CategoryNav";
import Footer from "@/components/Footer";
import PopularSearches from "@/components/PopularSearches";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import WelcomePopup from "@/components/WelcomePopup";
import { cn } from "@/lib/utils";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const isHome = pathname === "/";

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="sticky top-0 z-40 bg-white shadow-[0_4px_20px_rgba(26,26,26,0.06)]">
        <Navbar />
        <CategoryNav visibility="desktop" />
      </div>
      <main className={cn("flex-1 min-w-0 w-full", isHome && "bg-white")}>{children}</main>
      {isHome ? <PopularSearches className="bg-white" /> : null}
      <Footer />
      <FloatingWhatsApp />
      <WelcomePopup />
    </>
  );
}
