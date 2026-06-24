"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ContactNewsletterProps = {
  className?: string;
  variant?: "footer" | "card";
};

export default function ContactNewsletter({ className, variant = "footer" }: ContactNewsletterProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  const isFooter = variant === "footer";

  if (isFooter && submitted) {
    return (
      <div className={cn("mt-4", className)}>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Thanks! You&apos;re subscribed for updates &amp; offers.
        </p>
      </div>
    );
  }

  if (isFooter) {
    return (
      <div className={cn("mt-4", className)}>
        <p className="mb-2 text-xs leading-snug text-muted-foreground">
          <span className="font-bold text-brand-black">Newsletter</span>
          {" · "}
          Get deals &amp; updates in your inbox.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Your email"
            className="h-8 min-w-0 flex-1 rounded-lg border border-pro bg-white px-2.5 text-xs outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-brand-yellow/50"
          />
          <Button type="submit" variant="brand" size="sm" className="shrink-0 px-3 text-xs font-bold">
            Subscribe
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className={cn("card-pro bg-white p-4 text-center", className)}>
      <p className="mb-2 text-xs font-bold text-brand-black">Newsletter</p>
      {submitted ? (
        <p className="text-[11px] leading-relaxed text-muted-foreground">
          Thanks! You&apos;re subscribed for updates &amp; offers.
        </p>
      ) : (
        <>
          <p className="mb-2.5 text-center text-[11px] leading-relaxed text-muted-foreground">
            Deals, new products &amp; safety tips in your inbox.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Your email"
              className="h-8 w-full rounded-lg border border-pro bg-white px-2.5 text-xs outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-brand-yellow/50"
            />
            <Button type="submit" variant="brand" size="sm" className="shrink-0 px-3 text-xs font-bold">
              Subscribe
            </Button>
          </form>
        </>
      )}
    </div>
  );
}
