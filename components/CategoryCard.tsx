"use client";

import Link from "next/link";
import CategoryNavIcon from "@/components/CategoryNavIcon";
import { Category } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={category.href} className="group block h-full">
      <div
        className={cn(
          "flex h-full flex-col items-center justify-center gap-4 rounded-2xl border border-pro bg-card p-6 text-center shadow-pro-sm",
          category.tileBg
        )}
      >
        <CategoryNavIcon
          categoryId={category.id}
          className="h-24 w-24 transition-transform duration-200 group-hover:scale-110 md:h-28 md:w-28"
        />
        <h3 className="text-sm font-bold leading-tight text-foreground md:text-base">{category.name}</h3>
      </div>
    </Link>
  );
}
