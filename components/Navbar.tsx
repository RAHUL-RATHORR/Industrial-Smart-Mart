"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LayoutGrid, Menu, MessageCircle, Search, X } from "lucide-react";
import SiteLogo from "@/components/SiteLogo";
import SearchBar from "@/components/SearchBar";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

import { useCatalog } from "@/contexts/CatalogContext";

const getQuoteButtonClass = cn(
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-[10px] border-0 px-7 py-3",
  "text-[15px] font-bold leading-none text-white transition-all duration-200",
  "bg-gradient-to-r from-brand-yellow to-[#ffc833]",
  "shadow-[0_8px_20px_rgba(244,180,0,0.45)]",
  "hover:bg-gradient-to-r hover:from-brand-black hover:to-[#1a1a1a] hover:text-white hover:shadow-[0_8px_20px_rgba(26,26,26,0.22)]",
  "active:scale-[0.98]"
);

function NavTextLink({
  href,
  icon: Icon,
  children,
  onClick,
}: {
  href: string;
  icon: typeof LayoutGrid;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-semibold text-brand-black transition-colors hover:bg-brand-yellow/10 hover:text-brand-black"
    >
      <Icon
        className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-brand-yellow"
        strokeWidth={2.25}
      />
      <span>{children}</span>
    </Link>
  );
}

export default function Navbar() {
  const { categories } = useCatalog();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  const closeMobile = () => {
    setIsMobileMenuOpen(false);
    setIsMobileSearchOpen(false);
  };

  useEffect(() => {
    if (!isMobileSearchOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (mobileSearchRef.current?.contains(target)) return;
      setIsMobileSearchOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isMobileSearchOpen]);

  return (
    <header className="w-full bg-white">
      <div className="h-1 w-full bg-[#f4b400]" aria-hidden="true" />
      <div className="container mx-auto px-4 sm:px-5 lg:px-6">
        <div
          ref={mobileSearchRef}
          className="grid h-[3.75rem] grid-cols-[auto_1fr_auto] items-center gap-2 sm:gap-3 md:h-16 md:grid-cols-[1fr_minmax(0,560px)_1fr] lg:gap-4 xl:grid-cols-[1fr_minmax(0,640px)_1fr]"
        >
          {isMobileSearchOpen ? (
            <>
              <div className="col-span-2 min-w-0 md:hidden">
                <SearchBar variant="navbar" onSearch={closeMobile} autoFocus />
              </div>
              <button
                type="button"
                onClick={() => setIsMobileSearchOpen(false)}
                className="inline-flex items-center justify-center justify-self-end rounded-lg p-2 text-muted-foreground transition-colors hover:bg-brand-yellow/10 hover:text-brand-black md:hidden"
                aria-label="Close search"
              >
                <X className="h-6 w-6" />
              </button>
            </>
          ) : (
            <>
              <div className="flex shrink-0 items-center justify-self-start">
                <SiteLogo imageClassName="h-8 w-auto sm:h-9 md:h-10 lg:h-11" />
              </div>

              <div className="hidden min-w-0 justify-self-center md:block">
                <SearchBar variant="navbar" onSearch={closeMobile} />
              </div>

              <div className="hidden shrink-0 items-center justify-self-end gap-1 md:flex lg:gap-2">
                <NavTextLink href="/categories" icon={LayoutGrid}>
                  Categories
                </NavTextLink>
                <NavTextLink href="/contact" icon={MessageCircle}>
                  Contact
                </NavTextLink>
                <Link href="/get-quote" className={cn(getQuoteButtonClass, "ml-1 lg:ml-2")}>
                  Get Quote
                </Link>
              </div>

              <div className="col-start-3 flex items-center justify-self-end gap-0.5 md:hidden">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileSearchOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground transition-colors hover:bg-brand-yellow/10 hover:text-brand-black"
                  aria-label="Open search"
                >
                  <Search className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(!isMobileMenuOpen);
                    setIsMobileSearchOpen(false);
                  }}
                  className="inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground transition-colors hover:bg-brand-yellow/10 hover:text-brand-black"
                >
                  <span className="sr-only">Open main menu</span>
                  {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && !isMobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-pro bg-white md:hidden"
          >
            <div className="space-y-3 px-4 pb-4 pt-3">
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/categories"
                  onClick={closeMobile}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#e8e4dc] bg-[#faf8f3] px-3 text-sm font-semibold text-brand-black"
                >
                  <LayoutGrid className="h-4 w-4 text-brand-yellow" strokeWidth={2.25} />
                  Categories
                </Link>
                <Link
                  href="/contact"
                  onClick={closeMobile}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#e8e4dc] bg-[#faf8f3] px-3 text-sm font-semibold text-brand-black"
                >
                  <MessageCircle className="h-4 w-4 text-brand-yellow" strokeWidth={2.25} />
                  Contact
                </Link>
              </div>

              <div className="rounded-xl border border-pro bg-[#faf8f3] p-3">
                <p className="mb-2 px-1 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  Shop by Category
                </p>
                <div className="max-h-44 space-y-0.5 overflow-y-auto hide-scrollbar">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={category.href}
                      className="block rounded-lg px-2 py-2 text-sm font-medium text-brand-black transition-colors hover:bg-brand-yellow/15"
                      onClick={closeMobile}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/get-quote"
                onClick={closeMobile}
                className={cn(getQuoteButtonClass, "w-full min-w-0 justify-center")}
              >
                Get Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
