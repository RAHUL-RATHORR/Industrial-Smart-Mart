export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
};

export const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    slug: "how-to-choose-industrial-safety-shoes",
    title: "How to Choose the Right Industrial Safety Shoes for Your Workforce",
    excerpt:
      "Steel toe, anti-slip sole, and comfort matter on long factory shifts. Learn what to check before placing a bulk safety footwear order.",
    category: "Safety Shoes",
    author: "ISM Editorial",
    date: "Mar 12, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "blog-2",
    slug: "reflective-jacket-buying-guide",
    title: "Reflective Jacket Buying Guide for Construction & Road Sites",
    excerpt:
      "High-visibility jackets reduce night-shift risks. Compare fabric weight, reflective tape quality, and ISI standards for site compliance.",
    category: "Reflective Jackets",
    author: "ISM Editorial",
    date: "Mar 8, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "blog-3",
    slug: "welding-safety-essentials",
    title: "Welding Safety Essentials Every Workshop Must Stock",
    excerpt:
      "From welding helmets to heat-resistant gloves, here is a practical checklist for SMEs setting up a safer fabrication unit.",
    category: "Welding",
    author: "ISM Editorial",
    date: "Feb 28, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "blog-4",
    slug: "safety-helmet-standards-india",
    title: "Safety Helmet Standards in India: What Buyers Should Verify",
    excerpt:
      "Not all helmets offer the same impact protection. Understand shell material, chin strap quality, and certification labels before procurement.",
    category: "Safety Helmets",
    author: "ISM Editorial",
    date: "Feb 20, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1581094794359-85a9f8073a6e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "blog-5",
    slug: "disposable-ppe-cost-control",
    title: "Disposable PPE: Smart Bulk Buying Tips for Factories",
    excerpt:
      "Masks, gloves, and coveralls are daily consumables. See how to balance quality, shelf life, and per-worker cost on repeat orders.",
    category: "Disposable PPE",
    author: "ISM Editorial",
    date: "Feb 14, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1584036562875-038177750e9f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "blog-6",
    slug: "road-safety-equipment-checklist",
    title: "Road Safety Equipment Checklist for Contractors & Municipal Projects",
    excerpt:
      "Cones, barricades, and warning signs keep crews protected. Use this starter list for highway maintenance and urban infrastructure jobs.",
    category: "Road Safety",
    author: "ISM Editorial",
    date: "Feb 5, 2026",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop",
  },
];
