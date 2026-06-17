"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import SiteLogo from "@/components/SiteLogo";
import SearchBar from "@/components/SearchBar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

import { useCatalog } from "@/contexts/CatalogContext";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Categories", href: "/categories" },
  { name: "Products", href: "/products" },
  { name: "Contact", href: "/contact" },
  { name: "Blog", href: "/blog" },
];

export default function Navbar() {
  const { categories } = useCatalog();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-pro bg-background/98 shadow-pro-sm backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="h-1 w-full bg-[#f4b400]" aria-hidden="true" />
      <div className="container mx-auto px-4 sm:px-5 lg:px-6">
        <div className="flex h-14 md:h-[4.25rem] items-center justify-between gap-3">
          {/* Logo */}
          <div className="flex shrink-0 items-center min-w-0">
            <SiteLogo imageClassName="h-8 w-auto sm:h-10 md:h-12" />
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden min-w-0 max-w-xl flex-1 mx-4 lg:mx-6 md:block">
            <SearchBar onSearch={() => setIsMobileMenuOpen(false)} />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-5 shrink-0">
            <nav className="flex items-center gap-5 text-sm font-medium text-brand-black dark:text-white">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="hover:text-brand-yellow transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
              <Link
                href="/get-quote"
                className={cn(buttonVariants({ variant: "brand" }), "rounded-full px-5 py-2 text-sm font-semibold")}
              >
                Get Quote
              </Link>
          </div>

          {/* Mobile Search + Menu */}
          <div className="flex items-center gap-0.5 md:hidden">
            <button
              onClick={() => {
                setIsMobileSearchOpen((open) => !open);
                setIsMobileMenuOpen(false);
              }}
              className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none"
              aria-expanded={isMobileSearchOpen}
              aria-label={isMobileSearchOpen ? "Close search" : "Open search"}
            >
              {isMobileSearchOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Search className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                setIsMobileSearchOpen(false);
              }}
              className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Panel */}
        <AnimatePresence>
          {isMobileSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden pb-3 pt-2 md:hidden"
            >
              <SearchBar
                placeholder="Search products, categories, brands..."
                onSearch={() => setIsMobileSearchOpen(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-pro bg-background border-t md:hidden"
          >
            <div className="space-y-1 px-4 pb-3 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-black dark:text-white hover:bg-muted hover:text-black dark:hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2 pb-1">
                <p className="px-3 text-xs font-bold uppercase text-muted-foreground tracking-wider">Categories</p>
                <div className="mt-2 max-h-48 overflow-y-auto hide-scrollbar">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={category.href}
                      className="block rounded-md px-3 py-2 text-sm text-black dark:text-white hover:bg-muted"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="pt-2">
                <Link
                  href="/get-quote"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(buttonVariants({ variant: "brand" }), "w-full rounded-md font-bold justify-center")}
                >
                  Get Quote
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
