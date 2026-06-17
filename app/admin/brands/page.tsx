"use client";

import { FormEvent, useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import type { Category } from "@/lib/data";
import type { CatalogBrand } from "@/lib/catalog/types";
import { Button } from "@/components/ui/button";
import { AdminField, adminCardClass, adminInputClass } from "@/components/admin/AdminForm";

const emptyForm = {
  name: "",
  logo: "",
  categoryIds: [] as string[],
};

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState<CatalogBrand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function loadData() {
    setLoading(true);
    const [brandsRes, categoriesRes] = await Promise.all([
      fetch("/api/admin/brands"),
      fetch("/api/admin/categories"),
    ]);
    setBrands(await brandsRes.json());
    setCategories(await categoriesRes.json());
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  function toggleCategory(categoryId: string) {
    setForm((prev) => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(categoryId)
        ? prev.categoryIds.filter((id) => id !== categoryId)
        : [...prev.categoryIds, categoryId],
    }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    const response = await fetch(editingId ? `/api/admin/brands/${editingId}` : "/api/admin/brands", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      setMessage("Could not save brand.");
      setSaving(false);
      return;
    }

    setMessage(editingId ? "Brand updated." : "Brand added.");
    resetForm();
    await loadData();
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this brand?")) return;
    await fetch(`/api/admin/brands/${id}`, { method: "DELETE" });
    if (editingId === id) resetForm();
    await loadData();
  }

  function startEdit(brand: CatalogBrand) {
    setEditingId(brand.id);
    setForm({
      name: brand.name,
      logo: brand.logo,
      categoryIds: brand.categoryIds ?? [],
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black">Brands</h1>
        <p className="text-sm text-slate-500">Manage trusted brand logos shown on the site.</p>
      </div>

      <form onSubmit={handleSubmit} className={`${adminCardClass} grid gap-4 md:grid-cols-2`}>
        <h2 className="md:col-span-2 font-bold text-lg flex items-center gap-2">
          <Plus className="size-5" />
          {editingId ? "Edit Brand" : "Add Brand"}
        </h2>

        <AdminField label="Brand Name">
          <input
            className={adminInputClass}
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            required
          />
        </AdminField>

        <AdminField label="Logo URL">
          <input
            className={adminInputClass}
            value={form.logo}
            onChange={(event) => setForm((prev) => ({ ...prev, logo: event.target.value }))}
            placeholder="https://placehold.co/240x100/..."
            required
          />
        </AdminField>

        <AdminField label="Link to Categories" className="md:col-span-2">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const selected = form.categoryIds.includes(category.id);
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => toggleCategory(category.id)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold border ${
                    selected
                      ? "bg-[#f4b400] text-white border-[#f4b400]"
                      : "bg-white text-slate-600 border-slate-300"
                  }`}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
        </AdminField>

        <div className="md:col-span-2 flex flex-wrap gap-2">
          <Button type="submit" variant="brand" disabled={saving}>
            {saving ? "Saving..." : editingId ? "Update Brand" : "Add Brand"}
          </Button>
          {editingId ? (
            <Button type="button" variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          ) : null}
        </div>
        {message ? <p className="md:col-span-2 text-sm text-green-700">{message}</p> : null}
      </form>

      <div className={adminCardClass}>
        <h2 className="font-bold text-lg mb-4">All Brands ({brands.length})</h2>
        {loading ? (
          <p className="text-sm text-slate-500">Loading...</p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {brands.map((brand) => (
              <div key={brand.id} className="rounded-lg border border-slate-200 p-3">
                <img src={brand.logo} alt={brand.name} className="mb-2 h-12 w-full object-contain" />
                <p className="font-semibold">{brand.name}</p>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => startEdit(brand)}>
                    <Pencil className="size-3.5" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(brand.id)}>
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
