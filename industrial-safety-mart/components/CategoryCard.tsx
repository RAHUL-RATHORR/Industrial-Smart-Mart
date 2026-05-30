"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SafeImage from "@/components/SafeImage";
import { Category } from "@/lib/data";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={category.href} className="block group h-full">
      <motion.div
        whileHover={{ y: -5 }}
        className="flex flex-col items-center justify-center rounded-2xl bg-card border p-6 text-center shadow-sm transition-all hover:shadow-md hover:border-brand-yellow/50 h-full gap-4"
      >
        <div className="relative h-20 w-20 md:h-24 md:w-24 overflow-hidden rounded-full bg-muted/50 p-3 transition-transform group-hover:scale-110">
          <SafeImage
            src={category.image}
            alt={category.name}
            className="h-full w-full object-contain mix-blend-multiply dark:mix-blend-normal"
          />
        </div>
        <h3 className="text-sm md:text-base font-bold leading-tight text-foreground group-hover:text-brand-yellow transition-colors">
          {category.name}
        </h3>
      </motion.div>
    </Link>
  );
}
