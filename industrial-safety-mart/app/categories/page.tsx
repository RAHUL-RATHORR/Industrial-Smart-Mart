import { categories } from "@/lib/data";
import CategoryCard from "@/components/CategoryCard";

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-10 md:py-16">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 md:mb-4">All Categories</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base px-2">Browse our complete range of industrial products, safety equipment, and power tools.</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
