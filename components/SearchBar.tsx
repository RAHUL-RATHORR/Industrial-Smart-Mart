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
}

export default function SearchBar({
  className = "",
  inputClassName = "",
  placeholder = "Search products, categories, brands...",
  defaultValue = "",
  onSearch,
  autoFocus = false,
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

  return (
    <form onSubmit={handleSubmit} className={cn("outline-none", className)}>
      <div className="relative group outline-none">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground transition-colors group-focus-within:text-brand-black" />
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
            "block w-full appearance-none rounded-full border border-pro bg-white py-2 pl-9 pr-4 text-sm shadow-none caret-brand-black transition-colors [-webkit-tap-highlight-color:transparent] focus:border-brand-black focus:bg-background focus:outline-none focus-visible:outline-none focus:shadow-none focus:ring-0 sm:py-2.5 sm:pl-10",
            inputClassName
          )}
          placeholder={placeholder}
        />
      </div>
    </form>
  );
}
