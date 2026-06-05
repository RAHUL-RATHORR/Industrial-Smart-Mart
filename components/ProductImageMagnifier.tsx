"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SafeImage from "@/components/SafeImage";
import { cn } from "@/lib/utils";

const LENS_SIZE = 110;
const ZOOM_LEVEL = 2.4;

type ProductImageMagnifierProps = {
  src: string;
  alt: string;
  className?: string;
};

export default function ProductImageMagnifier({
  src,
  alt,
  className,
}: ProductImageMagnifierProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [dims, setDims] = useState({ width: 0, height: 0 });
  const [lens, setLens] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateDims = () => {
      setDims({ width: el.clientWidth, height: el.clientHeight });
    };

    updateDims();
    const observer = new ResizeObserver(updateDims);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const updateLens = useCallback((clientX: number, clientY: number) => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const maxX = Math.max(0, rect.width - LENS_SIZE);
    const maxY = Math.max(0, rect.height - LENS_SIZE);

    const x = Math.min(maxX, Math.max(0, clientX - rect.left - LENS_SIZE / 2));
    const y = Math.min(maxY, Math.max(0, clientY - rect.top - LENS_SIZE / 2));

    setLens({ x, y });
    setDims({ width: rect.width, height: rect.height });
  }, []);

  const originX =
    dims.width > 0 ? ((lens.x + LENS_SIZE / 2) / dims.width) * 100 : 50;
  const originY =
    dims.height > 0 ? ((lens.y + LENS_SIZE / 2) / dims.height) * 100 : 50;

  const zoomStyle = {
    transform: `scale(${ZOOM_LEVEL})`,
    transformOrigin: `${originX}% ${originY}%`,
  };

  return (
    <div className={cn("flex flex-col gap-3 lg:flex-row lg:items-stretch", className)}>
      <div
        ref={containerRef}
        className="relative aspect-square w-full flex-1 cursor-crosshair overflow-hidden rounded-xl border border-pro bg-white"
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
        onMouseMove={(e) => updateLens(e.clientX, e.clientY)}
        onTouchStart={(e) => {
          setIsActive(true);
          const touch = e.touches[0];
          if (touch) updateLens(touch.clientX, touch.clientY);
        }}
        onTouchMove={(e) => {
          const touch = e.touches[0];
          if (touch) updateLens(touch.clientX, touch.clientY);
        }}
        onTouchEnd={() => setIsActive(false)}
      >
        <SafeImage
          src={src}
          alt={alt}
          className={cn(
            "absolute inset-0 h-full w-full object-contain p-4 select-none transition-opacity",
            isActive && "opacity-0 md:opacity-100"
          )}
          draggable={false}
        />

        {isActive && dims.width > 0 && (
          <div
            className="pointer-events-none absolute hidden border-2 border-brand-yellow bg-brand-yellow/15 shadow-pro-sm lg:block"
            style={{
              width: LENS_SIZE,
              height: LENS_SIZE,
              left: lens.x,
              top: lens.y,
            }}
            aria-hidden
          />
        )}

        {isActive && dims.width > 0 && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden lg:hidden">
            <SafeImage
              src={src}
              alt=""
              className="h-full w-full object-contain p-2"
              style={zoomStyle}
              draggable={false}
            />
          </div>
        )}
      </div>

      <div
        className={cn(
          "relative hidden aspect-square overflow-hidden rounded-xl border border-pro bg-white lg:block lg:w-[42%] lg:max-w-[300px] lg:shrink-0",
          isActive ? "opacity-100" : "opacity-100"
        )}
      >
        {isActive ? (
          <div className="absolute inset-0 overflow-hidden">
            <SafeImage
              src={src}
              alt={`${alt} zoomed`}
              className="h-full w-full object-contain p-2 transition-transform duration-75 ease-out"
              style={zoomStyle}
              draggable={false}
            />
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 p-4 text-center text-xs text-muted-foreground">
            <span className="rounded-full bg-section px-3 py-1 font-semibold text-brand-black">
              Hover to zoom
            </span>
            <p>Move cursor over the product image</p>
          </div>
        )}
      </div>
    </div>
  );
}
