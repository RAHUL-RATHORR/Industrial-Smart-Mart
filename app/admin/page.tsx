import { readCatalog } from "@/lib/catalog/store";
import { adminCardClass } from "@/components/admin/AdminForm";
import { FolderTree, ImageIcon, Package, Tags } from "lucide-react";

export default function AdminDashboardPage() {
  const catalog = readCatalog();

  const stats = [
    { label: "Categories", value: catalog.categories.length, icon: FolderTree },
    { label: "Products", value: catalog.products.length, icon: Package },
    { label: "Brands", value: catalog.brands.length, icon: Tags },
    { label: "Slider Slides", value: catalog.heroBanners.length, icon: ImageIcon },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black">Dashboard</h1>
        <p className="text-sm text-slate-500">Welcome back. Manage your catalog from here.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={adminCardClass}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <p className="mt-1 text-3xl font-black">{stat.value}</p>
                </div>
                <span className="inline-flex size-10 items-center justify-center rounded-lg bg-[#f4b400]/15 text-[#b88600]">
                  <Icon className="size-5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className={adminCardClass}>
        <h2 className="font-bold text-lg mb-2">Quick Tips</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
          <li>Add categories first, then products and brands.</li>
          <li>Changes save instantly and appear on the website.</li>
          <li>Manage sliders & page banners from Sliders & Pages section.</li>
        </ul>
      </div>
    </div>
  );
}
