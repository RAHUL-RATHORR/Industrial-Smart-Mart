"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  bestsellers,
  categories as staticCategories,
  getProductsByCategory as getStaticProductsByCategory,
  heroBanners as staticHeroBanners,
  industrialBrands as staticBrands,
  promoBanners as staticPromoBanners,
  type Category,
  type HeroOfferBanner,
  type Product,
} from "@/lib/data";
import { blogPosts as staticBlogPosts } from "@/lib/blog";
import type {
  Catalog,
  CatalogBrand,
  CatalogProduct,
  PageBanner,
  PageBannerId,
  PromoBanner,
} from "@/lib/catalog/types";
import type { BlogPost } from "@/lib/blog";

type CatalogContextValue = {
  categories: Category[];
  brands: CatalogBrand[];
  products: CatalogProduct[];
  heroBanners: HeroOfferBanner[];
  promoBanners: PromoBanner[];
  pageBanners: PageBanner[];
  blogPosts: BlogPost[];
  loaded: boolean;
  getProductsByCategory: (categoryId: string, count?: number) => Product[];
  getCategoryBrands: (categoryId: string, count?: number) => CatalogBrand[];
  getPageBanner: (pageId: PageBannerId) => PageBanner | undefined;
};

const CatalogContext = createContext<CatalogContextValue | null>(null);

const staticBrandList: CatalogBrand[] = staticBrands.map((brand, index) => ({
  id: `static-brand-${index}`,
  name: brand.name,
  logo: brand.logo,
}));

const staticPageBanners: PageBanner[] = [];

export function CatalogProvider({
  children,
  initial,
}: {
  children: React.ReactNode;
  initial?: Catalog;
}) {
  const [catalog, setCatalog] = useState<Catalog | null>(initial ?? null);

  useEffect(() => {
    fetch("/api/catalog")
      .then((response) => response.json())
      .then((data: Catalog) => setCatalog(data))
      .catch(() => undefined);
  }, []);

  const value = useMemo<CatalogContextValue>(() => {
    const categories = catalog?.categories ?? staticCategories;
    const brands = catalog?.brands ?? staticBrandList;
    const products = catalog?.products ?? [];
    const heroBanners = catalog?.heroBanners?.length ? catalog.heroBanners : staticHeroBanners;
    const promoBanners = catalog?.promoBanners?.length ? catalog.promoBanners : staticPromoBanners;
    const pageBanners = catalog?.pageBanners?.length ? catalog.pageBanners : staticPageBanners;
    const blogPosts = catalog?.blogPosts?.length ? catalog.blogPosts : staticBlogPosts;

    const getProductsByCategory = (categoryId: string, count?: number) => {
      const stored = products.filter((product) => product.categoryId === categoryId);
      if (stored.length > 0) {
        return stored.slice(0, count ?? stored.length);
      }
      return getStaticProductsByCategory(categoryId, count);
    };

    const getCategoryBrands = (categoryId: string, count = 4) => {
      const linked = brands.filter((brand) => brand.categoryIds?.includes(categoryId));
      if (linked.length > 0) return linked.slice(0, count);

      const index = Math.max(
        0,
        categories.findIndex((category) => category.id === categoryId)
      );

      return Array.from({ length: count }, (_, i) => brands[(index + i) % brands.length]);
    };

    const getPageBanner = (pageId: PageBannerId) => pageBanners.find((banner) => banner.id === pageId);

    return {
      categories,
      brands,
      products,
      heroBanners,
      promoBanners,
      pageBanners,
      blogPosts,
      loaded: Boolean(catalog),
      getProductsByCategory,
      getCategoryBrands,
      getPageBanner,
    };
  }, [catalog]);

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const context = useContext(CatalogContext);
  if (!context) {
    return {
      categories: staticCategories,
      brands: staticBrandList,
      products: [] as CatalogProduct[],
      heroBanners: staticHeroBanners,
      promoBanners: staticPromoBanners,
      pageBanners: staticPageBanners,
      blogPosts: staticBlogPosts,
      loaded: false,
      getProductsByCategory: getStaticProductsByCategory,
      getCategoryBrands: (categoryId: string, count = 4) => {
        const index = Math.max(
          0,
          staticCategories.findIndex((category) => category.id === categoryId)
        );
        return Array.from({ length: count }, (_, i) => staticBrandList[(index + i) % staticBrandList.length]);
      },
      getPageBanner: (_pageId: PageBannerId) => undefined,
    };
  }
  return context;
}

export function useBestsellers() {
  const { products } = useCatalog();
  const storedBestsellers = products.filter((product) => product.id.startsWith("bs-"));
  return storedBestsellers.length > 0 ? storedBestsellers : bestsellers;
}
