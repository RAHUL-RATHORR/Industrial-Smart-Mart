"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
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
  const [query, setQuery] = useState(defaultValue);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/products?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/products");
    }
    onSearch?.();
  };

  const isNavbar = variant === "navbar";

  return (
    <form onSubmit={handleSubmit} className={cn("outline-none", className)}>
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
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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
    </form>
  );
}
