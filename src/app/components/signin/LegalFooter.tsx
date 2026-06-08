import { motion } from "motion/react";

export function LegalFooter() {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9 }}
      className="text-center max-w-[300px] mx-auto leading-snug"
      style={{
        color: "var(--text-secondary)",
        opacity: 0.7,
        fontSize: 10.5,
      }}
    >
      Ved å fortsette godtar du{" "}
      <span className="underline underline-offset-2" style={{ color: "var(--text-primary)", opacity: 0.85 }}>
        vilkår
      </span>{" "}
      og{" "}
      <span className="underline underline-offset-2" style={{ color: "var(--text-primary)", opacity: 0.85 }}>
        personvern
      </span>
    </motion.p>
  );
}
