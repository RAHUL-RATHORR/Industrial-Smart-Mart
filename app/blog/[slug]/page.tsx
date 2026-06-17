import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, ChevronRight, Clock, User } from "lucide-react";
import SafeImage from "@/components/SafeImage";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/blog.server";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="bg-muted/20 min-h-screen">
      <div className="container mx-auto px-4 sm:px-5 lg:px-6 py-8 md:py-12">
        <nav className="mb-5 flex flex-wrap items-center gap-1 text-xs text-muted-foreground sm:text-sm">
          <Link href="/" className="hover:text-brand-yellow">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/blog" className="hover:text-brand-yellow">
            Blog
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="line-clamp-1 text-brand-black">{post.title}</span>
        </nav>

        <article className="card-pro mx-auto max-w-4xl overflow-hidden bg-white">
          <div className="relative aspect-[21/9] overflow-hidden bg-surface-subtle">
            <SafeImage src={post.image} alt={post.title} className="h-full w-full object-cover" />
          </div>

          <div className="space-y-5 p-5 sm:p-8">
            <span className="inline-flex rounded-full bg-brand-yellow px-3 py-1 text-xs font-bold text-brand-black">
              {post.category}
            </span>

            <h1 className="text-2xl font-black leading-snug text-brand-black sm:text-3xl">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {post.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {post.date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>

            <p className="text-base leading-relaxed text-gray-700">{post.excerpt}</p>
            <p className="text-base leading-relaxed text-gray-700">
              This is a sample article for Industrial Safety Mart. For product quotations, bulk pricing, and
              category-specific recommendations, contact our team on WhatsApp or call directly from any product page.
            </p>

            <Link href="/blog" className="inline-flex text-sm font-semibold text-brand-yellow hover:underline">
              ← Back to all articles
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
