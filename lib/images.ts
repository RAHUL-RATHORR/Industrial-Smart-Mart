export const PLACEHOLDER_IMAGE = "/images/placeholder.svg";

export const SITE_LOGO = "/images/logo.jpeg";

export const AGRI_BANNER_IMAGE =
  "https://images.unsplash.com/photo-1592982537447-6f2963162b77?q=80&w=800&auto=format&fit=crop";

export function getImageFallback(currentSrc: string): string {
  if (currentSrc === PLACEHOLDER_IMAGE) return PLACEHOLDER_IMAGE;
  return PLACEHOLDER_IMAGE;
}
