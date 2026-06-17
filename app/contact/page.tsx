import { Mail, MapPin, Phone } from "lucide-react";
import ContactChannelIcon from "@/components/ContactChannelIcon";
import PageHeroBanner from "@/components/PageHeroBanner";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  PRIMARY_EMAIL,
  PHONE_DISPLAY,
  PHONE_TEL,
  contactChannels,
} from "@/lib/contact";

export default function ContactPage() {
  return (
    <div className="bg-muted/20 min-h-screen">
      <PageHeroBanner pageId="contact" />
      <div className="container mx-auto px-4 sm:px-5 lg:px-6 py-10 md:py-14">
        <div className="mx-auto mb-8 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
          <a href={PHONE_TEL} className="card-pro flex flex-col items-center bg-white p-5 text-center transition-all hover:border-brand-yellow/50">
            <Phone className="mb-3 h-8 w-8 text-brand-yellow" />
            <p className="text-sm font-bold text-brand-black">Phone</p>
            <p className="mt-1 text-sm text-muted-foreground">{PHONE_DISPLAY}</p>
          </a>
          <a
            href={`mailto:${PRIMARY_EMAIL}`}
            className="card-pro flex flex-col items-center bg-white p-5 text-center transition-all hover:border-brand-yellow/50"
          >
            <Mail className="mb-3 h-8 w-8 text-brand-yellow" />
            <p className="text-sm font-bold text-brand-black">Email</p>
            <p className="mt-1 break-all text-sm text-muted-foreground">{PRIMARY_EMAIL}</p>
          </a>
          <div className="card-pro flex flex-col items-center bg-white p-5 text-center">
            <MapPin className="mb-3 h-8 w-8 text-brand-yellow" />
            <p className="text-sm font-bold text-brand-black">Location</p>
            <p className="mt-1 text-sm text-muted-foreground">New Delhi, India</p>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-4">
          {contactChannels.map((channel) => (
            <a
              key={channel.id}
              href={channel.href}
              target={channel.href.startsWith("http") ? "_blank" : undefined}
              rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="card-pro group flex flex-col items-center bg-white p-4 text-center transition-all hover:border-brand-yellow/50 sm:p-5"
            >
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-surface-subtle transition-colors group-hover:bg-brand-yellow/10">
                <ContactChannelIcon channelId={channel.id} className="h-8 w-8" />
              </div>
              <p className="text-sm font-bold text-brand-black group-hover:text-brand-yellow transition-colors">
                {channel.name}
              </p>
              <p className="mt-1 line-clamp-2 text-[11px] text-muted-foreground">{channel.description}</p>
            </a>
          ))}
        </div>

        <div className="mx-auto mt-10 flex max-w-md flex-col items-center text-center">
          <p className="mb-4 text-sm text-muted-foreground">Need pricing for bulk industrial safety products?</p>
          <Link
            href="/get-quote"
            className={cn(buttonVariants({ variant: "brand" }), "rounded-full px-6 py-2.5 text-sm font-bold")}
          >
            Get Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
