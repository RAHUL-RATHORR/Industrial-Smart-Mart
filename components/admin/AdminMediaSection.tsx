"use client";

import { FormEvent, useEffect, useState } from "react";
import { ImageIcon, Pencil, Trash2 } from "lucide-react";
import type { HeroOfferBanner } from "@/lib/data";
import type { BlogPost } from "@/lib/blog";
import type { PageBanner, PromoBanner } from "@/lib/catalog/types";
import { PAGE_BANNER_IDS } from "@/lib/catalog/types";
import { Button } from "@/components/ui/button";
import { AdminField, adminCardClass, adminInputClass } from "@/components/admin/AdminForm";

export type AdminMediaSectionId = "hero" | "promo" | "pages" | "blog";

const SECTION_META: Record<AdminMediaSectionId, { title: string; description: string }> = {
  hero: {
    title: "Home Slider",
    description: "Manage homepage hero slider slides, images, and offer text.",
  },
  promo: {
    title: "Promo Cards",
    description: "Update the 4 promo image cards shown below the home slider.",
  },
  pages: {
    title: "Page Banners",
    description: "Change top banner images for blog, quote, contact, and other pages.",
  },
  blog: {
    title: "Blog Images",
    description: "Manage blog post cover images and basic blog content.",
  },
};

const emptyHeroForm = {
  title: "",
  tagline: "",
  discountLabel: "UP TO",
  discount: "50%",
  cta: "Shop Now",
  href: "/categories/safety-shoes",
  backgroundImage: "",
  productAlt: "",
};

const emptyPromoForm = {
  image: "",
  alt: "",
  link: "/categories/safety-shoes",
};

const emptyBlogForm = {
  title: "",
  excerpt: "",
  category: "",
  author: "ISM Editorial",
  date: "",
  readTime: "5 min read",
  image: "",
};

type AdminMediaSectionProps = {
  section: AdminMediaSectionId;
};

export default function AdminMediaSection({ section }: AdminMediaSectionProps) {
  const meta = SECTION_META[section];
  const [heroBanners, setHeroBanners] = useState<HeroOfferBanner[]>([]);
  const [promoBanners, setPromoBanners] = useState<PromoBanner[]>([]);
  const [pageBanners, setPageBanners] = useState<PageBanner[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [heroForm, setHeroForm] = useState(emptyHeroForm);
  const [promoForm, setPromoForm] = useState(emptyPromoForm);
  const [blogForm, setBlogForm] = useState(emptyBlogForm);
  const [pageForm, setPageForm] = useState<PageBanner | null>(null);
  const [editingHeroId, setEditingHeroId] = useState<string | null>(null);
  const [editingPromoId, setEditingPromoId] = useState<string | null>(null);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [selectedPageId, setSelectedPageId] = useState(PAGE_BANNER_IDS[0].id);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function loadSectionData() {
    setLoading(true);

    if (section === "hero") {
      const response = await fetch("/api/admin/hero-banners");
      setHeroBanners(await response.json());
    } else if (section === "promo") {
      const response = await fetch("/api/admin/promo-banners");
      setPromoBanners(await response.json());
    } else if (section === "pages") {
      const response = await fetch("/api/admin/page-banners");
      const pages = await response.json();
      setPageBanners(pages);
      const currentPage = pages.find((banner: PageBanner) => banner.id === selectedPageId) ?? pages[0];
      if (currentPage) setPageForm(currentPage);
    } else {
      const response = await fetch("/api/admin/blog-posts");
      setBlogPosts(await response.json());
    }

    setLoading(false);
  }

  useEffect(() => {
    loadSectionData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section]);

  useEffect(() => {
    const banner = pageBanners.find((item) => item.id === selectedPageId);
    if (banner) setPageForm(banner);
  }, [selectedPageId, pageBanners]);

  async function handleHeroSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    const response = await fetch(
      editingHeroId ? `/api/admin/hero-banners/${editingHeroId}` : "/api/admin/hero-banners",
      {
        method: editingHeroId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(heroForm),
      }
    );
    if (!response.ok) {
      setMessage("Could not save home slider.");
      setSaving(false);
      return;
    }
    setMessage(editingHeroId ? "Slider updated." : "Slider added.");
    setHeroForm(emptyHeroForm);
    setEditingHeroId(null);
    await loadSectionData();
    setSaving(false);
  }

  async function handlePromoSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    const response = await fetch(
      editingPromoId ? `/api/admin/promo-banners/${editingPromoId}` : "/api/admin/promo-banners",
      {
        method: editingPromoId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(promoForm),
      }
    );
    if (!response.ok) {
      setMessage("Could not save promo card.");
      setSaving(false);
      return;
    }
    setMessage(editingPromoId ? "Promo updated." : "Promo added.");
    setPromoForm(emptyPromoForm);
    setEditingPromoId(null);
    await loadSectionData();
    setSaving(false);
  }

  async function handlePageSubmit(event: FormEvent) {
    event.preventDefault();
    if (!pageForm) return;
    setSaving(true);
    setMessage("");
    const response = await fetch(`/api/admin/page-banners/${selectedPageId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: pageForm.title,
        subtitle: pageForm.subtitle,
        image: pageForm.image,
      }),
    });
    if (!response.ok) {
      setMessage("Could not save page banner.");
      setSaving(false);
      return;
    }
    setMessage("Page banner updated.");
    await loadSectionData();
    setSaving(false);
  }

  async function handleBlogSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    const response = await fetch(
      editingBlogId ? `/api/admin/blog-posts/${editingBlogId}` : "/api/admin/blog-posts",
      {
        method: editingBlogId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogForm),
      }
    );
    if (!response.ok) {
      setMessage("Could not save blog post.");
      setSaving(false);
      return;
    }
    setMessage(editingBlogId ? "Blog updated." : "Blog added.");
    setBlogForm(emptyBlogForm);
    setEditingBlogId(null);
    await loadSectionData();
    setSaving(false);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black">{meta.title}</h1>
        <p className="text-sm text-slate-500">{meta.description}</p>
      </div>

      {message ? <p className="text-sm font-medium text-green-700">{message}</p> : null}

      {loading ? (
        <p className="text-sm text-slate-500">Loading...</p>
      ) : section === "hero" ? (
        <div className="space-y-6">
          <form onSubmit={handleHeroSubmit} className={`${adminCardClass} grid gap-4 md:grid-cols-2`}>
            <h2 className="md:col-span-2 flex items-center gap-2 font-bold text-lg">
              <ImageIcon className="size-5" />
              {editingHeroId ? "Edit Home Slider" : "Add Home Slider Slide"}
            </h2>
            <AdminField label="Title">
              <input className={adminInputClass} value={heroForm.title} onChange={(e) => setHeroForm((p) => ({ ...p, title: e.target.value }))} required />
            </AdminField>
            <AdminField label="Tagline">
              <input className={adminInputClass} value={heroForm.tagline} onChange={(e) => setHeroForm((p) => ({ ...p, tagline: e.target.value }))} required />
            </AdminField>
            <AdminField label="Discount Label">
              <input className={adminInputClass} value={heroForm.discountLabel} onChange={(e) => setHeroForm((p) => ({ ...p, discountLabel: e.target.value }))} required />
            </AdminField>
            <AdminField label="Discount">
              <input className={adminInputClass} value={heroForm.discount} onChange={(e) => setHeroForm((p) => ({ ...p, discount: e.target.value }))} required />
            </AdminField>
            <AdminField label="CTA Text">
              <input className={adminInputClass} value={heroForm.cta} onChange={(e) => setHeroForm((p) => ({ ...p, cta: e.target.value }))} required />
            </AdminField>
            <AdminField label="Link URL">
              <input className={adminInputClass} value={heroForm.href} onChange={(e) => setHeroForm((p) => ({ ...p, href: e.target.value }))} required />
            </AdminField>
            <AdminField label="Slider Image URL" className="md:col-span-2">
              <input className={adminInputClass} value={heroForm.backgroundImage} onChange={(e) => setHeroForm((p) => ({ ...p, backgroundImage: e.target.value }))} placeholder="https://images.unsplash.com/..." required />
            </AdminField>
            <AdminField label="Image Alt Text" className="md:col-span-2">
              <input className={adminInputClass} value={heroForm.productAlt} onChange={(e) => setHeroForm((p) => ({ ...p, productAlt: e.target.value }))} required />
            </AdminField>
            <div className="md:col-span-2 flex gap-2">
              <Button type="submit" variant="brand" disabled={saving}>{saving ? "Saving..." : editingHeroId ? "Update Slide" : "Add Slide"}</Button>
              {editingHeroId ? <Button type="button" variant="outline" onClick={() => { setEditingHeroId(null); setHeroForm(emptyHeroForm); }}>Cancel</Button> : null}
            </div>
          </form>

          <div className={adminCardClass}>
            <h3 className="mb-4 font-bold">Home Slider Slides ({heroBanners.length})</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {heroBanners.map((banner) => (
                <div key={banner.id} className="overflow-hidden rounded-lg border border-slate-200">
                  <img src={banner.backgroundImage} alt={banner.productAlt} className="h-32 w-full object-cover" />
                  <div className="p-3">
                    <p className="font-semibold">{banner.title}</p>
                    <p className="text-xs text-slate-500">{banner.tagline}</p>
                    <div className="mt-2 flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => { setEditingHeroId(banner.id); setHeroForm({ title: banner.title, tagline: banner.tagline, discountLabel: banner.discountLabel, discount: banner.discount, cta: banner.cta, href: banner.href, backgroundImage: banner.backgroundImage, productAlt: banner.productAlt }); }}>
                        <Pencil className="size-3.5" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={async () => { if (!confirm("Delete slide?")) return; await fetch(`/api/admin/hero-banners/${banner.id}`, { method: "DELETE" }); await loadSectionData(); }}>
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : section === "promo" ? (
        <div className="space-y-6">
          <form onSubmit={handlePromoSubmit} className={`${adminCardClass} grid gap-4 md:grid-cols-2`}>
            <h2 className="md:col-span-2 font-bold text-lg">{editingPromoId ? "Edit Promo Card" : "Add Promo Card"}</h2>
            <AdminField label="Image URL" className="md:col-span-2">
              <input className={adminInputClass} value={promoForm.image} onChange={(e) => setPromoForm((p) => ({ ...p, image: e.target.value }))} required />
            </AdminField>
            <AdminField label="Alt Text">
              <input className={adminInputClass} value={promoForm.alt} onChange={(e) => setPromoForm((p) => ({ ...p, alt: e.target.value }))} required />
            </AdminField>
            <AdminField label="Link URL">
              <input className={adminInputClass} value={promoForm.link} onChange={(e) => setPromoForm((p) => ({ ...p, link: e.target.value }))} required />
            </AdminField>
            <div className="md:col-span-2 flex gap-2">
              <Button type="submit" variant="brand" disabled={saving}>{saving ? "Saving..." : editingPromoId ? "Update" : "Add"}</Button>
              {editingPromoId ? <Button type="button" variant="outline" onClick={() => { setEditingPromoId(null); setPromoForm(emptyPromoForm); }}>Cancel</Button> : null}
            </div>
          </form>
          <div className={adminCardClass}>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {promoBanners.map((banner) => (
                <div key={banner.id} className="rounded-lg border border-slate-200 p-2">
                  <img src={banner.image} alt={banner.alt} className="mb-2 h-24 w-full rounded object-cover" />
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => { setEditingPromoId(banner.id); setPromoForm({ image: banner.image, alt: banner.alt, link: banner.link }); }}><Pencil className="size-3.5" /></Button>
                    <Button size="sm" variant="destructive" onClick={async () => { if (!confirm("Delete?")) return; await fetch(`/api/admin/promo-banners/${banner.id}`, { method: "DELETE" }); await loadSectionData(); }}><Trash2 className="size-3.5" /></Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : section === "pages" ? (
        <form onSubmit={handlePageSubmit} className={`${adminCardClass} grid gap-4 md:grid-cols-2`}>
          <h2 className="md:col-span-2 font-bold text-lg">Page Banner Images</h2>
          <AdminField label="Select Page" className="md:col-span-2">
            <select className={adminInputClass} value={selectedPageId} onChange={(e) => setSelectedPageId(e.target.value as typeof selectedPageId)}>
              {PAGE_BANNER_IDS.map((page) => (
                <option key={page.id} value={page.id}>{page.label}</option>
              ))}
            </select>
          </AdminField>
          {pageForm ? (
            <>
              <AdminField label="Page Title">
                <input className={adminInputClass} value={pageForm.title} onChange={(e) => setPageForm((p) => p ? { ...p, title: e.target.value } : p)} required />
              </AdminField>
              <AdminField label="Subtitle">
                <input className={adminInputClass} value={pageForm.subtitle} onChange={(e) => setPageForm((p) => p ? { ...p, subtitle: e.target.value } : p)} required />
              </AdminField>
              <AdminField label="Banner Image URL" className="md:col-span-2">
                <input className={adminInputClass} value={pageForm.image} onChange={(e) => setPageForm((p) => p ? { ...p, image: e.target.value } : p)} required />
              </AdminField>
              <div className="md:col-span-2">
                <img src={pageForm.image} alt={pageForm.title} className="h-40 w-full rounded-lg object-cover" />
              </div>
              <div className="md:col-span-2">
                <Button type="submit" variant="brand" disabled={saving}>{saving ? "Saving..." : "Save Page Banner"}</Button>
              </div>
            </>
          ) : null}
        </form>
      ) : (
        <div className="space-y-6">
          <form onSubmit={handleBlogSubmit} className={`${adminCardClass} grid gap-4 md:grid-cols-2`}>
            <h2 className="md:col-span-2 font-bold text-lg">{editingBlogId ? "Edit Blog Post" : "Add Blog Post"}</h2>
            <AdminField label="Title" className="md:col-span-2">
              <input className={adminInputClass} value={blogForm.title} onChange={(e) => setBlogForm((p) => ({ ...p, title: e.target.value }))} required />
            </AdminField>
            <AdminField label="Category">
              <input className={adminInputClass} value={blogForm.category} onChange={(e) => setBlogForm((p) => ({ ...p, category: e.target.value }))} required />
            </AdminField>
            <AdminField label="Date">
              <input className={adminInputClass} value={blogForm.date} onChange={(e) => setBlogForm((p) => ({ ...p, date: e.target.value }))} placeholder="Mar 12, 2026" required />
            </AdminField>
            <AdminField label="Cover Image URL" className="md:col-span-2">
              <input className={adminInputClass} value={blogForm.image} onChange={(e) => setBlogForm((p) => ({ ...p, image: e.target.value }))} required />
            </AdminField>
            <AdminField label="Excerpt" className="md:col-span-2">
              <textarea className={`${adminInputClass} min-h-20`} value={blogForm.excerpt} onChange={(e) => setBlogForm((p) => ({ ...p, excerpt: e.target.value }))} required />
            </AdminField>
            <div className="md:col-span-2 flex gap-2">
              <Button type="submit" variant="brand" disabled={saving}>{saving ? "Saving..." : editingBlogId ? "Update Blog" : "Add Blog"}</Button>
              {editingBlogId ? <Button type="button" variant="outline" onClick={() => { setEditingBlogId(null); setBlogForm(emptyBlogForm); }}>Cancel</Button> : null}
            </div>
          </form>
          <div className={adminCardClass}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <div key={post.id} className="overflow-hidden rounded-lg border border-slate-200">
                  <img src={post.image} alt={post.title} className="h-28 w-full object-cover" />
                  <div className="p-3">
                    <p className="line-clamp-2 text-sm font-semibold">{post.title}</p>
                    <div className="mt-2 flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => { setEditingBlogId(post.id); setBlogForm({ title: post.title, excerpt: post.excerpt, category: post.category, author: post.author, date: post.date, readTime: post.readTime, image: post.image }); }}>
                        <Pencil className="size-3.5" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={async () => { if (!confirm("Delete blog?")) return; await fetch(`/api/admin/blog-posts/${post.id}`, { method: "DELETE" }); await loadSectionData(); }}>
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
