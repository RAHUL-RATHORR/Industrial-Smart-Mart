import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetailView from "@/components/ProductDetailView";
import { getProductById, getProductDetailExtras } from "@/lib/products";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return { title: "Product Not Found | Industrial Safety Mart" };
  }

  return {
    title: `${product.name} | Industrial Safety Mart`,
    description: product.description,
  };
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const extras = getProductDetailExtras(product);

  return <ProductDetailView product={product} extras={extras} />;
}
