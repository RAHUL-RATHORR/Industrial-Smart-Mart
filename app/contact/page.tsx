import { Mail, MapPin, Phone } from "lucide-react";
import ContactChannelIcon from "@/components/ContactChannelIcon";
import ContactMessageForm from "@/components/ContactMessageForm";
import PageHeroBanner from "@/components/PageHeroBanner";
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
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">
          <ContactMessageForm />

          <aside className="space-y-4">
            <div className="card-pro rounded-2xl bg-white p-5">
              <h3 className="mb-4 text-sm font-bold text-brand-black">Quick Contact</h3>
              <div className="space-y-4">
                <a
                  href={PHONE_TEL}
                  className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-brand-yellow/10"
                >
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand-yellow" />
                  <div>
                    <p className="text-sm font-bold text-brand-black">Phone</p>
                    <p className="text-sm text-muted-foreground">{PHONE_DISPLAY}</p>
                  </div>
                </a>
                <a
                  href={`mailto:${PRIMARY_EMAIL}`}
                  className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-brand-yellow/10"
                >
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand-yellow" />
                  <div>
                    <p className="text-sm font-bold text-brand-black">Email</p>
                    <p className="break-all text-sm text-muted-foreground">{PRIMARY_EMAIL}</p>
                  </div>
                </a>
                <div className="flex items-start gap-3 rounded-lg p-2">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-yellow" />
                  <div>
                    <p className="text-sm font-bold text-brand-black">Location</p>
                    <p className="text-sm text-muted-foreground">
                      123 Industrial Estate, Phase 1, Sector 4, New Delhi - 110020, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-pro rounded-2xl bg-white p-5">
              <h3 className="mb-3 text-sm font-bold text-brand-black">Connect with us</h3>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 lg:grid-cols-4">
                {contactChannels.slice(0, 8).map((channel) => (
                  <a
                    key={channel.id}
                    href={channel.href}
                    target={channel.href.startsWith("http") ? "_blank" : undefined}
                    rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex flex-col items-center gap-1 rounded-lg p-2 transition-colors hover:bg-brand-yellow/10"
                    title={channel.name}
                  >
                    <ContactChannelIcon channelId={channel.id} className="h-8 w-8" />
                    <span className="line-clamp-1 text-[9px] font-medium text-muted-foreground">{channel.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
