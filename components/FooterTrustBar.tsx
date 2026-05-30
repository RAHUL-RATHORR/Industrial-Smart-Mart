import Link from "next/link";
import {
  CreditCard,
  HandHelping,
  Headphones,
  MessageCircle,
  ShieldCheck,
  Truck,
  Wallet,
} from "lucide-react";
import { generateWhatsAppLink, WHATSAPP_NUMBER } from "@/lib/whatsapp";

function formatPhoneDisplay(number: string) {
  if (number.length === 12 && number.startsWith("91")) {
    return `+91 ${number.slice(2, 7)} ${number.slice(7)}`;
  }
  return `+${number}`;
}

type TrustIconVariant = "wallet" | "truck" | "payment" | "protection";

function TrustIcon({ variant }: { variant: TrustIconVariant }) {
  const iconClass = "h-11 w-11";
  const stroke = 1.35;

  switch (variant) {
    case "wallet":
      return (
        <div className="mb-3 flex h-12 w-12 items-center justify-center" aria-hidden="true">
          <Wallet className={`${iconClass} text-[#e53935]`} strokeWidth={stroke} />
        </div>
      );
    case "truck":
      return (
        <div className="mb-3 flex h-12 w-12 items-center justify-center" aria-hidden="true">
          <Truck className={`${iconClass} text-[#e53935]`} strokeWidth={stroke} />
        </div>
      );
    case "payment":
      return (
        <div className="relative mb-3 flex h-12 w-12 items-center justify-center" aria-hidden="true">
          <CreditCard className={`${iconClass} text-brand-black`} strokeWidth={stroke} />
          <span className="absolute -bottom-0.5 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#e53935] ring-2 ring-white">
            <ShieldCheck className="h-3 w-3 text-white" strokeWidth={2.5} />
          </span>
        </div>
      );
    case "protection":
      return (
        <div className="relative mb-3 flex h-12 w-12 items-center justify-center" aria-hidden="true">
          <HandHelping className={`${iconClass} text-brand-black`} strokeWidth={stroke} />
          <span className="absolute -bottom-0.5 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#e53935] ring-2 ring-white">
            <ShieldCheck className="h-3 w-3 text-white" strokeWidth={2.5} />
          </span>
        </div>
      );
    default:
      return null;
  }
}

const trustFeatures = [
  {
    icon: "wallet" as const,
    title: "Great Value",
    description:
      "Most popular brands with widest range of selection at best prices.",
  },
  {
    icon: "truck" as const,
    title: "Nationwide Delivery",
    description: "Over 20,000 pincodes serviceable across India.",
  },
  {
    icon: "payment" as const,
    title: "Secure Payment",
    description:
      "Partnered with India's most popular and secure payment solutions.",
  },
  {
    icon: "protection" as const,
    title: "Buyer Protection",
    description:
      "Committed to buyer interests to provide a smooth shopping experience.",
  },
];

export default function FooterTrustBar() {
  const phoneDisplay = formatPhoneDisplay(WHATSAPP_NUMBER);
  const whatsappUrl = generateWhatsAppLink("Hello! I need help from Industrial Safety Mart.");

  return (
    <div className="bg-white text-brand-black rounded-xl border border-gray-200 py-8 md:py-10 px-4 sm:px-6 mb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-0 lg:divide-x lg:divide-gray-200">
        {trustFeatures.map(({ icon, title, description }) => (
          <div
            key={title}
            className="flex flex-col items-center text-center px-2 lg:px-6 first:lg:pl-0"
          >
            <TrustIcon variant={icon} />
            <h3 className="text-sm font-bold text-brand-black mb-2">{title}</h3>
            <p className="text-xs text-gray-600 leading-relaxed max-w-[220px]">{description}</p>
          </div>
        ))}

        <div className="flex flex-col items-center text-center px-2 lg:px-6 last:lg:pr-0">
          <div className="relative mb-3 flex h-12 w-12 items-center justify-center">
            <Headphones className="h-11 w-11 text-brand-black" strokeWidth={1.35} aria-hidden="true" />
            <span className="absolute top-1 left-1 h-3 w-3 rounded-full bg-[#e53935]" aria-hidden="true" />
            <span className="absolute top-1 right-1 h-3 w-3 rounded-full bg-[#e53935]" aria-hidden="true" />
          </div>
          <h3 className="text-sm font-bold text-brand-black mb-2">365 Days Help Desk</h3>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-black hover:text-[#25D366] transition-colors"
          >
            <MessageCircle className="h-5 w-5 text-[#25D366] shrink-0" />
            {phoneDisplay}
          </a>
          <Link
            href="/contact"
            className="text-xs text-gray-600 hover:text-brand-black mt-2 transition-colors"
          >
            Contact support
          </Link>
        </div>
      </div>
    </div>
  );
}
