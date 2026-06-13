/** Set NEXT_PUBLIC_WHATSAPP_NUMBER in .env.local (digits only, country code, no +) e.g. 917568450691 */
const DEFAULT_WHATSAPP_NUMBER = "917568450691";

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || DEFAULT_WHATSAPP_NUMBER;

export function generateWhatsAppLink(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

/** Shared WhatsApp CTA styling — use with cn() */
export const WHATSAPP_BUTTON_CLASS =
  "inline-flex items-center justify-center bg-[#25D366] font-bold text-white transition-colors hover:bg-[#128C7E] hover:text-white";
