"use client";

import Link from "next/link";
import { MessageCircle, Share2, Star } from "lucide-react";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { motion } from "framer-motion";
import SafeImage from "@/components/SafeImage";
import { Product } from "@/lib/data";

export default function ProductCard({ product }: { product: Product }) {
  const inquiryMessage = `Hello, I am interested in this product: ${product.name} (Brand: ${product.brand}).`;
  const whatsappUrl = generateWhatsAppLink(inquiryMessage);

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name} on Industrial Safety Mart`,
          url: `${window.location.origin}/products/${product.id}`,
        });
      } catch (error) {
        console.log("Error sharing", error);
      }
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  return (
    <Link href={`/products/${product.id}`} className="block h-full group/card">
      <motion.div
        whileHover={{ y: -4 }}
        className="relative flex flex-col overflow-hidden rounded-xl bg-card border shadow-sm transition-all hover:shadow-md h-full"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-white p-2 sm:p-3 flex items-center justify-center border-b">
          <SafeImage
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-500 group-hover/card:scale-105"
          />
          <button
            onClick={handleShare}
            className="absolute right-2 top-2 rounded-full bg-background/80 p-1.5 text-muted-foreground backdrop-blur-sm transition-all hover:bg-background hover:text-foreground opacity-0 group-hover/card:opacity-100 focus:opacity-100 z-10"
            aria-label="Share product"
          >
            <Share2 className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="flex flex-1 flex-col p-2.5 sm:p-3">
          {product.rating && (
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className="flex items-center bg-[#0e8a2a] text-white px-1.5 py-0.5 rounded text-[10px] font-bold leading-none">
                {product.rating} <Star className="h-2.5 w-2.5 ml-0.5 fill-current" />
              </div>
              <span className="text-[10px] sm:text-xs text-muted-foreground truncate">({product.reviews})</span>
            </div>
          )}

          <div className="mb-0.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-muted-foreground line-clamp-1">
            {product.brand}
          </div>

          <h3 className="mb-1.5 line-clamp-2 text-xs sm:text-sm font-semibold leading-snug text-brand-black dark:text-white group-hover/card:text-brand-yellow transition-colors min-h-[2.5rem]">
            {product.name}
          </h3>

          {product.price && (
            <div className="mb-2 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span className="text-base sm:text-lg font-bold text-brand-black dark:text-white">{product.price}</span>
              {product.mrp && product.discount && (
                <>
                  <span className="text-[10px] sm:text-xs line-through text-muted-foreground">{product.mrp}</span>
                  <span className="text-[10px] sm:text-xs font-semibold text-[#0e8a2a]">{product.discount}</span>
                </>
              )}
            </div>
          )}

          <div className="mt-auto pt-1">
            <span
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(whatsappUrl, "_blank", "noopener,noreferrer");
              }}
              className="inline-flex w-full items-center justify-center gap-1 rounded-md bg-[#25D366] px-2 py-2 text-white hover:bg-[#128C7E] shadow-sm font-semibold text-[10px] sm:text-xs leading-none transition-all cursor-pointer"
            >
              <MessageCircle className="h-3.5 w-3.5 shrink-0" />
              <span>WhatsApp Inquiry</span>
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
