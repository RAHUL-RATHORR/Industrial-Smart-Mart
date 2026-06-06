import { Phone } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { cn } from "@/lib/utils";

type ContactChannelIconProps = {
  channelId: string;
  className?: string;
};

export default function ContactChannelIcon({ channelId, className }: ContactChannelIconProps) {
  const iconClass = cn("h-8 w-8", className);

  switch (channelId) {
    case "contact":
      return <Phone className={cn(iconClass, "text-brand-black")} strokeWidth={1.8} />;
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} aria-hidden="true">
          <defs>
            <linearGradient id="insta" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F58529" />
              <stop offset="50%" stopColor="#DD2A7B" />
              <stop offset="100%" stopColor="#8134AF" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#insta)" />
          <circle cx="12" cy="12" r="4.5" fill="none" stroke="#fff" strokeWidth="1.8" />
          <circle cx="17.4" cy="6.6" r="1.2" fill="#fff" />
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} aria-hidden="true">
          <circle cx="12" cy="12" r="10" fill="#1877F2" />
          <path
            fill="#fff"
            d="M15.5 8.5h-2c-.4 0-.8.4-.8.9V11H15l-.3 2.2h-2.3v6.3h-2.5v-6.3H8v-2.2h1.9V9.2c0-1.8 1.1-3.2 3.2-3.2H15.5V8.5z"
          />
        </svg>
      );
    case "indiamart":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="4" fill="#2E3192" />
          <text x="12" y="14.5" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="700" fontFamily="Arial, sans-serif">
            IM
          </text>
        </svg>
      );
    case "whatsapp":
      return <WhatsAppIcon className={cn(iconClass, "text-[#25D366]")} />;
    case "whatsapp-channel":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} aria-hidden="true">
          <circle cx="12" cy="12" r="10" fill="#25D366" />
          <path
            fill="#fff"
            d="M8 9h8v1.2H8V9zm0 2.8h6v1.2H8v-1.2zm0 2.8h7v1.2H8v-1.2z"
          />
        </svg>
      );
    case "google-business":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} aria-hidden="true">
          <path fill="#4285F4" d="M12 2C8.7 2 6 4.7 6 8c0 4.5 6 12 6 12s6-7.5 6-12c0-3.3-2.7-6-6-6z" />
          <circle cx="12" cy="8" r="2.2" fill="#fff" />
          <path fill="#34A853" d="M4 20h16v2H4z" opacity="0.25" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="3" fill="#0A66C2" />
          <path
            fill="#fff"
            d="M7.2 10.2h2.2v7.4H7.2v-7.4zm1.1-3.5c.8 0 1.4.6 1.4 1.4s-.6 1.4-1.4 1.4-1.4-.6-1.4-1.4.6-1.4 1.4-1.4zm3.4 3.5h2.1v1c.5-.8 1.5-1.3 2.5-1.3 2.4 0 2.9 1.6 2.9 3.6v4.1h-2.2v-3.6c0-.9-.02-2-1.2-2-1.2 0-1.4.9-1.4 1.9v3.7H11.7v-7.4z"
          />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} aria-hidden="true">
          <rect x="2" y="5" width="20" height="14" rx="4" fill="#FF0000" />
          <path fill="#fff" d="M10 9.5v5l4.5-2.5L10 9.5z" />
        </svg>
      );
    case "quora":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="4" fill="#B92B27" />
          <text x="12" y="16" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700" fontFamily="Georgia, serif">
            Q
          </text>
        </svg>
      );
    default:
      return <Phone className={iconClass} />;
  }
}
