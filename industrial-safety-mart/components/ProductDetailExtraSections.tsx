"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ChevronRight as ChevronRightSmall,
  ShoppingCart,
  Star,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import SafeImage from "@/components/SafeImage";
import { Product } from "@/lib/data";
import {
  CompareAttribute,
  getComparisonAttributes,
  getInterestedItems,
  getProductFaqs,
  getProductReviews,
  getSimilarProducts,
  ProductFaq,
  ProductReview,
} from "@/lib/products";
import { generateWhatsAppLink } from "@/lib/whatsapp";

interface ProductDetailExtraSectionsProps {
  product: Product;
}

function RatingBar({ stars, percent }: { stars: number; percent: number }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-3">{stars}</span>
      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-[#0e8a2a] rounded-full" style={{ width: `${percent}%` }} />
      </div>
      <span className="w-8 text-right text-muted-foreground">{percent}%</span>
    </div>
  );
}

export default function ProductDetailExtraSections({ product }: ProductDetailExtraSectionsProps) {
  const compareRef = useRef<HTMLDivElement>(null);
  const similarProducts = getSimilarProducts(product, 4);
  const compareProducts = [product, ...similarProducts.slice(0, 4)];
  const compareAttributes = getComparisonAttributes(product, similarProducts.slice(0, 4));
  const reviews = getProductReviews(product);
  const faqs = getProductFaqs(product);
  const interestedItems = getInterestedItems(product);
  const avgRating = product.rating ?? 4.7;
  const totalReviews = product.reviews ?? 15;

  const scrollCompare = (direction: "left" | "right") => {
    if (!compareRef.current) return;
    compareRef.current.scrollBy({ left: direction === "left" ? -280 : 280, behavior: "smooth" });
  };

  return (
    <div className="space-y-6 mt-6">
      {/* Similar Products To Compare */}
      <section className="bg-white border rounded-xl p-4 sm:p-6">
        <h2 className="text-lg font-bold text-brand-black mb-4">Similar Products To Compare</h2>
        <div className="relative">
          <button
            type="button"
            onClick={() => scrollCompare("left")}
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 items-center justify-center rounded-full border bg-white shadow hover:bg-muted"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollCompare("right")}
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 items-center justify-center rounded-full border bg-white shadow hover:bg-muted"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div ref={compareRef} className="overflow-x-auto hide-scrollbar">
            <div className="min-w-[640px] sm:min-w-[800px]">
              <div
                className="grid border rounded-lg overflow-hidden"
                style={{ gridTemplateColumns: `140px repeat(${compareProducts.length}, minmax(140px, 1fr))` }}
              >
                <div className="bg-muted/30 p-3 border-r border-b font-semibold text-sm">Compare</div>
                {compareProducts.map((item, index) => (
                  <div
                    key={item.id}
                    className={`p-3 border-r border-b text-center space-y-2 ${index === 0 ? "bg-pink-50/80" : "bg-white"}`}
                  >
                    <Link href={`/products/${item.id}`}>
                      <SafeImage src={item.image} alt={item.name} className="w-16 h-16 mx-auto object-contain" />
                      <p className="text-[11px] font-medium line-clamp-2 mt-2 hover:text-brand-yellow">{item.name}</p>
                    </Link>
                    <p className="text-sm font-bold">{item.price ?? "On Request"}</p>
                    <a
                      href={generateWhatsAppLink(`I want to add ${item.name} to my quote.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1 w-full bg-[#e53935] text-white text-[10px] sm:text-xs font-bold py-1.5 rounded"
                    >
                      <ShoppingCart className="h-3 w-3" />
                      ADD TO CART
                    </a>
                  </div>
                ))}

                {compareAttributes.map((row) => (
                  <div key={row.label} className="contents">
                    <div className="p-3 border-r border-b bg-muted/20 text-xs font-semibold text-gray-600">
                      {row.label}
                    </div>
                    {row.values.map((value, index) => (
                      <div
                        key={`${row.label}-${index}`}
                        className={`p-3 border-r border-b text-xs text-center ${index === 0 ? "bg-pink-50/50" : ""}`}
                      >
                        {value}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews & Ratings */}
      <section className="bg-white border rounded-xl p-4 sm:p-6">
        <h2 className="text-lg font-bold text-brand-black mb-1">Reviews & Ratings</h2>
        <p className="text-xs text-muted-foreground mb-4 line-clamp-1">{product.name}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 pb-6 border-b">
          <div>
            <p className="text-4xl font-black text-brand-black">{avgRating} <Star className="inline h-6 w-6 fill-amber-400 text-amber-400" /></p>
            <p className="text-sm text-muted-foreground mt-1">
              Average Rating based on {totalReviews} ratings and {totalReviews} reviews
            </p>
          </div>
          <div className="space-y-1.5">
            <RatingBar stars={5} percent={72} />
            <RatingBar stars={4} percent={18} />
            <RatingBar stars={3} percent={6} />
            <RatingBar stars={2} percent={3} />
            <RatingBar stars={1} percent={1} />
          </div>
          <div className="flex md:justify-end items-start">
            <a
              href={generateWhatsAppLink(`I want to write a review for ${product.name}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border-2 border-[#e53935] text-[#e53935] font-bold px-4 py-2 text-sm hover:bg-[#e53935] hover:text-white transition-colors"
            >
              WRITE A REVIEW
            </a>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm font-semibold mb-2">Reviews with Images</p>
          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            {reviews.filter((r) => r.hasImage).map((review) => (
              <SafeImage key={review.id} src={product.image} alt="Review" className="w-14 h-14 rounded border object-cover shrink-0" />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {reviews.map((review: ProductReview) => (
            <div key={review.id} className="border-b pb-4 last:border-0">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="inline-flex items-center gap-0.5 bg-[#0e8a2a] text-white text-xs font-bold px-1.5 py-0.5 rounded">
                      {review.rating} <Star className="h-3 w-3 fill-current" />
                    </span>
                    {review.verified && (
                      <span className="text-[10px] font-semibold text-[#0e8a2a] border border-[#0e8a2a] px-1.5 py-0.5 rounded">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-bold">{review.title}</p>
                  <p className="text-xs text-muted-foreground mb-2">
                    {review.author} · {review.date}
                  </p>
                  <p className="text-sm text-gray-700">{review.text}</p>
                </div>
                <div className="flex sm:flex-col gap-2 text-xs shrink-0">
                  <button type="button" className="flex items-center gap-1 border rounded px-2 py-1 hover:bg-muted">
                    <ThumbsUp className="h-3 w-3" /> Helpful ({review.helpful})
                  </button>
                  <button type="button" className="flex items-center gap-1 border rounded px-2 py-1 hover:bg-muted">
                    <ThumbsDown className="h-3 w-3" /> ({review.notHelpful})
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link href="/faq" className="inline-block text-sm font-semibold text-blue-600 hover:underline mt-4">
          VIEW ALL REVIEWS &gt;
        </Link>
      </section>

      {/* FAQ */}
      <section className="bg-white border rounded-xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h2 className="text-lg font-bold text-brand-black">Frequently Asked Questions</h2>
          <a
            href={generateWhatsAppLink(`I have a question about ${product.name}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border-2 border-[#e53935] text-[#e53935] font-bold px-4 py-2 text-sm hover:bg-[#e53935] hover:text-white transition-colors text-center shrink-0"
          >
            ASK NOW
          </a>
        </div>
        <div className="space-y-4">
          {faqs.map((faq: ProductFaq, index) => (
            <div key={faq.question} className="border-b border-dashed pb-4 last:border-0">
              <p className="text-sm font-bold mb-1">Q{index + 1}. {faq.question}</p>
              <p className="text-sm text-gray-700"><span className="font-semibold">Ans:</span> {faq.answer}</p>
            </div>
          ))}
        </div>
        <Link href="/faq" className="inline-block text-sm font-semibold text-blue-600 hover:underline mt-4">
          VIEW ALL FAQS &gt;
        </Link>
      </section>

      {/* You Might Be Interested In */}
      <section className="bg-white border rounded-xl p-4 sm:p-6">
        <h2 className="text-lg font-bold text-brand-black mb-4">You Might Be Interested In</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {interestedItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="flex items-center gap-3 border rounded-lg p-3 hover:border-brand-yellow hover:shadow-sm transition-all group"
            >
              <SafeImage src={item.image} alt={item.title} className="w-12 h-12 object-contain shrink-0" />
              <p className="text-xs sm:text-sm font-medium line-clamp-2 flex-1 group-hover:text-brand-yellow">{item.title}</p>
              <ChevronRightSmall className="h-4 w-4 text-muted-foreground shrink-0" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
