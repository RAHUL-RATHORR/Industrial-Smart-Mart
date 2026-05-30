"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, PhoneCall } from "lucide-react";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import SiteLogo from "@/components/SiteLogo";
import SearchBar from "@/components/SearchBar";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

import { categories } from "@/lib/data";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Categories", href: "/categories" },
  { name: "Products", href: "/products" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const quoteUrl = generateWhatsAppLink("Hello! I would like to get a quote.");

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between gap-2">
          {/* Logo */}
          <div className="flex shrink-0 items-center min-w-0">
            <SiteLogo imageClassName="h-10 sm:h-12 md:h-14 w-auto" />
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden flex-1 max-w-xl mx-4 lg:mx-8 md:block">
            <SearchBar onSearch={() => setIsMobileMenuOpen(false)} />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-6">
            <nav className="flex items-center gap-6 text-sm font-semibold text-black dark:text-white">
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
              <a href={quoteUrl} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ variant: "default" }), "rounded-full bg-brand-yellow text-brand-black hover:bg-brand-yellow/90 font-bold px-6")}>
                Get Quote
              </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t bg-background"
          >
            <div className="space-y-1 px-4 pb-3 pt-2">
              <div className="mb-4 mt-2 md:hidden">
                <SearchBar
                  placeholder="Search..."
                  inputClassName="rounded-md"
                  onSearch={() => setIsMobileMenuOpen(false)}
                />
              </div>
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
                <a href={quoteUrl} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ variant: "default" }), "w-full rounded-md bg-brand-yellow text-brand-black hover:bg-brand-yellow/90 font-bold justify-center")}>
                  <PhoneCall className="mr-2 h-4 w-4" /> Get Quote
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
