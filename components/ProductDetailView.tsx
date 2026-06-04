"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  MessageCircle,
  Minus,
  Plus,
  Share2,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import SafeImage from "@/components/SafeImage";
import { Product, getProductDisplayRating } from "@/lib/data";
import { ProductDetailExtras } from "@/lib/products";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import ProductDetailExtraSections from "@/components/ProductDetailExtraSections";

interface ProductDetailViewProps {
  product: Product;
  extras: ProductDetailExtras;
}

export default function ProductDetailView({ product, extras }: ProductDetailViewProps) {
  const { rating, reviews } = getProductDisplayRating(product);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const whatsappMessage = useMemo(() => {
    return [
      `Hello, I want to inquire about:`,
      `Product: ${product.name}`,
      `Brand: ${product.brand}`,
      `Quantity: ${quantity}`,
    ].join("\n");
  }, [product, quantity]);

  const whatsappUrl = generateWhatsAppLink(whatsappMessage);

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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-1 text-xs sm:text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-brand-yellow">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/products" className="hover:text-brand-yellow">Products</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-brand-black line-clamp-1">{product.name}</span>
        </nav>

        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Gallery */}
          <div className="lg:col-span-5 space-y-3">
            <div className="bg-white border rounded-xl p-4 sm:p-6 aspect-square relative overflow-hidden">
              <SafeImage
                src={extras.images[activeImage]}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-contain p-4"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
              {extras.images.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg border bg-white p-1 ${
                    activeImage === index ? "border-brand-yellow ring-2 ring-brand-yellow/30" : "border-pro"
                  }`}
                >
                  <SafeImage src={image} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
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
                  Coupons & Offers — Ask on WhatsApp for latest bulk discount codes.
                </div>
                <div className="surface-brand px-3 py-2 text-xs sm:text-sm">
                  ISM Business — Dedicated support for corporate procurement.
                </div>
              </div>
            </div>
          </div>

          {/* Purchase Box */}
          <div className="lg:col-span-3">
            <div className="card-pro bg-white p-4 sm:p-5 space-y-4 lg:sticky lg:top-24">
              <div>
                <p className="text-sm font-semibold mb-2">Quantity</p>
                <div className="inline-flex items-center border-pro rounded-lg overflow-hidden">
                  <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-3 py-2 hover:bg-muted" aria-label="Decrease quantity">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 min-w-10 text-center font-semibold">{quantity}</span>
                  <button type="button" onClick={() => setQuantity((q) => q + 1)} className="px-3 py-2 hover:bg-muted" aria-label="Increase quantity">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brand w-full gap-2 py-3 text-sm"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Inquiry
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

        {/* Insights */}
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

        {/* About Product */}
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
            <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-2">Product Details</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {showFullDescription ? extras.longDescription : `${extras.longDescription.slice(0, 220)}...`}
            </p>
            <button
              type="button"
              onClick={() => setShowFullDescription((prev) => !prev)}
              className="link-brand text-sm mt-2"
            >
              {showFullDescription ? "Read Less" : "Read More"}
            </button>
          </div>
        </div>

        {/* Bulk Inquiry */}
        <div className="card-pro mt-6 bg-white p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4">
          <SafeImage src={product.image} alt={product.name} className="w-20 h-20 object-contain shrink-0" />
          <div className="flex-1 text-center sm:text-left">
            <p className="font-bold text-brand-black">Looking to purchase in bulk?</p>
            <p className="text-sm text-muted-foreground">Get custom pricing for wholesale and corporate orders.</p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brand shrink-0 px-4 py-2.5 text-sm whitespace-nowrap"
          >
            WhatsApp Inquiry
          </a>
        </div>

        {/* Manufacturer */}
        <div className="mt-6 rounded-xl overflow-hidden border bg-brand-black text-white">
          <div className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-brand-yellow mb-1">From the Manufacturer</p>
              <h3 className="text-xl sm:text-2xl font-black">{product.brand}</h3>
              <p className="text-sm text-gray-300 mt-1">Trusted industrial brand · Genuine warranty · Bulk supply available</p>
            </div>
            <SafeImage src={product.image} alt={product.brand} className="w-24 h-24 sm:w-28 sm:h-28 object-contain bg-white/10 rounded-lg p-2" />
          </div>
        </div>

        <ProductDetailExtraSections product={product} />
      </div>
    </div>
  );
}
