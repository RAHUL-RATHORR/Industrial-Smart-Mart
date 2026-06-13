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
  whyChooseUs,
  type Product,
} from "@/lib/data";
import { cn } from "@/lib/utils";

const DESKTOP_PRODUCT_COUNT = 5;
const MOBILE_PRODUCT_COUNT = 6;
const PRODUCT_GRID =
  "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5 lg:gap-6 items-start";

function renderHomeProducts(products: Product[]) {
  return products.slice(0, MOBILE_PRODUCT_COUNT).map((product, index) => (
    <div key={product.id} className={cn(index >= DESKTOP_PRODUCT_COUNT && "lg:hidden")}>
      <ProductCard product={product} />
    </div>
  ));
}

const iconMap = {
  Package,
  Zap,
  ShieldCheck,
  Award,
} as const;

const categorySections = categories;

export default function HomePage() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);

  const nextHero = useCallback(() => {
    setHeroIndex((i) => (i + 1) % heroBanners.length);
  }, []);

  const prevHero = useCallback(() => {
    setHeroIndex((i) => (i - 1 + heroBanners.length) % heroBanners.length);
  }, []);

  useEffect(() => {
    if (isHeroPaused) return;
    const timer = setInterval(nextHero, 6000);
    return () => clearInterval(timer);
  }, [nextHero, isHeroPaused]);

  const activeHero = heroBanners[heroIndex];

  return (
    <div className="flex flex-col">
      <section
        className="relative w-full overflow-hidden bg-muted lg:bg-white"
        onMouseEnter={() => setIsHeroPaused(true)}
        onMouseLeave={() => setIsHeroPaused(false)}
      >
        <div className="container mx-auto px-0 md:px-3 lg:px-4 py-0 md:pt-1 md:pb-0 lg:pt-1 lg:pb-0">
          <div className="relative aspect-[3/2] min-h-[210px] w-full overflow-hidden sm:aspect-[16/7] sm:min-h-[240px] md:rounded-xl lg:aspect-auto lg:h-[300px] lg:rounded-2xl xl:h-[320px]">
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

      <section className="container mx-auto hidden px-4 sm:px-5 lg:px-6 py-3 lg:block lg:py-4">
        {/* Desktop: 4 promo cards — slider ke turant niche */}
        <div className="grid grid-cols-4 gap-4">
          {promoBanners.map((promo) => (
            <Link
              key={promo.id}
              href={promo.link}
              className="group card-pro relative h-[150px] overflow-hidden rounded-xl transition-shadow xl:h-[155px]"
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

      <section className="w-full bg-section py-6 md:py-8 lg:py-10">
        <div className="container mx-auto px-4 sm:px-5 lg:px-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="section-title">Recently Viewed</h2>
            <Link href="/products" className="text-sm font-semibold text-brand-yellow hover:underline">
              View all
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar touch-pan-x [-webkit-overflow-scrolling:touch]">
            {bestsellers.slice(0, 5).map((product) => (
              <div key={product.id} className="w-[148px] flex-shrink-0 sm:w-[168px]">
                <ProductCard product={product} compact />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-6 md:py-8 lg:py-10">
        <div className="container mx-auto px-4 sm:px-5 lg:px-6">
          <div className="mb-5 flex items-center justify-between lg:mb-6">
            <h2 className="section-title">Bestsellers</h2>
            <Link href="/products" className="text-sm font-semibold text-brand-yellow hover:underline">
              Shop all
            </Link>
          </div>
          <div className={PRODUCT_GRID}>{renderHomeProducts(bestsellers)}</div>
        </div>
      </section>

      {categorySections.map((category) => {
        const products = getProductsByCategory(category.id, MOBILE_PRODUCT_COUNT);
        return (
          <section
            key={category.id}
            className={cn("w-full py-6 md:py-8 lg:py-10", category.tileBg)}
          >
            <div className="container mx-auto px-4 sm:px-5 lg:px-6">
              <div className="mb-5 flex items-center justify-between lg:mb-6">
                <h2 className="section-title">{category.name}</h2>
                <Link
                  href={category.href}
                  className="text-sm font-semibold text-brand-yellow hover:underline"
                >
                  View category
                </Link>
              </div>
              <div className={PRODUCT_GRID}>{renderHomeProducts(products)}</div>
            </div>
          </section>
        );
      })}

      <section className="w-full overflow-hidden border-y border-pro bg-section py-8 md:py-10 lg:py-12">
        <div className="container mx-auto px-4 sm:px-5 lg:px-6 mb-6 lg:mb-8">
          <h2 className="section-title text-center">Trusted Brands</h2>
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

      <section className="w-full bg-page py-8 md:py-10 lg:py-14">
        <div className="container mx-auto px-4 sm:px-5 lg:px-6">
          <h2 className="section-title mx-auto mb-8 max-w-3xl text-center lg:mb-10">
            Why Choose Industrial Safety Mart
          </h2>
          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
            {whyChooseUs.map((item) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap] ?? Package;
              return (
                <div
                  key={item.title}
                  className="card-pro flex flex-col items-center rounded-2xl p-6 text-center transition-all"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-yellow/15 text-brand-yellow">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-2 text-sm font-bold md:text-base">{item.title}</h3>
                  <p className="text-xs text-muted-foreground md:text-sm">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}