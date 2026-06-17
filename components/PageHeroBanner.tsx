"use client";

import SafeImage from "@/components/SafeImage";
import { useCatalog } from "@/contexts/CatalogContext";
import type { PageBannerId } from "@/lib/catalog/types";

type PageHeroBannerProps = {
  pageId: PageBannerId;
};

export default function PageHeroBanner({ pageId }: PageHeroBannerProps) {
  const { getPageBanner } = useCatalog();
  const banner = getPageBanner(pageId);

  if (!banner) return null;

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative aspect-[21/7] min-h-[160px] w-full sm:min-h-[200px] md:aspect-[21/6] md:min-h-[240px]">
        <SafeImage
          src={banner.image}
          alt={banner.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/20" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 sm:px-5 lg:px-6">
            <h1 className="max-w-3xl text-2xl font-black text-white md:text-4xl">{banner.title}</h1>
            <p className="mt-2 max-w-2xl text-sm text-white/90 md:text-base">{banner.subtitle}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
