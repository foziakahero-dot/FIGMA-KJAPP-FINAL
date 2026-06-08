import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function VippsLoginCard({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -1 }}
      onClick={onClick}
      aria-label="Fortsett med Vipps"
      className="relative w-full rounded-2xl overflow-hidden"
      style={{
        boxShadow:
          "0 18px 44px -16px rgba(255,91,36,0.45), 0 0 0 1px rgba(255,255,255,0.10) inset, 0 0 0 1px var(--border-glow)",
      }}
    >
      {/* Subtil holografisk glow — dempet ift. forrige versjon */}
      <motion.div
        className="absolute -inset-4 rounded-[1.6rem] pointer-events-none"
        initial={{ opacity: 0.25 }}
        animate={{ opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(94,240,255,0.18) 0%, transparent 55%), radial-gradient(ellipse at 80% 50%, rgba(255,91,36,0.35) 0%, transparent 60%)",
          filter: "blur(20px)",
        }}
      />
      <div
        className="relative px-5 py-5"
        style={{
          background:
            "linear-gradient(135deg, var(--vipps-orange-light) 0%, var(--vipps-orange) 55%, var(--vipps-orange-deep) 100%)",
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="text-left">
            <div
              className="font-display tracking-tight"
              style={{ color: "#fff", fontSize: 19 }}
            >
              Fortsett med <span style={{ letterSpacing: "-0.01em" }}>Vipps</span>
            </div>
            <div
              className="font-display mt-0.5"
              style={{ color: "rgba(255,255,255,0.82)", fontSize: 12 }}
            >
              Rask og trygg innlogging
            </div>
          </div>
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
            style={{
              background: "rgba(255,255,255,0.18)",
              backdropFilter: "blur(8px)",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.22)",
            }}
          >
            <ArrowRight className="w-[18px] h-[18px] text-white" strokeWidth={2.2} />
          </div>
        </div>
      </div>
    </motion.button>
  );
}
