import { motion } from "motion/react";
import { useState } from "react";
import { Moon, Coffee, PartyPopper, Volume2 } from "lucide-react";

export type Vibe = "quiet" | "chat" | "party" | "nap";

const vibes: { id: Vibe; label: string; sub: string; icon: React.ReactNode; gradient: string }[] = [
  { id: "quiet", label: "Stille",     sub: "Ingen prat, lav musikk",     icon: <Volume2 className="w-4 h-4" />,        gradient: "linear-gradient(135deg, #5ef0ff 0%, #2a8a8a 100%)" },
  { id: "chat",  label: "Prat",       sub: "Sjåføren slår av en prat",    icon: <Coffee className="w-4 h-4" />,         gradient: "linear-gradient(135deg, #ffd089 0%, #d97706 100%)" },
  { id: "party", label: "Festmodus",  sub: "Musikken opp, vinduer ned",   icon: <PartyPopper className="w-4 h-4" />,    gradient: "linear-gradient(135deg, #ff5ed1 0%, #a06bff 100%)" },
  { id: "nap",   label: "Power-nap",  sub: "Stille, vekkes ved ankomst",  icon: <Moon className="w-4 h-4" />,           gradient: "linear-gradient(135deg, #a06bff 0%, #14081f 100%)" },
];

export function RideVibePicker({ onChange }: { onChange?: (v: Vibe) => void }) {
  const [active, setActive] = useState<Vibe>("quiet");
  const pick = (v: Vibe) => { setActive(v); onChange?.(v); };

  return (
    <div>
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="text-white text-[11px] font-display tracking-wider uppercase">Tur-stemning</span>
        <span className="text-white/55 text-[10px] font-mono">Aurora gir beskjed til sjåføren</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {vibes.map((v) => {
          const isActive = v.id === active;
          return (
            <motion.button
              key={v.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => pick(v.id)}
              aria-pressed={isActive}
              className={`relative rounded-2xl p-3 text-left overflow-hidden ${isActive ? "holo-border" : "glass-panel"}`}
              style={isActive ? { background: "rgba(255,255,255,0.06)" } : undefined}
            >
              {isActive && (
                <motion.div
                  layoutId="vibeGlow"
                  className="absolute -inset-2 pointer-events-none blur-2xl opacity-40"
                  style={{ background: v.gradient }}
                />
              )}
              <div className="relative flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[#05060f]"
                     style={{ background: isActive ? v.gradient : "rgba(255,255,255,0.06)" }}>
                  <span className={isActive ? "" : "text-white/80"}>{v.icon}</span>
                </div>
                <span className="text-white text-[12px] font-display tracking-wide">{v.label}</span>
              </div>
              <div className="relative text-white/65 text-[10px] leading-snug">{v.sub}</div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
