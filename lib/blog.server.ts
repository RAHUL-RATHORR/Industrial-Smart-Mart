import "server-only";

import { blogPosts as staticBlogPosts } from "./blog";
import { readCatalog } from "./catalog/store";

export function getBlogPosts() {
  const catalog = readCatalog();
  return catalog.blogPosts.length > 0 ? catalog.blogPosts : staticBlogPosts;
}

export function getBlogPostBySlug(slug: string) {
  return getBlogPosts().find((post) => post.slug === slug);
}
