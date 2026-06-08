import { motion } from "motion/react";

export function AuroraOrb({ size = 56, listening = false }: { size?: number; listening?: boolean }) {
  const s = size;
  const floatDur = 4;
  const haloDur = listening ? 1.6 : 3.2;
  const pulseDur = listening ? 1.1 : 2.6;
  const rotateDur = listening ? 2.4 : 14;

  return (
    <motion.div
      style={{ width: s, height: s, position: "relative", flexShrink: 0 }}
      initial={{ y: 0 }}
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: floatDur, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Outer halo */}
      <motion.div
        style={{
          position: "absolute",
          top: -s * 0.35,
          left: -s * 0.35,
          right: -s * 0.35,
          bottom: -s * 0.35,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(94,240,255,0.45) 0%, rgba(160,107,255,0.25) 35%, transparent 65%)",
          filter: "blur(8px)",
        }}
        initial={{ opacity: 0.5, scale: 1 }}
        animate={{
          opacity: listening ? [0.6, 1, 0.6] : [0.5, 0.8, 0.5],
          scale: listening ? [1, 1.08, 1] : [1, 1.04, 1],
        }}
        transition={{ duration: haloDur, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Conic aurora shell */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background:
            "conic-gradient(from 0deg, #5ef0ff 0%, #6bffc7 15%, #a06bff 40%, #ff5ed1 60%, #ff8fb6 75%, #5ef0ff 100%)",
          filter: "blur(0.5px)",
        }}
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: rotateDur, repeat: Infinity, ease: "linear" }}
      />

      {/* Glass core */}
      <div
        style={{
          position: "absolute",
          top: Math.max(2, s * 0.05),
          left: Math.max(2, s * 0.05),
          right: Math.max(2, s * 0.05),
          bottom: Math.max(2, s * 0.05),
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.25) 12%, rgba(94,240,255,0.45) 30%, rgba(20,8,55,0.85) 70%, #05060f 100%)",
          boxShadow:
            "inset 0 0 12px rgba(94,240,255,0.5), inset 0 -8px 24px rgba(255,94,209,0.35)",
        }}
      />

      {/* Inner pulse */}
      <motion.div
        style={{
          position: "absolute",
          top: s * 0.22,
          left: s * 0.22,
          right: s * 0.22,
          bottom: s * 0.22,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(94,240,255,0.7) 0%, rgba(160,107,255,0.4) 50%, transparent 100%)",
          filter: "blur(2px)",
        }}
        initial={{ opacity: 0.55, scale: 1 }}
        animate={{
          opacity: [0.55, 1, 0.55],
          scale: listening ? [1, 1.15, 1] : [1, 1.08, 1],
        }}
        transition={{ duration: pulseDur, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Specular highlight */}
      <div
        style={{
          position: "absolute",
          top: s * 0.12,
          left: s * 0.22,
          width: s * 0.28,
          height: s * 0.16,
          borderRadius: "50%",
          background: "white",
          opacity: 0.85,
          filter: "blur(1.5px)",
          transform: "rotate(-20deg)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: s * 0.18,
          right: s * 0.24,
          width: s * 0.08,
          height: s * 0.06,
          borderRadius: "50%",
          background: "white",
          opacity: 0.5,
          filter: "blur(1px)",
          pointerEvents: "none",
        }}
      />
    </motion.div>
  );
}
