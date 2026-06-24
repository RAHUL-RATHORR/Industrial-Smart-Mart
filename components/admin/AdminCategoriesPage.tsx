"use client";

import { FormEvent, useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import type { Category } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { AdminField, adminCardClass, adminInputClass } from "@/components/admin/AdminForm";

const TILE_OPTIONS = [
  "bg-cat-safety",
  "bg-cat-tools",
  "bg-cat-hivis",
  "bg-cat-welding",
  "bg-cat-electrical",
  "bg-cat-construction",
  "bg-cat-medical",
  "bg-cat-packaging",
  "bg-cat-express",
];

const emptyForm = {
  name: "",
  image: "",
  tileBg: TILE_OPTIONS[0],
};

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function loadCategories() {
    setLoading(true);
    const response = await fetch("/api/admin/categories");
    const data = await response.json();
    setCategories(data);
    setLoading(false);
  }

  useEffect(() => {
    loadCategories();
  }, []);

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    const payload = { ...form };
    const response = await fetch(
      editingId ? `/api/admin/categories/${editingId}` : "/api/admin/categories",
      {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      setMessage("Could not save category.");
      setSaving(false);
      return;
    }

    setMessage(editingId ? "Category updated." : "Category added.");
    resetForm();
    await loadCategories();
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this category and its products?")) return;
    await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    if (editingId === id) resetForm();
    await loadCategories();
  }

  function startEdit(category: Category) {
    setEditingId(category.id);
    setForm({
      name: category.name,
      image: category.image,
      tileBg: category.tileBg,
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black">Categories</h1>
        <p className="text-sm text-slate-500">Add or edit product categories.</p>
      </div>

      <form onSubmit={handleSubmit} className={`${adminCardClass} grid gap-4 md:grid-cols-2`}>
        <h2 className="md:col-span-2 font-bold text-lg flex items-center gap-2">
          <Plus className="size-5" />
          {editingId ? "Edit Category" : "Add Category"}
        </h2>

        <AdminField label="Category Name">
          <input
            className={adminInputClass}
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            required
          />
        </AdminField>

        <AdminField label="Tile Color">
          <select
            className={adminInputClass}
            value={form.tileBg}
            onChange={(event) => setForm((prev) => ({ ...prev, tileBg: event.target.value }))}
          >
            {TILE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </AdminField>

        <AdminField label="Image URL" className="md:col-span-2">
          <input
            className={adminInputClass}
            value={form.image}
            onChange={(event) => setForm((prev) => ({ ...prev, image: event.target.value }))}
            placeholder="https://images.unsplash.com/..."
            required
          />
        </AdminField>

        <div className="md:col-span-2 flex flex-wrap gap-2">
          <Button type="submit" variant="brand" disabled={saving}>
            {saving ? "Saving..." : editingId ? "Update Category" : "Add Category"}
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
        <h2 className="font-bold text-lg mb-4">All Categories ({categories.length})</h2>
        {loading ? (
          <p className="text-sm text-slate-500">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-slate-500">
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Products</th>
                  <th className="py-2 pr-4">Link</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id} className="border-b border-slate-100">
                    <td className="py-3 pr-4 font-medium">{category.name}</td>
                    <td className="py-3 pr-4">{category.productCount}</td>
                    <td className="py-3 pr-4 text-slate-500">{category.href}</td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => startEdit(category)}>
                          <Pencil className="size-3.5" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(category.id)}>
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
