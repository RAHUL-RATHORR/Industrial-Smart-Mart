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
        className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white shadow-lg hover:bg-[#128C7E] transition-colors sm:px-5 sm:py-3 sm:text-base"
        title="Chat with us on WhatsApp"
      >
        <WhatsAppIcon className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
        <span>WhatsApp</span>
      </a>
      <a
        href={telLink}
        className="inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-4 py-2.5 text-sm font-bold text-white shadow-lg hover:bg-[#1D4ED8] transition-colors sm:px-5 sm:py-3 sm:text-base"
        title="Call us"
      >
        <Phone className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
        <span>Call</span>
      </a>
    </div>
  );
}
