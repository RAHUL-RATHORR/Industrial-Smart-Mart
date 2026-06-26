"use client";

import { FormEvent, useState } from "react";
import { ChevronDown } from "lucide-react";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const inquiryOptions = [
  "Bulk order / Get quote",
  "Safety shoes & footwear",
  "PVC gumboots",
  "Reflective jackets & PPE",
  "Safety helmets & gloves",
  "Welding machines & tools",
  "General inquiry",
];

const fieldClass =
  "w-full rounded-lg border border-pro bg-white px-3.5 py-2.5 text-sm text-brand-black outline-none transition-colors placeholder:text-muted-foreground focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/20";

function FormField({
  label,
  required,
  children,
  className,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block space-y-1.5", className)}>
      <span className="text-sm font-semibold text-brand-black">
        {label}
        {required ? <span className="text-brand-black"> *</span> : null}
      </span>
      {children}
    </label>
  );
}

export default function ContactMessageForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const whatsappMessage = [
      "Hello Industrial Safety Mart,",
      "",
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: +91 ${form.phone}`,
      `Interested in: ${form.interest || "Not specified"}`,
      "",
      form.message,
    ].join("\n");

    window.open(generateWhatsAppLink(whatsappMessage), "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="card-pro rounded-2xl bg-white p-6 md:p-8">
        <h2 className="text-xl font-bold text-brand-black md:text-2xl">Message sent!</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
          Thanks for reaching out. Our team will contact you shortly on WhatsApp or email.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setForm({ name: "", email: "", phone: "", interest: "", message: "" });
          }}
          className="mt-5 text-sm font-semibold text-brand-black underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="card-pro rounded-2xl bg-white p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-brand-black md:text-2xl">Send Us a Message</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
          Have questions about products, bulk orders, or pricing? Fill in the form and we&apos;ll reach out shortly.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FormField label="Full Name" required>
            <input
              type="text"
              required
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              placeholder="Your full name"
              className={fieldClass}
            />
          </FormField>

          <FormField label="Email Address" required>
            <input
              type="email"
              required
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              placeholder="you@example.com"
              className={fieldClass}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FormField label="Phone Number" required>
            <div className="flex overflow-hidden rounded-lg border border-pro bg-white focus-within:border-brand-yellow focus-within:ring-2 focus-within:ring-brand-yellow/20">
              <span className="flex shrink-0 items-center gap-1.5 border-r border-pro bg-muted/30 px-3 text-sm font-medium text-brand-black">
                <span aria-hidden>🇮🇳</span>
                +91
              </span>
              <input
                type="tel"
                required
                inputMode="numeric"
                value={form.phone}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, phone: event.target.value.replace(/\D/g, "").slice(0, 10) }))
                }
                placeholder="98765 43210"
                className="min-w-0 flex-1 border-0 bg-transparent px-3.5 py-2.5 text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </FormField>

          <FormField label="Interested in">
            <div className="relative">
              <select
                value={form.interest}
                onChange={(event) => setForm((prev) => ({ ...prev, interest: event.target.value }))}
                className={cn(fieldClass, "appearance-none pr-10")}
              >
                <option value="">Select a product or inquiry type</option>
                {inquiryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </FormField>
        </div>

        <FormField label="Message" required>
          <textarea
            required
            rows={5}
            value={form.message}
            onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
            placeholder="Tell us how we can help you..."
            className={cn(fieldClass, "resize-y min-h-[120px]")}
          />
        </FormField>

        <button
          type="submit"
          className={cn(
            "w-full rounded-[10px] border-0 px-7 py-3.5 text-[15px] font-bold text-white transition-all duration-200",
            "bg-gradient-to-r from-brand-yellow to-[#ffc833]",
            "shadow-[0_8px_20px_rgba(244,180,0,0.45)]",
            "hover:bg-gradient-to-r hover:from-brand-black hover:to-[#1a1a1a] hover:shadow-[0_8px_20px_rgba(26,26,26,0.22)]",
            "active:scale-[0.99]"
          )}
        >
          Submit Message
        </button>
      </form>
    </div>
  );
}
