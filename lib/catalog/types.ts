import type { Category, HeroOfferBanner, Product } from "@/lib/data";
import type { BlogPost } from "@/lib/blog";

export type CatalogBrand = {
  id: string;
  name: string;
  logo: string;
  categoryIds?: string[];
};

export type CatalogProduct = Product & {
  categoryId: string;
};

export type PromoBanner = {
  id: string;
  image: string;
  alt: string;
  link: string;
};

export type PageBanner = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
};

export type Catalog = {
  brands: CatalogBrand[];
  categories: Category[];
  products: CatalogProduct[];
  heroBanners: HeroOfferBanner[];
  promoBanners: PromoBanner[];
  pageBanners: PageBanner[];
  blogPosts: BlogPost[];
};

export const PAGE_BANNER_IDS = [
  { id: "blog", label: "Blog Page" },
  { id: "get-quote", label: "Get Quote / Query Page" },
  { id: "about", label: "About Page" },
  { id: "contact", label: "Contact Page" },
  { id: "faq", label: "FAQ Page" },
  { id: "products", label: "Products Page" },
  { id: "categories", label: "Categories Page" },
] as const;

export type PageBannerId = (typeof PAGE_BANNER_IDS)[number]["id"];
