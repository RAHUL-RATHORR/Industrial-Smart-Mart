import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SafeImage from "@/components/SafeImage";
import type { HeroOfferBanner } from "@/lib/data";

export default function HeroOfferSlide({ banner }: { banner: HeroOfferBanner }) {
  return (
    <Link href={banner.href} className="absolute inset-0 block overflow-hidden">
      <SafeImage
        src={banner.backgroundImage}
        alt={banner.productAlt}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/35" />

      {/* Discount badge — top right on mobile, center-right on desktop */}
      <div className="absolute right-10 top-3 z-10 flex flex-col items-center rounded-xl bg-brand-sale px-3 py-2 shadow-lg sm:right-14 sm:top-1/2 sm:-translate-y-1/2 sm:rounded-2xl sm:px-4 sm:py-3 lg:px-5 lg:py-3">
        <span className="text-[8px] font-bold uppercase tracking-wider text-white/90 sm:text-[10px]">
          {banner.discountLabel}
        </span>
        <span className="text-2xl font-black leading-none text-white sm:text-4xl lg:text-5xl">
          {banner.discount}
        </span>
        <span className="text-sm font-black uppercase text-brand-yellow sm:text-lg lg:text-xl">OFF</span>
      </div>

      {/* Title + CTA — arrows ke andar safe padding */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end px-10 pb-8 sm:justify-center sm:pb-0 sm:pl-14 sm:pr-36 lg:pl-12 lg:pr-40">
        <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.2em] text-brand-yellow sm:text-[10px]">
          Limited time offer
        </p>
        <h2 className="max-w-[200px] text-lg font-black uppercase leading-tight text-white sm:max-w-md sm:text-2xl lg:text-3xl">
          {banner.title}
        </h2>
        <p className="mt-1 max-w-[180px] text-[11px] leading-snug text-white/85 sm:max-w-sm sm:text-sm lg:text-xs">
          {banner.tagline}
        </p>
        <span className="mt-2.5 inline-flex w-fit items-center gap-1.5 rounded-md bg-brand-yellow px-3 py-1.5 text-[11px] font-bold uppercase text-brand-black sm:mt-3 sm:gap-2 sm:px-3 sm:py-1.5 sm:text-xs">
          {banner.cta}
          <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </span>
      </div>
    </Link>
  );
}
