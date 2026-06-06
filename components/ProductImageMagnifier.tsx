"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SafeImage from "@/components/SafeImage";
import { cn } from "@/lib/utils";

const LENS_SIZE = 120;
const ZOOM_PANEL_WIDTH_SCALE = 1.65;
const ZOOM_PANEL_HEIGHT_SCALE = 1;

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

function getContainedImageBounds(
  containerW: number,
  containerH: number,
  naturalW: number,
  naturalH: number
): ImageBounds {
  if (!containerW || !containerH || !naturalW || !naturalH) {
    return { displayW: containerW, displayH: containerH, offsetX: 0, offsetY: 0 };
  }

  const containerRatio = containerW / containerH;
  const imageRatio = naturalW / naturalH;

  if (imageRatio > containerRatio) {
    const displayW = containerW;
    const displayH = containerW / imageRatio;
    return { displayW, displayH, offsetX: 0, offsetY: (containerH - displayH) / 2 };
  }

  const displayH = containerH;
  const displayW = containerH * imageRatio;
  return { displayW, displayH, offsetX: (containerW - displayW) / 2, offsetY: 0 };
}

function clampLens(
  x: number,
  y: number,
  bounds: ImageBounds,
  containerW: number,
  containerH: number
) {
  const minX = bounds.offsetX;
  const minY = bounds.offsetY;
  const maxX = Math.min(containerW - LENS_SIZE, bounds.offsetX + bounds.displayW - LENS_SIZE);
  const maxY = Math.min(containerH - LENS_SIZE, bounds.offsetY + bounds.displayH - LENS_SIZE);

  return {
    x: Math.min(maxX, Math.max(minX, x)),
    y: Math.min(maxY, Math.max(minY, y)),
  };
}

export default function ProductImageMagnifier({
  src,
  alt,
  className,
}: ProductImageMagnifierProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [dims, setDims] = useState({ width: 0, height: 0 });
  const [zoomDims, setZoomDims] = useState({ width: 0, height: 0 });
  const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 });
  const [lens, setLens] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    const zoom = zoomRef.current;
    if (!container) return;

    const updateDims = () => {
      setDims({ width: container.clientWidth, height: container.clientHeight });
      if (zoom) {
        setZoomDims({ width: zoom.clientWidth, height: zoom.clientHeight });
      }
    };

    updateDims();
    const observer = new ResizeObserver(updateDims);
    observer.observe(container);
    if (zoom) observer.observe(zoom);
    return () => observer.disconnect();
  }, [isActive]);

  const bounds = getContainedImageBounds(
    dims.width,
    dims.height,
    naturalSize.width,
    naturalSize.height
  );

  const updateLens = useCallback(
    (clientX: number, clientY: number) => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const currentBounds = getContainedImageBounds(
        rect.width,
        rect.height,
        naturalSize.width,
        naturalSize.height
      );

      const rawX = clientX - rect.left - LENS_SIZE / 2;
      const rawY = clientY - rect.top - LENS_SIZE / 2;
      const nextLens = clampLens(rawX, rawY, currentBounds, rect.width, rect.height);

      setLens(nextLens);
      setDims({ width: rect.width, height: rect.height });
    },
    [naturalSize.height, naturalSize.width]
  );

  const zoomRatioX =
    zoomDims.width > 0 ? zoomDims.width / LENS_SIZE : dims.width / LENS_SIZE;
  const zoomRatioY =
    zoomDims.height > 0 ? zoomDims.height / LENS_SIZE : dims.height / LENS_SIZE;

  const zoomPanelWidth = dims.width > 0 ? dims.width * ZOOM_PANEL_WIDTH_SCALE : 0;
  const zoomPanelHeight = dims.height > 0 ? dims.height * ZOOM_PANEL_HEIGHT_SCALE : 0;

  const zoomBackgroundStyle =
    isActive && bounds.displayW > 0
      ? {
          backgroundImage: `url("${src}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${bounds.displayW * zoomRatioX}px ${bounds.displayH * zoomRatioY}px`,
          backgroundPosition: `${-(lens.x - bounds.offsetX) * zoomRatioX}px ${-(lens.y - bounds.offsetY) * zoomRatioY}px`,
        }
      : undefined;

  const mobileZoomStyle =
    isActive && bounds.displayW > 0
      ? {
          backgroundImage: `url("${src}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${bounds.displayW * 2}px ${bounds.displayH * 2}px`,
          backgroundPosition: `${-(lens.x - bounds.offsetX) * 2}px ${-(lens.y - bounds.offsetY) * 2}px`,
        }
      : undefined;

  return (
    <div className={cn("relative w-full", className)}>
      <div
        ref={containerRef}
        className="relative aspect-square w-full cursor-crosshair overflow-hidden rounded-xl border border-pro bg-white"
        onMouseEnter={(e) => {
          setIsActive(true);
          updateLens(e.clientX, e.clientY);
        }}
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
            "absolute inset-0 h-full w-full object-contain select-none transition-opacity",
            isActive ? "opacity-0 lg:opacity-100" : "opacity-100"
          )}
          draggable={false}
          onLoad={(e) => {
            const img = e.currentTarget;
            setNaturalSize({ width: img.naturalWidth, height: img.naturalHeight });
          }}
        />

        {isActive && dims.width > 0 && (
          <div
            className="pointer-events-none absolute hidden border-2 border-brand-yellow/80 bg-brand-yellow/10 shadow-sm lg:block"
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
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden lg:hidden"
            style={mobileZoomStyle}
            aria-hidden
          />
        )}
      </div>

      <div
        ref={zoomRef}
        className={cn(
          "pointer-events-none absolute z-10 hidden overflow-hidden rounded-xl border border-pro bg-white shadow-pro-lg transition-opacity duration-150 lg:block",
          isActive ? "opacity-100" : "opacity-0"
        )}
        style={{
          left: "calc(100% + 1rem)",
          top: 0,
          width: zoomPanelWidth > 0 ? zoomPanelWidth : "100%",
          height: zoomPanelHeight > 0 ? zoomPanelHeight : "100%",
          ...zoomBackgroundStyle,
        }}
        aria-hidden={!isActive}
        role="img"
        aria-label={isActive ? `${alt} zoomed` : undefined}
      />
    </div>
  );
}
