import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import SiteLogo from "@/components/SiteLogo";
import FooterTrustBar from "@/components/FooterTrustBar";

const socialLinks = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "#",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-brand-black text-white mt-auto border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        <FooterTrustBar />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 pt-2 border-t border-white/10">
          <div className="space-y-6">
            <SiteLogo variant="dark" imageClassName="h-16 w-auto" />
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted partner for industrial safety equipment, power tools, and B2B supplies. We deliver PAN India with guaranteed authenticity.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-gray-400 hover:text-brand-yellow transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-brand-yellow">Quick Links</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Industrial Blog</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-brand-yellow">Top Categories</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/categories/safety" className="hover:text-white transition-colors">Safety Equipment</Link></li>
              <li><Link href="/categories/tools" className="hover:text-white transition-colors">Power Tools</Link></li>
              <li><Link href="/categories/electrical" className="hover:text-white transition-colors">Electricals</Link></li>
              <li><Link href="/categories/construction" className="hover:text-white transition-colors">Construction Materials</Link></li>
              <li><Link href="/categories/packaging" className="hover:text-white transition-colors">Material Handling</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-brand-yellow">Contact Us</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-brand-yellow mr-3 shrink-0" />
                <span>123 Industrial Estate, Phase 1, Sector 4, New Delhi - 110020, India</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-brand-yellow mr-3 shrink-0" />
                <span>+91 75684 50691</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-brand-yellow mr-3 shrink-0" />
                <span>inquiry@industrialsafetymart.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-4 text-center text-xs text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/10">
          <p>&copy; {new Date().getFullYear()} Industrial Safety Mart. All rights reserved.</p>
          <div className="space-x-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
