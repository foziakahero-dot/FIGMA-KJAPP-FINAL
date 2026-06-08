import type { ReactNode } from "react";

type Tone = "cyan" | "violet" | "magenta" | "amber" | "mint" | "neutral";

const TONE: Record<Tone, { bg: string; fg: string }> = {
  cyan: { bg: "rgba(94,240,255,0.18)", fg: "var(--aurora-cyan)" },
  violet: { bg: "rgba(160,107,255,0.18)", fg: "var(--aurora-violet)" },
  magenta: { bg: "rgba(255,94,209,0.18)", fg: "var(--aurora-magenta)" },
  amber: { bg: "rgba(255,181,71,0.18)", fg: "var(--kjapp-amber)" },
  mint: { bg: "rgba(107,255,199,0.18)", fg: "var(--aurora-mint)" },
  neutral: { bg: "rgba(255,255,255,0.08)", fg: "rgba(255,255,255,0.75)" },
};

export function Badge({
  tone = "neutral",
  children,
}: {
  tone?: Tone;
  children: ReactNode;
}) {
  const t = TONE[tone];
  return (
    <span
      className="font-mono uppercase"
      style={{
        background: t.bg,
        color: t.fg,
        padding: "2px 8px",
        borderRadius: "var(--radius-full)",
        fontSize: "var(--text-mono-xs)",
        lineHeight: "var(--text-mono-xs-lh)",
        letterSpacing: "var(--tracking-std)",
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
      }}
    >
      {children}
    </span>
  );
}
