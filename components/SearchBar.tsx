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
}

export default function SearchBar({
  className = "",
  inputClassName = "",
  placeholder = "Search products, categories, brands...",
  defaultValue = "",
  onSearch,
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
    <form onSubmit={handleSubmit} className={className}>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground group-focus-within:text-brand-yellow transition-colors" />
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={cn(
            "block w-full border-2 border-muted bg-muted/50 py-2 sm:py-2.5 pl-9 sm:pl-10 pr-4 text-sm focus:border-brand-yellow focus:bg-background focus:outline-none focus:ring-0 transition-all rounded-full",
            inputClassName
          )}
          placeholder={placeholder}
        />
      </div>
    </form>
  );
}
