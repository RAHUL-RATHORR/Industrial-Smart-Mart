
export const heroBanners = [
  {
    id: "banner-1",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200",
    title: "Heavy Manufacturing Machinery",
    subtitle: "High-speed commercial printers and heavy duty plotting machines.",
    cta: "Explore Printers",
  },
  {
    id: "banner-2",
    image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=1200",
    title: "Precision Engineering Tools",
    subtitle: "Precision instruments for accurate industrial testing.",
    cta: "View Equipment",
  },
  {
    id: "banner-3",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1200",
    title: "Industrial Welding & Safety",
    subtitle: "Next-gen CNC machines, lathes, and robotics.",
    cta: "Check Machinery",
  },
  {
    id: "banner-4",
    image: "https://images.unsplash.com/photo-1530893609608-31a9209ec305?q=80&w=1200",
    title: "Professional Hardware",
    subtitle: "Top-grade materials and engineering tools for large scale projects.",
    cta: "Shop Now",
  },
  {
    id: "banner-5",
    image: "https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?q=80&w=1200",
    title: "Warehouse Logistics",
    subtitle: "Pallet trucks, forklifts, and complete warehouse solutions.",
    cta: "Explore Handling",
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
    image: "https://images.unsplash.com/photo-1592982537447-6f2963162b77?q=80&w=800&h=300&auto=format&fit=crop",
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

export interface SubCategoryGroup {
  title: string;
  items: string[];
}

export interface Category {
  id: string;
  name: string;
  image: string;
  href: string;
  subgroups?: SubCategoryGroup[];
}

export const categories: Category[] = [
  {
    id: "cat-electrical",
    name: "Electrical & Appliances",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=400",
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
    href: "/categories/office",
    subgroups: [
      { title: "Office Furniture", items: ["Office Chairs", "Executive Tables", "Cabinets"] },
      { title: "IT & Electronics", items: ["Printers", "Monitors", "Keyboards", "Projectors"] }
    ]
  },
  {
    id: "cat-agri",
    name: "Agri & Gardening",
    image: "https://images.unsplash.com/photo-1592982537447-6f2963162b77?q=80&w=200&h=200&auto=format&fit=crop",
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

    return {
      id: `prod-${categoryId}-${i}`,
      name: `Premium ${catName} Item ${i + 1}`,
      description: `High quality ${catName.toLowerCase()} designed for heavy industrial usage. Comes with standard brand warranty.`,
      brand: brandName,
      image: catImage,
      price: `₹ ${priceValue.toLocaleString()}`,
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
  { id: "rv-1", title: "Agricultural Machinery", image: "https://images.unsplash.com/photo-1592982537447-6f2963162b77?q=80&w=200", count: 94 },
  { id: "rv-2", title: "Farming Tools, Equipment and..", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=200", count: 797 },
  { id: "rv-3", title: "Animal Mats", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=200", count: 50 },
  { id: "rv-4", title: "Rice Mill Machines", image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=200", count: 25 },
  { id: "rv-5", title: "Weed Control Mats", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=200", count: 74 }
];
