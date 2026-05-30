"use client";

import { useState } from "react";
import Link from "next/link";
import { categories } from "@/lib/data";
import SafeImage from "@/components/SafeImage";

export default function CategoryNav() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const activeData = categories.find((category) => category.id === activeCategory);

  return (
    <div
      className="relative w-full border-b bg-white z-30 shadow-sm"
      onMouseLeave={() => setActiveCategory(null)}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="overflow-x-auto hide-scrollbar xl:overflow-visible">
          <ul className="flex items-start gap-1 sm:gap-2 py-2 min-w-max xl:min-w-full xl:w-full xl:justify-between xl:gap-1">
            {categories.map((category) => (
              <li
                key={category.id}
                className={`relative shrink-0 w-[4.75rem] sm:w-[5.25rem] md:w-[5.75rem] xl:flex-1 xl:min-w-0 xl:max-w-[8.5rem] ${
                  activeCategory === category.id ? "text-brand-yellow" : ""
                }`}
                onMouseEnter={() => setActiveCategory(category.id)}
              >
                <Link
                  href={category.href}
                  className={`flex flex-col items-center gap-1 p-1.5 rounded-lg border-b-2 transition-colors group ${
                    activeCategory === category.id
                      ? "border-brand-yellow bg-muted/30"
                      : "border-transparent hover:border-brand-yellow hover:bg-muted/30"
                  }`}
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white flex items-center justify-center shadow-sm rounded-md border overflow-hidden shrink-0">
                    <SafeImage
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span
                    className={`text-[9px] sm:text-[10px] xl:text-[11px] font-bold text-center leading-tight line-clamp-2 transition-colors ${
                      activeCategory === category.id
                        ? "text-brand-yellow"
                        : "text-[var(--onyx-black,#333)] group-hover:text-brand-yellow"
                    }`}
                  >
                    {category.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {activeData?.subgroups && (
        <div className="hidden xl:block absolute left-0 right-0 top-full z-50 bg-white border-t shadow-xl">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {activeData.subgroups.map((group) => (
                <div key={group.title} className="flex flex-col space-y-2 min-w-0">
                  <h3 className="text-xs font-bold text-brand-black uppercase tracking-wider border-b pb-2">
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
