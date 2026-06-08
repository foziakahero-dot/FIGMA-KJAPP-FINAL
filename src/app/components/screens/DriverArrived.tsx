import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Phone, MessageCircle, AlertTriangle, CheckCircle2 } from "lucide-react";
import { HolographicBackground } from "../HolographicBackground";
import { GlassPanel } from "../GlassPanel";
import { TripMessagingSheet } from "../TripMessagingSheet";
import { AuroraDriverMiniCard } from "../AuroraDriverMiniCard";
import type { Screen } from "../../App";

export function DriverArrived({ go }: { go: (s: Screen) => void }) {
  const [seconds, setSeconds] = useState(0);
  const [msgOpen, setMsgOpen] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const waitStr = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        height: "100svh",
        maxHeight: "100dvh",
        scrollbarWidth: "none",
        overscrollBehavior: "none",
      }}
    >
      <HolographicBackground intensity={0.85} />

      {/* Fixed header */}
      <div
        className="absolute top-0 left-0 right-0 z-10 text-center px-5"
        style={{ paddingTop: "max(env(safe-area-inset-top), 20px)", paddingBottom: 12 }}
      >
        <span
          className="text-white font-display uppercase"
          style={{ fontSize: 11, letterSpacing: "0.32em" }}
        >
          Fremme
        </span>
      </div>

      {/* Scrollable content */}
      <div
        className="relative h-full overflow-y-auto px-5 space-y-3"
        style={{
          paddingTop: "calc(max(env(safe-area-inset-top), 20px) + 44px)",
          paddingBottom: "calc(max(env(safe-area-inset-bottom), 16px) + 84px)",
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-y",
          scrollbarWidth: "none",
        }}
      >
        {/* Arrived status card */}
        <GlassPanel holo glow className="rounded-3xl p-5 relative overflow-hidden">
          <motion.div
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none"
            style={{ background: "var(--aurora-gradient)", opacity: 0.28 }}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          <div className="relative">
            {/* Kunde varslet */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mb-4 pb-4 border-b border-white/5"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "rgba(94,240,255,0.15)" }}
              >
                <CheckCircle2 className="w-4 h-4 text-[var(--aurora-cyan)]" />
              </div>
              <div>
                <div className="text-white" style={{ fontSize: 13 }}>Kunde varslet</div>
                <div className="text-white/60" style={{ fontSize: 11 }}>
                  Mathilde er informert om at du er fremme
                </div>
              </div>
            </motion.div>

            {/* Customer row */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center font-display shrink-0"
                style={{ background: "var(--aurora-gradient)", color: "#05060f", fontSize: 20 }}
              >
                M
              </div>
              <div className="flex-1">
                <div className="text-white font-display" style={{ fontSize: 16 }}>Mathilde</div>
                <div className="text-white/65 mt-0.5" style={{ fontSize: 12 }}>
                  Thorvald Meyers gate 41
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  className="w-11 h-11 rounded-full glass-panel flex items-center justify-center active:scale-95 transition"
                  aria-label="Ring kunde"
                >
                  <Phone className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={() => setMsgOpen(true)}
                  className="w-11 h-11 rounded-full glass-panel flex items-center justify-center active:scale-95 transition"
                  aria-label="Send melding"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Waiting timer */}
            <div className="glass-panel rounded-2xl p-4 text-center">
              <div
                className="text-white/55 font-mono uppercase mb-1"
                style={{ fontSize: 9, letterSpacing: "0.18em" }}
              >
                Venter på kunde
              </div>
              <div
                className="text-white font-display"
                style={{ fontSize: 36, fontVariantNumeric: "tabular-nums", fontFeatureSettings: '"tnum"' }}
              >
                {waitStr}
              </div>
              <div className="text-white/40 mt-1" style={{ fontSize: 10 }}>
                Gratis ventetid: 3 min · deretter 5 kr/min
              </div>
            </div>
          </div>
        </GlassPanel>

        {/* No-show */}
        <button
          onClick={() => go("driver-support")}
          className="w-full glass-panel rounded-2xl px-4 py-3.5 flex items-center gap-3 text-left active:scale-[0.99] transition"
          style={{ borderWidth: 1, borderStyle: "solid", borderColor: "rgba(255,122,122,0.2)" }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "rgba(255,122,122,0.12)" }}
          >
            <AlertTriangle className="w-4 h-4 text-[#ff7a7a]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white" style={{ fontSize: 13 }}>Kunde møter ikke opp</div>
            <div className="text-white/55" style={{ fontSize: 11 }}>Rapporter no-show etter 5 min</div>
          </div>
        </button>

        <button
          onClick={() => go("driver-support")}
          className="w-full glass-panel rounded-2xl px-4 py-3.5 flex items-center gap-3 text-left active:scale-[0.99] transition"
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <AlertTriangle className="w-4 h-4 text-white/55" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white" style={{ fontSize: 13 }}>Rapporter problem</div>
          </div>
        </button>

        <AuroraDriverMiniCard
          message="Kunden er varslet. Start tur når Mathilde er i bilen."
          go={go}
        />
      </div>

      {/* Fixed CTA */}
      <div
        className="absolute left-0 right-0 bottom-0 px-5"
        style={{
          paddingBottom: "max(env(safe-area-inset-bottom), 20px)",
          paddingTop: 16,
          background: "linear-gradient(to top, rgba(5,6,15,0.95) 60%, transparent)",
        }}
      >
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => go("driver-trip-active")}
          className="w-full rounded-2xl h-14 relative overflow-hidden"
        >
          <div className="absolute inset-0" style={{ background: "var(--aurora-gradient)" }} />
          <div
            className="relative h-full flex items-center justify-center gap-2 text-[#05060f] font-display"
            style={{ fontSize: 13, letterSpacing: "0.12em" }}
          >
            START TUR
          </div>
        </motion.button>
      </div>

      <TripMessagingSheet open={msgOpen} onClose={() => setMsgOpen(false)} role="driver" />
    </div>
  );
}
