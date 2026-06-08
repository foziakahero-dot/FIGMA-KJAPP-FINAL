import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Mic, X, Sparkles } from "lucide-react";
import { HolographicBackground } from "../HolographicBackground";
import { AuroraOrb } from "../AuroraOrb";
import { GlassPanel } from "../GlassPanel";
import type { Screen } from "../../App";

type Phase = "listening" | "thinking" | "speaking" | "idle";

const transcript = [
  { who: "you", text: "Aurora, bestill bil til Maaemo til kl. 19:30" },
  { who: "aurora", text: "Maaemo i Schweigaards gate. Premium-tier passer for middag — 6 minutter unna. Skal jeg bekrefte?" },
];

const BARS = 28;

export function VoiceMode({ go }: { go: (s: Screen) => void }) {
  const [phase, setPhase] = useState<Phase>("listening");
  const [shown, setShown] = useState<number>(0);
  const tick = useRef(0);

  useEffect(() => {
    const seq = [
      { to: "listening" as Phase, after: 0 },
      { to: "thinking" as Phase, after: 2800 },
      { to: "speaking" as Phase, after: 4200 },
    ];
    const timers = seq.map((s) => setTimeout(() => setPhase(s.to), s.after));
    const reveal = setTimeout(() => setShown(1), 1800);
    const reveal2 = setTimeout(() => setShown(2), 5000);
    return () => { timers.forEach(clearTimeout); clearTimeout(reveal); clearTimeout(reveal2); };
  }, []);

  // Pseudo-waveform — deterministisk men levende
  useEffect(() => {
    const id = setInterval(() => { tick.current += 1; }, 90);
    return () => clearInterval(id);
  }, []);

  const status =
    phase === "listening" ? "LYTTER" :
    phase === "thinking"  ? "TENKER" :
    phase === "speaking"  ? "SVARER" : "KLAR";

  return (
    <div className="relative w-full h-full overflow-hidden">
      <HolographicBackground intensity={0.85} />

      {/* Close */}
      <button
        onClick={() => go("chat")}
        aria-label="Lukk stemmemodus"
        className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full glass-panel flex items-center justify-center"
      >
        <X className="w-4 h-4 text-white/80" />
      </button>

      {/* Status pill */}
      <div className="absolute left-1/2 -translate-x-1/2 top-6 z-20">
        <div className="glass-panel holo-border rounded-full px-3 py-1.5 flex items-center gap-2">
          <span className="relative flex w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-[var(--aurora-cyan)] animate-ping opacity-70" />
            <span className="relative w-2 h-2 rounded-full bg-[var(--aurora-cyan)]" />
          </span>
          <span className="text-white text-[11px] font-display tracking-[0.22em]">AURORA · {status}</span>
        </div>
      </div>

      {/* Orb */}
      <div className="relative h-full flex flex-col items-center justify-center pt-6">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: phase === "speaking" ? [1, 1.06, 1] : [1, 1.02, 1] }}
          transition={{ duration: phase === "speaking" ? 0.8 : 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <AuroraOrb size={220} listening={phase === "listening" || phase === "speaking"} />
        </motion.div>

        {/* Waveform */}
        <div className="mt-10 flex items-end gap-1.5 h-16">
          {Array.from({ length: BARS }).map((_, i) => {
            const active = phase === "listening" || phase === "speaking";
            const base = active ? 6 + Math.abs(Math.sin((i + 1) * 0.7)) * 38 : 6;
            return (
              <motion.span
                key={i}
                className="w-1 rounded-full"
                style={{ background: "var(--aurora-gradient)" }}
                initial={{ height: 6 }}
                animate={active
                  ? { height: [base * 0.35, base, base * 0.55, base * 0.85, base * 0.4] }
                  : { height: 6 }}
                transition={{
                  duration: 1.1 + (i % 5) * 0.12,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (i % 7) * 0.04,
                }}
              />
            );
          })}
        </div>

        {/* Transcript */}
        <div className="absolute left-5 right-5 bottom-28 space-y-2">
          {transcript.slice(0, shown).map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-2xl px-3.5 py-2.5 max-w-[85%] ${m.who === "you"
                ? "ml-auto bg-white/8 text-white text-[12px]"
                : "glass-panel holo-border text-white text-[12px]"}`}
            >
              {m.who === "aurora" && (
                <div className="flex items-center gap-1 mb-1 text-[9px] font-mono tracking-wider text-[var(--aurora-cyan)]">
                  <Sparkles className="w-2.5 h-2.5" /> AURORA
                </div>
              )}
              {m.text}
            </motion.div>
          ))}
        </div>

        {/* Bottom dock */}
        <div className="absolute left-5 right-5 bottom-4">
          <GlassPanel className="rounded-full px-3 py-2 flex items-center justify-between holo-border">
            <button onClick={() => go("chat")} className="text-white/65 text-[11px] font-display tracking-wide px-3 py-1">
              Tekst
            </button>
            <motion.button
              whileTap={{ scale: 0.94 }}
              className="w-14 h-14 rounded-full flex items-center justify-center -my-2"
              style={{ background: "var(--aurora-gradient)", boxShadow: "var(--aurora-glow-soft)" }}
              aria-label="Mute mikrofon"
            >
              <Mic className="w-5 h-5 text-[#05060f]" strokeWidth={2.4} />
            </motion.button>
            <button onClick={() => go("home")} className="text-white/65 text-[11px] font-display tracking-wide px-3 py-1">
              Ferdig
            </button>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}
