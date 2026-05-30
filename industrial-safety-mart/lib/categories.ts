import { categories, Category, getProductsByCategory } from "./data";
import { Product } from "./data";

export function getCategorySlug(category: Category): string {
  return category.href.replace("/categories/", "");
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => getCategorySlug(category) === slug);
}

export function getCategoryProducts(categoryId: string, query?: string): Product[] {
  let products = getProductsByCategory(categoryId, 12);

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
