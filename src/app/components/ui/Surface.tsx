import type { CSSProperties, ReactNode } from "react";

type Elevation = "whisper" | "standard" | "hero";

export function Surface({
  elevation = "standard",
  holo,
  glow,
  className = "",
  style,
  children,
  onClick,
}: {
  elevation?: Elevation;
  holo?: boolean;
  glow?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  onClick?: () => void;
}) {
  const base = `surface-${elevation}`;
  const radius = elevation === "hero" ? "var(--radius-xl)" : "var(--radius-lg)";
  return (
    <div
      onClick={onClick}
      className={`${base} ${className}`}
      style={{
        borderRadius: radius,
        boxShadow: glow ? "0 16px 48px -12px rgba(94,240,255,0.28)" : undefined,
        borderColor: holo ? "rgba(94,240,255,0.35)" : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
