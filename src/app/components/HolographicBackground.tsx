import { motion, useReducedMotion } from "motion/react";

export function HolographicBackground({ intensity = 1 }: { intensity?: number }) {
  const reduce = useReducedMotion();
  const anim = (a: any) => (reduce ? undefined : a);
  const trans = (t: any) => (reduce ? undefined : t);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at top, var(--aurora-bg-2) 0%, var(--aurora-bg-1) 45%, var(--aurora-bg-0) 100%)",
        }}
      />

      {/* Aurora blobs */}
      <motion.div
        className="absolute -top-32 -left-32 w-[60vmin] h-[60vmin] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(94,240,255,0.55) 0%, rgba(94,240,255,0) 70%)",
          opacity: 0.85 * intensity,
        }}
        initial={{ x: 0, y: 0, scale: 1 }}
        animate={anim({
          x: [0, 40, -20, 0],
          y: [0, 30, 60, 0],
          scale: [1, 1.15, 0.95, 1],
        })}
        transition={trans({ duration: 18, repeat: Infinity, ease: "easeInOut" })}
      />
      <motion.div
        className="absolute top-1/3 -right-24 w-[55vmin] h-[55vmin] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(160,107,255,0.55) 0%, rgba(160,107,255,0) 70%)",
          opacity: 0.8 * intensity,
        }}
        initial={{ x: 0, y: 0, scale: 1 }}
        animate={anim({
          x: [0, -30, 20, 0],
          y: [0, 40, -20, 0],
          scale: [1, 1.1, 1.05, 1],
        })}
        transition={trans({ duration: 22, repeat: Infinity, ease: "easeInOut" })}
      />
      <motion.div
        className="absolute -bottom-32 left-1/4 w-[55vmin] h-[55vmin] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,94,209,0.45) 0%, rgba(255,94,209,0) 70%)",
          opacity: 0.7 * intensity,
        }}
        initial={{ x: 0, y: 0, scale: 1 }}
        animate={anim({
          x: [0, 30, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.12, 0.95, 1],
        })}
        transition={trans({ duration: 20, repeat: Infinity, ease: "easeInOut" })}
      />

      {/* Perlehvit snø-partikler — ren, ride-app-passende erstatning for stjerner */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.55]" aria-hidden>
        <defs>
          <radialGradient id="pearl" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#fffaf0" stopOpacity="1" />
            <stop offset="55%" stopColor="#fff5dc" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#fff5dc" stopOpacity="0" />
          </radialGradient>
          <pattern id="snow" x="0" y="0" width="260" height="260" patternUnits="userSpaceOnUse">
            {Array.from({ length: 22 }).map((_, i) => {
              const x = (i * 71) % 260;
              const y = (i * 113) % 260;
              const r = (i % 4) * 0.5 + 0.6;
              return <circle key={i} cx={x} cy={y} r={r} fill="url(#pearl)" />;
            })}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#snow)" />
      </svg>

      {/* Bevegende perle-skimmer — øvre lag som drifter sakte */}
      <motion.svg
        className="absolute inset-0 w-full h-full opacity-[0.35] pointer-events-none"
        aria-hidden
        initial={{ y: 0, x: 0 }}
        animate={anim({ y: [0, 8, 0], x: [0, -4, 0] })}
        transition={trans({ duration: 24, repeat: Infinity, ease: "easeInOut" })}
      >
        {Array.from({ length: 14 }).map((_, i) => {
          const x = ((i * 89) % 100);
          const y = ((i * 53) % 100);
          const r = (i % 3) * 0.4 + 0.7;
          return <circle key={i} cx={`${x}%`} cy={`${y}%`} r={r} fill="#fffaf0" opacity={0.55 + (i % 4) * 0.1} />;
        })}
      </motion.svg>

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
