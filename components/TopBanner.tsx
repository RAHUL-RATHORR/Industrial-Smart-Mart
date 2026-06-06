import Link from "next/link";

export default function TopBanner() {
  return (
    <div className="w-full bg-linear-to-r from-brand-black via-[#1a1a1a] to-[#5c1018] text-white border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-5 lg:px-6 py-2.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm sm:text-base font-black tracking-tight whitespace-nowrap">
            <span className="text-brand-yellow">Industrial</span>
            <span className="text-white">Safety</span>
            <span className="text-brand-yellow">Mart</span>
          </span>
          <span className="text-sm font-semibold text-white/95 hidden sm:inline">Business</span>
        </div>

        <p className="hidden md:block text-xs lg:text-sm text-white/90 max-w-2xl">
          Smart Procurement for Your Business. Move Faster. Source Smarter. Scale Seamlessly.
        </p>

        <Link
          href="/contact"
          className="rounded-full bg-white px-3.5 py-1.5 text-xs sm:text-sm font-bold text-[#8b1a1a] hover:bg-brand-yellow hover:text-brand-black transition-colors whitespace-nowrap"
        >
          Explore ISM Business
        </Link>
      </div>
    </div>
  );
}
