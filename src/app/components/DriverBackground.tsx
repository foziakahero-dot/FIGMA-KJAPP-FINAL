import { motion, useReducedMotion } from "motion/react";

/** Cockpit-bakgrunn for sjåfør-appen — amber/graphite i stedet for aurora. */
export function DriverBackground({ intensity = 0.85 }: { intensity?: number }) {
  const reduce = useReducedMotion();
  const anim = (a: any) => (reduce ? undefined : a);
  const trans = (t: any) => (reduce ? undefined : t);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at top, var(--driver-bg-2) 0%, var(--driver-bg-1) 45%, var(--driver-bg-0) 100%)",
        }}
      />

      <motion.div
        className="absolute -top-40 -left-32 w-[60vmin] h-[60vmin] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(255,181,71,0.55) 0%, rgba(255,181,71,0) 70%)",
          opacity: 0.7 * intensity,
        }}
        initial={{ x: 0, y: 0, scale: 1 }}
        animate={anim({ x: [0, 30, -20, 0], y: [0, 30, 60, 0], scale: [1, 1.1, 0.95, 1] })}
        transition={trans({ duration: 22, repeat: Infinity, ease: "easeInOut" })}
      />
      <motion.div
        className="absolute top-1/3 -right-24 w-[55vmin] h-[55vmin] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(217,119,6,0.5) 0%, rgba(217,119,6,0) 70%)",
          opacity: 0.65 * intensity,
        }}
        initial={{ x: 0, y: 0, scale: 1 }}
        animate={anim({ x: [0, -30, 20, 0], y: [0, 40, -20, 0], scale: [1, 1.1, 1.05, 1] })}
        transition={trans({ duration: 26, repeat: Infinity, ease: "easeInOut" })}
      />
      <motion.div
        className="absolute -bottom-32 left-1/4 w-[55vmin] h-[55vmin] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(255,89,33,0.35) 0%, rgba(255,89,33,0) 70%)",
          opacity: 0.55 * intensity,
        }}
        initial={{ x: 0, y: 0, scale: 1 }}
        animate={anim({ x: [0, 30, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.12, 0.95, 1] })}
        transition={trans({ duration: 24, repeat: Infinity, ease: "easeInOut" })}
      />

      {/* HUD grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,181,71,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,181,71,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Grain */}
      <div
        className="absolute inset-0 mix-blend-overlay opacity-[0.08]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/></svg>\")",
        }}
      />
    </div>
  );
}
