import Link from "next/link";
import { Sparkles } from "lucide-react";

function SeoLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="font-semibold text-[#c99700] hover:text-brand-black hover:underline">
      {children}
    </Link>
  );
}

function SeoBlock({ index, title, children }: { index: number; title: string; children: React.ReactNode }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-brand-yellow/30 bg-white shadow-pro">
      <div className="flex items-center gap-3 border-b border-pro bg-gradient-to-r from-brand-yellow/14 via-brand-yellow/6 to-transparent px-4 py-4 md:gap-4 md:px-5 md:py-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-yellow text-sm font-black text-brand-black">
          {index}
        </span>
        <h3 className="min-w-0 flex-1 text-[15px] font-bold leading-snug text-brand-black md:text-base lg:text-lg">
          {title}
        </h3>
      </div>
      <div className="px-4 py-5 text-sm leading-relaxed text-gray-700 md:px-5 md:py-6 md:text-[15px] md:leading-7">
        {children}
      </div>
    </article>
  );
}

function CategoryCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-pro bg-gradient-to-br from-page to-section/60 p-4 transition-colors hover:border-brand-yellow/35">
      <h4 className="mb-2 border-l-[3px] border-brand-yellow pl-2.5 text-sm font-bold text-brand-black">{title}</h4>
      <p className="text-sm leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}

function BenefitCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 rounded-xl border border-pro bg-page p-4 transition-colors hover:border-brand-yellow/30 hover:bg-brand-yellow/[0.04]">
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-yellow/20 text-xs font-black text-brand-black">
        ✓
      </span>
      <p className="text-sm leading-relaxed text-gray-700">{children}</p>
    </div>
  );
}

export default function SeoSection() {
  return (
    <section className="border-t border-pro bg-gradient-to-b from-section to-page py-10 md:py-14">
      <div className="container mx-auto px-4 sm:px-5 lg:px-6">
        <div className="mb-8 overflow-hidden rounded-2xl border border-pro bg-brand-black p-6 md:p-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand-yellow/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-yellow">
            <Sparkles className="h-3.5 w-3.5" />
            B2B Industrial Store
          </div>
          <h2 className="text-xl font-bold leading-tight text-white md:text-2xl lg:text-3xl">
            Industrial Safety Mart – Trusted E-commerce Online Shopping Site for Industrial Products
          </h2>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-white/80 md:text-[15px] md:leading-7">
            Industrial Safety Mart is an e-commerce company that caters to both B2B and B2C operations, dealing in{" "}
            <SeoLink href="/categories/tools">industrial tools</SeoLink>,{" "}
            <SeoLink href="/categories/electrical">electrical appliances</SeoLink>,{" "}
            <SeoLink href="/categories/office">office equipment</SeoLink>,{" "}
            <SeoLink href="/categories/safety">safety supplies</SeoLink>, and more. We are among India&apos;s leading B2B e-commerce platforms for industrial procurement, helping businesses source genuine products at competitive prices with PAN India delivery.
          </p>
        </div>

        <div className="space-y-4 md:space-y-5">
          <SeoBlock index={1} title="Some of our Top-Selling B2B Categories">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              <CategoryCard title="Home and Kitchen Appliances">
                Geysers, ACs, refrigerators, TVs, and other essential appliances for homes and offices.
              </CategoryCard>
              <CategoryCard title="Industrial Tools">
                <SeoLink href="/categories/tools">Power tools</SeoLink> like drills, grinders, saws, spanners, wrenches, and machine tools for manufacturing units.
              </CategoryCard>
              <CategoryCard title="Electrical Tools and Equipment">
                <SeoLink href="/categories/electrical">Wires</SeoLink>, circuit breakers, fuses, switches, generators, stabilizers, and industrial electrical supplies.
              </CategoryCard>
              <CategoryCard title="Safety Supplies">
                <SeoLink href="/categories/safety">Safety shoes</SeoLink>, helmets, workwear, gloves, fall protection, and fire safety equipment.
              </CategoryCard>
              <CategoryCard title="Office Supplies">
                <SeoLink href="/categories/office">Printers</SeoLink>, office chairs, barcode scanners, IT equipment, and workspace essentials.
              </CategoryCard>
              <CategoryCard title="Automotive Products">
                <SeoLink href="/categories/automotive">Compressor pumps</SeoLink>, vehicle kits, lights, helmets, and auto maintenance tools.
              </CategoryCard>
              <CategoryCard title="Agriculture and Gardening">
                <SeoLink href="/categories/agri">Chain saws</SeoLink>, hedge trimmers, sprayers, brush cutters, water pumps, and farming equipment.
              </CategoryCard>
            </div>
            <p className="mt-4 rounded-xl border border-brand-yellow/25 bg-brand-yellow/10 p-4 text-sm leading-relaxed text-gray-700">
              We also offer pumps, motors,{" "}
              <SeoLink href="/categories/medical">medical supplies</SeoLink>, LED lights,{" "}
              <SeoLink href="/categories/construction">construction materials</SeoLink>, and{" "}
              <SeoLink href="/categories/packaging">material handling</SeoLink> solutions for warehouses and logistics operations.
            </p>
          </SeoBlock>

          <SeoBlock index={2} title="Wide range of Products from Popular Brands & Labels">
            <div className="space-y-4">
              <p>
                Industrial Safety Mart hosts products from trusted brands like Bosch, DeWalt, Karam, Havells, Taparia, 3M, and many more. Whether you need tools for a factory floor, safety gear for a construction site, or office equipment for your workspace, we bring everything under one roof.
              </p>
              <p className="rounded-xl border border-pro bg-page p-4">
                Each category is curated to help buyers compare specifications, brands, and pricing before placing bulk orders. Explore our{" "}
                <SeoLink href="/categories">categories</SeoLink> or browse{" "}
                <SeoLink href="/products">all products</SeoLink> to find the right fit for your business.
              </p>
            </div>
          </SeoBlock>

          <SeoBlock index={3} title="We Have the Most Exclusive Offers and Benefits">
            <p className="mb-4 font-medium text-brand-black">Our mission is to keep every customer satisfied with value-driven industrial shopping.</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard>
                <strong>GST benefits:</strong> Special pricing and invoice support for GST-registered business buyers.
              </BenefitCard>
              <BenefitCard>
                <strong>Bulk order discounts:</strong> Get better rates on wholesale and repeat procurement orders.
              </BenefitCard>
              <BenefitCard>
                <strong>Instant WhatsApp quotes:</strong> Request pricing directly from any product page for fast response.
              </BenefitCard>
              <BenefitCard>
                <strong>Request for quote (RFQ):</strong> For out-of-stock or custom requirements, our team responds within 24 hours.
              </BenefitCard>
              <BenefitCard>
                <strong>Flexible payment options:</strong> Online payments, UPI, and business-friendly purchase workflows.
              </BenefitCard>
              <BenefitCard>
                <strong>Competitive pricing:</strong> Genuine products sourced from authorized distributors at the best market rates.
              </BenefitCard>
            </div>
          </SeoBlock>

          <SeoBlock index={4} title="Why do Industrial Shopping Online from Industrial Safety Mart?">
            <p className="rounded-xl border border-pro bg-page p-4 md:p-5">
              We serve SMEs, factories, contractors, and corporate buyers across India with a wide catalog of industrial and safety products. With PAN India delivery, genuine brand warranty, and dedicated WhatsApp support, Industrial Safety Mart makes B2B procurement simple, reliable, and cost-effective. Need help choosing the right product?{" "}
              <SeoLink href="/contact">Contact our team</SeoLink> or check our{" "}
              <SeoLink href="/faq">FAQs</SeoLink> for quick answers.
            </p>
          </SeoBlock>

          <SeoBlock index={5} title="Take Advantage of Exclusive Features at Industrial Safety Mart">
            <div className="space-y-4">
              <p>
                Track your inquiries, place bulk orders, and get personalized quotations through our WhatsApp-first buying experience. We support return and replacement policies on eligible products as per brand guidelines.
              </p>
              <p>
                From safety helmets and welding gear to power tools and electrical supplies, Industrial Safety Mart is built for professionals who need quality, speed, and trust in every order.
              </p>
              <p className="rounded-xl border border-brand-yellow/25 bg-brand-yellow/10 p-4">
                Start exploring today — browse categories, compare products, and get your quotation in minutes via WhatsApp. For enterprise buyers and long-term supply contracts, visit our{" "}
                <SeoLink href="/about">About Us</SeoLink> page or reach out through the{" "}
                <SeoLink href="/contact">Contact</SeoLink> page.
              </p>
            </div>
          </SeoBlock>
        </div>
      </div>
    </section>
  );
}
