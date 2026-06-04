import { generateWhatsAppLink } from "@/lib/whatsapp";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MessageCircle, Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  const quoteUrl = generateWhatsAppLink("Hello! I want to contact the sales team.");

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black mb-4">Contact Us</h1>
        <p className="text-muted-foreground">We&apos;re here to help with your industrial procurement needs.</p>
      </div>
      <div className="max-w-5xl mx-auto grid gap-8">
        <div className="card-pro max-w-2xl mx-auto w-full p-8 rounded-2xl flex flex-col items-center text-center">
          <MessageCircle className="h-12 w-12 text-brand-yellow mb-4" />
          <h2 className="text-2xl font-bold mb-2">WhatsApp Support</h2>
          <p className="text-muted-foreground mb-6">Get instant quotes and replies via WhatsApp.</p>
          <a href={quoteUrl} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ variant: "brand" }))}>Chat on WhatsApp</a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-6 border rounded-xl bg-muted/20 min-w-0 flex flex-col items-center">
            <Phone className="h-8 w-8 mb-3 text-brand-yellow shrink-0" />
            <div className="font-semibold text-sm sm:text-base">+91 75684 50691</div>
          </div>
          <div className="p-6 border rounded-xl bg-muted/20 min-w-0 flex flex-col items-center">
            <Mail className="h-8 w-8 mb-3 text-brand-yellow shrink-0" />
            <div className="font-semibold text-sm sm:text-base break-words max-w-full px-1">inquiry@industrialsafetymart.com</div>
          </div>
          <div className="p-6 border rounded-xl bg-muted/20 min-w-0 flex flex-col items-center">
            <MapPin className="h-8 w-8 mb-3 text-brand-yellow shrink-0" />
            <div className="font-semibold text-sm sm:text-base">New Delhi, India</div>
          </div>
        </div>
      </div>
    </div>
  );
}
