import Link from "next/link";
import {
  Headphones,
  MessageCircle,
  Package,
  ShieldCheck,
  Truck,
  Wallet,
} from "lucide-react";
import { generateWhatsAppLink, WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

function formatPhoneDisplay(number: string) {
  if (number.length === 12 && number.startsWith("91")) {
    return `+91 ${number.slice(2, 7)} ${number.slice(7)}`;
  }
  return `+${number}`;
}

type TrustIconVariant = "wallet" | "truck" | "bulk" | "protection" | "help";

const iconStyles: Record<
  TrustIconVariant,
  { bg: string; ring: string; icon: string; Icon: typeof Wallet }
> = {
  wallet: {
    bg: "bg-gradient-to-br from-emerald-400 to-green-600",
    ring: "ring-emerald-100",
    icon: "text-white",
    Icon: Wallet,
  },
  truck: {
    bg: "bg-gradient-to-br from-sky-400 to-blue-600",
    ring: "ring-sky-100",
    icon: "text-white",
    Icon: Truck,
  },
  bulk: {
    bg: "bg-gradient-to-br from-orange-400 to-amber-600",
    ring: "ring-orange-100",
    icon: "text-white",
    Icon: Package,
  },
  protection: {
    bg: "bg-gradient-to-br from-violet-400 to-purple-600",
    ring: "ring-violet-100",
    icon: "text-white",
    Icon: ShieldCheck,
  },
  help: {
    bg: "bg-gradient-to-br from-rose-400 to-pink-600",
    ring: "ring-rose-100",
    icon: "text-white",
    Icon: Headphones,
  },
};

function TrustIcon({ variant }: { variant: TrustIconVariant }) {
  const { bg, ring, icon, Icon } = iconStyles[variant];

  return (
    <div
      className={cn(
        "flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm ring-4",
        bg,
        ring
      )}
    >
      <Icon className={cn("h-6 w-6", icon)} strokeWidth={2} aria-hidden="true" />
    </div>
  );
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
    icon: "bulk" as const,
    title: "Bulk Orders",
    description: "Special pricing and fast WhatsApp quotes for wholesale and corporate buyers.",
    href: "/get-quote",
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
        {trustFeatures.map(({ icon, title, description, href }) => (
          <div key={title} className="flex flex-col items-center text-center">
            <div className="mb-3">
              <TrustIcon variant={icon} />
            </div>
            {href ? (
              <Link href={href} className="mb-1.5 text-sm font-bold text-brand-black transition-colors hover:text-brand-yellow">
                {title}
              </Link>
            ) : (
              <h3 className="mb-1.5 text-sm font-bold text-brand-black">{title}</h3>
            )}
            <p className="max-w-[210px] text-xs leading-relaxed text-gray-600">{description}</p>
          </div>
        ))}

        <div className="flex flex-col items-center text-center">
          <div className="mb-3">
            <TrustIcon variant="help" />
          </div>
          <h3 className="mb-1.5 text-sm font-bold text-brand-black">365 Days Help Desk</h3>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-black transition-colors hover:text-brand-yellow"
          >
            <MessageCircle className="h-4 w-4 shrink-0 text-[#25D366]" />
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
