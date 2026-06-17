import { NextResponse } from "next/server";
import { z } from "zod";
import { deleteBrand, updateBrand } from "@/lib/catalog/store";

const brandSchema = z.object({
  name: z.string().min(1).optional(),
  logo: z.string().url().optional(),
  categoryIds: z.array(z.string()).optional(),
});

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const body = brandSchema.parse(await request.json());
    const brand = updateBrand(id, body);
    if (!brand) return NextResponse.json({ error: "Brand not found" }, { status: 404 });
    return NextResponse.json(brand);
  } catch {
    return NextResponse.json({ error: "Invalid brand data" }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const deleted = deleteBrand(id);
  if (!deleted) return NextResponse.json({ error: "Brand not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
