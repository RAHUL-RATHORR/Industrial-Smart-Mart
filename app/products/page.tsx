import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import PageHeroBanner from "@/components/PageHeroBanner";
import { searchProducts } from "@/lib/products.server";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const products = searchProducts(q);

  return (
    <div className="bg-muted/20 min-h-screen">
      {!q ? <PageHeroBanner pageId="products" /> : null}
      <div className="container mx-auto px-4 py-10 md:py-16">
        {q ? (
          <div className="mb-6 text-center md:mb-10">
            <h1 className="mb-3 text-2xl font-black sm:text-3xl md:mb-4 md:text-4xl">Search Results</h1>
            <p className="mx-auto mb-6 max-w-2xl px-2 text-sm text-muted-foreground md:text-base">
              {`${products.length} result${products.length === 1 ? "" : "s"} for "${q}"`}
            </p>
          </div>
        ) : null}
        <div className="mx-auto mb-6 max-w-xl md:mb-10">
          <SearchBar defaultValue={q ?? ""} />
        </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6 items-start">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border bg-muted/20 p-10 text-center max-w-lg mx-auto">
          <p className="font-semibold text-brand-black mb-2">No products found</p>
          <p className="text-sm text-muted-foreground mb-4">Try searching with a different keyword or brand name.</p>
          <Link href="/products" className="link-brand text-sm">
            Clear search
          </Link>
        </div>
      )}
      </div>
    </div>
  );
}
