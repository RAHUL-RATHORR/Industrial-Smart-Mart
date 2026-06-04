import Link from "next/link";

function SeoLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="link-brand">
      {children}
    </Link>
  );
}

export default function SeoSection() {
  return (
    <section className="border-t bg-white py-12 md:py-16">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-sm md:text-[15px] leading-relaxed text-gray-700 space-y-8">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-brand-black mb-4">
            Industrial Safety Mart – Trusted E-commerce Online Shopping Site for Industrial Products
          </h2>
          <p>
            Industrial Safety Mart is an e-commerce company that caters to both B2B and B2C operations, dealing in{" "}
            <SeoLink href="/categories/tools">industrial tools</SeoLink>,{" "}
            <SeoLink href="/categories/electrical">electrical appliances</SeoLink>,{" "}
            <SeoLink href="/categories/office">office equipment</SeoLink>,{" "}
            <SeoLink href="/categories/safety">safety supplies</SeoLink>, and more. We are among India&apos;s leading B2B e-commerce platforms for industrial procurement, helping businesses source genuine products at competitive prices with PAN India delivery.
          </p>
        </div>

        <div>
          <h3 className="text-lg md:text-xl font-bold text-brand-black mb-4">Some of our Top-Selling B2B Categories</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>
              <strong>Home and Kitchen Appliances:</strong> Geysers, ACs, refrigerators, TVs, and other essential appliances for homes and offices.
            </li>
            <li>
              <strong>Industrial Tools:</strong>{" "}
              <SeoLink href="/categories/tools">Power tools</SeoLink> like drills, grinders, saws, spanners, wrenches, and machine tools for manufacturing units.
            </li>
            <li>
              <strong>Electrical Tools and Equipment:</strong>{" "}
              <SeoLink href="/categories/electrical">Wires</SeoLink>, circuit breakers, fuses, switches, generators, stabilizers, and industrial electrical supplies.
            </li>
            <li>
              <strong>Safety Supplies:</strong>{" "}
              <SeoLink href="/categories/safety">Safety shoes</SeoLink>, helmets, workwear, gloves, fall protection, and fire safety equipment.
            </li>
            <li>
              <strong>Office Supplies:</strong>{" "}
              <SeoLink href="/categories/office">Printers</SeoLink>, office chairs, barcode scanners, IT equipment, and workspace essentials.
            </li>
            <li>
              <strong>Automotive Products:</strong>{" "}
              <SeoLink href="/categories/automotive">Compressor pumps</SeoLink>, vehicle kits, lights, helmets, and auto maintenance tools.
            </li>
            <li>
              <strong>Agriculture and Gardening:</strong>{" "}
              <SeoLink href="/categories/agri">Chain saws</SeoLink>, hedge trimmers, sprayers, brush cutters, water pumps, and farming equipment.
            </li>
          </ul>
          <p className="mt-4">
            We also offer pumps, motors,{" "}
            <SeoLink href="/categories/medical">medical supplies</SeoLink>, LED lights,{" "}
            <SeoLink href="/categories/construction">construction materials</SeoLink>, and{" "}
            <SeoLink href="/categories/packaging">material handling</SeoLink> solutions for warehouses and logistics operations.
          </p>
        </div>

        <div>
          <h3 className="text-lg md:text-xl font-bold text-brand-black mb-4">Wide range of Products from Popular Brands &amp; Labels</h3>
          <p className="mb-3">
            Industrial Safety Mart hosts products from trusted brands like Bosch, DeWalt, Karam, Havells, Taparia, 3M, and many more. Whether you need tools for a factory floor, safety gear for a construction site, or office equipment for your workspace, we bring everything under one roof.
          </p>
          <p>
            Each category is curated to help buyers compare specifications, brands, and pricing before placing bulk orders. Explore our{" "}
            <SeoLink href="/categories">categories</SeoLink> or browse{" "}
            <SeoLink href="/products">all products</SeoLink> to find the right fit for your business.
          </p>
        </div>

        <div>
          <h3 className="text-lg md:text-xl font-bold text-brand-black mb-4">We Have the Most Exclusive Offers and Benefits</h3>
          <p className="mb-4">Our mission is to keep every customer satisfied with value-driven industrial shopping.</p>
          <ul className="list-disc pl-5 space-y-3">
            <li>
              <strong>GST benefits:</strong> Special pricing and invoice support for GST-registered business buyers.
            </li>
            <li>
              <strong>Bulk order discounts:</strong> Get better rates on wholesale and repeat procurement orders.
            </li>
            <li>
              <strong>Instant WhatsApp quotes:</strong> Request pricing directly from any product page for fast response.
            </li>
            <li>
              <strong>Request for quote (RFQ):</strong> For out-of-stock or custom requirements, our team responds within 24 hours.
            </li>
            <li>
              <strong>Flexible payment options:</strong> Online payments, UPI, and business-friendly purchase workflows.
            </li>
            <li>
              <strong>Competitive pricing:</strong> Genuine products sourced from authorized distributors at the best market rates.
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg md:text-xl font-bold text-brand-black mb-4">Why do Industrial Shopping Online from Industrial Safety Mart?</h3>
          <p>
            We serve SMEs, factories, contractors, and corporate buyers across India with a wide catalog of industrial and safety products. With PAN India delivery, genuine brand warranty, and dedicated WhatsApp support, Industrial Safety Mart makes B2B procurement simple, reliable, and cost-effective. Need help choosing the right product?{" "}
            <SeoLink href="/contact">Contact our team</SeoLink> or check our{" "}
            <SeoLink href="/faq">FAQs</SeoLink> for quick answers.
          </p>
        </div>

        <div>
          <h3 className="text-lg md:text-xl font-bold text-brand-black mb-4">Take Advantage of Exclusive Features at Industrial Safety Mart</h3>
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
        </div>
      </div>
    </section>
  );
}
