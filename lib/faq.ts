export type SiteFaq = {
  id: string;
  question: string;
  answer: string;
};

export const siteFaqs: SiteFaq[] = [
  {
    id: "quotation",
    question: "How do I get a quotation?",
    answer:
      'Click "Get Quote" in the header or the WhatsApp button on any product. Share product name, quantity, and delivery city — our team replies with bulk pricing and GST invoice details.',
  },
  {
    id: "delivery",
    question: "Do you deliver PAN India?",
    answer:
      "Yes. We ship industrial safety products across India through trusted logistics partners. Delivery timelines depend on product availability and order size.",
  },
  {
    id: "genuine",
    question: "Are the products 100% genuine?",
    answer:
      "Yes. We source from authorized distributors and manufacturers. Products include official brand warranty and proper documentation for business buyers.",
  },
  {
    id: "bulk",
    question: "Do you offer bulk and corporate pricing?",
    answer:
      "Yes. Special rates are available for wholesale, factory, and corporate procurement. Contact us on WhatsApp or use the Get Quote form for volume discounts.",
  },
  {
    id: "moq",
    question: "What is the minimum order quantity?",
    answer:
      "MOQ varies by product and brand. For most safety items, small trial orders are accepted. For best pricing, bulk orders of 10+ units are recommended.",
  },
];
