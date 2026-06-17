"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, LayoutGrid } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCatalog } from "@/contexts/CatalogContext";
import CategoryNavIcon from "@/components/CategoryNavIcon";
import { cn } from "@/lib/utils";

type CategoryNavProps = {
  /** desktop = header bar (lg+), mobile = home page above Recently Viewed */
  visibility?: "all" | "desktop" | "mobile";
};

const CATEGORY_NAV_LABELS: Record<string, string> = {
  "cat-welding": "Welding Machine",
  "cat-disposable-ppe": "Disposable PPE",
  "cat-face-ear": "Face & Ear Safety",
};

function getCategoryNavLabel(categoryId: string, name: string) {
  return CATEGORY_NAV_LABELS[categoryId] ?? name;
}

export default function CategoryNav({ visibility = "all" }: CategoryNavProps) {
  const { categories } = useCatalog();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const activeData = categories.find((category) => category.id === activeCategory);
  const isMobile = visibility === "mobile";

  const visibilityClass =
    visibility === "desktop"
      ? "hidden lg:block"
      : visibility === "mobile"
        ? "lg:hidden"
        : "";

  return (
    <div
      className={cn(
        "relative w-full bg-[#fafafa] z-30",
        isMobile ? "border-b border-border shadow-pro-top" : "border-b border-border shadow-pro-bar",
        visibilityClass
      )}
      onMouseLeave={() => setActiveCategory(null)}
    >
      <div className="container mx-auto px-4 sm:px-5 lg:px-6">
        {isMobile && (
          <div className="flex items-center justify-between pt-5 pb-4">
            <h2 className="text-lg font-bold text-brand-black">Category Stores</h2>
            <Link href="/categories" className="text-sm font-semibold text-brand-yellow hover:underline">
              View all
            </Link>
          </div>
        )}

        <ul
          className={cn(
            "w-full",
            isMobile
              ? "grid grid-cols-3 gap-x-4 gap-y-5 pb-6"
              : "grid grid-cols-5 gap-x-3 gap-y-1 py-1 sm:grid-cols-6 sm:gap-x-4 md:grid-cols-9 md:gap-x-5 lg:gap-x-6"
          )}
        >
          {(isMobile ? categories.slice(0, 5) : categories).map((category) => (
            <li
              key={category.id}
              className="relative isolate min-w-0 w-full overflow-hidden"
              onMouseEnter={() => !isMobile && setActiveCategory(category.id)}
            >
              <Link
                href={category.href}
                title={category.name}
                className={cn(
                  "flex w-full min-w-0 max-w-full flex-col items-center overflow-hidden group transition-colors",
                  isMobile ? "gap-2.5" : "gap-1 border-b px-0.5 pb-0.5",
                  !isMobile &&
                    (activeCategory === category.id
                      ? "border-brand-yellow"
                      : "border-transparent hover:border-brand-yellow")
                )}
              >
                {isMobile ? (
                  <CategoryNavIcon
                    categoryId={category.id}
                    className="aspect-[5/4] w-full"
                  />
                ) : (
                  <CategoryNavIcon
                    categoryId={category.id}
                    className="h-10 w-10 shrink-0 sm:h-11 sm:w-11 lg:h-12 lg:w-12"
                  />
                )}

                <span
                  className={cn(
                    "block w-full max-w-full text-center transition-all",
                    isMobile
                      ? "text-[11px] font-medium text-brand-black px-1 leading-tight line-clamp-2"
                      : "truncate whitespace-nowrap text-[10px] sm:text-[11px] lg:text-xs font-semibold leading-none text-[#4a4a4a] group-hover:font-bold",
                    !isMobile && activeCategory === category.id && "font-bold"
                  )}
                >
                  {getCategoryNavLabel(category.id, category.name)}
                </span>
              </Link>
            </li>
          ))}

          {isMobile && (
            <li className="min-w-0">
              <Link href="/categories" className="flex flex-col items-center gap-2.5 group">
                <div className="flex aspect-[5/4] w-full items-center justify-center rounded-2xl bg-section">
                  <LayoutGrid className="h-10 w-10 text-muted-foreground/70" strokeWidth={1.25} />
                </div>
                <span className="text-[11px] font-semibold text-brand-yellow text-center leading-snug px-1">
                  View All Categories
                </span>
              </Link>
            </li>
          )}
        </ul>
      </div>

      {activeData?.subgroups && !isMobile && (
        <AnimatePresence>
          {activeCategory && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="absolute left-0 right-0 top-full z-50 hidden border-t border-border bg-white shadow-pro-float lg:block"
            >
              <div className="container mx-auto px-4 sm:px-5 lg:px-6 py-5">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
                  <div>
                    <h3 className="text-sm font-black text-brand-black">{activeData.name}</h3>
                    <p className="text-xs text-muted-foreground">{activeData.productCount} products available</p>
                  </div>
                  <Link
                    href={activeData.href}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-yellow hover:underline"
                  >
                    View all {activeData.name}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                  {activeData.subgroups.map((group) => (
                    <div key={group.title} className="flex min-w-0 flex-col space-y-2">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-brand-black">
                        {group.title}
                      </h4>
                      <ul className="space-y-1">
                        {group.items.map((item) => (
                          <li key={item}>
                            <Link
                              href={`${activeData.href}?q=${encodeURIComponent(item)}`}
                              className="block rounded-md px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-brand-yellow/10 hover:text-brand-black"
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
