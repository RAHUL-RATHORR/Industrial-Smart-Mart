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
      <Navbar />
      <CategoryNav visibility="desktop" />
      <main className={cn("flex-1 min-w-0 w-full", isHome && "bg-white")}>{children}</main>
      <PopularSearches className={isHome ? "bg-white" : undefined} />
      <Footer />
      <FloatingWhatsApp />
      <WelcomePopup />
    </>
  );
}
