import Link from "next/link";
import { ChevronRight, Mail, MessageCircle, Phone, Truck } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { buttonVariants } from "@/components/ui/button";
import {
  PHONE_DISPLAY,
  PHONE_TEL,
  PRIMARY_EMAIL,
  QUOTE_EMAIL,
  QUOTE_WHATSAPP_MESSAGE,
  getQuoteEmailUrl,
  getQuoteWhatsAppUrl,
} from "@/lib/contact";
import { cn } from "@/lib/utils";

export default function GetQuotePage() {
  return (
    <div className="bg-muted/20 min-h-screen">
      <div className="container mx-auto px-4 sm:px-5 lg:px-6 py-10 md:py-14">
        <nav className="mb-5 flex flex-wrap items-center gap-1 text-xs text-muted-foreground sm:text-sm">
          <Link href="/" className="hover:text-brand-yellow">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-brand-black">Get Quote</span>
        </nav>

        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-black text-brand-black md:text-4xl">Get a Quote</h1>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            Send your product query via WhatsApp or email. Our team will share pricing, availability, and bulk discounts.
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-3xl gap-4">
          <a
            href={getQuoteWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="card-pro group flex items-center gap-4 bg-white p-5 transition-all hover:border-brand-yellow/50 sm:p-6"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#25D366]/10">
              <WhatsAppIcon className="h-7 w-7 text-[#25D366]" />
            </div>
            <div className="min-w-0 flex-1 text-left">
              <h2 className="text-lg font-bold text-brand-black group-hover:text-brand-yellow transition-colors">
                WhatsApp Query
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Instant quote on WhatsApp with your product list and quantity.
              </p>
            </div>
            <MessageCircle className="h-5 w-5 shrink-0 text-brand-yellow" />
          </a>

          <a
            href={getQuoteEmailUrl()}
            className="card-pro group flex items-center gap-4 bg-white p-5 transition-all hover:border-brand-yellow/50 sm:p-6"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-yellow/15">
              <Mail className="h-7 w-7 text-brand-black" />
            </div>
            <div className="min-w-0 flex-1 text-left">
              <h2 className="text-lg font-bold text-brand-black group-hover:text-brand-yellow transition-colors">
                Email Quote Request
              </h2>
              <p className="mt-1 break-all text-sm text-muted-foreground">{QUOTE_EMAIL}</p>
            </div>
            <Mail className="h-5 w-5 shrink-0 text-brand-yellow" />
          </a>
        </div>

        <div className="card-pro mx-auto mt-8 max-w-3xl bg-white p-5 sm:p-6">
          <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
            Include in your query
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-700">
            <li>• Product name or category</li>
            <li>• Required quantity</li>
            <li>• Company name</li>
            <li>• Delivery location / pincode</li>
          </ul>
          <p className="mt-4 rounded-lg bg-brand-yellow-soft px-3 py-2 text-xs text-brand-black">
            Sample message: &quot;{QUOTE_WHATSAPP_MESSAGE}&quot;
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
          <a href={PHONE_TEL} className="card-pro flex flex-col items-center bg-white p-4 text-center">
            <Phone className="mb-2 h-6 w-6 text-brand-yellow" />
            <p className="text-xs font-bold text-brand-black">Call</p>
            <p className="mt-1 text-xs text-muted-foreground">{PHONE_DISPLAY}</p>
          </a>
          <a href={`mailto:${PRIMARY_EMAIL}`} className="card-pro flex flex-col items-center bg-white p-4 text-center">
            <Mail className="mb-2 h-6 w-6 text-brand-yellow" />
            <p className="text-xs font-bold text-brand-black">General Email</p>
            <p className="mt-1 break-all text-xs text-muted-foreground">{PRIMARY_EMAIL}</p>
          </a>
          <Link href="/contact" className={cn(buttonVariants({ variant: "brandOutline" }), "flex flex-col items-center justify-center rounded-xl p-4 text-center")}>
            <Truck className="mb-2 h-6 w-6" />
            <span className="text-xs font-bold">Contact Us</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
