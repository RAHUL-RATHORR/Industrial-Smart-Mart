import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import SafeImage from "@/components/SafeImage";
import { Category, Product, getCategoryBrands } from "@/lib/data";

type CategoryShowcaseProps = {
  category: Category;
  products: Product[];
};

export default function CategoryShowcase({ category, products }: CategoryShowcaseProps) {
  const brands = getCategoryBrands(category.id);
  const showcaseProducts = products.slice(0, 4);

  return (
    <div className="overflow-hidden rounded-2xl border border-[#e8e4dc] bg-white shadow-[0_2px_8px_rgba(26,26,26,0.06),0_8px_20px_rgba(26,26,26,0.08)]">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <aside className="border-b border-[#e8e4dc] bg-[#fff8e1] p-4 md:p-5 lg:col-span-3 lg:border-b-0 lg:border-r xl:col-span-3">
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
                className="group flex flex-col items-center gap-2 rounded-xl border border-[#e8e4dc]/60 bg-white p-3 text-center transition-all hover:border-[#f4b400] hover:shadow-sm lg:flex-row lg:items-center lg:gap-3 lg:p-2.5 lg:text-left"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#eee] bg-[#fafafa] p-2 lg:h-12 lg:w-12">
                  <SafeImage
                    src={brand.logo}
                    alt={brand.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </span>
                <span className="text-xs font-semibold leading-tight text-[#333] group-hover:text-[#f4b400] lg:text-sm">
                  {brand.name}
                </span>
                <ChevronRight className="hidden h-4 w-4 shrink-0 text-[#f4b400] lg:ml-auto lg:block" />
              </Link>
            ))}
          </div>
        </aside>

        <div className="p-4 md:p-5 lg:col-span-9 xl:col-span-9">
          <div className="mb-4 flex items-center justify-between gap-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#666] md:text-xs">
              Featured Products
            </p>
            <Link
              href={category.href}
              className="text-xs font-semibold text-[#f4b400] hover:underline md:text-sm"
            >
              View all products
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-4">
            {showcaseProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
