"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SafeImage from "@/components/SafeImage";
import { Category } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={category.href} className="block group h-full">
      <motion.div
        whileHover={{ y: -5 }}
        className={cn(
          "card-pro flex h-full flex-col items-center justify-center gap-4 rounded-2xl p-6 text-center transition-colors",
          category.tileBg
        )}
      >
        <div
          className={cn(
            "relative h-24 w-24 overflow-hidden rounded-2xl border border-white/70 shadow-pro-sm transition-transform group-hover:scale-105 md:h-28 md:w-28",
            category.tileBg
          )}
        >
          <SafeImage
            src={category.image}
            alt={category.name}
            className="h-full w-full object-cover"
          />
        </div>
        <h3 className="text-sm md:text-base font-bold leading-tight text-foreground group-hover:text-brand-yellow transition-colors">
          {category.name}
        </h3>
      </motion.div>
    </Link>
  );
}
