import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { X, Navigation2, Car as CarIcon } from "lucide-react";
import { driver } from "../../data/mockData";
import type { Screen } from "../../App";

export function ARPickup({ go }: { go: (s: Screen) => void }) {
  // Simulert kompass-heading + distanse
  const [heading, setHeading] = useState(34);
  const [distance, setDistance] = useState(42);

  useEffect(() => {
    const id = setInterval(() => {
      setHeading((h) => h + (Math.random() - 0.5) * 4);
      setDistance((d) => Math.max(2, d - 1));
    }, 1100);
    return () => clearInterval(id);
  }, []);

  const arrow = Math.round(heading);
  const cardinal = arrow < 22 || arrow > 338 ? "N" : arrow < 112 ? "Ø" : arrow < 202 ? "S" : arrow < 292 ? "V" : "N";

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      {/* Fake kamera-feed: mørk gradient + grain + horisont */}
      <div className="absolute inset-0"
           style={{ background: "linear-gradient(180deg, #0a0f1a 0%, #1a2030 45%, #2a3045 70%, #0d1118 100%)" }} />
      <div className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
           style={{
             backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
           }} />
      {/* Horisont */}
      <div className="absolute left-0 right-0 top-1/2 h-px bg-white/15" />

      {/* Skannings-rutenett (AR HUD) */}
      <svg className="absolute inset-0 w-full h-full opacity-30" aria-hidden>
        <defs>
          <pattern id="arGrid" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(94,240,255,0.6)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#arGrid)" />
      </svg>

      {/* Top status */}
      <div className="absolute left-4 right-4 top-4 z-30 flex items-center justify-between">
        <div className="glass-panel holo-border rounded-full px-3 py-1.5 flex items-center gap-2">
          <span className="relative flex w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-[var(--aurora-cyan)] animate-ping opacity-70" />
            <span className="relative w-2 h-2 rounded-full bg-[var(--aurora-cyan)]" />
          </span>
          <span className="text-white text-[10px] font-mono tracking-[0.22em]">AR-PICKUP · LIVE</span>
        </div>
        <button onClick={() => go("track")} aria-label="Lukk AR"
                className="w-9 h-9 rounded-full glass-panel flex items-center justify-center">
          <X className="w-4 h-4 text-white/80" />
        </button>
      </div>

      {/* Kompass-ring */}
      <div className="absolute left-1/2 top-20 -translate-x-1/2 z-20">
        <div className="relative w-44 h-44 rounded-full"
             style={{ boxShadow: "inset 0 0 0 1px rgba(94,240,255,0.35), 0 0 60px rgba(94,240,255,0.3)" }}>
          <div className="absolute inset-0 rounded-full"
               style={{ background: "radial-gradient(circle, rgba(94,240,255,0.08) 0%, transparent 70%)" }} />
          {/* Tick marks */}
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i}
                 className="absolute left-1/2 top-1/2 origin-bottom"
                 style={{
                   width: 1, height: i % 9 === 0 ? 10 : 5,
                   background: i % 9 === 0 ? "var(--aurora-cyan)" : "rgba(255,255,255,0.4)",
                   transform: `translate(-50%, -88px) rotate(${i * 10}deg)`,
                   transformOrigin: "50% 88px",
                 }} />
          ))}
          {/* N/Ø/S/V */}
          {[
            { l: "N", deg: 0 }, { l: "Ø", deg: 90 }, { l: "S", deg: 180 }, { l: "V", deg: 270 },
          ].map((c) => (
            <div key={c.l}
                 className="absolute left-1/2 top-1/2 text-white text-[10px] font-mono tracking-wider"
                 style={{
                   transform: `translate(-50%, -50%) rotate(${c.deg}deg) translate(0, -68px) rotate(${-c.deg}deg)`,
                 }}>
              {c.l}
            </div>
          ))}
          {/* Pil — animert mot bilen */}
          <motion.div
            className="absolute left-1/2 top-1/2"
            style={{ transformOrigin: "0 0" }}
            animate={{ rotate: arrow }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
          >
            <div className="absolute -translate-x-1/2"
                 style={{ width: 4, height: 64, top: -64,
                          background: "linear-gradient(180deg, #5ef0ff 0%, transparent 100%)",
                          boxShadow: "0 0 16px var(--aurora-cyan)" }} />
            <div className="absolute -translate-x-1/2"
                 style={{ top: -80,
                          width: 0, height: 0,
                          borderLeft: "10px solid transparent",
                          borderRight: "10px solid transparent",
                          borderBottom: "16px solid #5ef0ff",
                          filter: "drop-shadow(0 0 8px var(--aurora-cyan))" }} />
          </motion.div>
        </div>
      </div>

      {/* Bil-target i bakgrunnen */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 z-10"
        style={{ top: "55%" }}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative">
          <div className="w-24 h-24 rounded-full flex items-center justify-center"
               style={{ background: "radial-gradient(circle, rgba(94,240,255,0.35) 0%, transparent 70%)" }}>
            <div className="w-16 h-16 rounded-full glass-panel holo-border flex items-center justify-center"
                 style={{ boxShadow: "var(--aurora-glow-soft)" }}>
              <CarIcon className="w-7 h-7 text-[var(--aurora-cyan)]" strokeWidth={1.8} />
            </div>
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 glass-panel holo-border rounded-full px-3 py-1 whitespace-nowrap">
            <span className="text-white text-[10px] font-mono tracking-wider">{driver.plate} · {driver.color.toUpperCase()}</span>
          </div>
        </div>
      </motion.div>

      {/* Bottom HUD */}
      <div className="absolute left-4 right-4 bottom-6 z-30">
        <div className="glass-panel holo-border rounded-3xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                 style={{ background: "var(--aurora-gradient)" }}>
              <Navigation2 className="w-4 h-4 text-[#05060f]" />
            </div>
            <div className="flex-1">
              <div className="text-white/55 text-[9px] font-mono tracking-wider">PEK MOT BILEN</div>
              <div className="text-white text-[14px] font-display">{distance} meter unna</div>
            </div>
            <div className="text-right">
              <div className="text-white/55 text-[9px] font-mono tracking-wider">RETNING</div>
              <div className="text-[var(--aurora-cyan)] text-[14px] font-mono">{arrow}° {cardinal}</div>
            </div>
          </div>
          <div className="text-white/65 text-[11px] leading-snug">
            Hold telefonen opp og snu deg sakte. Aurora viser deg veien til {driver.name.split(" ")[0]} sin {driver.car}.
          </div>
        </div>
      </div>
    </div>
  );
}
