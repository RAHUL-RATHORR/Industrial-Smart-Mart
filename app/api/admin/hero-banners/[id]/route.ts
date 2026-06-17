import { NextResponse } from "next/server";
import { z } from "zod";
import { deleteHeroBanner, updateHeroBanner } from "@/lib/catalog/store";

const heroSchema = z.object({
  href: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
  tagline: z.string().min(1).optional(),
  discountLabel: z.string().min(1).optional(),
  discount: z.string().min(1).optional(),
  cta: z.string().min(1).optional(),
  backgroundImage: z.string().url().optional(),
  productAlt: z.string().min(1).optional(),
});

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const body = heroSchema.parse(await request.json());
    const banner = updateHeroBanner(id, body);
    if (!banner) return NextResponse.json({ error: "Banner not found" }, { status: 404 });
    return NextResponse.json(banner);
  } catch {
    return NextResponse.json({ error: "Invalid hero banner data" }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const deleted = deleteHeroBanner(id);
  if (!deleted) return NextResponse.json({ error: "Banner not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
