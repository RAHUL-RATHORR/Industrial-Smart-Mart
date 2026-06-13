import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CategoryNavIconProps = {
  categoryId: string;
  className?: string;
};

function SafetyShoesIcon() {
  return (
    <svg viewBox="0 0 80 64" fill="none" aria-hidden className="h-full w-full p-1">
      <path d="M8 42h22l4-14h10l6 14h12v6H8v-6z" fill="#8B4513" />
      <path d="M12 44h18l3-10h8l4 10h8v4H12v-4z" fill="#A0522D" />
      <rect x="14" y="46" width="10" height="3" rx="1" fill="#5D3A1A" />
      <path d="M44 38h18l6 10h10v10H44V38z" fill="#C62828" />
      <path d="M46 40h14l4 8h8v6H46v-14z" fill="#E53935" />
      <ellipse cx="52" cy="52" rx="6" ry="2" fill="#B71C1C" />
    </svg>
  );
}

function PvcGumbootsIcon() {
  return (
    <svg viewBox="0 0 80 64" fill="none" aria-hidden className="h-full w-full p-1">
      <path d="M14 18h12v20c0 8-2 14-6 18H10V18h4z" fill="#2E7D32" />
      <path d="M16 20h8v18c0 6-1 10-4 13H12V20h4z" fill="#43A047" />
      <path d="M38 14h12v24c0 8-2 14-6 18H34V14h4z" fill="#F9A825" />
      <path d="M40 16h8v22c0 6-1 10-4 13H36V16h4z" fill="#FBC02D" />
      <rect x="14" y="14" width="12" height="6" rx="2" fill="#1B5E20" />
      <rect x="38" y="10" width="12" height="6" rx="2" fill="#F57F17" />
    </svg>
  );
}

function ReflectiveJacketsIcon() {
  return (
    <svg viewBox="0 0 80 64" fill="none" aria-hidden className="h-full w-full p-1">
      <path d="M18 14h20l4 6 4-6h16l-2 38H20L18 14z" fill="#FF6F00" />
      <path d="M28 22h8v20H28V22z" fill="#FFEB3B" />
      <path d="M22 30h36v4H22v-4z" fill="#FFEB3B" />
      <path d="M22 38h36v4H22v-4z" fill="#C6FF00" />
      <circle cx="40" cy="12" r="5" fill="#FFB74D" />
    </svg>
  );
}

function SafetyHelmetsIcon() {
  return (
    <svg viewBox="0 0 80 64" fill="none" aria-hidden className="h-full w-full p-1">
      <path d="M16 36c0-14 10-22 24-22s24 8 24 22v8H16v-8z" fill="#FBC02D" />
      <path d="M20 38c0-10 8-16 20-16s20 6 20 16v4H20v-4z" fill="#FDD835" />
      <rect x="14" y="42" width="52" height="6" rx="2" fill="#F9A825" />
      <path d="M48 28h16l4 10H44l4-10z" fill="#FBC02D" />
      <rect x="48" y="36" width="20" height="4" rx="1" fill="#F9A825" />
    </svg>
  );
}

function SafetyGlovesIcon() {
  return (
    <svg viewBox="0 0 80 64" fill="none" aria-hidden className="h-full w-full p-1">
      <path d="M12 28c0-4 3-8 8-8 2 0 4 1 5 3 1-4 5-7 10-7 5 0 8 3 9 7 1-2 4-4 7-4 4 0 7 3 7 8v18c0 6-5 10-11 10H23c-6 0-11-4-11-10V28z" fill="#FF8F00" />
      <path d="M16 30c0-2 2-5 5-5 2 0 3 1 4 3v20c0 4-3 7-7 7s-6-3-6-7V30z" fill="#FFB300" />
      <path d="M44 22c3 0 6 2 6 6v22c0 4-3 7-7 7s-7-3-7-7V24c0-1 1-2 2-2h6z" fill="#E65100" />
      <rect x="20" y="38" width="24" height="3" rx="1" fill="#BF360C" opacity="0.5" />
    </svg>
  );
}

function WeldingIcon() {
  return (
    <svg viewBox="0 0 80 64" fill="none" aria-hidden className="h-full w-full p-1">
      <path d="M10 30h28v22H10V30z" fill="#37474F" />
      <path d="M14 34h20v14H14V34z" fill="#455A64" />
      <path d="M18 38h12v6H18v-6z" fill="#FF6F00" opacity="0.8" />
      <path d="M44 20l8 16-4 4-12-4 4-12 4-4z" fill="#546E7A" />
      <circle cx="52" cy="36" r="6" fill="#FF3D00" />
      <circle cx="56" cy="32" r="4" fill="#FFEB3B" />
      <path d="M58 28l6 8-2 2-6-6 2-4z" fill="#FF9100" />
    </svg>
  );
}

function DisposablePpeIcon() {
  return (
    <svg viewBox="0 0 80 64" fill="none" aria-hidden className="h-full w-full p-1">
      <path d="M20 22c0-6 6-10 12-10s12 4 12 10v4c0 8-4 14-12 18-8-4-12-10-12-18v-4z" fill="#42A5F5" />
      <path d="M26 24c0-3 3-6 6-6s6 3 6 6v2c0 5-2 9-6 12-4-3-6-7-6-12v-2z" fill="#90CAF9" />
      <rect x="14" y="40" width="20" height="14" rx="3" fill="#E3F2FD" stroke="#64B5F6" strokeWidth="1.5" />
      <path d="M18 44h12v2H18v-2zM18 48h10v2H18v-2z" fill="#64B5F6" />
      <ellipse cx="52" cy="48" rx="10" ry="8" fill="#BBDEFB" stroke="#42A5F6" strokeWidth="1.5" />
    </svg>
  );
}

function FaceEarIcon() {
  return (
    <svg viewBox="0 0 80 64" fill="none" aria-hidden className="h-full w-full p-1">
      <ellipse cx="28" cy="32" rx="18" ry="12" fill="#4FC3F7" stroke="#0288D1" strokeWidth="2" />
      <ellipse cx="28" cy="32" rx="12" ry="8" fill="#B3E5FC" />
      <path d="M16 32h24" stroke="#0277BD" strokeWidth="2" />
      <path d="M52 18h8c4 0 8 4 8 10v12c0 6-4 10-8 10h-8V18z" fill="#FF7043" />
      <ellipse cx="56" cy="32" rx="6" ry="10" fill="#FFAB91" />
      <rect x="50" y="22" width="4" height="20" rx="2" fill="#E64A19" />
      <rect x="62" y="22" width="4" height="20" rx="2" fill="#E64A19" />
    </svg>
  );
}

function RoadSafetyIcon() {
  return (
    <svg viewBox="0 0 80 64" fill="none" aria-hidden className="h-full w-full p-1">
      <path d="M36 10h8l10 44H26L36 10z" fill="#FF6F00" />
      <path d="M38 14h4l8 36h-16l4-36z" fill="#FF9800" />
      <rect x="34" y="22" width="12" height="4" fill="#FFF" />
      <rect x="32" y="32" width="16" height="4" fill="#FFF" />
      <rect x="30" y="42" width="20" height="4" fill="#FFF" />
      <rect x="10" y="48" width="18" height="8" rx="1" fill="#FFEB3B" stroke="#F57F17" strokeWidth="1" />
      <rect x="12" y="50" width="14" height="2" fill="#212121" />
      <rect x="12" y="53" width="14" height="2" fill="#212121" />
    </svg>
  );
}

const iconMap: Record<string, () => ReactNode> = {
  "cat-safety-shoes": SafetyShoesIcon,
  "cat-pvc-gumboots": PvcGumbootsIcon,
  "cat-reflective-jackets": ReflectiveJacketsIcon,
  "cat-safety-helmets": SafetyHelmetsIcon,
  "cat-safety-gloves": SafetyGlovesIcon,
  "cat-welding": WeldingIcon,
  "cat-disposable-ppe": DisposablePpeIcon,
  "cat-face-ear": FaceEarIcon,
  "cat-road-safety": RoadSafetyIcon,
};

export default function CategoryNavIcon({
  categoryId,
  className,
}: CategoryNavIconProps) {
  const Icon = iconMap[categoryId] ?? SafetyHelmetsIcon;

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Icon />
    </div>
  );
}
