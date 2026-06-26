"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import ContactChannelIcon from "@/components/ContactChannelIcon";
import ContactNewsletter from "@/components/ContactNewsletter";
import SiteLogo from "@/components/SiteLogo";
import FooterTrustBar from "@/components/FooterTrustBar";
import { useCatalog } from "@/contexts/CatalogContext";

const socialLinks = [
  { label: "Facebook", id: "facebook", href: "#" },
  { label: "Twitter", id: "twitter", href: "#" },
  { label: "Instagram", id: "instagram", href: "#" },
  { label: "LinkedIn", id: "linkedin", href: "#" },
];

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "All Products", href: "/products" },
  { name: "Blog", href: "/blog" },
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

export default function Footer() {
  const { categories } = useCatalog();
  return (
    <footer className="mt-auto border-t border-pro bg-page">
      <div className="container mx-auto px-4 sm:px-5 lg:px-6">
        <div className="pb-8 pt-6 md:pb-10 md:pt-8">
          <FooterTrustBar />
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 pb-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-8 lg:gap-y-0 lg:pb-12 xl:gap-x-10">
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <SiteLogo imageClassName="h-12 w-auto md:h-14" />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Your trusted partner for industrial safety equipment, power tools, and B2B supplies. We deliver PAN India with guaranteed authenticity.
            </p>
            <div className="flex flex-wrap gap-3.5 pt-1">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="inline-flex transition-transform hover:scale-105 hover:opacity-90"
                  aria-label={social.label}
                >
                  <ContactChannelIcon channelId={social.id} className="h-8 w-8 sm:h-9 sm:w-9" />
                </a>
              ))}
            </div>
          </div>

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

          <div className="min-w-0">
            <FooterHeading>Contact Us</FooterHeading>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-yellow" />
                <span>123 Industrial Estate, Phase 1, Sector 4, New Delhi - 110020, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-brand-yellow" />
                <a href="tel:+917568450691" className="transition-colors hover:text-brand-black">
                  +91 75684 50691
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-brand-yellow" />
                <a href="mailto:inquiry@industrialsafetymart.com" className="transition-colors hover:text-brand-black">
                  inquiry@industrialsafetymart.com
                </a>
              </li>
            </ul>
          </div>

          <div className="min-w-0">
            <FooterHeading>Newsletter</FooterHeading>
            <ContactNewsletter variant="footer" standalone />
          </div>
        </div>
      </div>

      <div className="border-t border-pro bg-white">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 py-4 text-xs text-muted-foreground sm:px-5 md:flex-row lg:px-6">
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
      </div>
    </footer>
  );
}
