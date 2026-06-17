import { NextResponse } from "next/server";
import { z } from "zod";
import { addBlogPost, readCatalog } from "@/lib/catalog/store";

const blogSchema = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(1),
  category: z.string().min(1),
  author: z.string().min(1),
  date: z.string().min(1),
  readTime: z.string().min(1),
  image: z.string().url(),
  slug: z.string().optional(),
});

export async function GET() {
  const catalog = readCatalog();
  return NextResponse.json(catalog.blogPosts);
}

export async function POST(request: Request) {
  try {
    const body = blogSchema.parse(await request.json());
    const post = addBlogPost(body);
    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid blog post data" }, { status: 400 });
  }
}
