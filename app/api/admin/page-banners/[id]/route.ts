import { NextResponse } from "next/server";
import { z } from "zod";
import { updatePageBanner } from "@/lib/catalog/store";

const pageBannerSchema = z.object({
  title: z.string().min(1).optional(),
  subtitle: z.string().min(1).optional(),
  image: z.string().url().optional(),
});

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const body = pageBannerSchema.parse(await request.json());
    const banner = updatePageBanner(id, body);
    if (!banner) return NextResponse.json({ error: "Page banner not found" }, { status: 404 });
    return NextResponse.json(banner);
  } catch {
    return NextResponse.json({ error: "Invalid page banner data" }, { status: 400 });
  }
}
