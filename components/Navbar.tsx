"use client";

import { useState } from "react";
import Link from "next/link";
import { LayoutGrid, Menu, MessageCircle, Search, X } from "lucide-react";
import SiteLogo from "@/components/SiteLogo";
import SearchBar from "@/components/SearchBar";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

import { useCatalog } from "@/contexts/CatalogContext";

const navActions = [
  {
    name: "Categories",
    href: "/categories",
    icon: LayoutGrid,
    description: "Browse all categories",
    iconBg: "bg-gradient-to-br from-violet-400 to-purple-600",
    iconRing: "ring-violet-100",
  },
  {
    name: "Contact",
    href: "/contact",
    icon: MessageCircle,
    description: "Talk to our team",
    iconBg: "bg-gradient-to-br from-sky-400 to-blue-600",
    iconRing: "ring-sky-100",
  },
] as const;

const getQuoteButtonClass = cn(
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-[10px] border-0 px-7 py-3",
  "text-[15px] font-bold leading-none text-white transition-all duration-200",
  "bg-gradient-to-r from-brand-yellow to-[#ffc833]",
  "shadow-[0_8px_20px_rgba(244,180,0,0.45)]",
  "hover:bg-gradient-to-r hover:from-brand-black hover:to-[#1a1a1a] hover:text-white hover:shadow-[0_8px_20px_rgba(26,26,26,0.22)]",
  "active:scale-[0.98]"
);

function NavActionLink({
  name,
  href,
  icon: Icon,
  description,
  iconBg,
  iconRing,
  className,
  onClick,
}: {
  name: string;
  href: string;
  icon: typeof LayoutGrid;
  description: string;
  iconBg: string;
  iconRing: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group flex items-center gap-2.5 rounded-xl border border-transparent px-2.5 py-1.5 transition-all hover:border-brand-yellow/30 hover:bg-brand-yellow/10 lg:px-3 lg:py-2",
        className
      )}
    >
      <span
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg shadow-sm ring-2 transition-transform group-hover:scale-105",
          iconBg,
          iconRing
        )}
      >
        <Icon className="h-4 w-4 text-white" strokeWidth={2.25} />
      </span>
      <span className="hidden min-w-0 lg:block">
        <span className="block text-sm font-bold leading-tight text-brand-black">{name}</span>
        <span className="block text-[10px] leading-tight text-muted-foreground">{description}</span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const { categories } = useCatalog();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const closeMobile = () => {
    setIsMobileMenuOpen(false);
    setIsMobileSearchOpen(false);
  };

  return (
    <header className="w-full bg-white">
      <div className="h-1 w-full bg-[#f4b400]" aria-hidden="true" />
      <div className="container mx-auto px-4 sm:px-5 lg:px-6">
        <div className="flex h-[3.75rem] items-center gap-2 sm:gap-3 md:h-16 lg:gap-4">
          <div className="flex shrink-0 items-center">
            <SiteLogo imageClassName="h-8 w-auto sm:h-9 md:h-10 lg:h-11" />
          </div>

          <div className="hidden min-w-0 flex-1 items-center gap-2 md:flex lg:gap-3">
            {navActions.map((item) => (
              <NavActionLink key={item.name} {...item} />
            ))}

            <div className="mx-1 hidden h-8 w-px bg-pro lg:block" aria-hidden="true" />

            <div className="min-w-0 flex-1">
              <SearchBar variant="navbar" onSearch={closeMobile} />
            </div>
          </div>

          <div className="hidden shrink-0 items-center gap-2 md:flex">
            <Link href="/get-quote" className={getQuoteButtonClass}>
              Get Quote
            </Link>
          </div>

          <div className="ml-auto flex items-center gap-0.5 md:hidden">
            <button
              onClick={() => {
                setIsMobileSearchOpen((open) => !open);
                setIsMobileMenuOpen(false);
              }}
              className="inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground transition-colors hover:bg-brand-yellow/10 hover:text-brand-black"
              aria-expanded={isMobileSearchOpen}
              aria-label={isMobileSearchOpen ? "Close search" : "Open search"}
            >
              {isMobileSearchOpen ? <X className="h-6 w-6" /> : <Search className="h-6 w-6" />}
            </button>
            <button
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
        </div>

        <AnimatePresence>
          {isMobileSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden pb-3 pt-1 md:hidden"
            >
              <SearchBar variant="navbar" onSearch={closeMobile} autoFocus />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-pro bg-white md:hidden"
          >
            <div className="space-y-3 px-4 pb-4 pt-3">
              <div className="grid grid-cols-2 gap-2">
                {navActions.map((item) => (
                  <NavActionLink
                    key={item.name}
                    {...item}
                    className="border-pro bg-[#faf8f3]"
                    onClick={closeMobile}
                  />
                ))}
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
