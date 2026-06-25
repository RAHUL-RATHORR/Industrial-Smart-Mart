"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import SafeImage from "@/components/SafeImage";
import { useCatalog } from "@/contexts/CatalogContext";
import type { Category, Product } from "@/lib/data";
import { cn } from "@/lib/utils";

type CategoryShowcaseProps = {
  category: Category;
  products: Product[];
};

export default function CategoryShowcase({ category, products }: CategoryShowcaseProps) {
  const { getCategoryBrands } = useCatalog();
  const brands = getCategoryBrands(category.id);
  const showcaseProducts = products.slice(0, 4);

  return (
    <div className="overflow-hidden rounded-2xl border border-[#e8e4dc] bg-white shadow-[0_2px_8px_rgba(26,26,26,0.06),0_8px_20px_rgba(26,26,26,0.08)]">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <aside className="rounded-t-2xl border-2 border-brand-yellow border-b-0 bg-[#fafafa] p-4 md:p-5 lg:col-span-3 lg:rounded-l-2xl lg:rounded-tr-none lg:border-b-2 lg:border-r-0 xl:col-span-3">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#666] md:text-xs">
            Top Brands
          </p>
          <p className="mb-4 text-xs text-muted-foreground md:text-sm">
            Genuine industrial brands for {category.name.toLowerCase()}
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-1 lg:gap-2.5">
            {brands.map((brand) => (
              <Link
                key={brand.name}
                href={`/products?q=${encodeURIComponent(brand.name)}`}
                className="flex h-14 items-center justify-center rounded-lg border border-[#e8e4dc] bg-white p-2 transition hover:border-[#f4b400] md:h-16"
              >
                <SafeImage
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-full max-w-full object-contain"
                />
              </Link>
            ))}
          </div>
        </aside>

        <div
          className={cn(
            "rounded-b-2xl border-2 border-brand-yellow border-t-0 p-4 md:p-5 lg:col-span-9 lg:rounded-r-2xl lg:rounded-bl-none lg:border-l-0 lg:border-t-2 xl:col-span-9",
            category.tileBg
          )}
        >
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-[#1a1a1a]">Featured Products</p>
            <Link
              href={category.href}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#f4b400] hover:underline md:text-sm"
            >
              View all
              <ChevronRight className="size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {showcaseProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
