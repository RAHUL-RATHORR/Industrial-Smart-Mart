"use client";

import { PLACEHOLDER_IMAGE } from "@/lib/images";

type SafeImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

export default function SafeImage({ src, alt, onError, ...props }: SafeImageProps) {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.src.includes(PLACEHOLDER_IMAGE)) return;
    img.src = PLACEHOLDER_IMAGE;
    onError?.(e);
  };

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src || PLACEHOLDER_IMAGE} alt={alt ?? ""} onError={handleError} {...props} />
  );
}
