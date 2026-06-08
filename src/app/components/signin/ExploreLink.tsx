import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function ExploreLink({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.65 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full"
      style={{
        color: "var(--text-secondary)",
        fontSize: 12,
        letterSpacing: "0.02em",
      }}
    >
      <span className="font-display">Se hvordan KJAPP fungerer</span>
      <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
    </motion.button>
  );
}
