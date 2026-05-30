/** Set NEXT_PUBLIC_WHATSAPP_NUMBER in .env.local (digits only, country code, no +) e.g. 919876543210 */
const DEFAULT_WHATSAPP_NUMBER = "919876543210";

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || DEFAULT_WHATSAPP_NUMBER;

export function generateWhatsAppLink(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}
