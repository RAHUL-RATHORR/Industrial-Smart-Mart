import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PageHeroBanner from "@/components/PageHeroBanner";

export default function FAQPage() {
  return (
    <div className="bg-muted/20 min-h-screen">
      <PageHeroBanner pageId="faq" />
      <div className="container mx-auto max-w-3xl px-4 py-16">
        <Accordion className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How do I get a quotation?</AccordionTrigger>
            <AccordionContent>
              You can get a quotation by clicking the &quot;WhatsApp Inquiry&quot; button on any product page. This will open a chat with our sales team who will provide you with the latest pricing based on your bulk requirements.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Do you deliver PAN India?</AccordionTrigger>
            <AccordionContent>
              Yes, we have logistics partners that enable us to deliver industrial goods to any pin code across India securely.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Are the products 100% genuine?</AccordionTrigger>
            <AccordionContent>
              Absolutely. We source our products directly from manufacturers or authorized distributors. All items come with an official brand warranty.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
