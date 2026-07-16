"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import ContactChannelIcon from "@/components/ContactChannelIcon";
import ContactNewsletter from "@/components/ContactNewsletter";
import SiteLogo from "@/components/SiteLogo";
import FooterTrustBar from "@/components/FooterTrustBar";
import { PRIMARY_EMAIL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/contact";

const socialLinks = [
  { label: "Facebook", id: "facebook", href: "#" },
  { label: "Instagram", id: "instagram", href: "#" },
  { label: "YouTube", id: "youtube", href: "#" },
  { label: "WhatsApp", id: "whatsapp", href: "#" },
];

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "All Products", href: "/products" },
  { name: "Categories", href: "/categories" },
  { name: "Blog", href: "/blog" },
  { name: "FAQs", href: "/faq" },
  { name: "Contact Us", href: "/contact" },
];

const usefulLinks = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms & Conditions", href: "/terms" },
];

function FooterHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-4 text-base font-bold text-brand-black lg:mb-5">{children}</h3>;
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block py-1 text-sm leading-7 text-[#5c5c5c] transition-colors hover:text-brand-black"
    >
      {children}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="mt-auto bg-white">
      <div className="border-t border-[#e8e8e8] bg-[#f9f9f9]">
        <div className="container mx-auto px-4 py-8 sm:px-5 md:py-10 lg:px-6">
          <FooterTrustBar />
        </div>
      </div>

      <div className="border-t border-[#e8e8e8] bg-white">
        <div className="container mx-auto px-4 py-10 sm:px-5 md:py-12 lg:px-6 lg:py-14">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.72fr)_minmax(0,0.68fr)_minmax(0,1.45fr)] lg:gap-6 xl:gap-10">
            <div>
              <SiteLogo imageClassName="h-12 w-auto md:h-[52px]" />
              <ul className="mt-6 space-y-4 text-sm leading-relaxed text-[#5c5c5c]">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand-black" aria-hidden="true" />
                  <p>
                    <span className="font-bold text-brand-black">Warehouse: </span>
                    123 Industrial Estate, Phase 1, Sector 4, New Delhi - 110020, India
                  </p>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand-black" aria-hidden="true" />
                  <a
                    href={`mailto:${PRIMARY_EMAIL}`}
                    className="break-all transition-colors hover:text-brand-black"
                  >
                    {PRIMARY_EMAIL}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand-black" aria-hidden="true" />
                  <a href={PHONE_TEL} className="transition-colors hover:text-brand-black">
                    {PHONE_DISPLAY}
                  </a>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-6 sm:contents">
              <div>
                <FooterHeading>Quick Links</FooterHeading>
                <ul>
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <FooterLink href={link.href}>{link.name}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <FooterHeading>Useful Links</FooterHeading>
                <ul>
                  {usefulLinks.map((link) => (
                    <li key={link.name}>
                      <FooterLink href={link.href}>{link.name}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="w-full min-w-0 sm:col-span-2 lg:col-span-1">
              <FooterHeading>Newsletter</FooterHeading>
              <p className="mb-4 max-w-[28rem] text-sm leading-[1.5] text-[#5c5c5c]">
                You may unsubscribe at any moment. For that purpose, please find our contact info
                in the legal notice.
              </p>
              <ContactNewsletter variant="footer" layout="pill" className="w-full max-w-[28rem]" />

              <h3 className="mb-4 mt-8 text-base font-bold text-brand-black">Connect With Us!</h3>
              <div className="flex flex-wrap items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="inline-flex transition-opacity hover:opacity-85"
                    aria-label={social.label}
                  >
                    <ContactChannelIcon channelId={social.id} className="h-7 w-7" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#e8e8e8] bg-white">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-[#5c5c5c] sm:px-5 lg:px-6">
          <p>
            <span className="font-semibold text-brand-black">Copyright</span> @{" "}
            {new Date().getFullYear()}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
