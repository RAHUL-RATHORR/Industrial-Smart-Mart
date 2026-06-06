"use client";

import { useState } from "react";
import Link from "next/link";
import { LayoutGrid } from "lucide-react";
import { categories } from "@/lib/data";
import SafeImage from "@/components/SafeImage";
import { cn } from "@/lib/utils";

type CategoryNavProps = {
  /** desktop = header bar (lg+), mobile = home page above Recently Viewed */
  visibility?: "all" | "desktop" | "mobile";
};

export default function CategoryNav({ visibility = "all" }: CategoryNavProps) {
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
        "relative w-full bg-white z-30",
        isMobile ? "border-b border-pro" : "border-b border-pro shadow-pro-sm",
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
              : "grid grid-cols-5 gap-x-1 gap-y-2 py-2 sm:grid-cols-6 md:grid-cols-9 lg:flex lg:items-start lg:justify-between lg:gap-1"
          )}
        >
          {(isMobile ? categories.slice(0, 5) : categories).map((category) => (
            <li
              key={category.id}
              className={cn(
                "relative min-w-0",
                !isMobile && "lg:flex-1 lg:max-w-[5.5rem] xl:max-w-[6.5rem]",
                !isMobile && activeCategory === category.id ? "text-brand-yellow" : ""
              )}
              onMouseEnter={() => !isMobile && setActiveCategory(category.id)}
            >
              <Link
                href={category.href}
                className={cn(
                  "flex flex-col items-center group transition-colors",
                  isMobile ? "gap-2.5" : "gap-0.5 p-1 lg:p-1.5 rounded-lg border-b-2",
                  !isMobile &&
                    (activeCategory === category.id
                      ? "border-brand-yellow bg-muted/30"
                      : "border-transparent hover:border-brand-yellow hover:bg-muted/30")
                )}
              >
                {isMobile ? (
                  <div
                    className={cn(
                      "relative w-full aspect-[5/4] overflow-hidden rounded-2xl border border-white/60 shadow-pro-sm",
                      category.tileBg
                    )}
                  >
                    <SafeImage
                      src={category.image}
                      alt={category.name}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-pro shadow-pro-sm sm:h-12 sm:w-12 lg:h-14 lg:w-14",
                      category.tileBg
                    )}
                  >
                    <SafeImage
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <span
                  className={cn(
                    "font-medium text-center leading-snug line-clamp-2 transition-colors",
                    isMobile
                      ? "text-[11px] text-brand-black px-1"
                      : "text-[9px] sm:text-[10px] lg:text-[11px] font-bold",
                    !isMobile &&
                      (activeCategory === category.id
                        ? "text-brand-yellow"
                        : "text-[var(--onyx-black,#333)] group-hover:text-brand-yellow")
                  )}
                >
                  {category.name}
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
        <div className="absolute left-0 right-0 top-full z-50 hidden border-t border-pro bg-white shadow-pro lg:block">
          <div className="container mx-auto px-4 sm:px-5 lg:px-6 py-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {activeData.subgroups.map((group) => (
                <div key={group.title} className="flex flex-col space-y-2 min-w-0">
                  <h3 className="border-b border-pro pb-2 text-xs font-bold uppercase tracking-wider text-brand-black">
                    {group.title}
                  </h3>
                  <ul className="space-y-1.5">
                    {group.items.map((item) => (
                      <li key={item}>
                        <Link
                          href={`${activeData.href}?q=${encodeURIComponent(item)}`}
                          className="text-xs text-muted-foreground hover:text-brand-yellow transition-colors block"
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
        </div>
      )}
    </div>
  );
}
