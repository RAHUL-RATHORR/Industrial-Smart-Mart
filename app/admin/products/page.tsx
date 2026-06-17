"use client";

import { FormEvent, useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import type { Category, Product } from "@/lib/data";
import type { CatalogProduct } from "@/lib/catalog/types";
import { Button } from "@/components/ui/button";
import { AdminField, adminCardClass, adminInputClass } from "@/components/admin/AdminForm";

const emptyForm = {
  name: "",
  description: "",
  brand: "",
  image: "",
  categoryId: "",
  price: "",
  mrp: "",
  discount: "",
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function loadData() {
    setLoading(true);
    const [productsRes, categoriesRes] = await Promise.all([
      fetch("/api/admin/products"),
      fetch("/api/admin/categories"),
    ]);
    setProducts(await productsRes.json());
    const categoryData = await categoriesRes.json();
    setCategories(categoryData);
    if (!form.categoryId && categoryData[0]) {
      setForm((prev) => ({ ...prev, categoryId: categoryData[0].id }));
    }
    setLoading(false);
  }

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function resetForm() {
    setForm({
      ...emptyForm,
      categoryId: categories[0]?.id ?? "",
    });
    setEditingId(null);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    const payload = {
      ...form,
      price: form.price || undefined,
      mrp: form.mrp || undefined,
      discount: form.discount || undefined,
    };

    const response = await fetch(
      editingId ? `/api/admin/products/${editingId}` : "/api/admin/products",
      {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      setMessage("Could not save product.");
      setSaving(false);
      return;
    }

    setMessage(editingId ? "Product updated." : "Product added.");
    resetForm();
    await loadData();
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (editingId === id) resetForm();
    await loadData();
  }

  function startEdit(product: CatalogProduct) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      description: product.description,
      brand: product.brand,
      image: product.image,
      categoryId: product.categoryId,
      price: product.price ?? "",
      mrp: product.mrp ?? "",
      discount: product.discount ?? "",
    });
  }

  function getCategoryName(categoryId: string) {
    return categories.find((category) => category.id === categoryId)?.name ?? categoryId;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black">Products</h1>
        <p className="text-sm text-slate-500">Add or edit products for your catalog.</p>
      </div>

      <form onSubmit={handleSubmit} className={`${adminCardClass} grid gap-4 md:grid-cols-2`}>
        <h2 className="md:col-span-2 font-bold text-lg flex items-center gap-2">
          <Plus className="size-5" />
          {editingId ? "Edit Product" : "Add Product"}
        </h2>

        <AdminField label="Product Name">
          <input
            className={adminInputClass}
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            required
          />
        </AdminField>

        <AdminField label="Brand">
          <input
            className={adminInputClass}
            value={form.brand}
            onChange={(event) => setForm((prev) => ({ ...prev, brand: event.target.value }))}
            required
          />
        </AdminField>

        <AdminField label="Category">
          <select
            className={adminInputClass}
            value={form.categoryId}
            onChange={(event) => setForm((prev) => ({ ...prev, categoryId: event.target.value }))}
            required
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </AdminField>

        <AdminField label="Image URL">
          <input
            className={adminInputClass}
            value={form.image}
            onChange={(event) => setForm((prev) => ({ ...prev, image: event.target.value }))}
            placeholder="https://images.unsplash.com/..."
            required
          />
        </AdminField>

        <AdminField label="Price">
          <input
            className={adminInputClass}
            value={form.price}
            onChange={(event) => setForm((prev) => ({ ...prev, price: event.target.value }))}
            placeholder="₹1,999"
          />
        </AdminField>

        <AdminField label="MRP">
          <input
            className={adminInputClass}
            value={form.mrp}
            onChange={(event) => setForm((prev) => ({ ...prev, mrp: event.target.value }))}
            placeholder="₹3,499"
          />
        </AdminField>

        <AdminField label="Discount">
          <input
            className={adminInputClass}
            value={form.discount}
            onChange={(event) => setForm((prev) => ({ ...prev, discount: event.target.value }))}
            placeholder="40% OFF"
          />
        </AdminField>

        <AdminField label="Description" className="md:col-span-2">
          <textarea
            className={`${adminInputClass} min-h-24`}
            value={form.description}
            onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
            required
          />
        </AdminField>

        <div className="md:col-span-2 flex flex-wrap gap-2">
          <Button type="submit" variant="brand" disabled={saving}>
            {saving ? "Saving..." : editingId ? "Update Product" : "Add Product"}
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
        <h2 className="font-bold text-lg mb-4">All Products ({products.length})</h2>
        {loading ? (
          <p className="text-sm text-slate-500">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-slate-500">
                  <th className="py-2 pr-4">Product</th>
                  <th className="py-2 pr-4">Brand</th>
                  <th className="py-2 pr-4">Category</th>
                  <th className="py-2 pr-4">Price</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-slate-100">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <img src={product.image} alt="" className="size-10 rounded object-cover" />
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4">{product.brand}</td>
                    <td className="py-3 pr-4">{getCategoryName(product.categoryId)}</td>
                    <td className="py-3 pr-4">{product.price ?? "—"}</td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => startEdit(product)}>
                          <Pencil className="size-3.5" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(product.id)}>
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
