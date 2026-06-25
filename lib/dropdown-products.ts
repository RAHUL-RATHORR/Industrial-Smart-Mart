import { categories, type Product } from "@/lib/data";
import { CATEGORY_DROPDOWN_ITEMS } from "@/lib/category-dropdown-items";
import type { CatalogProduct } from "@/lib/catalog/types";

const KNOWN_BRANDS = [
  "Allen Cooper",
  "3M",
  "Honeywell",
  "Mallmoon",
  "Neosafe",
  "Hillson",
  "Liberty",
  "Karam",
  "Bata",
  "Fausto",
  "Acme",
  "Hunter",
  "Digger",
  "Tiger",
  "Uvex",
  "Moldex",
  "Ador",
  "Esab",
  "Rilon",
  "Miller",
  "Venus",
  "SafeHawk",
];

const PRODUCT_IMAGES = [
  "1542291026-7eec264c27ff",
  "1621905251189-08b45d6a269e",
  "1504307651254-35680f356dfd",
  "1504917595217-d4dc5ebe6122",
  "1581092160562-40aa08e78837",
  "1531834685032-c34bf0d84c77",
  "1558618666-fcd25c85cd64",
  "1504148455328-c376907d081c",
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash + value.charCodeAt(i) * (i + 1)) | 0;
  }
  return Math.abs(hash);
}

function extractBrand(name: string) {
  for (const brand of KNOWN_BRANDS) {
    if (name.toLowerCase().startsWith(brand.toLowerCase())) {
      return brand;
    }
  }

  return name.split(" ")[0] ?? "Industrial";
}

function buildProductMeta(id: string) {
  const seed = hashString(id);

  return {
    rating: Math.round((4.5 + (seed % 5) * 0.1) * 10) / 10,
    reviews: 18 + (seed % 220),
  };
}

export function getDropdownProductId(categoryId: string, section: string, name: string) {
  return `nav-${slugify(categoryId)}-${slugify(section)}-${slugify(name)}`;
}

export function buildDropdownProducts(): CatalogProduct[] {
  const products: CatalogProduct[] = [];

  for (const [categoryId, sections] of Object.entries(CATEGORY_DROPDOWN_ITEMS)) {
    const category = categories.find((item) => item.id === categoryId);
    const categoryName = category?.name ?? "Industrial Product";

    for (const [section, items] of Object.entries(sections)) {
      items.forEach((name, index) => {
        const id = getDropdownProductId(categoryId, section, name);
        const brand = extractBrand(name);
        const meta = buildProductMeta(id);
        const imageId = PRODUCT_IMAGES[(hashString(id) + index) % PRODUCT_IMAGES.length];

        products.push({
          id,
          name,
          brand,
          categoryId,
          image: `https://images.unsplash.com/photo-${imageId}?q=80&w=500&auto=format&fit=crop`,
          description: `${name} is a trusted ${section.toLowerCase()} option in our ${categoryName.toLowerCase()} range. Built for daily industrial use with reliable safety performance.`,
          ...meta,
        });
      });
    }
  }

  return products;
}

let cachedDropdownProducts: CatalogProduct[] | null = null;

export function getAllDropdownProducts(): CatalogProduct[] {
  if (!cachedDropdownProducts) {
    cachedDropdownProducts = buildDropdownProducts();
  }
  return cachedDropdownProducts;
}

export function getDropdownProductById(id: string): CatalogProduct | undefined {
  return getAllDropdownProducts().find((product) => product.id === id);
}

export function getDropdownProductsForSection(categoryId: string, section: string): CatalogProduct[] {
  const items = CATEGORY_DROPDOWN_ITEMS[categoryId]?.[section] ?? [];
  return items
    .map((name) => getDropdownProductById(getDropdownProductId(categoryId, section, name)))
    .filter((product): product is CatalogProduct => Boolean(product));
}

export function getDropdownProductsForCategory(categoryId: string): CatalogProduct[] {
  return getAllDropdownProducts().filter((product) => product.categoryId === categoryId);
}

export function mergeCatalogProducts(existing: CatalogProduct[]): CatalogProduct[] {
  const merged = new Map<string, CatalogProduct>();

  for (const product of existing) {
    merged.set(product.id, product);
  }

  for (const product of getAllDropdownProducts()) {
    if (!merged.has(product.id)) {
      merged.set(product.id, product);
    }
  }

  return Array.from(merged.values());
}

export type { Product };
