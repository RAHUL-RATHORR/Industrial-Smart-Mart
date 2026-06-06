import Link from "next/link";
import { Calendar, Clock, User } from "lucide-react";
import SafeImage from "@/components/SafeImage";
import { blogPosts } from "@/lib/blog";

export default function BlogPage() {
  return (
    <div className="bg-muted/20 min-h-screen">
      <div className="container mx-auto px-4 sm:px-5 lg:px-6 py-10 md:py-14">
        <div className="mb-8 text-center md:mb-10">
          <h1 className="text-3xl font-black text-brand-black md:text-4xl">Industrial Blog</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
            Safety tips, procurement guides, and product insights for factories, contractors, and corporate buyers.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {blogPosts.map((post) => (
            <article key={post.id} className="card-pro group overflow-hidden bg-white transition-all">
              <div className="relative aspect-[16/10] overflow-hidden bg-surface-subtle">
                <SafeImage
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-brand-yellow px-2.5 py-1 text-[11px] font-bold text-brand-black">
                  {post.category}
                </span>
              </div>

              <div className="space-y-3 p-4 sm:p-5">
                <h2 className="line-clamp-2 text-base font-bold leading-snug text-brand-black group-hover:text-brand-yellow transition-colors md:text-lg">
                  {post.title}
                </h2>
                <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>

                <div className="flex flex-wrap items-center gap-3 border-t border-pro pt-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    {post.author}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {post.date}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readTime}
                  </span>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex text-sm font-semibold text-brand-yellow hover:underline"
                >
                  Read article →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
