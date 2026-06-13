"use client";

import Link from "next/link";
import { Share2, Star } from "lucide-react";
import { generateWhatsAppLink, WHATSAPP_BUTTON_CLASS } from "@/lib/whatsapp";
import { motion } from "framer-motion";
import SafeImage from "@/components/SafeImage";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { Product, getProductDisplayRating } from "@/lib/data";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  compact?: boolean;
};

export default function ProductCard({ product, compact = false }: ProductCardProps) {
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
      className="group/card card-pro relative flex h-full flex-col transition-all"
    >
      <Link
        href={productUrl}
        className="relative block aspect-[4/3] w-full shrink-0 overflow-hidden rounded-t-xl border-b border-pro bg-surface-subtle"
      >
        <SafeImage
          src={product.image}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
        />
      </Link>

      <div className={cn("flex min-h-0 flex-1 flex-col", compact ? "p-2.5" : "p-3 sm:p-4")}>
        {!compact && (
        <div className="mb-2 flex items-center gap-2">
          <span className="badge-brand gap-0.5 px-2 py-0.5 text-[10px] leading-none sm:text-xs">
            {rating}
            <Star className="h-2.5 w-2.5 fill-current" />
          </span>
          <span className="text-[10px] text-muted-foreground sm:text-xs">({reviews})</span>
        </div>
        )}

        {!compact && (
        <p className="mb-1.5 line-clamp-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground sm:text-xs">
          {product.brand}
        </p>
        )}

        <Link
          href={productUrl}
          className={cn("block", compact ? "mb-1.5" : "mb-2")}
        >
          <h3
            className={cn(
              "font-bold leading-snug text-brand-black transition-colors group-hover/card:text-brand-yellow dark:text-white",
              compact ? "line-clamp-2 text-[11px]" : "line-clamp-2 text-xs sm:text-sm"
            )}
          >
            {product.name}
          </h3>
        </Link>

        {product.price && (
          <div className={cn("flex flex-wrap items-baseline gap-x-1 gap-y-0.5", compact ? "mb-0" : "mb-3")}>
            <span className={cn("font-black text-brand-black", compact ? "text-xs" : "text-sm sm:text-base")}>{product.price}</span>
            {product.mrp && (
              <span className="text-[10px] text-muted-foreground line-through sm:text-xs">{product.mrp}</span>
            )}
            {product.discount && (
              <span className="text-[10px] font-bold text-brand-sale sm:text-xs">{product.discount}</span>
            )}
          </div>
        )}

        {!compact && (
        <div className="mt-auto flex gap-2 sm:gap-2.5 pt-1">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(WHATSAPP_BUTTON_CLASS, "min-w-0 flex-1 gap-1.5 rounded-lg px-2.5 py-2.5 text-[10px] leading-none sm:px-3 sm:py-2.5 sm:text-xs")}
          >
            <WhatsAppIcon className="h-4 w-4 shrink-0" />
            <span className="truncate">Inquiry Now</span>
          </a>

          <button
            type="button"
            onClick={handleShare}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-pro bg-white text-brand-black transition-colors hover:border-brand-yellow hover:bg-brand-yellow/10 sm:h-10 sm:w-10"
            aria-label="Share product"
          >
            <Share2 className="h-3.5 w-3.5" />
          </button>
        </div>
        )}
      </div>
    </motion.div>
  );
}
