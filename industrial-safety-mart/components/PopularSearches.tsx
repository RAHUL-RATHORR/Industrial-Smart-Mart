import Link from "next/link";
import { leftColumnGroups, rightColumnGroups, PopularSearchGroup } from "@/lib/popular-searches";

function SearchGroup({ group }: { group: PopularSearchGroup }) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-wide text-brand-black mb-2">
        {group.category}
      </h3>
      <p className="text-xs leading-6 text-gray-600">
        {group.items.map((item, index) => (
          <span key={item}>
            {index > 0 && <span className="text-gray-400"> | </span>}
            <Link
              href={`/products?q=${encodeURIComponent(item)}`}
              className="hover:text-brand-yellow hover:underline transition-colors"
            >
              {item}
            </Link>
          </span>
        ))}
      </p>
    </div>
  );
}

function SearchColumn({ groups }: { groups: PopularSearchGroup[] }) {
  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <SearchGroup key={group.category} group={group} />
      ))}
    </div>
  );
}

export default function PopularSearches() {
  return (
    <section className="border-t border-b bg-muted/30 py-10 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg md:text-xl font-bold text-brand-black mb-8">
          Popular searches on Industrial Safety Mart
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          <SearchColumn groups={leftColumnGroups} />
          <SearchColumn groups={rightColumnGroups} />
        </div>
      </div>
    </section>
  );
}
