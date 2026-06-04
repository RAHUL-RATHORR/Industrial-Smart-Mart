"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Phone, X } from "lucide-react";
import { generateWhatsAppLink, WHATSAPP_NUMBER } from "@/lib/whatsapp";

const STORAGE_KEY = "ism-welcome-popup-dismissed";

function formatPhoneDisplay(number: string) {
  if (number.length === 12 && number.startsWith("91")) {
    return `+91 ${number.slice(2, 7)} ${number.slice(7)}`;
  }
  return `+${number}`;
}

export default function WelcomePopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const timer = window.setTimeout(() => setOpen(true), 400);
    return () => window.clearTimeout(timer);
  }, []);

  const close = () => {
    setOpen(false);
    sessionStorage.setItem(STORAGE_KEY, "1");
  };

  const whatsappUrl = generateWhatsAppLink(
    "Hello! I have a question about Industrial Safety Mart."
  );
  const telLink = `tel:+${WHATSAPP_NUMBER}`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            aria-label="Close popup"
            onClick={close}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="welcome-popup-title"
            className="relative w-full max-w-md rounded-2xl border-pro bg-white p-6 sm:p-8 shadow-pro-float"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25 }}
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="text-center pt-2">
              <h2
                id="welcome-popup-title"
                className="text-2xl sm:text-3xl font-bold text-brand-black mb-3"
              >
                Have Questions? Let&apos;s Talk!
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed">
                Call or WhatsApp us now for instant support, bulk orders, and industrial supplies.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a
                  href={telLink}
                  className="btn-brand flex-1 gap-2 rounded-xl px-5 py-3 text-sm"
                >
                  <Phone className="h-4 w-4" />
                  Call Us
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-brand-outline flex-1 gap-2 rounded-xl px-5 py-3 text-sm"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>

              <p className="mt-5 text-xs text-muted-foreground">
                No spam, just quick help from our team 👋
              </p>
              <p className="mt-1 text-xs text-muted-foreground/80">
                {formatPhoneDisplay(WHATSAPP_NUMBER)}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
