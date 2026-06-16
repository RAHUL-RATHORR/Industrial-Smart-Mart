
export type HeroOfferBanner = {
  id: string;
  type: "offer";
  href: string;
  title: string;
  tagline: string;
  discountLabel: string;
  discount: string;
  cta: string;
  backgroundImage: string;
  productAlt: string;
};

const heroImg = (id: string) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=1400&h=600&auto=format&fit=crop`;

const catImg = (id: string) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=500&auto=format&fit=crop`;

/** Hero slider — full-bleed sale banners */
export const heroBanners: HeroOfferBanner[] = [
  {
    id: "hero-offer-1",
    type: "offer",
    href: "/categories/safety-shoes",
    title: "Safety Shoes",
    tagline: "Steel toe & industrial footwear",
    discountLabel: "UP TO",
    discount: "50%",
    cta: "Shop Now",
    backgroundImage: heroImg("1542291026-7eec264c27ff"),
    productAlt: "Safety shoes sale",
  },
  {
    id: "hero-offer-2",
    type: "offer",
    href: "/categories/welding",
    title: "Welding Machines",
    tagline: "ARC, MIG & accessories",
    discountLabel: "FLAT",
    discount: "70%",
    cta: "Shop Now",
    backgroundImage: heroImg("1504917595217-d4dc5ebe6122"),
    productAlt: "Welding machines sale",
  },
  {
    id: "hero-offer-3",
    type: "offer",
    href: "/categories/reflective-jackets",
    title: "Reflective Jackets",
    tagline: "High visibility workwear",
    discountLabel: "UP TO",
    discount: "50%",
    cta: "Shop Now",
    backgroundImage: heroImg("1581092160562-40aa08e78837"),
    productAlt: "Reflective jackets sale",
  },
  {
    id: "hero-offer-4",
    type: "offer",
    href: "/categories/safety-helmets",
    title: "Safety Helmets",
    tagline: "HDPE & ratchet helmets",
    discountLabel: "UP TO",
    discount: "50%",
    cta: "Shop Now",
    backgroundImage: heroImg("1581092160562-40aa08e78837"),
    productAlt: "Safety supplies sale",
  },
];

export const promoBanners = [
  {
    id: "promo-1",
    image: catImg("1542291026-7eec264c27ff"),
    alt: "Safety Shoes Offer",
    link: "/categories/safety-shoes",
  },
  {
    id: "promo-2",
    image: catImg("1504917595217-d4dc5ebe6122"),
    alt: "Welding Machines Offer",
    link: "/categories/welding",
  },
  {
    id: "promo-3",
    image: catImg("1581092160562-40aa08e78837"),
    alt: "Reflective Jackets Offer",
    link: "/categories/reflective-jackets",
  },
  {
    id: "promo-4",
    image: catImg("1531834685032-c34bf0d84c77"),
    alt: "Safety Helmets Offer",
    link: "/categories/safety-helmets",
  },
];

export interface Product {
  id: string;
  name: string;
  description: string;
  brand: string;
  image: string;
  price?: string;
  mrp?: string;
  discount?: string;
  rating?: number;
  reviews?: number;
}

/** Stable rating/reviews for every product card and detail page */
export function getProductDisplayRating(product: Product): { rating: number; reviews: number } {
  if (product.rating != null && product.reviews != null) {
    return { rating: product.rating, reviews: product.reviews };
  }

  let hash = 0;
  for (let i = 0; i < product.id.length; i++) {
    hash = (hash + product.id.charCodeAt(i) * (i + 1)) | 0;
  }
  const abs = Math.abs(hash);

  return {
    rating: Math.round((4.5 + (abs % 5) * 0.1) * 10) / 10,
    reviews: 12 + (abs % 248),
  };
}

export interface SubCategoryGroup {
  title: string;
  items: string[];
}

export interface Category {
  id: string;
  name: string;
  image: string;
  href: string;
  productCount: number;
  /** Unique pastel tile background per category */
  tileBg: string;
  subgroups?: SubCategoryGroup[];
}

/** Client category sequence — 125 products total */
export const categories: Category[] = [
  {
    id: "cat-safety-shoes",
    name: "Safety Shoes",
    productCount: 20,
    image: catImg("1542291026-7eec264c27ff"),
    tileBg: "bg-cat-safety",
    href: "/categories/safety-shoes",
    subgroups: [{ title: "Safety Shoes", items: ["Steel Toe Shoes", "PU Sole Shoes", "Double Density", "Gumboots"] }],
  },
  {
    id: "cat-pvc-gumboots",
    name: "PVC GumBoots",
    productCount: 15,
    image: catImg("1621905251189-08b45d6a269e"),
    tileBg: "bg-cat-tools",
    href: "/categories/pvc-gumboots",
    subgroups: [{ title: "PVC GumBoots", items: ["Knee Length", "Ankle Length", "Food Grade", "Chemical Resistant"] }],
  },
  {
    id: "cat-reflective-jackets",
    name: "Reflective Jackets",
    productCount: 10,
    image: catImg("1621905251189-08b45d6a269e"),
    tileBg: "bg-cat-electrical",
    href: "/categories/reflective-jackets",
    subgroups: [{ title: "Reflective Jackets", items: ["Orange Mesh", "Green Mesh", "Polyester", "Cotton"] }],
  },
  {
    id: "cat-safety-helmets",
    name: "Safety Helmets",
    productCount: 5,
    image: catImg("1504307651254-35680f356dfd"),
    tileBg: "bg-cat-construction",
    href: "/categories/safety-helmets",
    subgroups: [{ title: "Safety Helmets", items: ["HDPE Helmets", "Ratchet Type", "Ventilated", "With Chin Strap"] }],
  },
  {
    id: "cat-safety-gloves",
    name: "Safety Gloves",
    productCount: 15,
    image: catImg("1504917595217-d4dc5ebe6122"),
    tileBg: "bg-cat-medical",
    href: "/categories/safety-gloves",
    subgroups: [{ title: "Safety Gloves", items: ["Leather Gloves", "Latex Coated", "Cut Resistant", "Welding Gloves"] }],
  },
  {
    id: "cat-welding",
    name: "Welding Machine & Accessories",
    productCount: 30,
    image: catImg("1504917595217-d4dc5ebe6122"),
    tileBg: "bg-cat-tools",
    href: "/categories/welding",
    subgroups: [{ title: "Welding", items: ["ARC Machines", "MIG Welders", "Welding Rods", "Helmets & Gloves"] }],
  },
  {
    id: "cat-disposable-ppe",
    name: "Disposable PPE Products",
    productCount: 10,
    image: catImg("1581092160562-40aa08e78837"),
    tileBg: "bg-cat-medical",
    href: "/categories/disposable-ppe",
    subgroups: [{ title: "Disposable PPE", items: ["Face Masks", "Shoe Covers", "Head Covers", "Aprons"] }],
  },
  {
    id: "cat-face-ear",
    name: "Face & Ear Protection",
    productCount: 15,
    image: catImg("1531834685032-c34bf0d84c77"),
    tileBg: "bg-cat-packaging",
    href: "/categories/face-ear-protection",
    subgroups: [{ title: "Face & Ear", items: ["Safety Goggles", "Face Shields", "Ear Muffs", "Ear Plugs"] }],
  },
  {
    id: "cat-road-safety",
    name: "Road Safety",
    productCount: 5,
    image: catImg("1558618666-fcd25c85cd64"),
    tileBg: "bg-cat-express",
    href: "/categories/road-safety",
    subgroups: [{ title: "Road Safety", items: ["Traffic Cones", "Warning Tapes", "Barricades", "Reflective Strips"] }],
  },
];

// Helper to generate dynamic products for each category
export const getProductsByCategory = (categoryId: string, count?: number): Product[] => {
  const category = categories.find(c => c.id === categoryId);
  const catName = category ? category.name : "Industrial Product";
  const catImage = category ? category.image : catImg("1531834685032-c34bf0d84c77");
  const itemCount = count ?? category?.productCount ?? 6;

  const brands = ["SafeHawk", "Accord", "Safegrip", "Agreson", "Prenav", "Karam", "3M", "Allen Cooper"];

  return Array.from({ length: itemCount }).map((_, i) => {
    // Generate a pseudo-random price
    const priceValue = 500 + ((i * 1234) % 9500);
    const brandName = brands[(i + categoryId.length) % brands.length];

    const rating = Math.round((4.5 + ((i * 3 + categoryId.length) % 5) * 0.1) * 10) / 10;
    const reviews = 12 + ((i * 47 + categoryId.length * 13) % 248);

    const mrpValue = Math.round(priceValue * (1.55 + (i % 4) * 0.15));
    const discountPct = Math.max(10, Math.round((1 - priceValue / mrpValue) * 100));

    return {
      id: `prod-${categoryId}-${i}`,
      name: `Premium ${catName} Item ${i + 1}`,
      description: `High quality ${catName.toLowerCase()} designed for heavy industrial usage. Comes with standard brand warranty.`,
      brand: brandName,
      image: catImage,
      price: `₹${priceValue.toLocaleString("en-IN")}`,
      mrp: `₹${mrpValue.toLocaleString("en-IN")}`,
      discount: `${discountPct}% OFF`,
      rating,
      reviews,
    };
  });
};

export const featuredProducts: Product[] = getProductsByCategory("cat-safety-shoes", 4);

export const industrialBrands = [
  { name: "SafeHawk", logo: "https://placehold.co/240x100/fdf6e3/1a1a1a?text=SafeHawk&font=roboto" },
  { name: "Accord", logo: "https://placehold.co/240x100/fdf6e3/1a1a1a?text=Accord&font=roboto" },
  { name: "Safegrip", logo: "https://placehold.co/240x100/fdf6e3/1a1a1a?text=Safegrip&font=roboto" },
  { name: "Agreson", logo: "https://placehold.co/240x100/fdf6e3/1a1a1a?text=Agreson&font=roboto" },
  { name: "Prenav", logo: "https://placehold.co/240x100/fdf6e3/1a1a1a?text=Prenav&font=roboto" },
];

export type IndustrialBrand = (typeof industrialBrands)[number];

export function getCategoryBrands(categoryId: string, count = 4): IndustrialBrand[] {
  const index = Math.max(
    0,
    categories.findIndex((category) => category.id === categoryId)
  );
  return Array.from({ length: count }, (_, i) => industrialBrands[(index + i) % industrialBrands.length]);
}

export type CategoryRelatedItem = {
  title: string;
  href: string;
  image: string;
};

export function getCategoryRelatedItems(category: Category, count = 4): CategoryRelatedItem[] {
  const items =
    category.subgroups?.flatMap((group) => group.items.map((item) => ({ item, group: group.title }))) ?? [];

  if (items.length === 0) {
    return Array.from({ length: count }, (_, i) => ({
      title: category.name,
      href: category.href,
      image: category.image,
    }));
  }

  return items.slice(0, count).map(({ item }, i) => ({
    title: item,
    href: `${category.href}?q=${encodeURIComponent(item)}`,
    image: category.image,
  }));
}

export const bestsellers: Product[] = [
  {
    id: "bs-1",
    name: "Zokasa Rio Pro 50W 2400rpm 1 Star Black Pedestal Fan",
    description: "High speed pedestal fan with adjustable height.",
    brand: "Zokasa",
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?q=80&w=400", // Generic image
    price: "₹1,419",
    mrp: "₹3,599",
    discount: "60% OFF",
    rating: 4.8,
    reviews: 15
  },
  {
    id: "bs-2",
    name: "FAB 1 Sqmm Single Core Red FR PVC Cable",
    description: "Fire retardant PVC insulated wire.",
    brand: "FAB",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=400",
    price: "₹469",
    mrp: "₹1,600",
    discount: "70% OFF",
    rating: 4.7,
    reviews: 244
  },
  {
    id: "bs-3",
    name: "XLNT 0-2300rpm 21V 450Nm Alloy Steel Cordless Wrench",
    description: "Heavy duty cordless impact wrench.",
    brand: "XLNT",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=400",
    price: "₹2,699",
    mrp: "₹5,999",
    discount: "55% OFF",
    rating: 4.8,
    reviews: 13
  },
  {
    id: "bs-4",
    name: "Activa Gracia 28W 390rpm 3 Blade Silver Ceiling Fan",
    description: "Energy efficient BLDC ceiling fan with remote.",
    brand: "Activa",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=400",
    price: "₹2,069",
    mrp: "₹4,990",
    discount: "58% OFF",
    rating: 4.7,
    reviews: 111
  },
  {
    id: "bs-5",
    name: "Aplus 12 Litre Hand Operating Milking Machine",
    description: "Manual milking machine for small farms.",
    brand: "Aplus",
    image: "https://images.unsplash.com/photo-1592982537447-6f2963162b77?q=80&w=800&h=300&auto=format&fit=crop",
    price: "₹5,784",
    mrp: "₹10,000",
    discount: "42% OFF",
    rating: 4.7,
    reviews: 55
  },
  {
    id: "bs-6",
    name: "SafeHawk Steel Toe Industrial Safety Shoes",
    description: "Double density sole with anti-slip grip for factory use.",
    brand: "SafeHawk",
    image: catImg("1542291026-7eec264c27ff"),
    price: "₹1,899",
    mrp: "₹3,499",
    discount: "46% OFF",
    rating: 4.9,
    reviews: 87
  },
];

export const whyChooseUs = [
  { title: "Bulk Orders", desc: "Special pricing for wholesale", icon: "Package" },
  { title: "Fast Response", desc: "Instant quote on WhatsApp", icon: "Zap" },
  { title: "Industrial Quality", desc: "100% genuine products", icon: "ShieldCheck" },
  { title: "Trusted Supplier", desc: "500+ corporate clients", icon: "Award" },
];

export interface RelatedItem {
  id: string;
  title: string;
  image: string;
  count: number;
}

export const recentlyViewedItems: RelatedItem[] = categories.slice(0, 5).map((cat) => ({
  id: `rv-${cat.id}`,
  title: cat.name,
  image: cat.image.replace("w=500", "w=200"),
  count: cat.productCount,
}));
