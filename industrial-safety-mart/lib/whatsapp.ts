/** Set NEXT_PUBLIC_WHATSAPP_NUMBER in .env.local (digits only, country code, no +) e.g. 917568450691 */
const DEFAULT_WHATSAPP_NUMBER = "917568450691";

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || DEFAULT_WHATSAPP_NUMBER;

export function generateWhatsAppLink(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}
