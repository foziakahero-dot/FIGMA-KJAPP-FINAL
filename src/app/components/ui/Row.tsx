import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Text } from "./Text";

export function Row({
  icon,
  label,
  desc,
  trailing,
  onClick,
  chevron = true,
}: {
  icon?: ReactNode;
  label: string;
  desc?: string;
  trailing?: ReactNode;
  onClick?: () => void;
  chevron?: boolean;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.985 }}
      onClick={onClick}
      className="w-full surface-standard rounded-2xl text-left"
      style={{
        padding: "var(--space-3) var(--space-4)",
        display: "flex",
        alignItems: "center",
        gap: "var(--space-3)",
        minHeight: 56,
      }}
    >
      {icon && (
        <div
          className="shrink-0 flex items-center justify-center"
          style={{
            width: 36,
            height: 36,
            borderRadius: "var(--radius-md)",
            background: "rgba(94,240,255,0.12)",
            color: "var(--aurora-cyan)",
          }}
        >
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <Text variant="body">{label}</Text>
        {desc && (
          <Text variant="body-sm" tone="secondary" style={{ marginTop: 2 }}>
            {desc}
          </Text>
        )}
      </div>
      {trailing}
      {chevron && <ChevronRight className="w-4 h-4 text-white/45" />}
    </motion.button>
  );
}
