import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { searchProducts } from "@/lib/products";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const products = searchProducts(q);

  return (
    <div className="container mx-auto px-4 py-10 md:py-16">
      <div className="text-center mb-6 md:mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 md:mb-4">
          {q ? `Search Results` : "All Products"}
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base px-2 mb-6">
          {q
            ? `${products.length} result${products.length === 1 ? "" : "s"} for "${q}"`
            : "Discover our wide selection of industrial safety and power tools."}
        </p>
        <div className="max-w-xl mx-auto">
          <SearchBar defaultValue={q ?? ""} />
        </div>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border bg-muted/20 p-10 text-center max-w-lg mx-auto">
          <p className="font-semibold text-brand-black mb-2">No products found</p>
          <p className="text-sm text-muted-foreground mb-4">Try searching with a different keyword or brand name.</p>
          <Link href="/products" className="text-sm font-semibold text-blue-600 hover:underline">
            Clear search
          </Link>
        </div>
      )}
    </div>
  );
}
