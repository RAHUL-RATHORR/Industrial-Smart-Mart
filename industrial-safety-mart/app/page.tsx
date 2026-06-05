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

const PRODUCT_GRID =
  "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4";

const iconMap = {
  Package,
  Zap,
  ShieldCheck,
  Award,
} as const;

const categorySections = categories.slice(0, 6);

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

  return (
    <div className="flex flex-col">
      <section className="relative w-full overflow-hidden bg-muted">
        <div className="container mx-auto px-0 md:px-4 py-0 md:py-4">
          <div className="relative aspect-[21/7] min-h-[160px] sm:min-h-[220px] md:min-h-[260px] w-full md:rounded-2xl overflow-hidden">
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
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow-md hover:bg-background z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={nextHero}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow-md hover:bg-background z-10"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
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

      <section className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {promoBanners.map((promo) => (
            <Link
              key={promo.id}
              href={promo.link}
              className="group relative overflow-hidden rounded-xl border bg-card aspect-[8/3] shadow-sm hover:shadow-md transition-shadow"
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

      <section className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg md:text-xl font-black">Recently Viewed</h2>
          <Link href="/categories" className="text-sm font-semibold text-brand-yellow hover:underline">
            View all
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {recentlyViewedItems.map((item) => (
            <Link
              key={item.id}
              href="/categories"
              className="flex-shrink-0 w-[140px] sm:w-[160px] rounded-xl border bg-card p-3 shadow-sm hover:shadow-md hover:border-brand-yellow/50 transition-all group"
            >
              <div className="relative aspect-square rounded-lg overflow-hidden bg-muted mb-2">
                <SafeImage
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <p className="text-xs font-semibold line-clamp-2 mb-1">{item.title}</p>
              <p className="text-[10px] text-muted-foreground">{item.count} products</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-6 md:py-8">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-black">Bestsellers</h2>
          <Link href="/products" className="text-sm font-semibold text-brand-yellow hover:underline">
            Shop all
          </Link>
        </div>
        <div className={PRODUCT_GRID}>
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {categorySections.map((category) => {
        const products = getProductsByCategory(category.id, 5);
        return (
          <section key={category.id} className="container mx-auto px-4 py-6 md:py-8 border-t">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="text-lg md:text-2xl font-black">{category.name}</h2>
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
          </section>
        );
      })}

      <section className="py-8 md:py-12 bg-muted/40 border-y overflow-hidden">
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

      <section className="container mx-auto px-4 py-10 md:py-14">
        <h2 className="text-center text-xl md:text-2xl font-black mb-8 md:mb-10">
          Why Choose Industrial Safety Mart
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {whyChooseUs.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap] ?? Package;
            return (
              <div
                key={item.title}
                className="flex flex-col items-center text-center rounded-2xl border bg-card p-6 shadow-sm hover:shadow-md hover:border-brand-yellow/50 transition-all"
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
      </section>
    </div>
  );
}