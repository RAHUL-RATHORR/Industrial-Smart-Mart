import { NextResponse } from "next/server";
import { z } from "zod";
import { addPromoBanner, readCatalog } from "@/lib/catalog/store";

const promoSchema = z.object({
  image: z.string().url(),
  alt: z.string().min(1),
  link: z.string().min(1),
});

export async function GET() {
  const catalog = readCatalog();
  return NextResponse.json(catalog.promoBanners);
}

export async function POST(request: Request) {
  try {
    const body = promoSchema.parse(await request.json());
    const banner = addPromoBanner(body);
    return NextResponse.json(banner, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid promo banner data" }, { status: 400 });
  }
}
