import "server-only";

import type { Product } from "./data";
import { readCatalog } from "./catalog/store";
import {
  getAllProducts as getStaticProducts,
  getProductById as getStaticProductById,
  searchProducts as searchStaticProducts,
} from "./products";

export function getAllProducts(): Product[] {
  const catalog = readCatalog();
  if (catalog.products.length > 0) {
    const unique = new Map<string, Product>();
    for (const product of catalog.products) {
      unique.set(product.id, product);
    }
    return Array.from(unique.values());
  }

  return getStaticProducts();
}

export function getProductById(id: string): Product | undefined {
  return getAllProducts().find((product) => product.id === id) ?? getStaticProductById(id);
}

export function searchProducts(query?: string): Product[] {
  const products = getAllProducts();
  if (!query?.trim()) return products;

  const term = query.trim().toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(term) ||
      product.brand.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term)
  );
}

export { getProductDetailExtras } from "./products";
