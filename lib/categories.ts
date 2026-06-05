import { categories, Category, getProductsByCategory } from "./data";
import { Product } from "./data";

export function getCategorySlug(category: Category): string {
  return category.href.replace("/categories/", "");
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => getCategorySlug(category) === slug);
}

export function getCategoryProducts(categoryId: string, query?: string): Product[] {
  const category = categories.find((c) => c.id === categoryId);
  const count = Math.min(category?.productCount ?? 12, 12);
  let products = getProductsByCategory(categoryId, count);

  if (query?.trim()) {
    const term = query.trim().toLowerCase();
    products = products.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.brand.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term)
    );
  }

  return products;
}
