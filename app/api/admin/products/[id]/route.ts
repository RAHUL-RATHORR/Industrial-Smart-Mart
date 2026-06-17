import { NextResponse } from "next/server";
import { z } from "zod";
import { deleteProduct, updateProduct } from "@/lib/catalog/store";

const productSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  brand: z.string().min(1).optional(),
  image: z.string().url().optional(),
  categoryId: z.string().min(1).optional(),
  price: z.string().optional(),
  mrp: z.string().optional(),
  discount: z.string().optional(),
  rating: z.number().optional(),
  reviews: z.number().optional(),
});

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const body = productSchema.parse(await request.json());
    const product = updateProduct(id, body);
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
    return NextResponse.json(product);
  } catch {
    return NextResponse.json({ error: "Invalid product data" }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const deleted = deleteProduct(id);
  if (!deleted) return NextResponse.json({ error: "Product not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
