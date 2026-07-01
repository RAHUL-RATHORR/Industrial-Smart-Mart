import type { Category, Product } from "@/lib/data";
import type { CatalogBrand } from "@/lib/catalog/types";
import { popularSearchGroups } from "@/lib/popular-searches";

type SearchableProduct = Product & { categoryId?: string };

export type SearchSuggestion =
  | {
      type: "product";
      id: string;
      label: string;
      sublabel: string;
      href: string;
      image: string;
      score: number;
    }
  | {
      type: "category";
      id: string;
      label: string;
      href: string;
      score: number;
    }
  | {
      type: "brand";
      id: string;
      label: string;
      href: string;
      score: number;
    }
  | {
      type: "keyword";
      id: string;
      label: string;
      href: string;
      score: number;
    };

export type SearchSuggestionGroup = {
  title: string;
  items: SearchSuggestion[];
};

const RECENT_SEARCHES_KEY = "ism-recent-searches";
const MAX_RECENT = 6;

const popularKeywords = popularSearchGroups.flatMap((group) => group.items);

function matchScore(text: string, term: string): number {
  const value = text.toLowerCase();
  const query = term.toLowerCase();
  if (!query) return 0;
  if (value === query) return 100;
  if (value.startsWith(query)) return 80;
  const wordStart = value.split(/\s+/).some((word) => word.startsWith(query));
  if (wordStart) return 60;
  if (value.includes(query)) return 40;
  return 0;
}

function uniqueByLabel<T extends { label: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = item.label.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function getRecentSearches(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(RECENT_SEARCHES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string").slice(0, MAX_RECENT)
      : [];
  } catch {
    return [];
  }
}

export function addRecentSearch(query: string) {
  if (typeof window === "undefined") return;
  const trimmed = query.trim();
  if (!trimmed) return;
  const next = [trimmed, ...getRecentSearches().filter((item) => item.toLowerCase() !== trimmed.toLowerCase())].slice(
    0,
    MAX_RECENT
  );
  window.localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(next));
}

export function buildSearchSuggestions(
  query: string,
  data: {
    products: SearchableProduct[];
    categories: Category[];
    brands: CatalogBrand[];
    recentSearches?: string[];
  }
): SearchSuggestionGroup[] {
  const term = query.trim();
  const recent = data.recentSearches ?? [];

  if (!term) {
    const groups: SearchSuggestionGroup[] = [];

    if (recent.length > 0) {
      groups.push({
        title: "Recent searches",
        items: recent.map((label, index) => ({
          type: "keyword" as const,
          id: `recent-${index}-${label}`,
          label,
          href: `/products?q=${encodeURIComponent(label)}`,
          score: 100 - index,
        })),
      });
    }

    groups.push({
      title: "Popular searches",
      items: popularKeywords.slice(0, 8).map((label, index) => ({
        type: "keyword" as const,
        id: `popular-${index}-${label}`,
        label,
        href: `/products?q=${encodeURIComponent(label)}`,
        score: 50 - index,
      })),
    });

    return groups;
  }

  const productSuggestions = uniqueByLabel(
    data.products
      .map((product) => {
        const nameScore = matchScore(product.name, term);
        const brandScore = matchScore(product.brand, term);
        const descScore = matchScore(product.description, term) * 0.5;
        const score = Math.max(nameScore, brandScore, descScore);
        if (!score) return null;

        const category = data.categories.find((item) => item.id === product.categoryId);
        return {
          type: "product" as const,
          id: product.id,
          label: product.name,
          sublabel: [product.brand, category?.name].filter(Boolean).join(" · "),
          href: `/products/${product.id}`,
          image: product.image,
          score: score + (nameScore >= 80 ? 10 : 0),
        };
      })
      .filter((item): item is NonNullable<typeof item> => Boolean(item))
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
  );

  const categorySuggestions = uniqueByLabel(
    data.categories
      .map((category) => {
        const score = Math.max(matchScore(category.name, term), matchScore(category.href, term));
        if (!score) return null;
        return {
          type: "category" as const,
          id: category.id,
          label: category.name,
          href: category.href,
          score,
        };
      })
      .filter((item): item is NonNullable<typeof item> => Boolean(item))
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
  );

  const brandSuggestions = uniqueByLabel(
    data.brands
      .map((brand) => {
        const score = matchScore(brand.name, term);
        if (!score) return null;
        return {
          type: "brand" as const,
          id: brand.id,
          label: brand.name,
          href: `/products?q=${encodeURIComponent(brand.name)}`,
          score,
        };
      })
      .filter((item): item is NonNullable<typeof item> => Boolean(item))
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
  );

  const keywordSuggestions = uniqueByLabel(
    popularKeywords
      .map((label) => {
        const score = matchScore(label, term);
        if (!score) return null;
        return {
          type: "keyword" as const,
          id: `keyword-${label}`,
          label,
          href: `/products?q=${encodeURIComponent(label)}`,
          score,
        };
      })
      .filter((item): item is NonNullable<typeof item> => Boolean(item))
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
  );

  const groups: SearchSuggestionGroup[] = [];

  if (productSuggestions.length > 0) {
    groups.push({ title: "Products", items: productSuggestions });
  }
  if (categorySuggestions.length > 0) {
    groups.push({ title: "Categories", items: categorySuggestions });
  }
  if (brandSuggestions.length > 0) {
    groups.push({ title: "Brands", items: brandSuggestions });
  }
  if (keywordSuggestions.length > 0) {
    groups.push({ title: "Suggested searches", items: keywordSuggestions });
  }

  return groups;
}

export function flattenSuggestions(groups: SearchSuggestionGroup[]): SearchSuggestion[] {
  return groups.flatMap((group) => group.items);
}
