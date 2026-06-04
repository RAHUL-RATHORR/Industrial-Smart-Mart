"use client";

import { Phone } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { generateWhatsAppLink, WHATSAPP_NUMBER } from "@/lib/whatsapp";

export default function FloatingWhatsApp() {
  const whatsappUrl = generateWhatsAppLink("Hello! I have an inquiry from Industrial Safety Mart.");
  const telLink = `tel:+${WHATSAPP_NUMBER}`;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 sm:bottom-6 sm:right-6 sm:gap-3">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-brand gap-2 rounded-full px-3 py-2 text-xs shadow-pro-float sm:px-4 sm:py-2.5 sm:text-sm"
        title="Chat with us on WhatsApp"
      >
        <WhatsAppIcon className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
        <span>WhatsApp</span>
      </a>
      <a
        href={telLink}
        className="btn-brand-dark gap-2 px-3 py-2 text-xs sm:px-4 sm:py-2.5 sm:text-sm"
        title="Call us"
      >
        <Phone className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
        <span>Call</span>
      </a>
    </div>
  );
}
