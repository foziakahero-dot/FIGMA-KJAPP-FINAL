import { motion } from "motion/react";
import { Leaf, TrendingUp, Trees } from "lucide-react";

const friends = [
  { name: "Du",          saved: 42.6, you: true },
  { name: "Ingrid S.",   saved: 38.1 },
  { name: "Mathias H.",  saved: 27.9 },
  { name: "Sofie K.",    saved: 19.3 },
];

export function CarbonLedger() {
  const max = Math.max(...friends.map((f) => f.saved));
  const treesEquiv = (friends[0].saved / 21).toFixed(1);

  return (
    <div className="glass-panel holo-border rounded-2xl p-4 relative overflow-hidden">
      <motion.div
        className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(107,255,199,0.35)" }}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center"
               style={{ background: "rgba(107,255,199,0.18)" }}>
            <Leaf className="w-3.5 h-3.5 text-[var(--aurora-mint)]" />
          </div>
          <span className="text-white text-[11px] font-display tracking-[0.22em]">KARBON-REGNSKAP</span>
        </div>
        <span className="text-[var(--aurora-mint)] text-[10px] font-mono">2026</span>
      </div>

      <div className="relative">
        <div className="text-white font-display" style={{ fontSize: "28px", letterSpacing: "-0.02em" }}>
          {friends[0].saved.toFixed(1)} <span className="text-white/55 text-[14px] font-mono">kg CO₂</span>
        </div>
        <div className="text-white/65 text-[11px] mt-0.5">spart mot tilsvarende bensinbil i år</div>
      </div>

      <div className="relative mt-3 grid grid-cols-2 gap-2">
        <div className="glass-panel rounded-xl p-2.5">
          <div className="flex items-center gap-1.5 text-[var(--aurora-mint)] text-[10px] font-mono">
            <Trees className="w-3 h-3" /> TILSVARENDE
          </div>
          <div className="text-white text-[14px] font-display mt-0.5">{treesEquiv} trær</div>
          <div className="text-white/55 text-[9px]">som vokser ett år</div>
        </div>
        <div className="glass-panel rounded-xl p-2.5">
          <div className="flex items-center gap-1.5 text-[var(--aurora-cyan)] text-[10px] font-mono">
            <TrendingUp className="w-3 h-3" /> RANKING
          </div>
          <div className="text-white text-[14px] font-display mt-0.5">#1 av venner</div>
          <div className="text-white/55 text-[9px]">+12 % vs forrige måned</div>
        </div>
      </div>

      {/* Friends bar */}
      <div className="relative mt-4 space-y-1.5">
        <div className="text-white/55 text-[10px] font-mono tracking-wider mb-1">VENNER I OSLO</div>
        {friends.map((f) => (
          <div key={f.name} className="flex items-center gap-2">
            <span className={`text-[11px] w-20 truncate ${f.you ? "text-white" : "text-white/65"}`}>{f.name}</span>
            <div className="flex-1 h-2 rounded-full bg-white/8 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(f.saved / max) * 100}%` }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{
                  background: f.you
                    ? "linear-gradient(90deg, #6bffc7 0%, #5ef0ff 100%)"
                    : "rgba(255,255,255,0.25)",
                }}
              />
            </div>
            <span className={`text-[10px] font-mono w-12 text-right ${f.you ? "text-[var(--aurora-mint)]" : "text-white/55"}`}>
              {f.saved.toFixed(1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
