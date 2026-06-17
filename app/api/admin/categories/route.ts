import { NextResponse } from "next/server";
import { z } from "zod";
import { addCategory, readCatalog } from "@/lib/catalog/store";

const categorySchema = z.object({
  name: z.string().min(1),
  image: z.string().url(),
  tileBg: z.string().min(1),
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

export async function GET() {
  const catalog = readCatalog();
  return NextResponse.json(catalog.categories);
}

export async function POST(request: Request) {
  try {
    const body = categorySchema.parse(await request.json());
    const category = addCategory(body);
    return NextResponse.json(category, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid category data" }, { status: 400 });
  }
}
