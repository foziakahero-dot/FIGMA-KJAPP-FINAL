import { motion } from "motion/react";

export function DriverLoginButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -1 }}
      onClick={onClick}
      aria-label="Sjåfør-innlogging"
      className="glass-panel rounded-full px-4 py-2 inline-flex items-center gap-2"
      style={{
        boxShadow:
          "inset 0 0 0 1px rgba(255,181,71,0.32), 0 8px 24px -16px rgba(255,181,71,0.35)",
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: "var(--driver-accent)" }}
      />
      <span
        className="font-display"
        style={{
          color: "var(--text-primary)",
          fontSize: 11,
          letterSpacing: "0.16em",
        }}
      >
        SJÅFØR? LOGG INN
      </span>
    </motion.button>
  );
}
