import Link from "next/link";
import Image from "next/image";
import { SITE_LOGO } from "@/lib/images";
import { cn } from "@/lib/utils";

interface SiteLogoProps {
  className?: string;
  imageClassName?: string;
}

export default function SiteLogo({
  className,
  imageClassName = "h-12 sm:h-14 md:h-16 w-auto",
}: SiteLogoProps) {
  return (
    <Link href="/" className={cn("inline-flex shrink-0 items-center", className)}>
      <Image
        src={SITE_LOGO}
        alt="Industrial Safety Mart"
        width={220}
        height={80}
        priority
        className={cn("w-auto object-contain", imageClassName)}
      />
    </Link>
  );
}
