
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

/** Hero slider — full-bleed sale banners */
export const heroBanners: HeroOfferBanner[] = [
  {
    id: "hero-offer-1",
    type: "offer",
    href: "/categories/office",
    title: "Office Furniture",
    tagline: "Chairs, desks & workspace deals",
    discountLabel: "UP TO",
    discount: "50%",
    cta: "Shop Now",
    backgroundImage: heroImg("1497366216548-375260702dfb"),
    productAlt: "Office furniture sale",
  },
  {
    id: "hero-offer-2",
    type: "offer",
    href: "/categories/tools",
    title: "Industrial Tools",
    tagline: "Drills, grinders & power tools",
    discountLabel: "FLAT",
    discount: "70%",
    cta: "Shop Now",
    backgroundImage: heroImg("1504148455328-c376907d081c"),
    productAlt: "Industrial tools sale",
  },
  {
    id: "hero-offer-3",
    type: "offer",
    href: "/categories/electrical",
    title: "Electrical & Wires",
    tagline: "Cables, panels & safety gear",
    discountLabel: "UP TO",
    discount: "50%",
    cta: "Shop Now",
    backgroundImage: heroImg("1621905251189-08b45d6a269e"),
    productAlt: "Electrical sale",
  },
  {
    id: "hero-offer-4",
    type: "offer",
    href: "/categories/safety",
    title: "Safety Supplies",
    tagline: "Helmets, gloves & PPE kits",
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
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&h=300&fit=crop",
    alt: "Office Furniture Offer",
    link: "/categories/office"
  },
  {
    id: "promo-2",
    image: "https://images.unsplash.com/photo-1625246331285-6d788bb32d06?q=80&w=800&h=300&auto=format&fit=crop",
    alt: "Agri & Farming Offer",
    link: "/categories/agri"
  },
  {
    id: "promo-3",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&h=300&fit=crop",
    alt: "Wires & Cables Offer",
    link: "/categories/electrical"
  },
  {
    id: "promo-4",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&h=300&fit=crop",
    alt: "Cooling Appliances Offer",
    link: "/categories/medical"
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
  /** Unique pastel tile background per category */
  tileBg: string;
  subgroups?: SubCategoryGroup[];
}

export const categories: Category[] = [
  {
    id: "cat-electrical",
    name: "Electrical & Appliances",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=400",
    tileBg: "bg-cat-electrical",
    href: "/categories/electrical",
    subgroups: [
      { title: "Wires & Cables", items: ["House Wires", "Multicore Cables", "Submersible Cables", "Solar Cables", "CCTV Cables"] },
      { title: "Power Generation", items: ["Stabilizers", "Batteries", "Generators", "Soft Starters"] },
      { title: "Industrial Coolers", items: ["Desert Coolers", "Air Coolers"] },
      { title: "Fans", items: ["Ceiling Fans", "Pedestal Fans", "Exhaust Fans", "Wall Fans"] }
    ]
  },
  {
    id: "cat-tools",
    name: "Industrial Tools",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=400",
    tileBg: "bg-cat-tools",
    href: "/categories/tools",
    subgroups: [
      { title: "Power Tools", items: ["Drill Machines", "Angle Grinders", "Rotary Hammers", "Blowers"] },
      { title: "Hand Tools", items: ["Spanners", "Wrenches", "Screwdrivers", "Pliers"] },
      { title: "Machine Tools", items: ["Lathe Tools", "Milling Cutters", "Drill Bits"] }
    ]
  },
  {
    id: "cat-office",
    name: "Office Supplies",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=400",
    tileBg: "bg-cat-office",
    href: "/categories/office",
    subgroups: [
      { title: "Office Furniture", items: ["Office Chairs", "Executive Tables", "Cabinets"] },
      { title: "IT & Electronics", items: ["Printers", "Monitors", "Keyboards", "Projectors"] }
    ]
  },
  {
    id: "cat-agri",
    name: "Agri & Gardening",
    image: "https://images.unsplash.com/photo-1625246331285-6d788bb32d06?q=80&w=400&h=320&auto=format&fit=crop",
    tileBg: "bg-cat-agri",
    href: "/categories/agri",
    subgroups: [
      { title: "Farming Tools", items: ["Brush Cutters", "Chainsaws", "Earth Augers"] },
      { title: "Water Pumps", items: ["Centrifugal Pumps", "Submersible Pumps", "Sewage Pumps"] }
    ]
  },
  {
    id: "cat-medical",
    name: "Medical & Lab Supplies",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=400",
    tileBg: "bg-cat-medical",
    href: "/categories/medical",
    subgroups: [
      { title: "Lab Instruments", items: ["Microscopes", "Centrifuges", "Incubators"] },
      { title: "Medical Consumables", items: ["Surgical Gloves", "Syringes", "Masks"] }
    ]
  },
  {
    id: "cat-safety",
    name: "Safety Supplies",
    image: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?q=80&w=400",
    tileBg: "bg-cat-safety",
    href: "/categories/safety",
    subgroups: [
      { title: "Personal Protective Equipment", items: ["Safety Helmets", "Safety Shoes", "Safety Goggles"] },
      { title: "Fall Protection", items: ["Safety Harness", "Fall Arresters", "Lanyards"] },
      { title: "Fire Safety", items: ["Fire Extinguishers", "Fire Alarms", "Smoke Detectors"] }
    ]
  },
  {
    id: "cat-construction",
    name: "Construction Materials",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=400",
    tileBg: "bg-cat-construction",
    href: "/categories/construction",
    subgroups: [
      { title: "Building Materials", items: ["Cement", "Steel TMT Bars", "Bricks"] },
      { title: "Paints & Coatings", items: ["Interior Paints", "Exterior Paints", "Primers"] }
    ]
  },
  {
    id: "cat-automotive",
    name: "Automotive",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=400",
    tileBg: "bg-cat-automotive",
    href: "/categories/automotive",
    subgroups: [
      { title: "Car Accessories", items: ["Car Covers", "Floor Mats", "Car Perfumes"] },
      { title: "Auto Tools", items: ["Hydraulic Jacks", "Tyre Inflators", "Battery Chargers"] }
    ]
  },
  {
    id: "cat-packaging",
    name: "Packaging & Material Handling",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=400",
    tileBg: "bg-cat-packaging",
    href: "/categories/packaging",
    subgroups: [
      { title: "Packaging Materials", items: ["Corrugated Boxes", "Bubble Wrap", "Packaging Tape"] },
      { title: "Material Handling", items: ["Pallet Trucks", "Trolleys", "Hoists"] }
    ]
  },
  {
    id: "cat-express",
    name: "Mogli Express",
    image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?q=80&w=400",
    tileBg: "bg-cat-express",
    href: "/categories/express",
    subgroups: [
      { title: "Next Day Delivery", items: ["Top Rated Tools", "Bestselling Safety Gear", "Urgent Supplies"] }
    ]
  },
];

// Helper to generate dynamic products for each category
export const getProductsByCategory = (categoryId: string, count: number = 6): Product[] => {
  const category = categories.find(c => c.id === categoryId);
  const catName = category ? category.name : "Industrial Product";
  const catImage = category ? category.image : "https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=400";

  const brands = ["Bosch", "DeWalt", "Karam", "Havells", "Taparia", "3M", "Allen Cooper", "Fluke"];

  return Array.from({ length: count }).map((_, i) => {
    // Generate a pseudo-random price
    const priceValue = 500 + ((i * 1234) % 9500);
    const brandName = brands[(i + categoryId.length) % brands.length];

    const rating = Math.round((4.5 + ((i * 3 + categoryId.length) % 5) * 0.1) * 10) / 10;
    const reviews = 12 + ((i * 47 + categoryId.length * 13) % 248);

    return {
      id: `prod-${categoryId}-${i}`,
      name: `Premium ${catName} Item ${i + 1}`,
      description: `High quality ${catName.toLowerCase()} designed for heavy industrial usage. Comes with standard brand warranty.`,
      brand: brandName,
      image: catImage,
      price: `₹ ${priceValue.toLocaleString()}`,
      rating,
      reviews,
    };
  });
};

export const featuredProducts: Product[] = getProductsByCategory("cat-tools", 4);

export const industrialBrands = [
  { name: "Bosch", logo: "https://placehold.co/200x100/eeeeee/111111?text=Bosch" },
  { name: "DeWalt", logo: "https://placehold.co/200x100/eeeeee/111111?text=DeWalt" },
  { name: "Karam", logo: "https://placehold.co/200x100/eeeeee/111111?text=Karam" },
  { name: "Havells", logo: "https://placehold.co/200x100/eeeeee/111111?text=Havells" },
  { name: "Taparia", logo: "https://placehold.co/200x100/eeeeee/111111?text=Taparia" },
  { name: "3M", logo: "https://placehold.co/200x100/eeeeee/111111?text=3M" },
];

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

export const recentlyViewedItems: RelatedItem[] = [
  { id: "rv-1", title: "Agricultural Machinery", image: "https://images.unsplash.com/photo-1625246331285-6d788bb32d06?q=80&w=200&auto=format&fit=crop", count: 94 },
  { id: "rv-2", title: "Farming Tools, Equipment and..", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=200", count: 797 },
  { id: "rv-3", title: "Animal Mats", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=200", count: 50 },
  { id: "rv-4", title: "Rice Mill Machines", image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=200", count: 25 },
  { id: "rv-5", title: "Weed Control Mats", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=200", count: 74 }
];
