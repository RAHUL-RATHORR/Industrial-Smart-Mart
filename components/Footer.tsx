"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import ContactChannelIcon from "@/components/ContactChannelIcon";
import SiteLogo from "@/components/SiteLogo";
import FooterTrustBar from "@/components/FooterTrustBar";
import { Button, buttonVariants } from "@/components/ui/button";
import { useCatalog } from "@/contexts/CatalogContext";
import { cn } from "@/lib/utils";

const socialLinks = [
  { label: "Facebook", id: "facebook", href: "#" },
  { label: "Twitter", id: "twitter", href: "#" },
  { label: "Instagram", id: "instagram", href: "#" },
  { label: "LinkedIn", id: "linkedin", href: "#" },
];

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "All Products", href: "/products" },
  { name: "Industrial Blog", href: "/blog" },
  { name: "FAQs", href: "/faq" },
  { name: "Contact Us", href: "/contact" },
];

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-bold text-brand-black">{children}</h3>
      <span className="mt-2 block h-0.5 w-10 rounded-full bg-[#f4b400]" aria-hidden="true" />
    </div>
  );
}

function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  }

  if (submitted) {
    return <p className="text-xs font-semibold text-brand-black sm:text-sm">Subscribed successfully.</p>;
  }

  return (
    <div className="w-full max-w-sm lg:max-w-md">
      <p className="mb-2 text-xs font-bold text-brand-black">Newsletter</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <label className="sr-only" htmlFor="footer-newsletter-email">
          Email address
        </label>
        <input
          id="footer-newsletter-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Your email"
          className="h-8 min-w-0 flex-1 rounded-md border border-pro bg-white px-2.5 text-xs outline-none transition focus:border-[#f4b400] focus:ring-2 focus:ring-[#f4b400]/25 sm:h-9 sm:px-3 sm:text-sm"
        />
        <Button type="submit" variant="brand" size="sm" className="h-8 shrink-0 px-3 text-xs font-bold sm:h-9 sm:px-4 sm:text-sm">
          <Send className="size-3.5 sm:size-4" />
          <span className="hidden sm:inline">Subscribe</span>
        </Button>
      </form>
    </div>
  );
}

export default function Footer() {
  const { categories } = useCatalog();
  return (
    <footer className="mt-auto border-t border-pro bg-page">
      <div className="container mx-auto px-4 sm:px-5 lg:px-6">
        <div className="pb-8 pt-6 md:pb-10 md:pt-8">
          <FooterTrustBar />
        </div>

        <div className="mb-8 flex flex-col items-start justify-between gap-4 rounded-2xl bg-brand-black px-5 py-5 sm:flex-row sm:items-center md:px-7 md:py-6">
          <div>
            <p className="text-base font-bold text-white md:text-lg">Get Quote for Bulk Orders</p>
            <p className="mt-1 text-sm text-white/70">
              PAN India delivery · Genuine products · Fast WhatsApp response
            </p>
          </div>
          <Link
            href="/get-quote"
            className={cn(buttonVariants({ variant: "brand" }), "shrink-0 rounded-lg px-6 py-2.5 text-sm font-bold")}
          >
            Get Quote
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-10 pb-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:pb-12">
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <SiteLogo imageClassName="h-12 w-auto md:h-14" />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Your trusted partner for industrial safety equipment, power tools, and B2B supplies. We deliver PAN India with guaranteed authenticity.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="transition-opacity hover:opacity-80"
                  aria-label={social.label}
                >
                  <ContactChannelIcon channelId={social.id} className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-0 sm:col-span-2 lg:contents">
            <div className="min-w-0">
              <FooterHeading>Quick Links</FooterHeading>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="transition-colors hover:text-brand-black">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-w-0">
              <FooterHeading>Top Categories</FooterHeading>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {categories.slice(0, 5).map((category) => (
                  <li key={category.id}>
                    <Link href={category.href} className="transition-colors hover:text-brand-black">
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <FooterHeading>Contact Us</FooterHeading>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-yellow" />
                <span>123 Industrial Estate, Phase 1, Sector 4, New Delhi - 110020, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-brand-yellow" />
                <a href="tel:+917568450691" className="transition-colors hover:text-brand-black">
                  +91 75684 50691
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-brand-yellow" />
                <a href="mailto:inquiry@industrialsafetymart.com" className="transition-colors hover:text-brand-black">
                  inquiry@industrialsafetymart.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-pro bg-white">
        <div className="container mx-auto px-4 py-4 sm:px-5 lg:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col items-center gap-3 text-xs text-muted-foreground md:flex-row md:items-center md:gap-4 lg:items-start">
              <p>&copy; {new Date().getFullYear()} Industrial Safety Mart. All rights reserved.</p>
              <div className="flex gap-4">
                <Link href="/privacy" className="transition-colors hover:text-brand-black">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="transition-colors hover:text-brand-black">
                  Terms of Service
                </Link>
              </div>
            </div>
            <FooterNewsletter />
          </div>
        </div>
      </div>
    </footer>
  );
}
