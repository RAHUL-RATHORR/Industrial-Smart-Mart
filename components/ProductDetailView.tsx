"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  MapPin,
  MessageCircle,
  Minus,
  Plus,
  Share2,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import SafeImage from "@/components/SafeImage";
import { Product } from "@/lib/data";
import { ProductDetailExtras } from "@/lib/products";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import ProductDetailExtraSections from "@/components/ProductDetailExtraSections";

interface ProductDetailViewProps {
  product: Product;
  extras: ProductDetailExtras;
}

export default function ProductDetailView({ product, extras }: ProductDetailViewProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [showFullDescription, setShowFullDescription] = useState(false);

  const whatsappMessage = useMemo(() => {
    const lines = [
      `Hello, I want to inquire about:`,
      `Product: ${product.name}`,
      `Brand: ${product.brand}`,
      `Quantity: ${quantity}`,
      product.price ? `Listed Price: ${product.price}` : "",
      pincode ? `Delivery Pincode: ${pincode}` : "",
    ].filter(Boolean);

    return lines.join("\n");
  }, [product, quantity, pincode]);

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
                    activeImage === index ? "border-brand-yellow ring-2 ring-brand-yellow/30" : "border-gray-200"
                  }`}
                >
                  <SafeImage src={image} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white border rounded-xl p-4 sm:p-5 space-y-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-yellow mb-1">{product.brand}</p>
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-brand-black leading-snug">{product.name}</h1>
              </div>

              {product.rating && (
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 bg-[#0e8a2a] text-white text-xs font-bold px-2 py-0.5 rounded">
                    {product.rating} <Star className="h-3 w-3 fill-current" />
                  </span>
                  <span className="text-sm text-muted-foreground">{product.reviews} Ratings & Reviews</span>
                </div>
              )}

              <div className="border-t pt-4">
                <div className="flex flex-wrap items-end gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-brand-black">{product.price || "Price on Request"}</span>
                  {product.mrp && <span className="text-sm line-through text-muted-foreground">{product.mrp}</span>}
                  {product.discount && <span className="text-sm font-bold text-[#0e8a2a]">{product.discount}</span>}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Inclusive of all taxes · Free delivery on bulk orders</p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-brand-black mb-2">Buy More & Save More</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
                  {extras.bulkTiers.map((tier) => (
                    <div key={tier.qty} className="border rounded-lg p-2 text-center bg-muted/20">
                      <p className="text-[10px] sm:text-xs text-muted-foreground">Qty {tier.qty}</p>
                      <p className="text-sm font-bold text-brand-black">{tier.price}</p>
                      <p className="text-[10px] text-muted-foreground">per unit</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-xs sm:text-sm text-blue-900">
                  Sign Up & Save — Get extra GST benefits on business orders.
                </div>
                <div className="rounded-lg border border-amber-100 bg-amber-50 px-3 py-2 text-xs sm:text-sm text-amber-900">
                  Coupons & Offers — Ask on WhatsApp for latest bulk discount codes.
                </div>
                <div className="rounded-lg border border-green-100 bg-green-50 px-3 py-2 text-xs sm:text-sm text-green-900">
                  ISM Business — Dedicated support for corporate procurement.
                </div>
              </div>
            </div>
          </div>

          {/* Purchase Box */}
          <div className="lg:col-span-3">
            <div className="bg-white border rounded-xl p-4 sm:p-5 space-y-4 lg:sticky lg:top-24">
              <div>
                <p className="text-xs text-muted-foreground">Deal Price</p>
                <p className="text-2xl font-black text-brand-black">{product.price || "Price on Request"}</p>
              </div>

              <div>
                <p className="text-sm font-semibold mb-2">Quantity</p>
                <div className="inline-flex items-center border rounded-lg overflow-hidden">
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
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] text-white font-bold py-3 text-sm hover:bg-[#128C7E] transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Inquiry
              </a>

              <div className="border-t pt-4 space-y-2">
                <p className="text-sm font-semibold flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-brand-yellow" />
                  Check Delivery
                </p>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter pincode"
                  className="w-full rounded-lg border px-3 py-2 text-sm focus:border-brand-yellow focus:outline-none"
                />
                <p className="text-xs text-muted-foreground">
                  {pincode.length === 6 ? "Delivery available to this pincode. Confirm on WhatsApp." : "Enter 6-digit pincode for delivery estimate."}
                </p>
              </div>

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

              <button type="button" onClick={handleShare} className="w-full flex items-center justify-center gap-2 border rounded-lg py-2 text-sm font-medium hover:border-brand-yellow hover:text-brand-yellow transition-colors">
                <Share2 className="h-4 w-4" />
                Share Product
              </button>
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4 sm:p-5">
          <h2 className="text-sm sm:text-base font-bold text-brand-black mb-3">Industrial Safety Mart Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {extras.insights.map((insight) => (
              <div key={insight} className="bg-white rounded-lg border p-3 text-sm text-gray-700">
                {insight}
              </div>
            ))}
          </div>
        </div>

        {/* About Product */}
        <div className="mt-6 bg-white border rounded-xl p-4 sm:p-6 space-y-6">
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
            <div className="border rounded-lg overflow-hidden">
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
              className="text-sm font-semibold text-blue-600 hover:underline mt-2"
            >
              {showFullDescription ? "Read Less" : "Read More"}
            </button>
          </div>
        </div>

        {/* Bulk Inquiry */}
        <div className="mt-6 bg-white border rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4">
          <SafeImage src={product.image} alt={product.name} className="w-20 h-20 object-contain shrink-0" />
          <div className="flex-1 text-center sm:text-left">
            <p className="font-bold text-brand-black">Looking to purchase in bulk?</p>
            <p className="text-sm text-muted-foreground">Get custom pricing for wholesale and corporate orders.</p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-lg bg-[#25D366] text-white font-bold px-4 py-2.5 text-sm hover:bg-[#128C7E] transition-colors whitespace-nowrap"
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
