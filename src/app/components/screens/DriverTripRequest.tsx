import { motion } from "motion/react";
import { MapPin, Navigation, Clock, CreditCard, Star, X, Headphones } from "lucide-react";
import { useState, useEffect } from "react";
import { HolographicBackground } from "../HolographicBackground";
import { GlassPanel } from "../GlassPanel";
import { AuroraDriverMiniCard } from "../AuroraDriverMiniCard";
import type { Screen } from "../../App";

export function DriverTripRequest({ go }: { go: (s: Screen) => void }) {
  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    if (timeLeft <= 0) {
      go("driver");
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, go]);

  const progress = timeLeft / 15;

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
      <HolographicBackground intensity={0.9} />

      {/* Fixed header with countdown */}
      <div
        className="absolute top-0 left-0 right-0 z-10 px-5"
        style={{ paddingTop: "max(env(safe-area-inset-top), 16px)", paddingBottom: 8 }}
      >
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-white font-display uppercase"
            style={{ fontSize: 11, letterSpacing: "0.32em" }}
          >
            Ny tur
          </span>
          <button
            onClick={() => go("driver")}
            aria-label="Avslå"
            className="w-10 h-10 rounded-full glass-panel flex items-center justify-center active:scale-95 transition shrink-0"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Compact countdown */}
        <div className="flex items-center gap-3 glass-panel rounded-2xl px-4 py-3">
          <div className="relative w-10 h-10 shrink-0">
            <svg className="w-10 h-10 -rotate-90">
              <circle cx="20" cy="20" r="17" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
              <motion.circle
                cx="20" cy="20" r="17" fill="none"
                stroke="var(--aurora-cyan)" strokeWidth="3" strokeLinecap="round"
                style={{ pathLength: progress, strokeDasharray: "106.8" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-display" style={{ fontSize: 13 }}>{timeLeft}</span>
            </div>
          </div>
          <div>
            <div className="text-white" style={{ fontSize: 13 }}>Ny innkommende tur</div>
            <div className="text-white/55" style={{ fontSize: 11 }}>Svar innen {timeLeft} sekunder</div>
          </div>
        </div>
      </div>

      {/* Scrollable trip details */}
      <div
        className="relative h-full overflow-y-auto px-5"
        style={{
          paddingTop: "calc(max(env(safe-area-inset-top), 16px) + 116px)",
          paddingBottom: "calc(max(env(safe-area-inset-bottom), 16px) + 140px)",
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-y",
          scrollbarWidth: "none",
        }}
      >
        <GlassPanel holo glow className="rounded-3xl p-5 relative overflow-hidden">
          <motion.div
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none"
            style={{ background: "var(--aurora-gradient)", opacity: 0.28 }}
          />

          <div className="relative space-y-4">
            {/* Customer */}
            <div className="flex items-center gap-3 pb-4 border-b border-white/5">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-display"
                style={{ background: "var(--aurora-gradient)", color: "#05060f", fontSize: 18 }}
              >
                M
              </div>
              <div className="flex-1">
                <div className="text-white" style={{ fontSize: 14 }}>Mathilde</div>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star className="w-3 h-3 fill-[var(--aurora-cyan)] text-[var(--aurora-cyan)]" />
                  <span className="text-white/75" style={{ fontSize: 12 }}>5.0</span>
                </div>
              </div>
            </div>

            {/* Pickup */}
            <div className="flex items-start gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(94,240,255,0.14)" }}
              >
                <MapPin className="w-4 h-4 text-[var(--aurora-cyan)]" />
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className="text-white/55 font-mono uppercase"
                  style={{ fontSize: 9, letterSpacing: "0.16em" }}
                >
                  Henting
                </div>
                <div className="text-white mt-0.5" style={{ fontSize: 13, lineHeight: 1.3 }}>
                  Thorvald Meyers gate 41
                </div>
                <div className="text-white/55 mt-0.5" style={{ fontSize: 11 }}>2 min unna</div>
              </div>
            </div>

            {/* Destination */}
            <div className="flex items-start gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(160,107,255,0.18)" }}
              >
                <Navigation className="w-4 h-4 text-[var(--aurora-violet)]" />
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className="text-white/55 font-mono uppercase"
                  style={{ fontSize: 9, letterSpacing: "0.16em" }}
                >
                  Destinasjon
                </div>
                <div className="text-white mt-0.5" style={{ fontSize: 13, lineHeight: 1.3 }}>
                  Maaemo, Schweigaards gate
                </div>
              </div>
            </div>

            {/* Trip info */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              <div className="glass-panel rounded-xl p-2.5 text-center">
                <Clock className="w-3.5 h-3.5 text-white/55 mx-auto mb-1" />
                <div className="text-white/55" style={{ fontSize: 9 }}>Henting</div>
                <div className="text-white font-display mt-0.5" style={{ fontSize: 13 }}>2 min</div>
              </div>
              <div className="glass-panel rounded-xl p-2.5 text-center">
                <div className="text-white/55" style={{ fontSize: 9 }}>Tur</div>
                <div className="text-white font-display mt-0.5" style={{ fontSize: 13 }}>12 min</div>
              </div>
              <div className="glass-panel rounded-xl p-2.5 text-center">
                <div className="text-white/55" style={{ fontSize: 9 }}>Pris</div>
                <div className="text-white font-display mt-0.5" style={{ fontSize: 13 }}>249 kr</div>
              </div>
            </div>

            {/* Payment */}
            <div className="flex items-center gap-2 glass-panel rounded-xl px-3 py-2.5">
              <CreditCard className="w-4 h-4 text-white/65 shrink-0" />
              <span className="text-white" style={{ fontSize: 12 }}>Betaling: Vipps</span>
            </div>

            {/* Customer preference */}
            <div className="flex items-center gap-2 glass-panel rounded-xl px-3 py-2.5"
              style={{ borderColor: "rgba(160,107,255,0.25)", borderWidth: 1, borderStyle: "solid" }}
            >
              <Headphones className="w-4 h-4 text-[var(--aurora-violet)] shrink-0" />
              <span className="text-white" style={{ fontSize: 12 }}>Kundepreferanse: Stille tur</span>
            </div>
          </div>
        </GlassPanel>

        <AuroraDriverMiniCard
          message="Ny tur fra Mathilde. Henting er 2 min unna. Betaling med Vipps."
          go={go}
          navAddress="Thorvald Meyers gate 41, Oslo"
          navLabel="Naviger til henting"
        />
      </div>

      {/* Fixed actions */}
      <div
        className="absolute left-0 right-0 bottom-0 px-5 space-y-2"
        style={{
          paddingBottom: "max(env(safe-area-inset-bottom), 20px)",
          paddingTop: 16,
          background: "linear-gradient(to top, rgba(5,6,15,0.97) 60%, transparent)",
        }}
      >
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => go("driver-navigate")}
          className="w-full rounded-2xl h-14 relative overflow-hidden"
        >
          <div className="absolute inset-0" style={{ background: "var(--aurora-gradient)" }} />
          <div
            className="relative h-full flex items-center justify-center gap-2 text-[#05060f] font-display"
            style={{ fontSize: 13, letterSpacing: "0.12em" }}
          >
            AKSEPTER TUR
          </div>
        </motion.button>

        <button
          onClick={() => go("driver")}
          className="w-full glass-panel rounded-2xl py-3 text-center text-white/70"
          style={{ fontSize: 13 }}
        >
          Avslå
        </button>
      </div>
    </div>
  );
}
