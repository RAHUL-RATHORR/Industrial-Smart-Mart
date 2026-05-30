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
      <div className="max-w-2xl mx-auto grid gap-8">
        <div className="bg-card p-8 rounded-2xl border shadow-sm flex flex-col items-center text-center">
          <MessageCircle className="h-12 w-12 text-[#25D366] mb-4" />
          <h2 className="text-2xl font-bold mb-2">WhatsApp Support</h2>
          <p className="text-muted-foreground mb-6">Get instant quotes and replies via WhatsApp.</p>
          <a href={quoteUrl} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ variant: "default" }), "bg-[#25D366] text-white hover:bg-[#128C7E]")}>Chat on WhatsApp</a>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 text-center mt-8">
          <div className="p-6 border rounded-xl bg-muted/20">
            <Phone className="h-8 w-8 mx-auto mb-3 text-brand-yellow" />
            <div className="font-semibold">+91 98765 43210</div>
          </div>
          <div className="p-6 border rounded-xl bg-muted/20">
            <Mail className="h-8 w-8 mx-auto mb-3 text-brand-yellow" />
            <div className="font-semibold">inquiry@industrialsafetymart.com</div>
          </div>
          <div className="p-6 border rounded-xl bg-muted/20">
            <MapPin className="h-8 w-8 mx-auto mb-3 text-brand-yellow" />
            <div className="font-semibold">New Delhi, India</div>
          </div>
        </div>
      </div>
    </div>
  );
}
