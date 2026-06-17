import CategoryCard from "@/components/CategoryCard";
import PageHeroBanner from "@/components/PageHeroBanner";
import { getCategories } from "@/lib/categories";

export default function CategoriesPage() {
  const categories = getCategories();

  return (
    <div className="bg-muted/20 min-h-screen">
      <PageHeroBanner pageId="categories" />
      <div className="container mx-auto px-4 py-10 md:py-16">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
      </div>
    </div>
  );
}
