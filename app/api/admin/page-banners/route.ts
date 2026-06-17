import { NextResponse } from "next/server";
import { z } from "zod";
import { readCatalog } from "@/lib/catalog/store";

export async function GET() {
  const catalog = readCatalog();
  return NextResponse.json(catalog.pageBanners);
}
