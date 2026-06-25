"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  MessageCircle,
  Phone,
  Play,
  Share2,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import ProductImageMagnifier from "@/components/ProductImageMagnifier";
import SafeImage from "@/components/SafeImage";
import { Product, getProductDisplayRating } from "@/lib/data";
import { ProductDetailExtras } from "@/lib/products";
import { CALL_BUTTON_CLASS } from "@/lib/contact";
import { generateWhatsAppLink, WHATSAPP_BUTTON_CLASS, WHATSAPP_NUMBER } from "@/lib/whatsapp";
import ProductDetailExtraSections from "@/components/ProductDetailExtraSections";
import { cn } from "@/lib/utils";

interface ProductDetailViewProps {
  product: Product;
  extras: ProductDetailExtras;
}

type MediaItem =
  | { type: "image"; src: string }
  | { type: "video"; src: string; poster: string };

export default function ProductDetailView({ product, extras }: ProductDetailViewProps) {
  const { rating, reviews } = getProductDisplayRating(product);
  const [activeMedia, setActiveMedia] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const mediaItems = useMemo<MediaItem[]>(
    () => [
      { type: "image", src: extras.images[0] },
      { type: "image", src: extras.images[1] },
      { type: "video", src: extras.videoUrl, poster: extras.videoPoster },
    ],
    [extras]
  );

  const currentMedia = mediaItems[activeMedia];

  const whatsappMessage = useMemo(
    () =>
      [
        `Hello, I want to inquire about:`,
        `Product: ${product.name}`,
        `Brand: ${product.brand}`,
      ].join("\n"),
    [product]
  );

  const whatsappUrl = generateWhatsAppLink(whatsappMessage);
  const telLink = `tel:+${WHATSAPP_NUMBER}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name} on Industrial Safety Mart`,
          url: window.location.href,
        });
      } catch {
        // user cancelled
      }
    }
  };

  return (
    <div className="bg-muted/20 min-h-screen">
      <div className="container mx-auto px-4 sm:px-5 lg:px-6 py-4 md:py-6">
        <nav className="flex flex-wrap items-center gap-1 text-xs sm:text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-brand-yellow">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/products" className="hover:text-brand-yellow">Products</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-brand-black line-clamp-1">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="relative overflow-visible lg:col-span-5">
            <div className="flex gap-2 sm:gap-3">
              <div className="flex shrink-0 flex-col gap-2">
                {mediaItems.map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveMedia(index)}
                    className={cn(
                      "relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border bg-white p-1 sm:h-16 sm:w-16 lg:h-[72px] lg:w-[72px]",
                      activeMedia === index
                        ? "border-brand-yellow ring-2 ring-brand-yellow/30"
                        : "border-pro"
                    )}
                    aria-label={item.type === "video" ? "Product video" : `Product photo ${index + 1}`}
                  >
                    {item.type === "image" ? (
                      <SafeImage
                        src={item.src}
                        alt={`${product.name} view ${index + 1}`}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <>
                        <SafeImage
                          src={item.poster}
                          alt={`${product.name} video`}
                          className="h-full w-full object-cover"
                        />
                        <span className="absolute inset-0 flex items-center justify-center bg-black/35">
                          <Play className="h-5 w-5 fill-white text-white sm:h-6 sm:w-6" />
                        </span>
                      </>
                    )}
                  </button>
                ))}
              </div>

              <div className="min-w-0 flex-1">
                {currentMedia.type === "image" ? (
                  <ProductImageMagnifier src={currentMedia.src} alt={product.name} />
                ) : (
                  <div className="aspect-square w-full overflow-hidden rounded-xl border border-pro bg-black">
                    <video
                      src={currentMedia.src}
                      poster={currentMedia.poster}
                      controls
                      playsInline
                      className="h-full w-full object-contain"
                    >
                      Your browser does not support product videos.
                    </video>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="card-pro bg-white p-4 sm:p-5 space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="badge-brand gap-1 px-2 py-0.5 text-xs">
                    {rating}
                    <Star className="h-3 w-3 fill-current" />
                  </span>
                  <span className="text-sm text-muted-foreground">({reviews})</span>
                </div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{product.brand}</p>
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-brand-black leading-snug">{product.name}</h1>
              </div>

              <p className="text-xs text-muted-foreground border-t pt-4">
                Get quotation on WhatsApp · PAN India delivery on bulk orders
              </p>

              <div className="space-y-2">
                <div className="surface-brand px-3 py-2 text-xs sm:text-sm">
                  Sign Up & Save — Get extra GST benefits on business orders.
                </div>
                <div className="surface-brand px-3 py-2 text-xs sm:text-sm">
                  Coupons & Offers — Ask on WhatsApp for latest bulk order benefits.
                </div>
                <div className="surface-brand px-3 py-2 text-xs sm:text-sm">
                  ISM Business — Dedicated support for corporate procurement.
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="card-pro bg-white p-4 sm:p-5 space-y-4 lg:sticky lg:top-24">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(WHATSAPP_BUTTON_CLASS, "w-full gap-2 rounded-lg py-3 text-sm")}
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Inquiry
              </a>

              <a href={telLink} className={cn(CALL_BUTTON_CLASS, "w-full gap-2 rounded-lg py-3 text-sm")}>
                <Phone className="h-4 w-4" />
                Call Now
              </a>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                  <ShieldCheck className="h-4 w-4 text-brand-yellow shrink-0" />
                  <span>100% Genuine</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                  <Truck className="h-4 w-4 text-brand-yellow shrink-0" />
                  <span>PAN India</span>
                </div>
              </div>

              <button type="button" onClick={handleShare} className="btn-brand-outline w-full gap-2 py-2 text-sm font-medium">
                <Share2 className="h-4 w-4" />
                Share Product
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-pro bg-brand-yellow-soft p-4 shadow-pro-sm sm:p-5">
          <h2 className="text-sm sm:text-base font-bold text-brand-black mb-3">Industrial Safety Mart Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {extras.insights.map((insight) => (
              <div key={insight} className="card-pro bg-white p-3 text-sm text-foreground">
                {insight}
              </div>
            ))}
          </div>
        </div>

        <div className="card-pro mt-6 bg-white p-4 sm:p-6 space-y-6">
          <h2 className="text-lg font-bold text-brand-black">About this product</h2>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-2">Key Features</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              {extras.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-3">Product Specifications</h3>
            <div className="border-pro rounded-lg overflow-hidden">
              {extras.specs.map((spec, index) => (
                <div key={spec.label} className={`grid grid-cols-2 text-sm ${index % 2 === 0 ? "bg-muted/20" : "bg-white"}`}>
                  <div className="px-4 py-2.5 font-medium text-gray-600 border-r">{spec.label}</div>
                  <div className="px-4 py-2.5 text-gray-800">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-2">Description</h3>
            <p className={`text-sm text-gray-700 leading-relaxed ${!showFullDescription ? "line-clamp-4" : ""}`}>
              {extras.longDescription}
            </p>
            <button
              type="button"
              onClick={() => setShowFullDescription((v) => !v)}
              className="mt-2 text-sm font-semibold text-brand-yellow hover:underline"
            >
              {showFullDescription ? "Show less" : "Read more"}
            </button>
          </div>
        </div>

        <ProductDetailExtraSections product={product} />
      </div>
    </div>
  );
}
