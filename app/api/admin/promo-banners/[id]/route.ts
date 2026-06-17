import { NextResponse } from "next/server";
import { z } from "zod";
import { deletePromoBanner, updatePromoBanner } from "@/lib/catalog/store";

const promoSchema = z.object({
  image: z.string().url().optional(),
  alt: z.string().min(1).optional(),
  link: z.string().min(1).optional(),
});

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const body = promoSchema.parse(await request.json());
    const banner = updatePromoBanner(id, body);
    if (!banner) return NextResponse.json({ error: "Banner not found" }, { status: 404 });
    return NextResponse.json(banner);
  } catch {
    return NextResponse.json({ error: "Invalid promo banner data" }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const deleted = deletePromoBanner(id);
  if (!deleted) return NextResponse.json({ error: "Banner not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
