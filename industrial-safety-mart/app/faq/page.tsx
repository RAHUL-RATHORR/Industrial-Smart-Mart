import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black mb-4 text-brand-black dark:text-white">Frequently Asked Questions</h1>
        <p className="text-muted-foreground">Find answers to common questions about ordering and shipping.</p>
      </div>
      
      <Accordion className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>How do I get a quotation?</AccordionTrigger>
          <AccordionContent>
            You can get a quotation by clicking the "WhatsApp Inquiry" button on any product page. This will open a chat with our sales team who will provide you with the latest pricing based on your bulk requirements.
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
  );
}
