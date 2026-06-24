import {
  bestsellers,
  categories,
  getProductsByCategory,
  heroBanners,
  industrialBrands,
  promoBanners,
} from "@/lib/data";
import { blogPosts } from "@/lib/blog";
import type { Catalog, CatalogBrand, CatalogProduct, PageBanner } from "./types";
import { PAGE_BANNER_IDS } from "./types";
import { buildDropdownProducts } from "@/lib/dropdown-products";

const pageBannerImages: Record<string, string> = {
  blog: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1400&h=500&auto=format&fit=crop",
  "get-quote": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1400&h=500&auto=format&fit=crop",
  about: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1400&h=500&auto=format&fit=crop",
  contact: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=1400&h=500&auto=format&fit=crop",
  faq: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?q=80&w=1400&h=500&auto=format&fit=crop",
  products: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?q=80&w=1400&h=500&auto=format&fit=crop",
  categories: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1400&h=500&auto=format&fit=crop",
};

const defaultPageBannerCopy: Record<string, { title: string; subtitle: string }> = {
  blog: {
    title: "Industrial Blog",
    subtitle: "Safety tips, procurement guides, and product insights for factories and corporate buyers.",
  },
  "get-quote": {
    title: "Get a Quote",
    subtitle: "Send your product query via WhatsApp or email for pricing and bulk discounts.",
  },
  about: {
    title: "About Us",
    subtitle: "India's trusted B2B supplier for industrial safety equipment and power tools.",
  },
  contact: {
    title: "Contact Us",
    subtitle: "Reach us for quotes, bulk orders, and product support.",
  },
  faq: {
    title: "Frequently Asked Questions",
    subtitle: "Find answers to common questions about ordering and shipping.",
  },
  products: {
    title: "All Products",
    subtitle: "Discover our wide selection of industrial safety and power tools.",
  },
  categories: {
    title: "All Categories",
    subtitle: "Browse our complete range of industrial products and safety equipment.",
  },
};

function buildDefaultPageBanners(): PageBanner[] {
  return PAGE_BANNER_IDS.map(({ id }) => ({
    id,
    title: defaultPageBannerCopy[id].title,
    subtitle: defaultPageBannerCopy[id].subtitle,
    image: pageBannerImages[id],
  }));
}

export function buildSeedCatalog(): Catalog {
  const brands: CatalogBrand[] = industrialBrands.map((brand, index) => ({
    id: `brand-${index + 1}`,
    name: brand.name,
    logo: brand.logo,
    categoryIds: categories.slice(index, index + 2).map((category) => category.id),
  }));

  const products: CatalogProduct[] = [
    ...bestsellers.map((product) => ({
      ...product,
      categoryId: "cat-safety-shoes",
    })),
    ...categories.flatMap((category) =>
      getProductsByCategory(category.id, 6).map((product) => ({
        ...product,
        categoryId: category.id,
      }))
    ),
  ];

  const uniqueProducts = new Map<string, CatalogProduct>();
  for (const product of [...products, ...buildDropdownProducts()]) {
    uniqueProducts.set(product.id, product);
  }

  return {
    brands,
    categories: categories.map((category) => ({ ...category })),
    products: Array.from(uniqueProducts.values()),
    heroBanners: heroBanners.map((banner) => ({ ...banner })),
    promoBanners: promoBanners.map((banner) => ({ ...banner })),
    pageBanners: buildDefaultPageBanners(),
    blogPosts: blogPosts.map((post) => ({ ...post })),
  };
}
