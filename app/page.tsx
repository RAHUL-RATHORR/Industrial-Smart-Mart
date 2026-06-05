"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  ChevronLeft,
  ChevronRight,
  Package,
  ShieldCheck,
  Zap,
} from "lucide-react";
import CategoryNav from "@/components/CategoryNav";
import HeroOfferSlide from "@/components/HeroOfferSlide";
import ProductCard from "@/components/ProductCard";
import SafeImage from "@/components/SafeImage";
import {
  bestsellers,
  categories,
  getProductsByCategory,
  heroBanners,
  industrialBrands,
  promoBanners,
  recentlyViewedItems,
  whyChooseUs,
} from "@/lib/data";
import { cn } from "@/lib/utils";
const PRODUCT_GRID =
  "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5 lg:gap-6 items-start";

const iconMap = {
  Package,
  Zap,
  ShieldCheck,
  Award,
} as const;

const categorySections = categories;

export default function HomePage() {
  const [heroIndex, setHeroIndex] = useState(0);

  const nextHero = useCallback(() => {
    setHeroIndex((i) => (i + 1) % heroBanners.length);
  }, []);

  const prevHero = useCallback(() => {
    setHeroIndex((i) => (i - 1 + heroBanners.length) % heroBanners.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextHero, 6000);
    return () => clearInterval(timer);
  }, [nextHero]);

  const activeHero = heroBanners[heroIndex];
  const mobilePromoBanner = promoBanners[0];

  return (
    <div className="flex flex-col">
      <section className="relative w-full overflow-hidden bg-muted">
        <div className="container mx-auto px-0 md:px-4 py-0 md:py-3">
          <div className="relative aspect-[3/2] min-h-[220px] sm:aspect-[16/9] sm:min-h-[260px] md:aspect-[21/6] md:min-h-0 w-full md:rounded-xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeHero.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <HeroOfferSlide banner={activeHero} />
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={prevHero}
              className="absolute left-1 top-1/2 z-10 -translate-y-1/2 rounded-full border-pro bg-white/95 p-1 shadow-pro-sm hover:bg-white sm:left-2 sm:p-2"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
            </button>
            <button
              type="button"
              onClick={nextHero}
              className="absolute right-1 top-1/2 z-10 -translate-y-1/2 rounded-full border-pro bg-white/95 p-1 shadow-pro-sm hover:bg-white sm:right-2 sm:p-2"
              aria-label="Next slide"
            >
              <ChevronRight className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
            </button>

            <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-10">
              {heroBanners.map((_, i) => (
                <button
                  key={heroBanners[i].id}
                  type="button"
                  onClick={() => setHeroIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === heroIndex ? "w-6 bg-brand-yellow" : "w-2 bg-white/60"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-4 md:py-8">
        {/* Mobile: ek fixed banner — admin se baad mein change hoga */}
        <Link
          href={mobilePromoBanner.link}
          className="relative block overflow-hidden rounded-xl aspect-[2/1] min-h-[140px] lg:hidden"
        >
          <SafeImage
            src={mobilePromoBanner.image}
            alt={mobilePromoBanner.alt}
            className="h-full w-full object-cover"
          />
        </Link>

        {/* Desktop: 4 promo cards */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-4">
          {promoBanners.map((promo) => (
            <Link
              key={promo.id}
              href={promo.link}
              className="group card-pro relative overflow-hidden aspect-[8/3] transition-shadow"
            >
              <SafeImage
                src={promo.image}
                alt={promo.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
          ))}
        </div>
      </section>

      <CategoryNav visibility="mobile" />

      <section className="w-full bg-section py-4 md:py-6">
        <div className="container mx-auto px-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-black md:text-xl">Recently Viewed</h2>
            <Link href="/categories" className="text-sm font-semibold text-brand-yellow hover:underline">
              View all
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar touch-pan-x [-webkit-overflow-scrolling:touch]">
            {recentlyViewedItems.map((item) => (
              <Link
                key={item.id}
                href="/categories"
                className="card-pro group w-[140px] flex-shrink-0 p-3 transition-all sm:w-[160px]"
              >
                <div className="relative mb-2 aspect-square overflow-hidden rounded-lg bg-surface-subtle">
                  <SafeImage
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <p className="mb-1 line-clamp-2 text-xs font-semibold">{item.title}</p>
                <p className="text-[10px] text-muted-foreground">{item.count} products</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="mb-5 flex items-center justify-between md:mb-7">
            <h2 className="text-xl font-black md:text-2xl">Bestsellers</h2>
            <Link href="/products" className="text-sm font-semibold text-brand-yellow hover:underline">
              Shop all
            </Link>
          </div>
          <div className={PRODUCT_GRID}>
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {categorySections.map((category) => {
        const products = getProductsByCategory(category.id, 5);
        return (
          <section
            key={category.id}
            className={cn("w-full py-7 md:py-9", category.tileBg)}
          >
            <div className="container mx-auto px-4">
              <div className="mb-5 flex items-center justify-between md:mb-7">
                <h2 className="text-lg font-black md:text-2xl">{category.name}</h2>
                <Link
                  href={category.href}
                  className="text-sm font-semibold text-brand-yellow hover:underline"
                >
                  View category
                </Link>
              </div>
              <div className={PRODUCT_GRID}>
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="w-full overflow-hidden border-y border-pro bg-section py-8 md:py-12">
        <div className="container mx-auto px-4 mb-6">
          <h2 className="text-center text-lg md:text-xl font-black">Trusted Brands</h2>
        </div>
        <div className="relative flex overflow-hidden">
          <div className="flex animate-marquee gap-8 md:gap-12 whitespace-nowrap">
            {[...industrialBrands, ...industrialBrands].map((brand, i) => (
              <div
                key={`${brand.name}-${i}`}
                className="flex-shrink-0 flex items-center justify-center h-16 w-32 md:h-20 md:w-40 grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all"
              >
                <SafeImage
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-page py-10 md:py-14">
        <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-xl font-black md:mb-10 md:text-2xl">
          Why Choose Industrial Safety Mart
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {whyChooseUs.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap] ?? Package;
            return (
              <div
                key={item.title}
                className="card-pro flex flex-col items-center text-center rounded-2xl p-6 transition-all"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-yellow/15 text-brand-yellow">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-bold text-sm md:text-base mb-2">{item.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground">{item.desc}</p>
              </div>
            );
          })}
        </div>
        </div>
      </section>
    </div>
  );
}