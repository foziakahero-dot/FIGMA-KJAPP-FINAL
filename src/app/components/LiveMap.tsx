import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Plus, Minus, Compass } from "lucide-react";
import type { LngLat, NearbyDriver } from "../data/types";
import { HoloMap } from "./HoloMap";
import { createCarMarkerElement, updateCarMarkerElement } from "./CarMarker";

const BOUNDS = { minLng: 10.71, maxLng: 10.80, minLat: 59.895, maxLat: 59.940 };
const ZOOM_MIN = 0.7;
const ZOOM_MAX = 2.5;

function project(lngLat: LngLat): { xPct: number; yPct: number } {
  const xNorm = (lngLat[0] - BOUNDS.minLng) / (BOUNDS.maxLng - BOUNDS.minLng);
  const yNorm = 1 - (lngLat[1] - BOUNDS.minLat) / (BOUNDS.maxLat - BOUNDS.minLat);
  return { xPct: xNorm * 100, yPct: yNorm * 100 };
}

type Props = {
  drivers?: NearbyDriver[];
  showRoute?: { from: LngLat; to: LngLat } | boolean;
  showCar?: boolean;
  selfPosition?: LngLat;
  pickup?: LngLat;
  destination?: LngLat;
  onSelectDriver?: (id: string) => void;
};

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

export function LiveMap({
  drivers = [],
  showRoute,
  showCar = false,
  selfPosition,
  onSelectDriver,
}: Props) {
  const layerRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<Map<string, HTMLDivElement>>(new Map());

  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const pointersRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const dragStartRef = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);
  const pinchStartRef = useRef<{ dist: number; zoom: number } | null>(null);

  const nearestIds = useMemo(
    () =>
      new Set(
        [...drivers]
          .filter((d) => d.status === "available")
          .sort((a, b) => a.etaMin - b.etaMin)
          .slice(0, 3)
          .map((d) => d.id)
      ),
    [drivers]
  );

  // Driver marker sync.
  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    const seen = new Set<string>();
    for (const d of drivers) {
      seen.add(d.id);
      const { xPct, yPct } = project(d.lngLat);
      let el = markersRef.current.get(d.id);
      if (!el) {
        el = createCarMarkerElement({
          headingDeg: d.headingDeg,
          status: d.status,
          etaMin: d.etaMin,
          showEta: nearestIds.has(d.id),
          tier: d.tier,
          onSelect: onSelectDriver ? () => onSelectDriver(d.id) : undefined,
        });
        el.style.position = "absolute";
        el.style.transition = "left 1.2s linear, top 1.2s linear";
        layer.appendChild(el);
        markersRef.current.set(d.id, el);
      } else {
        updateCarMarkerElement(el, { headingDeg: d.headingDeg });
      }
      el.style.left = `${xPct}%`;
      el.style.top = `${yPct}%`;
    }
    for (const [id, el] of markersRef.current) {
      if (!seen.has(id)) {
        el.remove();
        markersRef.current.delete(id);
      }
    }
  }, [drivers, nearestIds, onSelectDriver]);

  useEffect(() => {
    return () => {
      markersRef.current.forEach((el) => el.remove());
      markersRef.current.clear();
    };
  }, []);

  const selfXY = selfPosition
    ? (() => {
        const p = project(selfPosition);
        return { x: (p.xPct / 100) * 390, y: (p.yPct / 100) * 500 };
      })()
    : undefined;

  // Zoom controls.
  const zoomBy = useCallback((factor: number) => {
    setZoom((z) => clamp(z * factor, ZOOM_MIN, ZOOM_MAX));
  }, []);
  const resetView = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  // Pointer / pinch / drag.
  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointersRef.current.size === 1) {
      dragStartRef.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
    } else if (pointersRef.current.size === 2) {
      const pts = [...pointersRef.current.values()];
      const dx = pts[0].x - pts[1].x;
      const dy = pts[0].y - pts[1].y;
      pinchStartRef.current = { dist: Math.hypot(dx, dy) || 1, zoom };
      dragStartRef.current = null;
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointersRef.current.has(e.pointerId)) return;
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointersRef.current.size === 2 && pinchStartRef.current) {
      const pts = [...pointersRef.current.values()];
      const dx = pts[0].x - pts[1].x;
      const dy = pts[0].y - pts[1].y;
      const dist = Math.hypot(dx, dy);
      const ratio = dist / pinchStartRef.current.dist;
      setZoom(clamp(pinchStartRef.current.zoom * ratio, ZOOM_MIN, ZOOM_MAX));
    } else if (pointersRef.current.size === 1 && dragStartRef.current) {
      const rect = containerRef.current?.getBoundingClientRect();
      const maxX = (rect?.width ?? 320) * 0.6;
      const maxY = (rect?.height ?? 300) * 0.6;
      const nx = dragStartRef.current.panX + (e.clientX - dragStartRef.current.x);
      const ny = dragStartRef.current.panY + (e.clientY - dragStartRef.current.y);
      setPan({ x: clamp(nx, -maxX, maxX), y: clamp(ny, -maxY, maxY) });
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    pointersRef.current.delete(e.pointerId);
    if (pointersRef.current.size < 2) pinchStartRef.current = null;
    if (pointersRef.current.size === 0) dragStartRef.current = null;
  };

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    zoomBy(e.deltaY < 0 ? 1.1 : 0.9);
  };

  const btn = {
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: "rgba(8,10,24,0.88)",
    border: "1px solid rgba(94,240,255,0.28)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(20px)",
    cursor: "pointer",
    pointerEvents: "auto" as const,
    boxShadow: "0 4px 14px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.04)",
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      style={{ overflow: "hidden", touchAction: "none" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onWheel={onWheel}
    >
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: "50% 50%",
          transition: dragStartRef.current || pinchStartRef.current ? "none" : "transform 240ms cubic-bezier(.4,0,.2,1)",
          willChange: "transform",
        }}
      >
        <HoloMap
          showRoute={!!showRoute}
          showCar={showCar}
          availableCars={[]}
          selfPosition={selfXY}
        />
        <div
          ref={layerRef}
          className="pointer-events-none absolute inset-0"
          style={{ zIndex: 2 }}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 0% 0%, rgba(94,240,255,0.10), transparent 55%), radial-gradient(120% 80% at 100% 100%, rgba(160,107,255,0.12), transparent 55%)",
          zIndex: 3,
        }}
      />

      {/* Zoom controls */}
      <div
        className="absolute"
        style={{
          right: 12,
          top: "max(env(safe-area-inset-top), 12px)",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          zIndex: 6,
          pointerEvents: "none",
        }}
      >
        <button
          aria-label="Zoom inn"
          style={btn}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => zoomBy(1.25)}
        >
          <Plus size={16} strokeWidth={2.4} />
        </button>
        <button
          aria-label="Zoom ut"
          style={btn}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => zoomBy(0.8)}
        >
          <Minus size={16} strokeWidth={2.4} />
        </button>
        <button
          aria-label="Tilbakestill"
          style={btn}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={resetView}
        >
          <Compass size={15} strokeWidth={2.2} />
        </button>
      </div>
    </div>
  );
}
