"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LayoutGrid } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCatalog } from "@/contexts/CatalogContext";
import CategoryNavIcon from "@/components/CategoryNavIcon";
import type { SubCategoryGroup } from "@/lib/data";
import { getDropdownItemsForSection } from "@/lib/category-dropdown-items";
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

function getDropdownSections(subgroups: SubCategoryGroup[]) {
  return subgroups.flatMap((group) => group.items);
}

function distributeDropdownSections<T>(sections: T[], columnCount = 5): T[][] {
  const columns = Array.from({ length: columnCount }, () => [] as T[]);
  sections.forEach((section, index) => {
    columns[index % columnCount].push(section);
  });
  return columns;
}

const DESKTOP_COMPACT_SCROLL_OFFSET = 96;
const DESKTOP_EXPAND_SCROLL_OFFSET = 48;

export default function CategoryNav({ visibility = "all" }: CategoryNavProps) {
  const { categories } = useCatalog();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isCompact, setIsCompact] = useState(false);
  const activeData = categories.find((category) => category.id === activeCategory);
  const isMobile = visibility === "mobile";

  useEffect(() => {
    if (isMobile) return;

    const onScroll = () => {
      const scrollY = window.scrollY;

      setIsCompact((prev) => {
        if (scrollY > DESKTOP_COMPACT_SCROLL_OFFSET) return true;
        if (scrollY < DESKTOP_EXPAND_SCROLL_OFFSET) return false;
        return prev;
      });

      if (scrollY > DESKTOP_COMPACT_SCROLL_OFFSET) {
        setActiveCategory(null);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

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
        !isMobile && "sticky top-[3.75rem] md:top-[4.5rem]",
        !isMobile && !isCompact && "min-h-[5.25rem] lg:min-h-[5.75rem]",
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
            "w-full transition-[padding] duration-300 ease-in-out",
            isMobile
              ? "grid grid-cols-3 gap-x-4 gap-y-5 pb-6"
              : cn(
                  "grid grid-cols-5 gap-x-3 gap-y-1 sm:grid-cols-6 sm:gap-x-4 md:grid-cols-9 md:gap-x-5 lg:gap-x-6",
                  isCompact ? "py-1.5" : "py-2"
                )
          )}
        >
          {(isMobile ? categories.slice(0, 5) : categories).map((category) => (
            <li
              key={category.id}
              className={cn(
                "relative isolate min-w-0 w-full",
                isMobile ? "overflow-hidden" : "overflow-visible"
              )}
              onMouseEnter={() => !isMobile && setActiveCategory(category.id)}
            >
              <Link
                href={category.href}
                title={category.name}
                className={cn(
                  "flex w-full min-w-0 max-w-full flex-col items-center group transition-all duration-300 ease-in-out",
                  isMobile ? "gap-2.5 overflow-hidden" : isCompact ? "gap-0 px-0.5 py-0.5" : "gap-1.5 px-0.5 py-1"
                )}
              >
                {isMobile ? (
                  <CategoryNavIcon
                    categoryId={category.id}
                    className="aspect-[5/4] w-full"
                  />
                ) : (
                  <div
                    className={cn(
                      "relative mx-auto flex shrink-0 items-center justify-center overflow-hidden transition-[height,opacity,transform] duration-300 ease-in-out",
                      isCompact
                        ? "h-0 w-12 opacity-0 -translate-y-1 pointer-events-none"
                        : "h-12 w-12 opacity-100 translate-y-0 sm:h-11 sm:w-11 lg:h-14 lg:w-14"
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-0 top-0 bottom-1 rounded-2xl bg-gradient-to-b from-[#f4b400]/28 via-[#f4b400]/10 to-transparent transition-all duration-200 ease-out",
                        activeCategory === category.id
                          ? "scale-100 opacity-100"
                          : "scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                      )}
                    />
                    <CategoryNavIcon
                      categoryId={category.id}
                      className="relative z-10 h-9 w-9 shrink-0 sm:h-10 sm:w-10 lg:h-11 lg:w-11"
                    />
                  </div>
                )}

                <span
                  className={cn(
                    "text-center transition-all",
                    isMobile
                      ? "block w-full max-w-full text-[11px] font-medium text-brand-black px-1 leading-tight line-clamp-2"
                      : "inline-block w-fit max-w-full whitespace-nowrap border-b border-transparent pb-0.5 text-[10px] sm:text-[11px] lg:text-xs font-semibold leading-none text-[#4a4a4a] group-hover:font-bold group-hover:border-[#f4b400] group-hover:text-[#1a1a1a]",
                    !isMobile && activeCategory === category.id && "font-bold border-[#f4b400] text-[#1a1a1a]"
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
              className="absolute left-0 right-0 top-full z-50 hidden border-t border-border bg-[#f7f7f7] shadow-pro-float lg:block"
            >
              <div className="container mx-auto px-4 sm:px-5 lg:px-6 py-6">
                <div className="grid grid-cols-2 gap-x-8 gap-y-0 md:grid-cols-3 lg:grid-cols-5">
                  {distributeDropdownSections(getDropdownSections(activeData.subgroups)).map((columnSections, columnIndex) => (
                    <div key={columnIndex} className="flex min-w-0 flex-col gap-6">
                      {columnSections.map((section) => (
                        <div key={section} className="min-w-0">
                          <Link
                            href={`${activeData.href}?q=${encodeURIComponent(section)}`}
                            className="mb-2 block text-xs font-bold leading-snug text-[#1a1a1a] transition-colors hover:text-brand-yellow"
                          >
                            {section}
                          </Link>
                          <ul className="space-y-1.5">
                            {getDropdownItemsForSection(activeData.id, section).map((item) => (
                              <li key={`${section}-${item}`}>
                                <Link
                                  href={`${activeData.href}?q=${encodeURIComponent(section)}`}
                                  className="block text-xs font-normal text-muted-foreground transition-colors hover:text-brand-black"
                                >
                                  {item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
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
