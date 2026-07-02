import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { siteFaqs } from "@/lib/faq";
import { SECTION_TITLE_CLASS } from "@/lib/sections";
import { cn } from "@/lib/utils";

export default function HomeFaqSection() {
  return (
    <section className="w-full border-t border-pro bg-muted/20 py-8 md:py-10 lg:py-12">
      <div className="container mx-auto px-4 sm:px-5 lg:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 text-center md:mb-8">
            <h2 className={cn(SECTION_TITLE_CLASS, "mx-auto")}>Frequently Asked Questions</h2>
            <p className="mt-3 text-sm text-muted-foreground md:text-base">
              Quick answers about quotes, delivery, and bulk orders.
            </p>
          </div>

          <div className="card-pro rounded-2xl bg-white px-4 py-2 md:px-6 md:py-3">
            <Accordion className="w-full">
              {siteFaqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="py-4 text-sm font-semibold text-brand-black hover:text-brand-black md:text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <p className="mt-5 text-center text-sm text-muted-foreground">
            Still have questions?{" "}
            <Link href="/faq" className="font-semibold text-brand-black underline-offset-4 hover:underline">
              View all FAQs
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="font-semibold text-brand-black underline-offset-4 hover:underline">
              contact us
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
