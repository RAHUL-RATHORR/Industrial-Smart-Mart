"use client";

import Link from "next/link";
import { ArrowRight, Clock3, FolderOpen, Search, Sparkles, Tag } from "lucide-react";
import SafeImage from "@/components/SafeImage";
import type { SearchSuggestion, SearchSuggestionGroup } from "@/lib/search-suggestions";
import { cn } from "@/lib/utils";

function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const index = lowerText.indexOf(lowerQuery);
  if (index === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, index)}
      <mark className="rounded-sm bg-brand-yellow/35 px-0.5 font-semibold text-brand-black">
        {text.slice(index, index + query.length)}
      </mark>
      {text.slice(index + query.length)}
    </>
  );
}

function SuggestionIcon({ suggestion }: { suggestion: SearchSuggestion }) {
  if (suggestion.type === "product") {
    return (
      <SafeImage
        src={suggestion.image}
        alt=""
        className="h-11 w-11 shrink-0 rounded-lg border border-pro bg-white object-cover"
      />
    );
  }

  const iconClass = "h-4 w-4 text-brand-yellow";
  const wrapClass =
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-pro bg-brand-yellow/10";

  if (suggestion.type === "category") {
    return (
      <span className={wrapClass}>
        <FolderOpen className={iconClass} aria-hidden="true" />
      </span>
    );
  }

  if (suggestion.type === "brand") {
    return (
      <span className={wrapClass}>
        <Tag className={iconClass} aria-hidden="true" />
      </span>
    );
  }

  return (
    <span className={wrapClass}>
      {suggestion.id.startsWith("recent-") ? (
        <Clock3 className={iconClass} aria-hidden="true" />
      ) : suggestion.id.startsWith("popular-") ? (
        <Sparkles className={iconClass} aria-hidden="true" />
      ) : (
        <Search className={iconClass} aria-hidden="true" />
      )}
    </span>
  );
}

type SearchSuggestionsPanelProps = {
  id?: string;
  groups: SearchSuggestionGroup[];
  query: string;
  activeIndex: number;
  onSelect: (suggestion: SearchSuggestion) => void;
  onSeeAll: () => void;
  className?: string;
};

export default function SearchSuggestionsPanel({
  id,
  groups,
  query,
  activeIndex,
  onSelect,
  onSeeAll,
  className,
}: SearchSuggestionsPanelProps) {
  if (groups.length === 0) {
    return (
      <div
        id={id}
        className={cn(
          "absolute left-0 right-0 top-[calc(100%+0.5rem)] z-[60] overflow-hidden rounded-2xl border border-pro bg-white shadow-[0_20px_50px_rgba(26,26,26,0.14)]",
          className
        )}
      >
        <div className="px-4 py-8 text-center">
          <p className="text-sm font-semibold text-brand-black">No suggestions found</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Try another keyword or browse categories.
          </p>
          <button
            type="button"
            onClick={onSeeAll}
            className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-yellow hover:text-brand-black"
          >
            Search anyway
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }

  let runningIndex = -1;

  return (
    <div
      id={id}
      className={cn(
        "absolute left-0 right-0 top-[calc(100%+0.5rem)] z-[60] overflow-hidden rounded-2xl border border-pro bg-white shadow-[0_20px_50px_rgba(26,26,26,0.14)]",
        className
      )}
      role="listbox"
      aria-label="Search suggestions"
    >
      <div className="max-h-[min(70vh,420px)] overflow-y-auto overscroll-contain">
        {groups.map((group) => (
          <div key={group.title} className="border-b border-pro/70 last:border-b-0">
            <p className="sticky top-0 z-[1] bg-[#faf8f3] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
              {group.title}
            </p>
            <ul>
              {group.items.map((item) => {
                runningIndex += 1;
                const index = runningIndex;
                const isActive = index === activeIndex;

                return (
                  <li key={item.id} role="option" aria-selected={isActive}>
                    <Link
                      href={item.href}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={(event) => {
                        event.preventDefault();
                        onSelect(item);
                      }}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2.5 transition-colors",
                        isActive ? "bg-brand-yellow/15" : "hover:bg-brand-yellow/10"
                      )}
                    >
                      <SuggestionIcon suggestion={item} />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-brand-black">
                          <HighlightMatch text={item.label} query={query} />
                        </span>
                        {item.type === "product" ? (
                          <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                            {item.sublabel}
                          </span>
                        ) : null}
                        {item.type === "category" ? (
                          <span className="mt-0.5 block text-xs text-muted-foreground">Category</span>
                        ) : null}
                        {item.type === "brand" ? (
                          <span className="mt-0.5 block text-xs text-muted-foreground">Brand</span>
                        ) : null}
                      </span>
                      <ArrowRight
                        className={cn(
                          "h-4 w-4 shrink-0 text-muted-foreground/50",
                          isActive && "text-brand-black"
                        )}
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {query.trim() ? (
        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={onSeeAll}
          className="flex w-full items-center justify-between border-t border-pro bg-[#faf8f3] px-4 py-3 text-left text-sm font-bold text-brand-black transition-colors hover:bg-brand-yellow/10"
        >
          <span>
            See all results for &ldquo;{query.trim()}&rdquo;
          </span>
          <ArrowRight className="h-4 w-4 shrink-0 text-brand-yellow" aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
}
