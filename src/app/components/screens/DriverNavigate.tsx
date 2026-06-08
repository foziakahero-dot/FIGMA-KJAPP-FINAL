import { useState } from "react";
import { motion } from "motion/react";
import { MapPin, Phone, MessageCircle, Navigation, Map as MapIcon, AlertTriangle } from "lucide-react";
import { HolographicBackground } from "../HolographicBackground";
import { GlassPanel } from "../GlassPanel";
import { TripMessagingSheet } from "../TripMessagingSheet";
import { AuroraDriverMiniCard } from "../AuroraDriverMiniCard";
import type { Screen } from "../../App";

const PICKUP = "Thorvald Meyers gate 41, Oslo";
const openMaps = (app: "google" | "apple" | "waze") => {
  const q = encodeURIComponent(PICKUP);
  const urls: Record<string, string> = {
    google: `https://maps.google.com/maps?q=${q}`,
    apple: `https://maps.apple.com/?q=${q}`,
    waze: `https://waze.com/ul?q=${q}`,
  };
  window.open(urls[app], "_blank");
};

export function DriverNavigate({ go }: { go: (s: Screen) => void }) {
  const [msgOpen, setMsgOpen] = useState(false);

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
          Hent kunde
        </span>
      </div>

      {/* Scrollable content */}
      <div
        className="relative h-full overflow-y-auto px-5 space-y-4"
        style={{
          paddingTop: "calc(max(env(safe-area-inset-top), 20px) + 44px)",
          paddingBottom: "calc(max(env(safe-area-inset-bottom), 16px) + 84px)",
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-y",
          scrollbarWidth: "none",
        }}
      >
        {/* Map */}
        <GlassPanel className="rounded-3xl relative overflow-hidden" style={{ minHeight: 180 }}>
          <div className="absolute inset-0">
            <motion.div
              className="absolute inset-0 opacity-12"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div
                className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full blur-3xl"
                style={{ background: "var(--aurora-cyan)" }}
              />
              <div
                className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full blur-2xl"
                style={{ background: "var(--aurora-violet)" }}
              />
            </motion.div>
          </div>
          <div className="relative p-5 text-center">
            <motion.div
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-14 h-14 rounded-full mx-auto mb-2 flex items-center justify-center"
              style={{ background: "rgba(94,240,255,0.15)" }}
            >
              <MapPin className="w-7 h-7 text-[var(--aurora-cyan)]" />
            </motion.div>
            <div className="text-white" style={{ fontSize: 13 }}>Navigerer til hentested</div>
            <div className="text-white/65 mt-1" style={{ fontSize: 11 }}>2 min unna</div>
          </div>
        </GlassPanel>

        {/* Customer card */}
        <GlassPanel holo glow className="rounded-3xl p-5 relative overflow-hidden">
          <motion.div
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none"
            style={{ background: "var(--aurora-gradient)", opacity: 0.28 }}
          />
          <div className="relative">
            <div className="flex items-center gap-3 pb-4 border-b border-white/5">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center font-display"
                style={{ background: "var(--aurora-gradient)", color: "#05060f", fontSize: 20 }}
              >
                M
              </div>
              <div className="flex-1">
                <div className="text-white font-display" style={{ fontSize: 16 }}>Mathilde</div>
                <div className="text-white/65 mt-0.5" style={{ fontSize: 12 }}>Kunde</div>
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

            <div className="pt-4">
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(94,240,255,0.14)" }}
                >
                  <MapPin className="w-5 h-5 text-[var(--aurora-cyan)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className="text-white/55 font-mono uppercase"
                    style={{ fontSize: 9, letterSpacing: "0.16em" }}
                  >
                    Hentested
                  </div>
                  <div className="text-white mt-1" style={{ fontSize: 14, lineHeight: 1.4 }}>
                    Thorvald Meyers gate 41
                  </div>
                  <div className="text-white/65 mt-0.5" style={{ fontSize: 12 }}>
                    Grünerløkka, Oslo
                  </div>
                </div>
              </div>
              <div className="mt-4 glass-panel rounded-xl p-3 text-center">
                <div
                  className="text-white/55 font-mono uppercase"
                  style={{ fontSize: 9, letterSpacing: "0.16em" }}
                >
                  Ankomst om
                </div>
                <div className="text-white font-display mt-1" style={{ fontSize: 28 }}>2 min</div>
              </div>
            </div>
          </div>
        </GlassPanel>

        {/* Navigation options */}
        <div>
          <div
            className="text-white/65 font-display uppercase mb-2 px-1"
            style={{ fontSize: 10, letterSpacing: "0.22em" }}
          >
            Navigasjon
          </div>
          <div className="space-y-2">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => openMaps("google")}
              className="w-full rounded-2xl px-4 py-3 flex items-center gap-3"
              style={{ background: "var(--aurora-gradient)" }}
            >
              <Navigation className="w-5 h-5 text-[#05060f]" />
              <span
                className="flex-1 text-left text-[#05060f] font-display"
                style={{ fontSize: 13, letterSpacing: "0.08em" }}
              >
                Åpne valgt navigasjon
              </span>
            </motion.button>

            <button
              onClick={() => openMaps("google")}
              className="w-full glass-panel rounded-2xl px-4 py-3 flex items-center gap-3 active:scale-[0.99] transition"
            >
              <MapIcon className="w-5 h-5 text-white/70" />
              <span className="flex-1 text-left text-white" style={{ fontSize: 13 }}>Google Maps</span>
            </button>
            <button
              onClick={() => openMaps("apple")}
              className="w-full glass-panel rounded-2xl px-4 py-3 flex items-center gap-3 active:scale-[0.99] transition"
            >
              <Navigation className="w-5 h-5 text-white/70" />
              <span className="flex-1 text-left text-white" style={{ fontSize: 13 }}>Apple Maps</span>
            </button>
            <button
              onClick={() => openMaps("waze")}
              className="w-full glass-panel rounded-2xl px-4 py-3 flex items-center gap-3 active:scale-[0.99] transition"
            >
              <Navigation className="w-5 h-5 text-white/70" />
              <span className="flex-1 text-left text-white" style={{ fontSize: 13 }}>Waze</span>
            </button>

            <div className="text-white/40 text-center pt-1" style={{ fontSize: 10 }}>
              KJAPP bruker ekstern navigasjon i MVP
            </div>
          </div>
        </div>

        <AuroraDriverMiniCard
          message="Neste steg: naviger til hentestedet. Thorvald Meyers gate 41."
          go={go}
          navAddress={PICKUP}
          navLabel="Åpne valgt navigasjon"
        />
      </div>

      {/* Fixed CTA */}
      <div
        className="absolute left-0 right-0 bottom-0 px-5 space-y-2"
        style={{
          paddingBottom: "max(env(safe-area-inset-bottom), 20px)",
          paddingTop: 16,
          background: "linear-gradient(to top, rgba(5,6,15,0.95) 60%, transparent)",
        }}
      >
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => go("driver-arrived")}
          className="w-full rounded-2xl h-14 relative overflow-hidden"
        >
          <div className="absolute inset-0" style={{ background: "var(--aurora-gradient)" }} />
          <div
            className="relative h-full flex items-center justify-center gap-2 text-[#05060f] font-display"
            style={{ fontSize: 13, letterSpacing: "0.12em" }}
          >
            JEG ER FREMME
          </div>
        </motion.button>
        <button
          onClick={() => go("driver-support")}
          className="w-full glass-panel rounded-2xl py-3 flex items-center justify-center gap-2 text-white/60 active:scale-[0.99] transition"
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span style={{ fontSize: 12 }}>Rapporter problem</span>
        </button>
      </div>

      <TripMessagingSheet open={msgOpen} onClose={() => setMsgOpen(false)} role="driver" />
    </div>
  );
}
