import { NextResponse } from "next/server";
import { z } from "zod";
import { deleteCategory, updateCategory } from "@/lib/catalog/store";

const categorySchema = z.object({
  name: z.string().min(1).optional(),
  image: z.string().url().optional(),
  tileBg: z.string().min(1).optional(),
  href: z.string().optional(),
  subgroups: z
    .array(
      z.object({
        title: z.string(),
        items: z.array(z.string()),
      })
    )
    .optional(),
});

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const body = categorySchema.parse(await request.json());
    const category = updateCategory(id, body);
    if (!category) return NextResponse.json({ error: "Category not found" }, { status: 404 });
    return NextResponse.json(category);
  } catch {
    return NextResponse.json({ error: "Invalid category data" }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const deleted = deleteCategory(id);
  if (!deleted) return NextResponse.json({ error: "Category not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
