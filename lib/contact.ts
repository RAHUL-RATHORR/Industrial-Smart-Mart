import { generateWhatsAppLink, WHATSAPP_NUMBER } from "@/lib/whatsapp";

export const PRIMARY_EMAIL = "inquiry@industrialsafetymart.com";
export const QUOTE_EMAIL = "sales@industrialsafetymart.com";

export const PHONE_DISPLAY = "+91 75684 50691";
export const PHONE_TEL = `tel:+${WHATSAPP_NUMBER}`;

export const QUOTE_WHATSAPP_MESSAGE =
  "Hello! I would like to get a quote for industrial safety products. Please share pricing and availability.";

export const QUOTE_EMAIL_SUBJECT = "Quote Request - Industrial Safety Mart";
export const QUOTE_EMAIL_BODY =
  "Hello Team,%0D%0A%0D%0AI would like to request a quote for the following products:%0D%0A%0D%0A1.%0D%0A2.%0D%0A%0D%0ACompany Name:%0D%0AQuantity Required:%0D%0ADelivery Location:%0D%0A%0D%0AThank you.";

export function getQuoteWhatsAppUrl() {
  return generateWhatsAppLink(QUOTE_WHATSAPP_MESSAGE);
}

export function getQuoteEmailUrl() {
  return `mailto:${QUOTE_EMAIL}?subject=${encodeURIComponent(QUOTE_EMAIL_SUBJECT)}&body=${QUOTE_EMAIL_BODY}`;
}

export type ContactChannel = {
  id: string;
  name: string;
  href: string;
  description: string;
};

export const contactChannels: ContactChannel[] = [
  {
    id: "contact",
    name: "Contact",
    href: PHONE_TEL,
    description: "Call our sales team",
  },
  {
    id: "instagram",
    name: "Instagram",
    href: "https://www.instagram.com/",
    description: "Follow us on Instagram",
  },
  {
    id: "facebook",
    name: "Facebook",
    href: "https://www.facebook.com/",
    description: "Connect on Facebook",
  },
  {
    id: "indiamart",
    name: "IndiaMART",
    href: "https://www.indiamart.com/",
    description: "View our IndiaMART store",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    href: generateWhatsAppLink("Hello! I want to contact Industrial Safety Mart."),
    description: "Chat on WhatsApp",
  },
  {
    id: "whatsapp-channel",
    name: "WhatsApp Channel",
    href: "https://whatsapp.com/channel/",
    description: "Join our WhatsApp channel",
  },
  {
    id: "google-business",
    name: "Google My Business",
    href: "https://maps.google.com/",
    description: "Find us on Google",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    href: "https://www.linkedin.com/",
    description: "Connect on LinkedIn",
  },
  {
    id: "youtube",
    name: "YouTube",
    href: "https://www.youtube.com/",
    description: "Watch on YouTube",
  },
  {
    id: "quora",
    name: "Quora",
    href: "https://www.quora.com/",
    description: "Ask us on Quora",
  },
];
