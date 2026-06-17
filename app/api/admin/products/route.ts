import { NextResponse } from "next/server";
import { z } from "zod";
import { addProduct, readCatalog } from "@/lib/catalog/store";

const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  brand: z.string().min(1),
  image: z.string().url(),
  categoryId: z.string().min(1),
  price: z.string().optional(),
  mrp: z.string().optional(),
  discount: z.string().optional(),
  rating: z.number().optional(),
  reviews: z.number().optional(),
});

export async function GET() {
  const catalog = readCatalog();
  return NextResponse.json(catalog.products);
}

export async function POST(request: Request) {
  try {
    const body = productSchema.parse(await request.json());
    const product = addProduct(body);
    return NextResponse.json(product, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid product data" }, { status: 400 });
  }
}
