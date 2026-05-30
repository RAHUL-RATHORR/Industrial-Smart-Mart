import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-6xl font-black text-brand-black mb-2">404</h1>
      <p className="text-lg text-muted-foreground mb-8">Page not found</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-lg bg-brand-yellow px-6 py-2.5 text-sm font-bold text-brand-black hover:bg-brand-yellow/90"
        >
          Go Home
        </Link>
        <Link
          href="/products"
          className="rounded-lg border px-6 py-2.5 text-sm font-semibold hover:border-brand-yellow hover:text-brand-yellow"
        >
          Browse Products
        </Link>
      </div>
    </div>
  );
}
