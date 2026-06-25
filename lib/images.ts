export const PLACEHOLDER_IMAGE = "/images/placeholder.svg";

export const SITE_LOGO = "/images/logo.jpeg";

export const AGRI_BANNER_IMAGE =
  "https://images.unsplash.com/photo-1592982537447-6f2963162b77?q=80&w=800&auto=format&fit=crop";

export function getImageFallback(currentSrc: string): string {
  if (currentSrc === PLACEHOLDER_IMAGE) return PLACEHOLDER_IMAGE;
  return PLACEHOLDER_IMAGE;
}

export function upgradeUnsplashUrl(src: string, width = 1600, quality = 85) {
  try {
    if (src.includes("images.unsplash.com")) {
      const url = new URL(src);
      url.searchParams.set("w", String(width));
      url.searchParams.set("q", String(quality));
      url.searchParams.set("auto", "format");
      url.searchParams.set("fit", "max");
      return url.toString();
    }
  } catch {
    // ignore invalid URLs
  }
  return src;
}
