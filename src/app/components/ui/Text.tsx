import type { CSSProperties, ReactNode, ElementType } from "react";

type Variant =
  | "display-xl"
  | "display-lg"
  | "display-md"
  | "body-lg"
  | "body"
  | "body-sm"
  | "mono-md"
  | "mono-sm"
  | "mono-xs";

type Tone = "primary" | "secondary" | "muted" | "accent" | "amber" | "violet" | "magenta";

const VARIANT: Record<Variant, { size: string; lh: string; family: string; weight: number; track?: string; upper?: boolean }> = {
  "display-xl": { size: "var(--text-display-xl)", lh: "var(--text-display-xl-lh)", family: "var(--font-display)", weight: 600 },
  "display-lg": { size: "var(--text-display-lg)", lh: "var(--text-display-lg-lh)", family: "var(--font-display)", weight: 600 },
  "display-md": { size: "var(--text-display-md)", lh: "var(--text-display-md-lh)", family: "var(--font-display)", weight: 500 },
  "body-lg": { size: "var(--text-body-lg)", lh: "var(--text-body-lg-lh)", family: "var(--font-body)", weight: 400 },
  "body": { size: "var(--text-body)", lh: "var(--text-body-lh)", family: "var(--font-body)", weight: 400 },
  "body-sm": { size: "var(--text-body-sm)", lh: "var(--text-body-sm-lh)", family: "var(--font-body)", weight: 400 },
  "mono-md": { size: "var(--text-mono-md)", lh: "var(--text-mono-md-lh)", family: "var(--font-mono)", weight: 500, track: "var(--tracking-std)", upper: true },
  "mono-sm": { size: "var(--text-mono-sm)", lh: "var(--text-mono-sm-lh)", family: "var(--font-mono)", weight: 500, track: "var(--tracking-wide)", upper: true },
  "mono-xs": { size: "var(--text-mono-xs)", lh: "var(--text-mono-xs-lh)", family: "var(--font-mono)", weight: 500, track: "var(--tracking-wide)", upper: true },
};

const TONE: Record<Tone, string> = {
  primary: "#ffffff",
  secondary: "rgba(255,255,255,0.7)",
  muted: "rgba(255,255,255,0.5)",
  accent: "var(--aurora-cyan)",
  amber: "var(--kjapp-amber)",
  violet: "var(--aurora-violet)",
  magenta: "var(--aurora-magenta)",
};

export function Text({
  as: Tag = "span",
  variant = "body",
  tone = "primary",
  tabular,
  className,
  style,
  children,
}: {
  as?: ElementType;
  variant?: Variant;
  tone?: Tone;
  tabular?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const v = VARIANT[variant];
  return (
    <Tag
      className={className}
      style={{
        fontFamily: v.family,
        fontSize: v.size,
        lineHeight: v.lh,
        fontWeight: v.weight,
        letterSpacing: v.track,
        textTransform: v.upper ? "uppercase" : undefined,
        color: TONE[tone],
        fontVariantNumeric: tabular ? "tabular-nums" : undefined,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
