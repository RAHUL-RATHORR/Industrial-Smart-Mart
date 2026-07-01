"use client";

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import SearchSuggestionsPanel from "@/components/SearchSuggestionsPanel";
import { useCatalog } from "@/contexts/CatalogContext";
import { getAllProducts, type Product } from "@/lib/products";
import { getAllDropdownProducts } from "@/lib/dropdown-products";
import {
  addRecentSearch,
  buildSearchSuggestions,
  flattenSuggestions,
  getRecentSearches,
  type SearchSuggestion,
} from "@/lib/search-suggestions";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  defaultValue?: string;
  onSearch?: () => void;
  autoFocus?: boolean;
  variant?: "default" | "navbar";
}

export default function SearchBar({
  className = "",
  inputClassName = "",
  placeholder = "Search products, categories, brands...",
  defaultValue = "",
  onSearch,
  autoFocus = false,
  variant = "default",
}: SearchBarProps) {
  const router = useRouter();
  const { products, categories, brands } = useCatalog();
  const rootRef = useRef<HTMLFormElement>(null);

  const [query, setQuery] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const searchableProducts = useMemo(() => {
    const merged = new Map<string, Product>();
    for (const product of [...getAllProducts(), ...getAllDropdownProducts(), ...products]) {
      merged.set(product.id, product);
    }
    return Array.from(merged.values());
  }, [products]);

  const suggestionGroups = useMemo(
    () =>
      buildSearchSuggestions(query, {
        products: searchableProducts,
        categories,
        brands,
        recentSearches,
      }),
    [query, searchableProducts, categories, brands, recentSearches]
  );

  const flatSuggestions = useMemo(() => flattenSuggestions(suggestionGroups), [suggestionGroups]);

  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  useEffect(() => {
    setActiveIndex(flatSuggestions.length > 0 ? 0 : -1);
  }, [flatSuggestions]);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [isOpen]);

  const navigateToQuery = useCallback(
    (value: string) => {
      const trimmed = value.trim();
      if (trimmed) {
        addRecentSearch(trimmed);
        setRecentSearches(getRecentSearches());
        router.push(`/products?q=${encodeURIComponent(trimmed)}`);
      } else {
        router.push("/products");
      }
      setIsOpen(false);
      onSearch?.();
    },
    [router, onSearch]
  );

  const navigateToSuggestion = useCallback(
    (suggestion: SearchSuggestion) => {
      if (suggestion.type === "keyword") {
        addRecentSearch(suggestion.label);
        setRecentSearches(getRecentSearches());
      } else if (suggestion.type === "brand") {
        addRecentSearch(suggestion.label);
        setRecentSearches(getRecentSearches());
      } else if (query.trim()) {
        addRecentSearch(query.trim());
        setRecentSearches(getRecentSearches());
      }

      router.push(suggestion.href);
      setIsOpen(false);
      onSearch?.();
    },
    [router, onSearch, query]
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (isOpen && activeIndex >= 0 && flatSuggestions[activeIndex]) {
      navigateToSuggestion(flatSuggestions[activeIndex]);
      return;
    }
    navigateToQuery(query);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
      setIsOpen(true);
      return;
    }

    if (event.key === "Escape") {
      setIsOpen(false);
      return;
    }

    if (!flatSuggestions.length) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => (current + 1) % flatSuggestions.length);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => (current - 1 + flatSuggestions.length) % flatSuggestions.length);
    }
  };

  const isNavbar = variant === "navbar";
  const showPanel = isOpen;

  return (
    <form ref={rootRef} onSubmit={handleSubmit} className={cn("relative outline-none", className)}>
      <div className="relative group outline-none">
        <div
          className={cn(
            "pointer-events-none absolute inset-y-0 left-0 flex items-center",
            isNavbar ? "pl-3.5" : "pl-3"
          )}
        >
          <Search
            className={cn(
              "text-muted-foreground transition-colors group-focus-within:text-brand-black",
              isNavbar ? "h-5 w-5" : "h-4 w-4 sm:h-5 sm:w-5"
            )}
          />
        </div>
        <input
          type="text"
          inputMode="search"
          enterKeyHint="search"
          autoComplete="off"
          role="combobox"
          aria-expanded={showPanel}
          aria-autocomplete="list"
          aria-controls="search-suggestions"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          autoFocus={autoFocus}
          className={cn(
            "block w-full appearance-none bg-white shadow-none caret-brand-black transition-all [-webkit-tap-highlight-color:transparent] focus:outline-none focus-visible:outline-none focus:shadow-none focus:ring-0",
            isNavbar
              ? "h-11 rounded-xl border-2 border-pro bg-[#faf8f3] py-2 pl-11 pr-[5.5rem] text-sm placeholder:text-muted-foreground focus:border-brand-yellow focus:bg-white sm:h-12 sm:pl-12 sm:pr-28 sm:text-[15px]"
              : "rounded-full border border-pro py-2 pl-9 pr-4 text-sm focus:border-brand-black focus:bg-background sm:py-2.5 sm:pl-10",
            inputClassName
          )}
          placeholder={placeholder}
        />
        {isNavbar ? (
          <button
            type="submit"
            className="absolute right-1 top-1 bottom-1 rounded-lg bg-brand-black px-3 text-xs font-bold text-white transition-colors hover:bg-brand-yellow hover:text-brand-black sm:right-1.5 sm:px-5 sm:text-sm"
          >
            Search
          </button>
        ) : null}
      </div>

      {showPanel ? (
        <SearchSuggestionsPanel
          id="search-suggestions"
          groups={suggestionGroups}
          query={query}
          activeIndex={activeIndex}
          onSelect={navigateToSuggestion}
          onSeeAll={() => navigateToQuery(query)}
        />
      ) : null}
    </form>
  );
}
