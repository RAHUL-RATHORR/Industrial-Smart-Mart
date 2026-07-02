"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ContactNewsletterProps = {
  className?: string;
  variant?: "footer" | "card";
  standalone?: boolean;
  layout?: "default" | "pill";
};

export default function ContactNewsletter({
  className,
  variant = "footer",
  standalone = false,
  layout = "default",
}: ContactNewsletterProps) {
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
      <div className={cn(className)}>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Thanks! You&apos;re subscribed for updates &amp; offers.
        </p>
      </div>
    );
  }

  if (isFooter && layout === "pill") {
    return (
      <div className={cn("w-full", className)}>
        <form
          onSubmit={handleSubmit}
          className="flex w-full overflow-hidden rounded-full border border-[#d9d9d9] bg-white shadow-sm"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email here.."
            className="min-w-0 w-full flex-[1_1_auto] bg-white px-4 py-3 text-sm text-brand-black outline-none placeholder:text-[#9a9a9a] sm:px-5"
          />
          <Button
            type="submit"
            variant="brand"
            className="h-auto shrink-0 rounded-none rounded-r-full px-5 py-3 text-sm font-bold sm:px-6"
          >
            Subscribe
          </Button>
        </form>
      </div>
    );
  }

  if (isFooter) {
    return (
      <div className={cn(standalone ? "" : "mt-4", className)}>
        <p className="mb-2 text-xs leading-snug text-muted-foreground">
          {standalone ? (
            "Get deals, new products & safety tips in your inbox."
          ) : (
            <>
              <span className="font-bold text-brand-black">Newsletter</span>
              {" · "}
              Get deals &amp; updates in your inbox.
            </>
          )}
        </p>
        <form
          onSubmit={handleSubmit}
          className={cn("flex flex-col", standalone ? "gap-2.5" : "gap-2 sm:flex-row")}
        >
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Your email"
            className={cn(
              "min-w-0 w-full flex-1 rounded-lg border border-pro bg-white outline-none transition-colors placeholder:text-muted-foreground focus:border-brand-yellow/50",
              standalone
                ? "h-12 px-4 text-base placeholder:text-base"
                : "h-9 px-2.5 text-xs placeholder:text-xs"
            )}
          />
          <Button
            type="submit"
            variant="brand"
            className={cn(
              "shrink-0 rounded-lg font-bold",
              standalone ? "h-10 w-fit self-start px-5 text-sm" : "h-9 px-3 text-xs"
            )}
          >
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
