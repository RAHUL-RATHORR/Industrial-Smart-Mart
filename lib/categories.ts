import "server-only";

import type { Category, Product } from "./data";
import { getProductsByCategory as getStaticProductsByCategory } from "./data";
import {
  getCategoryBySlugFromCatalog,
  getProductsForCategory,
  readCatalog,
} from "./catalog/store";
import { getDropdownProductsForSection, getAllDropdownProducts } from "./dropdown-products";

export function getCategorySlug(category: Category): string {
  return category.href.replace("/categories/", "");
}

export function getCategories(): Category[] {
  return readCatalog().categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return getCategoryBySlugFromCatalog(slug);
}

export function getCategoryProducts(categoryId: string, query?: string): Product[] {
  const category = getCategories().find((item) => item.id === categoryId);
  const count = Math.min(category?.productCount ?? 12, 12);
  const sectionNames =
    category?.subgroups?.flatMap((group) => group.items) ?? [];

  if (query?.trim()) {
    const term = query.trim();
    const matchedSection = sectionNames.find((item) => item.toLowerCase() === term.toLowerCase());

    if (matchedSection) {
      return getDropdownProductsForSection(categoryId, matchedSection);
    }

    const dropdownMatches = getAllDropdownProducts().filter(
      (product) =>
        product.categoryId === categoryId &&
        (product.name.toLowerCase().includes(term.toLowerCase()) ||
          product.brand.toLowerCase().includes(term.toLowerCase()))
    );

    if (dropdownMatches.length > 0) {
      return dropdownMatches;
    }
  }

  let products: Product[] = getProductsForCategory(categoryId).slice(0, count);

  if (products.length === 0) {
    products = getStaticProductsByCategory(categoryId, count);
  }

  if (query?.trim()) {
    const term = query.trim().toLowerCase();
    products = products.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.brand.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term)
    );
  }

  return products;
}

export type { Category, Product };
