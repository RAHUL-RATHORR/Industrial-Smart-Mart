import Link from "next/link";
import Image from "next/image";
import { SITE_LOGO, SITE_LOGO_DARK } from "@/lib/images";
import { cn } from "@/lib/utils";

interface SiteLogoProps {
  className?: string;
  imageClassName?: string;
  variant?: "light" | "dark";
}

export default function SiteLogo({
  className,
  imageClassName = "h-12 sm:h-14 md:h-16 w-auto",
  variant = "light",
}: SiteLogoProps) {
  const src = variant === "dark" ? SITE_LOGO_DARK : SITE_LOGO;

  return (
    <Link href="/" className={cn("inline-flex shrink-0 items-center", className)}>
      <Image
        src={src}
        alt="Industrial Safety Mart"
        width={220}
        height={80}
        priority
        className={cn("w-auto object-contain", imageClassName)}
      />
    </Link>
  );
}
