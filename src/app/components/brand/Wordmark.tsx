import { motion } from "motion/react";

type Size = "hero" | "md" | "sm";
type Variant = "display" | "inline" | "mono";

const SIZE_TOKENS: Record<Size, { word: number; tag: number; gap: number; tracking: string }> = {
  hero: { word: 92, tag: 9.5, gap: 14, tracking: "0.34em" },
  md: { word: 56, tag: 8.5, gap: 8, tracking: "0.32em" },
  sm: { word: 32, tag: 7, gap: 4, tracking: "0.28em" },
};

/**
 * KJAPP brand wordmark — editorial lowercase "kjapp" i Instrument Serif med
 * subtil aurora-skimring som sveiper over hver 8. sekund. Én sannhetskilde
 * på tvers av alle skjermer.
 */
export function Wordmark({
  size = "md",
  variant = "display",
  showTagline = true,
  tagline = "en smartere måte å reise på",
  animateShimmer = true,
}: {
  size?: Size;
  variant?: Variant;
  showTagline?: boolean;
  tagline?: string;
  animateShimmer?: boolean;
}) {
  const t = SIZE_TOKENS[size];

  if (variant === "mono") {
    return (
      <div className="flex flex-col items-center">
        <span
          className="font-display uppercase text-white"
          style={{ fontSize: t.word * 0.32, letterSpacing: "0.14em", fontWeight: 700 }}
        >
          KJAPP
        </span>
        {showTagline && (
          <span
            className="font-mono uppercase text-white/60"
            style={{ fontSize: t.tag, letterSpacing: t.tracking, marginTop: t.gap * 0.5 }}
          >
            {tagline}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={variant === "inline" ? "flex items-baseline gap-3" : "flex flex-col items-center"}>
      <div className="relative" style={{ lineHeight: 1 }}>
        <span
          style={{
            fontFamily: "'Instrument Serif', 'Times New Roman', serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: t.word,
            lineHeight: 0.9,
            letterSpacing: "-0.01em",
            color: "#ffffff",
            display: "inline-block",
          }}
        >
          kjapp
        </span>
        {animateShimmer && (
          <motion.span
            aria-hidden
            initial={{ backgroundPositionX: "-150%" }}
            animate={{ backgroundPositionX: "250%" }}
            transition={{ duration: 2.4, ease: [0.65, 0, 0.35, 1], repeat: Infinity, repeatDelay: 5.6 }}
            style={{
              position: "absolute",
              inset: 0,
              fontFamily: "'Instrument Serif', 'Times New Roman', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: t.word,
              lineHeight: 0.9,
              letterSpacing: "-0.01em",
              backgroundImage:
                "linear-gradient(100deg, transparent 35%, rgba(94,240,255,0.85) 48%, rgba(160,107,255,0.85) 55%, transparent 68%)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              pointerEvents: "none",
            }}
          >
            kjapp
          </motion.span>
        )}
      </div>
      {showTagline && (
        <span
          className="font-mono uppercase text-white/65"
          style={{
            fontSize: t.tag,
            letterSpacing: t.tracking,
            marginTop: variant === "inline" ? 0 : t.gap,
            whiteSpace: "nowrap",
          }}
        >
          {tagline}
        </span>
      )}
    </div>
  );
}
