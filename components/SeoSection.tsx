"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

function SeoLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="font-semibold text-brand-yellow hover:text-brand-black hover:underline">
      {children}
    </Link>
  );
}

type AccordionBlockProps = {
  id: string;
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
};

function AccordionBlock({ title, open, onToggle, children }: AccordionBlockProps) {
  return (
    <div
      className={cn(
        "seo-accordion-item overflow-hidden rounded-xl border border-pro bg-white transition-[border-color,box-shadow] duration-300 ease-out",
        open && "shadow-pro border-brand-yellow/30"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6"
        aria-expanded={open}
      >
        <span className="text-base font-bold text-brand-black md:text-lg">{title}</span>
        <span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-section text-brand-black transition-all duration-300 ease-out",
            open && "rotate-180 bg-brand-yellow/15"
          )}
        >
          <ChevronDown className="h-4 w-4" />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-pro px-5 pb-5 pt-4 text-sm leading-relaxed text-gray-700 md:px-6 md:text-[15px]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SeoSection() {
  const [openId, setOpenId] = useState<string | null>("categories");

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section className="border-t border-pro bg-section py-10 md:py-14">
      <div className="container mx-auto px-4 sm:px-5 lg:px-6">
        <div className="seo-intro-panel mb-8 rounded-2xl border border-pro bg-brand-black p-6 md:p-8">
          <h2 className="text-xl font-bold leading-tight text-white md:text-2xl lg:text-3xl">
            Industrial Safety Mart – Trusted E-commerce Online Shopping Site for Industrial Products
          </h2>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-white/80 md:text-[15px]">
            Industrial Safety Mart is an e-commerce company that caters to both B2B and B2C operations, dealing in{" "}
            <SeoLink href="/categories/tools">industrial tools</SeoLink>,{" "}
            <SeoLink href="/categories/electrical">electrical appliances</SeoLink>,{" "}
            <SeoLink href="/categories/office">office equipment</SeoLink>,{" "}
            <SeoLink href="/categories/safety">safety supplies</SeoLink>, and more. We are among India&apos;s leading B2B e-commerce platforms for industrial procurement, helping businesses source genuine products at competitive prices with PAN India delivery.
          </p>
        </div>

        <div className="space-y-3">
          <AccordionBlock
            id="categories"
            title="Some of our Top-Selling B2B Categories"
            open={openId === "categories"}
            onToggle={() => toggle("categories")}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="seo-category-card rounded-lg border-l-[3px] border-brand-yellow bg-section/80 p-4">
                <p>
                  <strong>Home and Kitchen Appliances:</strong> Geysers, ACs, refrigerators, TVs, and other essential appliances for homes and offices.
                </p>
              </div>
              <div className="seo-category-card rounded-lg border-l-[3px] border-brand-yellow bg-section/80 p-4">
                <p>
                  <strong>Industrial Tools:</strong>{" "}
                  <SeoLink href="/categories/tools">Power tools</SeoLink> like drills, grinders, saws, spanners, wrenches, and machine tools for manufacturing units.
                </p>
              </div>
              <div className="seo-category-card rounded-lg border-l-[3px] border-brand-yellow bg-section/80 p-4">
                <p>
                  <strong>Electrical Tools and Equipment:</strong>{" "}
                  <SeoLink href="/categories/electrical">Wires</SeoLink>, circuit breakers, fuses, switches, generators, stabilizers, and industrial electrical supplies.
                </p>
              </div>
              <div className="seo-category-card rounded-lg border-l-[3px] border-brand-yellow bg-section/80 p-4">
                <p>
                  <strong>Safety Supplies:</strong>{" "}
                  <SeoLink href="/categories/safety">Safety shoes</SeoLink>, helmets, workwear, gloves, fall protection, and fire safety equipment.
                </p>
              </div>
              <div className="seo-category-card rounded-lg border-l-[3px] border-brand-yellow bg-section/80 p-4">
                <p>
                  <strong>Office Supplies:</strong>{" "}
                  <SeoLink href="/categories/office">Printers</SeoLink>, office chairs, barcode scanners, IT equipment, and workspace essentials.
                </p>
              </div>
              <div className="seo-category-card rounded-lg border-l-[3px] border-brand-yellow bg-section/80 p-4">
                <p>
                  <strong>Automotive Products:</strong>{" "}
                  <SeoLink href="/categories/automotive">Compressor pumps</SeoLink>, vehicle kits, lights, helmets, and auto maintenance tools.
                </p>
              </div>
              <div className="seo-category-card rounded-lg border-l-[3px] border-brand-yellow bg-section/80 p-4 sm:col-span-2">
                <p>
                  <strong>Agriculture and Gardening:</strong>{" "}
                  <SeoLink href="/categories/agri">Chain saws</SeoLink>, hedge trimmers, sprayers, brush cutters, water pumps, and farming equipment.
                </p>
              </div>
            </div>
            <p className="mt-4 rounded-lg bg-brand-yellow/10 p-4 text-sm text-gray-700">
              We also offer pumps, motors,{" "}
              <SeoLink href="/categories/medical">medical supplies</SeoLink>, LED lights,{" "}
              <SeoLink href="/categories/construction">construction materials</SeoLink>, and{" "}
              <SeoLink href="/categories/packaging">material handling</SeoLink> solutions for warehouses and logistics operations.
            </p>
          </AccordionBlock>

          <AccordionBlock
            id="brands"
            title="Wide range of Products from Popular Brands & Labels"
            open={openId === "brands"}
            onToggle={() => toggle("brands")}
          >
            <p className="mb-3">
              Industrial Safety Mart hosts products from trusted brands like Bosch, DeWalt, Karam, Havells, Taparia, 3M, and many more. Whether you need tools for a factory floor, safety gear for a construction site, or office equipment for your workspace, we bring everything under one roof.
            </p>
            <p>
              Each category is curated to help buyers compare specifications, brands, and pricing before placing bulk orders. Explore our{" "}
              <SeoLink href="/categories">categories</SeoLink> or browse{" "}
              <SeoLink href="/products">all products</SeoLink> to find the right fit for your business.
            </p>
          </AccordionBlock>

          <AccordionBlock
            id="offers"
            title="We Have the Most Exclusive Offers and Benefits"
            open={openId === "offers"}
            onToggle={() => toggle("offers")}
          >
            <p className="mb-4">Our mission is to keep every customer satisfied with value-driven industrial shopping.</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex gap-3 rounded-lg border border-pro bg-page p-4">
                <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-brand-yellow" />
                <p>
                  <strong>GST benefits:</strong> Special pricing and invoice support for GST-registered business buyers.
                </p>
              </div>
              <div className="flex gap-3 rounded-lg border border-pro bg-page p-4">
                <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-brand-yellow" />
                <p>
                  <strong>Bulk order discounts:</strong> Get better rates on wholesale and repeat procurement orders.
                </p>
              </div>
              <div className="flex gap-3 rounded-lg border border-pro bg-page p-4">
                <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-brand-yellow" />
                <p>
                  <strong>Instant WhatsApp quotes:</strong> Request pricing directly from any product page for fast response.
                </p>
              </div>
              <div className="flex gap-3 rounded-lg border border-pro bg-page p-4">
                <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-brand-yellow" />
                <p>
                  <strong>Request for quote (RFQ):</strong> For out-of-stock or custom requirements, our team responds within 24 hours.
                </p>
              </div>
              <div className="flex gap-3 rounded-lg border border-pro bg-page p-4">
                <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-brand-yellow" />
                <p>
                  <strong>Flexible payment options:</strong> Online payments, UPI, and business-friendly purchase workflows.
                </p>
              </div>
              <div className="flex gap-3 rounded-lg border border-pro bg-page p-4">
                <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-brand-yellow" />
                <p>
                  <strong>Competitive pricing:</strong> Genuine products sourced from authorized distributors at the best market rates.
                </p>
              </div>
            </div>
          </AccordionBlock>

          <AccordionBlock
            id="why"
            title="Why do Industrial Shopping Online from Industrial Safety Mart?"
            open={openId === "why"}
            onToggle={() => toggle("why")}
          >
            <p>
              We serve SMEs, factories, contractors, and corporate buyers across India with a wide catalog of industrial and safety products. With PAN India delivery, genuine brand warranty, and dedicated WhatsApp support, Industrial Safety Mart makes B2B procurement simple, reliable, and cost-effective. Need help choosing the right product?{" "}
              <SeoLink href="/contact">Contact our team</SeoLink> or check our{" "}
              <SeoLink href="/faq">FAQs</SeoLink> for quick answers.
            </p>
          </AccordionBlock>

          <AccordionBlock
            id="features"
            title="Take Advantage of Exclusive Features at Industrial Safety Mart"
            open={openId === "features"}
            onToggle={() => toggle("features")}
          >
            <p className="mb-3">
              Track your inquiries, place bulk orders, and get personalized quotations through our WhatsApp-first buying experience. We support return and replacement policies on eligible products as per brand guidelines.
            </p>
            <p className="mb-3">
              From safety helmets and welding gear to power tools and electrical supplies, Industrial Safety Mart is built for professionals who need quality, speed, and trust in every order.
            </p>
            <p>
              Start exploring today — browse categories, compare products, and get your quotation in minutes via WhatsApp. For enterprise buyers and long-term supply contracts, visit our{" "}
              <SeoLink href="/about">About Us</SeoLink> page or reach out through the{" "}
              <SeoLink href="/contact">Contact</SeoLink> page.
            </p>
          </AccordionBlock>
        </div>
      </div>
    </section>
  );
}
