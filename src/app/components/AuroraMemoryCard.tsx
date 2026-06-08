import { motion } from "motion/react";
import { Instagram, Share2, Music, MapPin, Clock, Sparkles } from "lucide-react";

const memory = {
  from: "Grünerløkka",
  to: "Maaemo",
  date: "3. juni 2026",
  time: "19:42",
  duration: "14 min",
  distance: "4,2 km",
  weather: "12°C · lett regn",
  track: "Solsystemet · AURORA",
  vibe: "Stille",
  aurora: "Vi tok Trondheimsveien — spart 6 minutter mot E6.",
};

export function AuroraMemoryCard({ onShare }: { onShare?: (target: "instagram" | "messenger") => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, rotate: -2 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 180, damping: 18, delay: 0.2 }}
      className="relative rounded-3xl overflow-hidden"
      style={{
        background: "linear-gradient(155deg, #14081f 0%, #1f0e35 40%, #0a1a30 100%)",
        boxShadow: "0 24px 60px -20px rgba(160,107,255,0.55), inset 0 0 0 1px rgba(160,107,255,0.35)",
      }}
    >
      {/* Aurora-blobs i bakgrunn */}
      <motion.div
        className="absolute -top-16 -left-12 w-48 h-48 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(94,240,255,0.45)" }}
        initial={{ scale: 1, x: 0 }}
        animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-20 -right-10 w-52 h-52 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(255,94,209,0.4)" }}
        initial={{ scale: 1, y: 0 }}
        animate={{ scale: [1, 1.15, 1], y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Stjerne-grain */}
      <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" aria-hidden>
        {Array.from({ length: 24 }).map((_, i) => (
          <circle key={i} cx={`${(i * 71) % 100}%`} cy={`${(i * 113) % 100}%`}
                  r={(i % 3) * 0.4 + 0.5} fill="#fffaf0" opacity={0.4 + (i % 5) * 0.1} />
        ))}
      </svg>

      <div className="relative p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[var(--aurora-cyan)]" />
            <span className="text-white/85 text-[10px] font-mono tracking-[0.28em]">AURORA-MINNER</span>
          </div>
          <span className="text-white/55 text-[10px] font-mono">{memory.date}</span>
        </div>

        {/* Route hero */}
        <div className="relative">
          <div className="text-white/60 text-[10px] font-mono tracking-wider mb-1">REISE 0142</div>
          <div className="flex items-baseline gap-2">
            <span className="text-white font-display"
                  style={{ fontSize: "26px", letterSpacing: "-0.02em", fontFamily: "var(--font-editorial)" }}>
              {memory.from}
            </span>
            <span className="text-white/50 font-display" style={{ fontSize: "20px" }}>→</span>
            <span className="text-white font-display"
                  style={{ fontSize: "26px", letterSpacing: "-0.02em", fontFamily: "var(--font-editorial)" }}>
              {memory.to}
            </span>
          </div>
        </div>

        {/* Big stat */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <Stat icon={<Clock className="w-3 h-3" />} value={memory.duration} label="REISETID" />
          <Stat icon={<MapPin className="w-3 h-3" />} value={memory.distance} label="DISTANSE" />
          <Stat value={memory.time} label="ANKOMST" mono />
        </div>

        {/* Soundtrack + vibe */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-xl p-2.5"
               style={{ background: "rgba(29,185,84,0.12)", boxShadow: "inset 0 0 0 1px rgba(29,185,84,0.3)" }}>
            <div className="flex items-center gap-1.5 text-[#1ed760] text-[9px] font-mono tracking-wider">
              <Music className="w-2.5 h-2.5" /> SOUNDTRACK
            </div>
            <div className="text-white text-[11px] mt-1 leading-tight">{memory.track}</div>
          </div>
          <div className="rounded-xl p-2.5"
               style={{ background: "rgba(160,107,255,0.14)", boxShadow: "inset 0 0 0 1px rgba(160,107,255,0.35)" }}>
            <div className="text-[var(--aurora-violet)] text-[9px] font-mono tracking-wider">STEMNING</div>
            <div className="text-white text-[11px] mt-1 leading-tight">{memory.vibe} · {memory.weather}</div>
          </div>
        </div>

        {/* Aurora insight */}
        <div className="mt-3 rounded-xl p-3"
             style={{ background: "rgba(94,240,255,0.08)", boxShadow: "inset 0 0 0 1px rgba(94,240,255,0.22)" }}>
          <div className="text-[var(--aurora-cyan)] text-[9px] font-mono tracking-wider mb-0.5">AURORA SA</div>
          <p className="text-white text-[12px] leading-snug">{memory.aurora}</p>
        </div>

        {/* Share */}
        <div className="mt-4 flex gap-2">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => onShare?.("instagram")}
            className="flex-1 rounded-xl py-2.5 flex items-center justify-center gap-1.5 text-white text-[11px] font-display tracking-wide"
            style={{ background: "linear-gradient(135deg, #f58529 0%, #dd2a7b 40%, #8134af 80%, #515bd4 100%)" }}
          >
            <Instagram className="w-3.5 h-3.5" /> DEL SOM STORY
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => onShare?.("messenger")}
            className="rounded-xl px-4 py-2.5 flex items-center justify-center gap-1.5 text-white text-[11px] font-display tracking-wide"
            style={{ background: "#1877f2" }}
          >
            <Share2 className="w-3.5 h-3.5" />
          </motion.button>
        </div>

        <div className="mt-3 text-center text-white/40 text-[9px] font-mono tracking-wider">
          KJAPP · OSLO · 2026
        </div>
      </div>
    </motion.div>
  );
}

function Stat({ icon, value, label, mono }: { icon?: React.ReactNode; value: string; label: string; mono?: boolean }) {
  return (
    <div className="rounded-xl py-2.5 text-center"
         style={{ background: "rgba(255,255,255,0.04)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)" }}>
      <div className="flex items-center justify-center gap-1 text-white">
        {icon}
        <span className={`text-[13px] ${mono ? "font-mono" : "font-display"}`}>{value}</span>
      </div>
      <div className="text-white/55 text-[8px] font-mono tracking-wider uppercase mt-0.5">{label}</div>
    </div>
  );
}
