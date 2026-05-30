import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import { getCategoryBySlug, getCategoryProducts } from "@/lib/categories";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return { title: "Category Not Found | Industrial Safety Mart" };
  }

  return {
    title: `${category.name} | Industrial Safety Mart`,
    description: `Browse ${category.name} products at wholesale B2B prices.`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { slug } = await params;
  const { q } = await searchParams;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = getCategoryProducts(category.id, q);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <nav className="text-xs sm:text-sm text-muted-foreground mb-4">
        <Link href="/" className="hover:text-brand-yellow">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/categories" className="hover:text-brand-yellow">Categories</Link>
        <span className="mx-2">/</span>
        <span className="text-brand-black">{category.name}</span>
      </nav>

      <div className="mb-8 md:mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-black mb-2">{category.name}</h1>
        <p className="text-muted-foreground text-sm md:text-base">
          {q
            ? `Showing results for "${q}" in ${category.name}`
            : `Explore top industrial products in ${category.name}`}
        </p>
      </div>

      {category.subgroups && (
        <div className="mb-8 flex flex-wrap gap-2">
          <Link
            href={category.href}
            className={`rounded-full border px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors ${
              !q ? "bg-brand-yellow text-brand-black border-brand-yellow" : "hover:border-brand-yellow"
            }`}
          >
            All
          </Link>
          {category.subgroups.flatMap((group) =>
            group.items.map((item) => (
              <Link
                key={item}
                href={`${category.href}?q=${encodeURIComponent(item)}`}
                className={`rounded-full border px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors ${
                  q === item ? "bg-brand-yellow text-brand-black border-brand-yellow" : "hover:border-brand-yellow"
                }`}
              >
                {item}
              </Link>
            ))
          )}
        </div>
      )}

      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-6 items-start">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border bg-muted/20 p-10 text-center">
          <p className="font-semibold text-brand-black mb-2">No products found</p>
          <p className="text-sm text-muted-foreground mb-4">Try a different filter or browse all products.</p>
          <Link href="/products" className="text-sm font-semibold text-blue-600 hover:underline">
            View all products
          </Link>
        </div>
      )}
    </div>
  );
}
