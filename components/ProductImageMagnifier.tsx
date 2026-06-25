"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SafeImage from "@/components/SafeImage";
import { upgradeUnsplashUrl } from "@/lib/images";
import { cn } from "@/lib/utils";

const LENS_SIZE = 120;
const ZOOM_PANEL_WIDTH_SCALE = 1.65;

type ImageBounds = {
  displayW: number;
  displayH: number;
  offsetX: number;
  offsetY: number;
};

type ProductImageMagnifierProps = {
  src: string;
  alt: string;
  className?: string;
};

function getZoomImageSrc(src: string) {
  return upgradeUnsplashUrl(src, 2400, 90);
}

function getCoverImageBounds(
  containerW: number,
  containerH: number,
  naturalW: number,
  naturalH: number
): ImageBounds {
  if (!containerW || !containerH || !naturalW || !naturalH) {
    return { displayW: containerW, displayH: containerH, offsetX: 0, offsetY: 0 };
  }

  const scale = Math.max(containerW / naturalW, containerH / naturalH);
  const displayW = naturalW * scale;
  const displayH = naturalH * scale;

  return {
    displayW,
    displayH,
    offsetX: (containerW - displayW) / 2,
    offsetY: (containerH - displayH) / 2,
  };
}

function clampLens(x: number, y: number, containerW: number, containerH: number) {
  return {
    x: Math.min(containerW - LENS_SIZE, Math.max(0, x)),
    y: Math.min(containerH - LENS_SIZE, Math.max(0, y)),
  };
}

export default function ProductImageMagnifier({
  src,
  alt,
  className,
}: ProductImageMagnifierProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const zoomImgRef = useRef<HTMLImageElement>(null);
  const frameRef = useRef<number>();
  const pendingRef = useRef<{ x: number; y: number } | null>(null);
  const naturalRef = useRef({ width: 0, height: 0 });
  const layoutRef = useRef({ containerW: 0, containerH: 0, zoomW: 0, zoomH: 0 });

  const [isActive, setIsActive] = useState(false);
  const [zoomSrc, setZoomSrc] = useState(() => getZoomImageSrc(src));
  const [layout, setLayout] = useState({ containerW: 0, containerH: 0, zoomW: 0, zoomH: 0 });

  useEffect(() => {
    const hiRes = getZoomImageSrc(src);
    setZoomSrc(hiRes);
    const preload = new Image();
    preload.src = hiRes;
  }, [src]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      const containerW = container.clientWidth;
      const containerH = container.clientHeight;
      const zoomW = containerW * ZOOM_PANEL_WIDTH_SCALE;
      const zoomH = containerH;
      layoutRef.current = { containerW, containerH, zoomW, zoomH };
      setLayout({ containerW, containerH, zoomW, zoomH });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const applyLens = useCallback((clientX: number, clientY: number) => {
    const container = containerRef.current;
    const lens = lensRef.current;
    const zoomImg = zoomImgRef.current;
    if (!container || !lens || !zoomImg) return;

    const rect = container.getBoundingClientRect();
    const bounds = getCoverImageBounds(
      rect.width,
      rect.height,
      naturalRef.current.width,
      naturalRef.current.height
    );

    const rawX = clientX - rect.left - LENS_SIZE / 2;
    const rawY = clientY - rect.top - LENS_SIZE / 2;
    const { x, y } = clampLens(rawX, rawY, rect.width, rect.height);

    const { zoomW, zoomH } = layoutRef.current;
    const panelW = zoomW || rect.width * ZOOM_PANEL_WIDTH_SCALE;
    const panelH = zoomH || rect.height;
    const scaleX = panelW / LENS_SIZE;
    const scaleY = panelH / LENS_SIZE;

    lens.style.transform = `translate3d(${x}px, ${y}px, 0)`;

    zoomImg.style.width = `${bounds.displayW * scaleX}px`;
    zoomImg.style.height = `${bounds.displayH * scaleY}px`;
    zoomImg.style.transform = `translate3d(${-(x - bounds.offsetX) * scaleX}px, ${-(y - bounds.offsetY) * scaleY}px, 0)`;
  }, []);

  const scheduleLensUpdate = useCallback(
    (clientX: number, clientY: number) => {
      pendingRef.current = { x: clientX, y: clientY };
      if (frameRef.current !== undefined) return;

      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = undefined;
        const pending = pendingRef.current;
        if (pending) applyLens(pending.x, pending.y);
      });
    },
    [applyLens]
  );

  useEffect(
    () => () => {
      if (frameRef.current !== undefined) {
        cancelAnimationFrame(frameRef.current);
      }
    },
    []
  );

  return (
    <div className={cn("relative w-full", className)}>
      <div
        ref={containerRef}
        className="relative aspect-square w-full overflow-hidden rounded-xl border border-pro bg-muted/30 lg:cursor-crosshair"
        onMouseEnter={(event) => {
          setIsActive(true);
          scheduleLensUpdate(event.clientX, event.clientY);
        }}
        onMouseLeave={() => setIsActive(false)}
        onMouseMove={(event) => scheduleLensUpdate(event.clientX, event.clientY)}
      >
        <SafeImage
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover select-none"
          draggable={false}
          onLoad={(event) => {
            const img = event.currentTarget;
            naturalRef.current = { width: img.naturalWidth, height: img.naturalHeight };
          }}
        />

        <div
          ref={lensRef}
          className={cn(
            "pointer-events-none absolute left-0 top-0 hidden border-2 border-brand-yellow/80 bg-brand-yellow/10 shadow-sm will-change-transform lg:block",
            !isActive && "opacity-0"
          )}
          style={{ width: LENS_SIZE, height: LENS_SIZE }}
          aria-hidden
        />
      </div>

      <div
        className={cn(
          "pointer-events-none absolute z-10 hidden overflow-hidden rounded-xl border border-pro bg-white shadow-pro-lg lg:block",
          isActive ? "visible opacity-100" : "invisible opacity-0"
        )}
        style={{
          left: "calc(100% + 1rem)",
          top: 0,
          width: layout.zoomW > 0 ? layout.zoomW : "100%",
          height: layout.zoomH > 0 ? layout.zoomH : "100%",
        }}
        aria-hidden={!isActive}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={zoomImgRef}
          src={zoomSrc}
          alt=""
          draggable={false}
          className="absolute left-0 top-0 max-w-none select-none will-change-transform"
        />
      </div>
    </div>
  );
}
