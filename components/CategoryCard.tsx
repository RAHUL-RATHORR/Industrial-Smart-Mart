"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import CategoryNavIcon from "@/components/CategoryNavIcon";
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
        <CategoryNavIcon
          categoryId={category.id}
          className="h-24 w-24 transition-transform group-hover:scale-105 md:h-28 md:w-28"
        />
        <h3 className="text-sm md:text-base font-bold leading-tight text-foreground group-hover:text-brand-yellow transition-colors">
          {category.name}
        </h3>
      </motion.div>
    </Link>
  );
}
