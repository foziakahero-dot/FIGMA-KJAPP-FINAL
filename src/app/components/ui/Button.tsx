import { motion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const SIZE: Record<Size, { py: number; px: number; fs: number }> = {
  sm: { py: 8, px: 14, fs: 12 },
  md: { py: 12, px: 18, fs: 13 },
  lg: { py: 14, px: 22, fs: 14 },
};

export function Button({
  variant = "primary",
  size = "md",
  icon,
  trailing,
  onClick,
  disabled,
  children,
  style,
  ariaLabel,
}: {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  trailing?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  children?: ReactNode;
  style?: CSSProperties;
  ariaLabel?: string;
}) {
  const s = SIZE[size];

  const variantStyle: CSSProperties =
    variant === "primary"
      ? {
          background: "var(--aurora-gradient)",
          color: "#05060f",
          boxShadow: "0 10px 32px -10px rgba(94,240,255,0.55)",
          fontWeight: 600,
          letterSpacing: "0.04em",
        }
      : variant === "secondary"
      ? {
          background: "rgba(255,255,255,0.06)",
          color: "#ffffff",
          border: "1px solid rgba(255,255,255,0.12)",
          fontWeight: 500,
        }
      : {
          background: "transparent",
          color: "rgba(255,255,255,0.85)",
          fontWeight: 500,
        };

  return (
    <motion.button
      whileTap={disabled ? undefined : { scale: 0.985 }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        paddingTop: s.py,
        paddingBottom: s.py,
        paddingLeft: s.px,
        paddingRight: s.px,
        borderRadius: "var(--radius-lg)",
        fontFamily: "var(--font-display)",
        fontSize: s.fs,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        ...variantStyle,
        ...style,
      }}
    >
      {icon}
      {children}
      {trailing}
    </motion.button>
  );
}
