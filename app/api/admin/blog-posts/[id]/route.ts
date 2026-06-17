import { NextResponse } from "next/server";
import { z } from "zod";
import { deleteBlogPost, updateBlogPost } from "@/lib/catalog/store";

const blogSchema = z.object({
  title: z.string().min(1).optional(),
  excerpt: z.string().min(1).optional(),
  category: z.string().min(1).optional(),
  author: z.string().min(1).optional(),
  date: z.string().min(1).optional(),
  readTime: z.string().min(1).optional(),
  image: z.string().url().optional(),
  slug: z.string().optional(),
});

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const body = blogSchema.parse(await request.json());
    const post = updateBlogPost(id, body);
    if (!post) return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: "Invalid blog post data" }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const deleted = deleteBlogPost(id);
  if (!deleted) return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
