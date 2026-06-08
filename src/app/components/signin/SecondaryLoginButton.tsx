import { motion } from "motion/react";
import { Apple } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "bankid" | "apple" | "google";

export function SecondaryLoginButton({
  variant,
  label,
  onClick,
}: {
  variant: Variant;
  label: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={{ y: -1 }}
      onClick={onClick}
      aria-label={label}
      className="h-14 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-colors"
      style={{
        background: "var(--button-secondary)",
        border: "1px solid var(--glass-border)",
        backdropFilter: "blur(20px) saturate(140%)",
      }}
    >
      <Icon variant={variant} />
      <span
        className="font-display"
        style={{
          color: "var(--text-secondary)",
          fontSize: 10,
          letterSpacing: "0.08em",
        }}
      >
        {label}
      </span>
    </motion.button>
  );
}

function Icon({ variant }: { variant: Variant }): ReactNode {
  if (variant === "apple") {
    return <Apple className="w-[18px] h-[18px]" style={{ color: "var(--text-primary)" }} fill="currentColor" />;
  }
  if (variant === "google") {
    return (
      <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden>
        <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"/>
        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
        <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.3 0-9.7-3.1-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
        <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.1 5.6l6.2 5.2C41.6 35.6 44 30.2 44 24c0-1.2-.1-2.3-.4-3.5z"/>
      </svg>
    );
  }
  // BankID — offisiell-aktig wordmark-pill
  return (
    <span
      className="px-2 py-[3px] rounded-[5px] font-display"
      style={{
        background: "#39134c",
        color: "#ffffff",
        fontSize: 9,
        letterSpacing: "0.08em",
      }}
    >
      BankID
    </span>
  );
}
