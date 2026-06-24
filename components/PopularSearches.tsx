import Link from "next/link";
import { popularSearchGroups } from "@/lib/popular-searches";
import { SECTION_TITLE_CLASS } from "@/lib/sections";

function SearchGroupCard({ category, items }: { category: string; items: string[] }) {
  return (
    <div className="search-group-card flex h-full flex-col rounded-2xl border border-pro bg-white p-4 shadow-pro-sm transition-all hover:border-brand-yellow/35 hover:shadow-pro">
      <div className="mb-3 inline-flex w-fit items-center rounded-md border border-brand-yellow/30 bg-brand-yellow/10 px-2.5 py-1">
        <h3 className="text-[10px] font-bold uppercase tracking-wider text-brand-black">
          {category}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Link
            key={item}
            href={`/products?q=${encodeURIComponent(item)}`}
            className="search-pill rounded-full border border-pro bg-section px-3 py-1.5 text-[11px] font-medium text-gray-700 transition-colors hover:border-brand-yellow hover:bg-brand-yellow/10 hover:text-brand-black"
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function PopularSearches() {
  return (
    <section className="border-t border-pro bg-page py-10 md:py-12">
      <div className="container mx-auto px-4 sm:px-5 lg:px-6">
        <div className="mb-8">
          <h2 className={SECTION_TITLE_CLASS}>Popular searches on Industrial Safety Mart</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {popularSearchGroups.map((group) => (
            <SearchGroupCard key={group.category} category={group.category} items={group.items} />
          ))}
        </div>
      </div>
    </section>
  );
}
