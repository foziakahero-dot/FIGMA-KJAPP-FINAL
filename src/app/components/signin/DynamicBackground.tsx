import { motion } from "motion/react";
import { HolographicBackground } from "../HolographicBackground";

/**
 * Forfinet bakgrunn for SignIn-skjermen — bygger på den eksisterende
 * holografiske bakgrunnen, men demper støy og legger til en subtil
 * cyan/violet premium-gradient på toppen.
 */
export function DynamicBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Behold den eksisterende cosmic basen, men dempet */}
      <HolographicBackground intensity={0.72} />

      {/* Premium light-bleed øverst */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4 }}
        className="absolute inset-x-0 top-0 h-[55%]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(94,240,255,0.16) 0%, rgba(106,168,255,0.10) 30%, transparent 70%)",
        }}
      />

      {/* Subtil violet undertone — ikke for tung mot bunnen */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.2 }}
        className="absolute inset-x-0 bottom-0 h-[40%]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(10,8,32,0.4) 60%, rgba(5,4,16,0.85) 100%)",
        }}
      />

      {/* Dempet "stjernestøy"-mask — fjern hard prikkete tekstur */}
      <div
        className="absolute inset-0"
        style={{
          background: "var(--aurora-bg-0)",
          opacity: 0.18,
          mixBlendMode: "multiply",
        }}
      />
    </div>
  );
}
