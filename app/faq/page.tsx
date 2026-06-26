import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PageHeroBanner from "@/components/PageHeroBanner";
import { siteFaqs } from "@/lib/faq";

export default function FAQPage() {
  return (
    <div className="bg-muted/20 min-h-screen">
      <PageHeroBanner pageId="faq" />
      <div className="container mx-auto max-w-3xl px-4 py-16 sm:px-5 lg:px-6">
        <Accordion className="card-pro w-full rounded-2xl bg-white px-4 py-2 md:px-6">
          {siteFaqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id} className="border-pro">
              <AccordionTrigger className="py-4 text-sm font-semibold md:text-base">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
