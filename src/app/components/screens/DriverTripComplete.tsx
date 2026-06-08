import { motion } from "motion/react";
import { CheckCircle2, Star, CreditCard, TrendingUp, FileText } from "lucide-react";
import { useState } from "react";
import { HolographicBackground } from "../HolographicBackground";
import { GlassPanel } from "../GlassPanel";
import type { Screen } from "../../App";

export function DriverTripComplete({ go }: { go: (s: Screen) => void }) {
  const [rating, setRating] = useState(0);

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
          Tur fullført
        </span>
      </div>

      {/* Scrollable content */}
      <div
        className="relative h-full overflow-y-auto px-5"
        style={{
          paddingTop: "calc(max(env(safe-area-inset-top), 20px) + 44px)",
          paddingBottom: "calc(max(env(safe-area-inset-bottom), 16px) + 84px)",
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-y",
          scrollbarWidth: "none",
        }}
      >
        <div className="space-y-4 pb-2">
          {/* Success indicator */}
          <div className="flex justify-center py-2">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: "rgba(94,240,255,0.15)" }}
            >
              <CheckCircle2 className="w-10 h-10 text-[var(--aurora-cyan)]" strokeWidth={2} />
            </motion.div>
          </div>

          {/* Earnings / receipt card */}
          <GlassPanel holo glow className="rounded-3xl p-5 relative overflow-hidden">
            <motion.div
              className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none"
              style={{ background: "linear-gradient(135deg, #ffb547 0%, #ff8c42 100%)", opacity: 0.28 }}
            />
            <div className="relative">
              <div className="text-center mb-4">
                <div
                  className="text-white/65 font-mono uppercase"
                  style={{ fontSize: 10, letterSpacing: "0.18em" }}
                >
                  Total pris
                </div>
                <div className="text-white font-display mt-1" style={{ fontSize: 40 }}>
                  249 kr
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between glass-panel rounded-xl px-3 py-2.5">
                  <span className="text-white/70" style={{ fontSize: 12 }}>KJAPP-fee</span>
                  <span className="text-white/55" style={{ fontSize: 12 }}>beregnes</span>
                </div>
                <div className="flex items-center justify-between glass-panel rounded-xl px-3 py-2.5">
                  <span className="text-white/70" style={{ fontSize: 12 }}>Utbetaling</span>
                  <span className="text-white/55" style={{ fontSize: 12 }}>via løyvehaver</span>
                </div>
                <div className="flex items-center gap-2 glass-panel rounded-xl px-3 py-2.5">
                  <CreditCard className="w-4 h-4 text-white/55 shrink-0" />
                  <span className="text-white/75" style={{ fontSize: 12 }}>Betalt med Vipps</span>
                </div>
              </div>
            </div>
          </GlassPanel>

          {/* Kvittering / status */}
          <GlassPanel className="rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(94,240,255,0.14)" }}
              >
                <FileText className="w-4 h-4 text-[var(--aurora-cyan)]" />
              </div>
              <div>
                <div className="text-white" style={{ fontSize: 13 }}>Kvittering</div>
                <div className="text-white/55 mt-0.5" style={{ fontSize: 11 }}>Sendt til Mathilde · Vipps bekreftet</div>
              </div>
            </div>
            <div className="space-y-1.5 pl-12">
              <div className="flex justify-between">
                <span className="text-white/55" style={{ fontSize: 11 }}>Henting</span>
                <span className="text-white/70" style={{ fontSize: 11 }}>Thorvald Meyers gate 41</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/55" style={{ fontSize: 11 }}>Destinasjon</span>
                <span className="text-white/70" style={{ fontSize: 11 }}>Maaemo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/55" style={{ fontSize: 11 }}>Avstand</span>
                <span className="text-white/70" style={{ fontSize: 11 }}>4,2 km · 12 min</span>
              </div>
            </div>
          </GlassPanel>

          {/* Rating */}
          <GlassPanel className="rounded-2xl p-5">
            <div className="text-center mb-3">
              <div className="text-white" style={{ fontSize: 14 }}>Hvordan var turen?</div>
              <div className="text-white/55 mt-0.5" style={{ fontSize: 11 }}>Vurder Mathilde</div>
            </div>
            <div className="flex justify-center gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-2 active:scale-95 transition"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= rating
                        ? "fill-[var(--aurora-cyan)] text-[var(--aurora-cyan)]"
                        : "text-white/30"
                    }`}
                    strokeWidth={1.5}
                  />
                </button>
              ))}
            </div>
          </GlassPanel>

          {/* Stats update */}
          <GlassPanel className="rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(94,240,255,0.14)" }}
              >
                <TrendingUp className="w-5 h-5 text-[var(--aurora-cyan)]" />
              </div>
              <div className="flex-1">
                <div className="text-white" style={{ fontSize: 13 }}>Dagens oppdatering</div>
                <div className="text-white/65 mt-0.5" style={{ fontSize: 11 }}>1 tur · 211 kr inntekt</div>
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>

      {/* Fixed bottom CTA */}
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
          onClick={() => go("driver")}
          className="w-full rounded-2xl h-14 relative overflow-hidden"
        >
          <div className="absolute inset-0" style={{ background: "var(--aurora-gradient)" }} />
          <div
            className="relative h-full flex items-center justify-center gap-2 text-[#05060f] font-display"
            style={{ fontSize: 13, letterSpacing: "0.12em" }}
          >
            TILBAKE TIL DASHBOARD
          </div>
        </motion.button>
      </div>
    </div>
  );
}
