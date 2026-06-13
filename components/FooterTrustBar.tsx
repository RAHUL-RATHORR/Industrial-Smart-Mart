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
  const iconClass = "h-10 w-10";
  const stroke = 1.35;

  switch (variant) {
    case "wallet":
      return <Wallet className={`${iconClass} text-brand-yellow`} strokeWidth={stroke} />;
    case "truck":
      return <Truck className={`${iconClass} text-brand-yellow`} strokeWidth={stroke} />;
    case "payment":
      return (
        <div className="relative">
          <CreditCard className={`${iconClass} text-brand-black`} strokeWidth={stroke} />
          <span className="absolute -bottom-0.5 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-yellow ring-2 ring-white">
            <ShieldCheck className="h-3 w-3 text-brand-black" strokeWidth={2.5} />
          </span>
        </div>
      );
    case "protection":
      return (
        <div className="relative">
          <HandHelping className={`${iconClass} text-brand-black`} strokeWidth={stroke} />
          <span className="absolute -bottom-0.5 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-yellow ring-2 ring-white">
            <ShieldCheck className="h-3 w-3 text-brand-black" strokeWidth={2.5} />
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
    description: "Most popular brands with widest range of selection at best prices.",
  },
  {
    icon: "truck" as const,
    title: "Nationwide Delivery",
    description: "Over 20,000 pincodes serviceable across India.",
  },
  {
    icon: "payment" as const,
    title: "Secure Payment",
    description: "Partnered with India's most popular and secure payment solutions.",
  },
  {
    icon: "protection" as const,
    title: "Buyer Protection",
    description: "Committed to buyer interests to provide a smooth shopping experience.",
  },
];

export default function FooterTrustBar() {
  const phoneDisplay = formatPhoneDisplay(WHATSAPP_NUMBER);
  const whatsappUrl = generateWhatsAppLink("Hello! I need help from Industrial Safety Mart.");

  return (
    <div className="rounded-2xl border border-pro bg-white px-4 py-7 shadow-pro sm:px-6 md:py-8">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
        {trustFeatures.map(({ icon, title, description }) => (
          <div key={title} className="flex flex-col items-center text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center">
              <TrustIcon variant={icon} />
            </div>
            <h3 className="mb-1.5 text-sm font-bold text-brand-black">{title}</h3>
            <p className="max-w-[210px] text-xs leading-relaxed text-gray-600">{description}</p>
          </div>
        ))}

        <div className="flex flex-col items-center text-center">
          <div className="relative mb-3 flex h-12 w-12 items-center justify-center">
            <Headphones className="h-10 w-10 text-brand-black" strokeWidth={1.35} aria-hidden="true" />
          </div>
          <h3 className="mb-1.5 text-sm font-bold text-brand-black">365 Days Help Desk</h3>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-black transition-colors hover:text-brand-yellow"
          >
            <MessageCircle className="h-4 w-4 shrink-0 text-brand-yellow" />
            {phoneDisplay}
          </a>
          <Link href="/contact" className="mt-1.5 text-xs text-gray-600 transition-colors hover:text-brand-black">
            Contact support
          </Link>
        </div>
      </div>
    </div>
  );
}
