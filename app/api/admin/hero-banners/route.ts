import { NextResponse } from "next/server";
import { z } from "zod";
import { addHeroBanner, readCatalog } from "@/lib/catalog/store";

const heroSchema = z.object({
  href: z.string().min(1),
  title: z.string().min(1),
  tagline: z.string().min(1),
  discountLabel: z.string().min(1),
  discount: z.string().min(1),
  cta: z.string().min(1),
  backgroundImage: z.string().url(),
  productAlt: z.string().min(1),
});

export async function GET() {
  const catalog = readCatalog();
  return NextResponse.json(catalog.heroBanners);
}

export async function POST(request: Request) {
  try {
    const body = heroSchema.parse(await request.json());
    const banner = addHeroBanner(body);
    return NextResponse.json(banner, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid hero banner data" }, { status: 400 });
  }
}
