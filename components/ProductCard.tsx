"use client";

import Link from "next/link";
import { ArrowRight, Share2, Star } from "lucide-react";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { motion } from "framer-motion";
import SafeImage from "@/components/SafeImage";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { Product, getProductDisplayRating } from "@/lib/data";

export default function ProductCard({ product }: { product: Product }) {
  const { rating, reviews } = getProductDisplayRating(product);
  const productUrl = `/products/${product.id}`;
  const inquiryMessage = `Hello, I am interested in this product: ${product.name} (Brand: ${product.brand}).`;
  const whatsappUrl = generateWhatsAppLink(inquiryMessage);

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const shareUrl = `${window.location.origin}${productUrl}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name} on Industrial Safety Mart`,
          url: shareUrl,
        });
      } catch (error) {
        console.log("Error sharing", error);
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard.");
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group/card relative flex h-full flex-col rounded-xl border bg-card shadow-sm transition-all hover:shadow-md"
    >
      <Link
        href={productUrl}
        className="relative flex aspect-[4/3] w-full shrink-0 items-center justify-center overflow-hidden rounded-t-xl border-b bg-white p-2 sm:p-3"
      >
        <SafeImage
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover/card:scale-105 dark:mix-blend-normal"
        />
      </Link>

      <div className="flex min-h-0 flex-1 flex-col p-2.5 sm:p-3">
        <div className="mb-1 flex items-center gap-1.5">
          <span className="inline-flex items-center gap-0.5 rounded bg-[#0e8a2a] px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">
            {rating}
            <Star className="h-2.5 w-2.5 fill-current" />
          </span>
          <span className="text-[10px] text-muted-foreground sm:text-xs">({reviews})</span>
        </div>

        <p className="mb-0.5 line-clamp-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground sm:text-xs">
          {product.brand}
        </p>

        <Link href={productUrl} className="mb-2 block flex-1">
          <h3 className="line-clamp-3 text-xs font-bold leading-snug text-brand-black transition-colors group-hover/card:text-brand-yellow sm:line-clamp-2 sm:text-sm dark:text-white">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto flex gap-1 sm:gap-1.5">
          <Link
            href={productUrl}
            className="flex min-w-0 flex-1 items-center justify-center gap-0.5 rounded-md bg-[#1a2744] px-1.5 py-2 text-[9px] font-semibold leading-none text-white transition-colors hover:bg-brand-black sm:gap-1 sm:px-2 sm:text-[10px]"
          >
            Details
            <ArrowRight className="h-3 w-3 shrink-0" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-w-0 flex-1 items-center justify-center gap-1 rounded-md bg-[#2aab9b] px-1.5 py-2 text-[9px] font-semibold leading-none text-white transition-colors hover:bg-[#229e90] sm:px-2 sm:text-[10px]"
          >
            <WhatsAppIcon className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">Inquiry Now</span>
          </a>

          <button
            type="button"
            onClick={handleShare}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[#25D366] bg-white text-[#25D366] transition-colors hover:bg-[#25D366]/10 sm:h-9 sm:w-9"
            aria-label="Share product"
          >
            <Share2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
