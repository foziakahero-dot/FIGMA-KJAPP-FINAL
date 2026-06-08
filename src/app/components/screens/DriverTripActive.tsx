import { useState } from "react";
import { motion } from "motion/react";
import { Navigation, Clock, AlertTriangle, Phone, MessageCircle, Activity, CreditCard } from "lucide-react";
import { HolographicBackground } from "../HolographicBackground";
import { AuroraOrb } from "../AuroraOrb";
import { GlassPanel } from "../GlassPanel";
import { TripMessagingSheet } from "../TripMessagingSheet";
import { NavAppPicker } from "../NavAppPicker";
import { getActiveRideId, updateRideStatus } from "../../data/rides";
import type { Screen } from "../../App";

export function DriverTripActive({ go }: { go: (s: Screen) => void }) {
  const [msgOpen, setMsgOpen] = useState(false);
  const [navPickerOpen, setNavPickerOpen] = useState(false);

  const handleComplete = async () => {
    const id = getActiveRideId();
    if (id) {
      try {
        await updateRideStatus(id, "completed");
      } catch {
        /* prototype: continue anyway */
      }
    }
    go("driver-trip-complete");
  };

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
          Tur startet
        </span>
      </div>

      {/* Scrollable content */}
      <div
        className="relative h-full overflow-y-auto px-5 space-y-3"
        style={{
          paddingTop: "calc(max(env(safe-area-inset-top), 20px) + 44px)",
          paddingBottom: "calc(max(env(safe-area-inset-bottom), 16px) + 132px)",
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-y",
          scrollbarWidth: "none",
        }}
      >
        {/* Aurora Driver state card */}
        <GlassPanel
          className="rounded-2xl p-3.5 relative overflow-hidden"
          style={{ border: "1px solid rgba(94,240,255,0.22)" }}
        >
          <div
            className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl pointer-events-none"
            style={{ background: "var(--aurora-gradient)", opacity: 0.18 }}
          />
          <div className="relative flex items-start gap-3">
            <div className="shrink-0 mt-0.5">
              <AuroraOrb size={28} listening />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <div className="text-white font-display" style={{ fontSize: 12 }}>
                  Aurora Driver
                </div>
                <Activity className="w-3 h-3 text-[var(--aurora-cyan)]" />
              </div>
              <div className="text-white/80" style={{ fontSize: 12, lineHeight: 1.45 }}>
                Kunden er hentet. Åpne navigasjon til Maaemo, Schweigaards gate.
              </div>
              <div className="mt-2.5 flex flex-wrap gap-2">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setNavPickerOpen(true)}
                  className="rounded-lg px-3.5 py-2 flex items-center gap-2"
                  style={{ background: "rgba(94,240,255,0.13)", border: "1px solid rgba(94,240,255,0.28)" }}
                >
                  <Navigation className="w-3 h-3 text-[var(--aurora-cyan)]" />
                  <span
                    className="text-[var(--aurora-cyan)] font-display"
                    style={{ fontSize: 11, letterSpacing: "0.06em" }}
                  >
                    Åpne navigasjon til destinasjon
                  </span>
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => go("driver-aurora-chat")}
                  className="rounded-lg px-3.5 py-2"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <span
                    className="text-white/70 font-display"
                    style={{ fontSize: 11, letterSpacing: "0.06em" }}
                  >
                    Åpne Aurora Driver
                  </span>
                </motion.button>
              </div>
            </div>
          </div>
        </GlassPanel>

        {/* Trip status card */}
        <GlassPanel holo glow className="rounded-3xl p-5 relative overflow-hidden">
          <motion.div
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none"
            style={{ background: "var(--aurora-gradient)", opacity: 0.28 }}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <div className="relative">
            {/* Customer info */}
            <div className="flex items-center gap-3 pb-4 border-b border-white/5">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-display"
                style={{ background: "var(--aurora-gradient)", color: "#05060f", fontSize: 18 }}
              >
                M
              </div>
              <div className="flex-1">
                <div className="text-white" style={{ fontSize: 14 }}>Mathilde</div>
                <div className="text-white/55 mt-0.5" style={{ fontSize: 11 }}>Kunde · på tur</div>
              </div>
              <div className="flex gap-2">
                <button
                  className="w-10 h-10 rounded-full glass-panel flex items-center justify-center active:scale-95 transition"
                  aria-label="Ring kunde"
                >
                  <Phone className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={() => setMsgOpen(true)}
                  className="w-10 h-10 rounded-full glass-panel flex items-center justify-center active:scale-95 transition"
                  aria-label="Send melding"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Destination */}
            <div className="pt-4">
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(160,107,255,0.18)" }}
                >
                  <Navigation className="w-5 h-5 text-[var(--aurora-violet)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className="text-white/55 font-mono uppercase"
                    style={{ fontSize: 9, letterSpacing: "0.16em" }}
                  >
                    Destinasjon
                  </div>
                  <div className="text-white mt-1" style={{ fontSize: 14, lineHeight: 1.4 }}>
                    Maaemo, Schweigaards gate
                  </div>
                </div>
              </div>

              {/* Payment method */}
              <div className="mt-4 flex items-center gap-2 glass-panel rounded-xl px-3 py-2.5">
                <CreditCard className="w-4 h-4 text-white/55 shrink-0" />
                <span className="text-white/80" style={{ fontSize: 12 }}>Betaling: Vipps</span>
              </div>

              {/* Trip stats */}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div className="glass-panel rounded-xl p-3 text-center">
                  <Clock className="w-4 h-4 text-white/55 mx-auto mb-1" />
                  <div
                    className="text-white/55 font-mono uppercase"
                    style={{ fontSize: 9, letterSpacing: "0.16em" }}
                  >
                    Ankomst
                  </div>
                  <div className="text-white font-display mt-0.5" style={{ fontSize: 16 }}>
                    8 min
                  </div>
                </div>
                <div className="glass-panel rounded-xl p-3 text-center">
                  <div
                    className="text-white/55 font-mono uppercase"
                    style={{ fontSize: 9, letterSpacing: "0.16em" }}
                  >
                    Estimert pris
                  </div>
                  <div className="text-white font-display mt-0.5" style={{ fontSize: 16 }}>
                    249 kr
                  </div>
                </div>
              </div>
            </div>
          </div>
        </GlassPanel>

        {/* Map / Navigation area */}
        <GlassPanel className="rounded-2xl relative overflow-hidden" style={{ minHeight: 140 }}>
          <div className="absolute inset-0">
            <motion.div
              className="absolute inset-0 opacity-10"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div
                className="absolute top-1/3 left-1/3 w-28 h-28 rounded-full blur-3xl"
                style={{ background: "var(--aurora-violet)" }}
              />
            </motion.div>
          </div>
          <div className="relative p-5 flex flex-col items-center justify-center text-center">
            <Navigation className="w-8 h-8 text-white/40 mb-2" />
            <div className="text-white/55 mb-3" style={{ fontSize: 12 }}>
              Rute vises i ekstern navigasjonsapp
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setNavPickerOpen(true)}
              className="rounded-xl px-4 py-2"
              style={{ background: "rgba(160,107,255,0.18)" }}
            >
              <span
                className="text-[var(--aurora-violet)] font-display"
                style={{ fontSize: 11, letterSpacing: "0.08em" }}
              >
                Åpne navigasjon til destinasjon
              </span>
            </motion.button>
          </div>
        </GlassPanel>
      </div>

      {/* Fixed bottom actions */}
      <div
        className="absolute left-0 right-0 bottom-0 px-5 space-y-2"
        style={{
          paddingBottom: "max(env(safe-area-inset-bottom), 20px)",
          background: "linear-gradient(to top, rgba(5,6,15,0.95) 60%, transparent)",
          paddingTop: 16,
        }}
      >
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleComplete}
          className="w-full rounded-2xl h-14 relative overflow-hidden"
        >
          <div className="absolute inset-0" style={{ background: "var(--aurora-gradient)" }} />
          <div
            className="relative h-full flex items-center justify-center gap-2 text-[#05060f] font-display"
            style={{ fontSize: 13, letterSpacing: "0.12em" }}
          >
            FULLFØR TUR
          </div>
        </motion.button>
        <button
          onClick={() => go("driver-support")}
          className="w-full glass-panel rounded-2xl py-3 flex items-center justify-center gap-2 text-white/70 active:scale-[0.99] transition"
        >
          <AlertTriangle className="w-4 h-4" />
          <span style={{ fontSize: 12 }}>Rapporter problem</span>
        </button>
      </div>

      <TripMessagingSheet open={msgOpen} onClose={() => setMsgOpen(false)} role="driver" />
      <NavAppPicker
        open={navPickerOpen}
        onClose={() => setNavPickerOpen(false)}
        address="Maaemo, Schweigaards gate 15, Oslo"
      />
    </div>
  );
}
