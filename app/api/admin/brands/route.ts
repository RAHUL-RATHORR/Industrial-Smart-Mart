import { NextResponse } from "next/server";
import { z } from "zod";
import { addBrand, readCatalog } from "@/lib/catalog/store";

const brandSchema = z.object({
  name: z.string().min(1),
  logo: z.string().url(),
  categoryIds: z.array(z.string()).optional(),
});

export async function GET() {
  const catalog = readCatalog();
  return NextResponse.json(catalog.brands);
}

export async function POST(request: Request) {
  try {
    const body = brandSchema.parse(await request.json());
    const brand = addBrand(body);
    return NextResponse.json(brand, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid brand data" }, { status: 400 });
  }
}
