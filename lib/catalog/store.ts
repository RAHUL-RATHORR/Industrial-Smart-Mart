import "server-only";

import fs from "fs";
import path from "path";
import type { Category, HeroOfferBanner } from "@/lib/data";
import type { BlogPost } from "@/lib/blog";
import { buildSeedCatalog } from "./seed";
import type {
  Catalog,
  CatalogBrand,
  CatalogProduct,
  PageBanner,
  PromoBanner,
} from "./types";
import { mergeCatalogProducts } from "@/lib/dropdown-products";

const DATA_DIR = path.join(process.cwd(), "data");
const CATALOG_PATH = path.join(DATA_DIR, "catalog.json");
const PUBLIC_CATALOG_PATH = path.join(process.cwd(), "public", "catalog.json");

let cachedCatalog: Catalog | null = null;

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function canWriteCatalogFiles() {
  if (process.env.VERCEL === "1") return false;

  try {
    ensureDataDir();
    const probe = path.join(DATA_DIR, ".catalog-write-probe");
    fs.writeFileSync(probe, "ok", "utf-8");
    fs.unlinkSync(probe);
    return true;
  } catch {
    return false;
  }
}

function writePublicMirror(catalog: Catalog) {
  if (!canWriteCatalogFiles()) return;
  fs.writeFileSync(PUBLIC_CATALOG_PATH, JSON.stringify(catalog, null, 2), "utf-8");
}

function loadCatalogFromFile(filePath: string): Partial<Catalog> | null {
  try {
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, "utf-8")) as Partial<Catalog>;
  } catch {
    return null;
  }
}

function buildMergedCatalog(raw?: Partial<Catalog> | null): Catalog {
  const catalog = normalizeCatalog(raw ?? {});
  return {
    ...catalog,
    products: mergeCatalogProducts(catalog.products),
  };
}

function normalizeCatalog(raw: Partial<Catalog>): Catalog {
  const seed = buildSeedCatalog();
  return {
    brands: raw.brands ?? seed.brands,
    categories: raw.categories ?? seed.categories,
    products: raw.products ?? seed.products,
    heroBanners: raw.heroBanners?.length ? raw.heroBanners : seed.heroBanners,
    promoBanners: raw.promoBanners?.length ? raw.promoBanners : seed.promoBanners,
    pageBanners: raw.pageBanners?.length ? raw.pageBanners : seed.pageBanners,
    blogPosts: raw.blogPosts?.length ? raw.blogPosts : seed.blogPosts,
  };
}

export function readCatalog(): Catalog {
  if (cachedCatalog) return cachedCatalog;

  const raw =
    loadCatalogFromFile(CATALOG_PATH) ?? loadCatalogFromFile(PUBLIC_CATALOG_PATH);

  const mergedCatalog = buildMergedCatalog(raw);

  if (!raw && canWriteCatalogFiles()) {
    fs.writeFileSync(CATALOG_PATH, JSON.stringify(mergedCatalog, null, 2), "utf-8");
    writePublicMirror(mergedCatalog);
  } else if (
    raw &&
    canWriteCatalogFiles() &&
    (!raw.heroBanners?.length ||
      !raw.promoBanners?.length ||
      !raw.pageBanners?.length ||
      !raw.blogPosts?.length)
  ) {
    writeCatalog(mergedCatalog);
    return mergedCatalog;
  }

  cachedCatalog = mergedCatalog;
  return mergedCatalog;
}

export function writeCatalog(catalog: Catalog) {
  cachedCatalog = catalog;
  if (!canWriteCatalogFiles()) return;

  ensureDataDir();
  fs.writeFileSync(CATALOG_PATH, JSON.stringify(catalog, null, 2), "utf-8");
  writePublicMirror(catalog);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function createId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function syncCategoryProductCounts(catalog: Catalog): Catalog {
  const counts = new Map<string, number>();

  for (const product of catalog.products) {
    counts.set(product.categoryId, (counts.get(product.categoryId) ?? 0) + 1);
  }

  return {
    ...catalog,
    categories: catalog.categories.map((category) => ({
      ...category,
      productCount: counts.get(category.id) ?? category.productCount,
    })),
  };
}

export function getCategoryBySlugFromCatalog(slug: string, catalog = readCatalog()) {
  return catalog.categories.find((category) => category.href.replace("/categories/", "") === slug);
}

export function getProductsForCategory(categoryId: string, catalog = readCatalog()) {
  return catalog.products.filter((product) => product.categoryId === categoryId);
}

export function getBrandsForCategory(categoryId: string, catalog = readCatalog()) {
  const linked = catalog.brands.filter((brand) => brand.categoryIds?.includes(categoryId));
  if (linked.length > 0) return linked;

  const index = Math.max(
    0,
    catalog.categories.findIndex((category) => category.id === categoryId)
  );

  return Array.from({ length: 4 }, (_, i) => catalog.brands[(index + i) % catalog.brands.length]).filter(
    Boolean
  );
}

export type CategoryInput = {
  name: string;
  image: string;
  tileBg: string;
  href?: string;
  subgroups?: Category["subgroups"];
};

export type BrandInput = {
  name: string;
  logo: string;
  categoryIds?: string[];
};

export type ProductInput = {
  name: string;
  description: string;
  brand: string;
  image: string;
  categoryId: string;
  price?: string;
  mrp?: string;
  discount?: string;
  rating?: number;
  reviews?: number;
};

export function addCategory(input: CategoryInput): Category {
  const catalog = readCatalog();
  const slug = slugify(input.href?.replace("/categories/", "") || input.name);
  const category: Category = {
    id: createId("cat"),
    name: input.name,
    image: input.image,
    tileBg: input.tileBg,
    href: input.href ?? `/categories/${slug}`,
    productCount: 0,
    subgroups: input.subgroups,
  };

  catalog.categories.push(category);
  writeCatalog(catalog);
  return category;
}

export function updateCategory(id: string, input: Partial<CategoryInput>): Category | null {
  const catalog = readCatalog();
  const index = catalog.categories.findIndex((category) => category.id === id);
  if (index === -1) return null;

  const current = catalog.categories[index];
  const slug = input.name ? slugify(input.name) : current.href.replace("/categories/", "");

  catalog.categories[index] = {
    ...current,
    ...input,
    href: input.href ?? (input.name ? `/categories/${slug}` : current.href),
  };

  writeCatalog(syncCategoryProductCounts(catalog));
  return catalog.categories[index];
}

export function deleteCategory(id: string): boolean {
  const catalog = readCatalog();
  const exists = catalog.categories.some((category) => category.id === id);
  if (!exists) return false;

  catalog.categories = catalog.categories.filter((category) => category.id !== id);
  catalog.products = catalog.products.filter((product) => product.categoryId !== id);
  catalog.brands = catalog.brands.map((brand) => ({
    ...brand,
    categoryIds: brand.categoryIds?.filter((categoryId) => categoryId !== id),
  }));

  writeCatalog(syncCategoryProductCounts(catalog));
  return true;
}

export function addBrand(input: BrandInput): CatalogBrand {
  const catalog = readCatalog();
  const brand: CatalogBrand = {
    id: createId("brand"),
    ...input,
  };

  catalog.brands.push(brand);
  writeCatalog(catalog);
  return brand;
}

export function updateBrand(id: string, input: Partial<BrandInput>): CatalogBrand | null {
  const catalog = readCatalog();
  const index = catalog.brands.findIndex((brand) => brand.id === id);
  if (index === -1) return null;

  catalog.brands[index] = { ...catalog.brands[index], ...input };
  writeCatalog(catalog);
  return catalog.brands[index];
}

export function deleteBrand(id: string): boolean {
  const catalog = readCatalog();
  const before = catalog.brands.length;
  catalog.brands = catalog.brands.filter((brand) => brand.id !== id);
  if (catalog.brands.length === before) return false;

  writeCatalog(catalog);
  return true;
}

export function addProduct(input: ProductInput): CatalogProduct {
  const catalog = readCatalog();
  const product: CatalogProduct = {
    id: createId("prod"),
    ...input,
  };

  catalog.products.push(product);
  writeCatalog(syncCategoryProductCounts(catalog));
  return product;
}

export function updateProduct(id: string, input: Partial<ProductInput>): CatalogProduct | null {
  const catalog = readCatalog();
  const index = catalog.products.findIndex((product) => product.id === id);
  if (index === -1) return null;

  catalog.products[index] = { ...catalog.products[index], ...input };
  writeCatalog(syncCategoryProductCounts(catalog));
  return catalog.products[index];
}

export function deleteProduct(id: string): boolean {
  const catalog = readCatalog();
  const before = catalog.products.length;
  catalog.products = catalog.products.filter((product) => product.id !== id);
  if (catalog.products.length === before) return false;

  writeCatalog(syncCategoryProductCounts(catalog));
  return true;
}

export type HeroBannerInput = Omit<HeroOfferBanner, "id" | "type"> & { type?: "offer" };

export function addHeroBanner(input: HeroBannerInput): HeroOfferBanner {
  const catalog = readCatalog();
  const banner: HeroOfferBanner = {
    id: createId("hero"),
    type: "offer",
    ...input,
  };
  catalog.heroBanners.push(banner);
  writeCatalog(catalog);
  return banner;
}

export function updateHeroBanner(id: string, input: Partial<HeroBannerInput>): HeroOfferBanner | null {
  const catalog = readCatalog();
  const index = catalog.heroBanners.findIndex((banner) => banner.id === id);
  if (index === -1) return null;

  catalog.heroBanners[index] = { ...catalog.heroBanners[index], ...input, type: "offer" };
  writeCatalog(catalog);
  return catalog.heroBanners[index];
}

export function deleteHeroBanner(id: string): boolean {
  const catalog = readCatalog();
  const before = catalog.heroBanners.length;
  catalog.heroBanners = catalog.heroBanners.filter((banner) => banner.id !== id);
  if (catalog.heroBanners.length === before) return false;
  writeCatalog(catalog);
  return true;
}

export type PromoBannerInput = Omit<PromoBanner, "id">;

export function addPromoBanner(input: PromoBannerInput): PromoBanner {
  const catalog = readCatalog();
  const banner: PromoBanner = { id: createId("promo"), ...input };
  catalog.promoBanners.push(banner);
  writeCatalog(catalog);
  return banner;
}

export function updatePromoBanner(id: string, input: Partial<PromoBannerInput>): PromoBanner | null {
  const catalog = readCatalog();
  const index = catalog.promoBanners.findIndex((banner) => banner.id === id);
  if (index === -1) return null;

  catalog.promoBanners[index] = { ...catalog.promoBanners[index], ...input };
  writeCatalog(catalog);
  return catalog.promoBanners[index];
}

export function deletePromoBanner(id: string): boolean {
  const catalog = readCatalog();
  const before = catalog.promoBanners.length;
  catalog.promoBanners = catalog.promoBanners.filter((banner) => banner.id !== id);
  if (catalog.promoBanners.length === before) return false;
  writeCatalog(catalog);
  return true;
}

export type PageBannerInput = Omit<PageBanner, "id">;

export function updatePageBanner(pageId: string, input: Partial<PageBannerInput>): PageBanner | null {
  const catalog = readCatalog();
  const index = catalog.pageBanners.findIndex((banner) => banner.id === pageId);
  if (index === -1) return null;

  catalog.pageBanners[index] = { ...catalog.pageBanners[index], ...input };
  writeCatalog(catalog);
  return catalog.pageBanners[index];
}

export type BlogPostInput = Omit<BlogPost, "id" | "slug"> & { slug?: string };

export function addBlogPost(input: BlogPostInput): BlogPost {
  const catalog = readCatalog();
  const slug = input.slug ?? slugify(input.title);
  const post: BlogPost = {
    ...input,
    id: createId("blog"),
    slug,
  };
  catalog.blogPosts.push(post);
  writeCatalog(catalog);
  return post;
}

export function updateBlogPost(id: string, input: Partial<BlogPostInput>): BlogPost | null {
  const catalog = readCatalog();
  const index = catalog.blogPosts.findIndex((post) => post.id === id);
  if (index === -1) return null;

  const current = catalog.blogPosts[index];
  catalog.blogPosts[index] = {
    ...current,
    ...input,
    slug: input.slug ?? (input.title ? slugify(input.title) : current.slug),
  };
  writeCatalog(catalog);
  return catalog.blogPosts[index];
}

export function deleteBlogPost(id: string): boolean {
  const catalog = readCatalog();
  const before = catalog.blogPosts.length;
  catalog.blogPosts = catalog.blogPosts.filter((post) => post.id !== id);
  if (catalog.blogPosts.length === before) return false;
  writeCatalog(catalog);
  return true;
}
