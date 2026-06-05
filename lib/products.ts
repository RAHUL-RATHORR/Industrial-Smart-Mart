import { bestsellers, categories, featuredProducts, getProductsByCategory, Product } from "./data";

export function getAllProducts(): Product[] {
  const categoryProducts = categories.flatMap((category) => getProductsByCategory(category.id, 6));
  const merged = [...bestsellers, ...featuredProducts, ...categoryProducts];
  const unique = new Map<string, Product>();

  for (const product of merged) {
    unique.set(product.id, product);
  }

  return Array.from(unique.values());
}

export function getProductById(id: string): Product | undefined {
  return getAllProducts().find((product) => product.id === id);
}

export function searchProducts(query?: string): Product[] {
  const products = getAllProducts();
  if (!query?.trim()) return products;

  const term = query.trim().toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(term) ||
      product.brand.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term)
  );
}

export interface BulkTier {
  qty: number;
  price: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductDetailExtras {
  images: string[];
  videoUrl: string;
  videoPoster: string;
  features: string[];
  specs: ProductSpec[];
  bulkTiers: BulkTier[];
  insights: string[];
  longDescription: string;
}

export function getSimilarProducts(product: Product, count = 5): Product[] {
  return getAllProducts()
    .filter((item) => item.id !== product.id)
    .slice(0, count);
}

export interface CompareAttribute {
  label: string;
  values: string[];
}

export function getComparisonAttributes(product: Product, similar: Product[]): CompareAttribute[] {
  const all = [product, ...similar];

  return [
    {
      label: "Rating",
      values: all.map((p) => (p.rating ? `${p.rating} ★ (${p.reviews ?? 0})` : "N/A")),
    },
    { label: "Brand", values: all.map((p) => p.brand) },
    {
      label: "No-Load Speed",
      values: all.map((_, i) => `0-${1600 + i * 200}, 0-${1900 + i * 200} & 0-${2300 + i * 200} rpm`),
    },
    {
      label: "Impact Rate",
      values: all.map((_, i) => `0-${2100 + i * 200}, 0-${2500 + i * 200} & 0-${2900 + i * 200} bpm`),
    },
    {
      label: "Wrench Type",
      values: all.map((_, i) => (i % 2 === 0 ? "Cordless" : "Cordless Impact Wrench")),
    },
    {
      label: "Battery Capacity",
      values: all.map((_, i) => `${2 + (i % 3)} Ah`),
    },
  ];
}

export interface ProductReview {
  id: string;
  author: string;
  date: string;
  rating: number;
  title: string;
  text: string;
  verified: boolean;
  helpful: number;
  notHelpful: number;
  hasImage?: boolean;
}

export function getProductReviews(product: Product): ProductReview[] {
  return [
    {
      id: "r1",
      author: "Rahul S.",
      date: "12 Jan 2026",
      rating: 5,
      title: "Excellent build quality",
      text: `Very satisfied with ${product.name}. Works perfectly for our workshop needs.`,
      verified: true,
      helpful: 8,
      notHelpful: 0,
      hasImage: true,
    },
    {
      id: "r2",
      author: "Priya M.",
      date: "28 Dec 2025",
      rating: 5,
      title: "Good value for money",
      text: "Delivery was quick and product is genuine. Recommended for bulk buyers.",
      verified: true,
      helpful: 5,
      notHelpful: 1,
    },
    {
      id: "r3",
      author: "Amit K.",
      date: "05 Nov 2025",
      rating: 4,
      title: "Reliable performance",
      text: "Using it daily in our factory. Solid performance so far.",
      verified: true,
      helpful: 3,
      notHelpful: 0,
    },
  ];
}

export interface ProductFaq {
  question: string;
  answer: string;
}

export function getProductFaqs(product: Product): ProductFaq[] {
  return [
    {
      question: `Is ${product.brand} ${product.name} suitable for industrial use?`,
      answer: "Yes, this product is designed for professional and industrial applications with standard quality checks.",
    },
    {
      question: "Does this product come with manufacturer warranty?",
      answer: "Yes, all products include official brand warranty against manufacturing defects.",
    },
    {
      question: "Can I get bulk pricing for this item?",
      answer: "Yes, contact us on WhatsApp with your required quantity for a customized quotation.",
    },
    {
      question: "Do you deliver PAN India?",
      answer: "Yes, we deliver across India. Contact us on WhatsApp for delivery details.",
    },
  ];
}

export interface InterestedItem {
  id: string;
  title: string;
  href: string;
  image: string;
}

export function getInterestedItems(product: Product): InterestedItem[] {
  const similar = getSimilarProducts(product, 4);
  return similar.map((item) => ({
    id: item.id,
    title: item.name,
    href: `/products/${item.id}`,
    image: item.image,
  }));
}

export function getProductDetailExtras(product: Product): ProductDetailExtras {
  const basePrice = parseInt(product.price?.replace(/[^\d]/g, "") || "2500", 10);
  const seed = product.id.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);

  const bulkTiers: BulkTier[] = [
    { qty: 2, price: `₹${Math.round(basePrice * 0.97).toLocaleString("en-IN")}` },
    { qty: 3, price: `₹${Math.round(basePrice * 0.95).toLocaleString("en-IN")}` },
    { qty: 4, price: `₹${Math.round(basePrice * 0.93).toLocaleString("en-IN")}` },
    { qty: 5, price: `₹${Math.round(basePrice * 0.91).toLocaleString("en-IN")}` },
    { qty: 10, price: `₹${Math.round(basePrice * 0.88).toLocaleString("en-IN")}` },
  ];

  const specs: ProductSpec[] = [
    { label: "Brand", value: product.brand },
    { label: "Model", value: `${product.brand}-${(seed % 9000) + 1000}` },
    { label: "Warranty", value: "1 Year Manufacturer Warranty" },
    { label: "Country of Origin", value: "India" },
    { label: "Packaging Type", value: "Standard Industrial Pack" },
    { label: "Dispatch Time", value: "24-48 Hours" },
  ];

  const extraShots = [
    "1581092160562-40aa08e78837",
    "1531834685032-c34bf0d84c77",
    "1504917595217-d4dc5ebe6122",
    "1576091160399-112f8cc25c2f",
  ];
  const altImage = `https://images.unsplash.com/photo-${extraShots[seed % extraShots.length]}?q=80&w=800&auto=format&fit=crop`;

  return {
    images: [product.image, altImage],
    videoUrl:
      "https://cdn.coverr.co/videos/coverr-worker-wearing-a-hard-hat-9765/1080p.mp4",
    videoPoster: product.image,
    features: [
      "Built with industrial-grade materials for long-lasting performance.",
      "Ideal for factories, workshops, construction sites, and B2B procurement.",
      "100% genuine product sourced from authorized distributors.",
      product.description,
    ],
    specs,
    bulkTiers,
    insights: [
      `${(seed % 40) + 20}% of buyers in this category choose ${product.brand} for reliability.`,
      "Bulk orders above 10 units qualify for additional GST invoice benefits.",
    ],
    longDescription: `${product.name} is designed for professional industrial use. ${product.description} It offers dependable performance, easy maintenance, and compatibility with standard safety and quality norms. Suitable for SMEs, manufacturing units, and corporate procurement teams looking for cost-effective supply with PAN India delivery support.`,
  };
}
