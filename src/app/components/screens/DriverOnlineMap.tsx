import { motion } from "motion/react";
import { MapPin, Navigation2, Radio, Activity, ChevronRight } from "lucide-react";
import { HolographicBackground } from "../HolographicBackground";
import { GlassPanel } from "../GlassPanel";
import type { Screen } from "../../App";

export function DriverOnlineMap({ go }: { go: (s: Screen) => void }) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", maxHeight: "100dvh", scrollbarWidth: "none", overscrollBehavior: "none" }}
    >
      <HolographicBackground intensity={0.85} />

      {/* Header */}
      <div
        className="absolute top-0 left-0 right-0 z-20 px-5"
        style={{ paddingTop: "max(env(safe-area-inset-top), 16px)" }}
      >
        <div className="flex items-center justify-between py-2">
          <div>
            <div className="text-white font-display" style={{ fontSize: 16 }}>KJAPP Driver</div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inset-0 rounded-full bg-[var(--aurora-cyan)] animate-ping opacity-70" />
                <span className="relative w-1.5 h-1.5 rounded-full bg-[var(--aurora-cyan)]" />
              </span>
              <span className="text-[var(--aurora-cyan)] font-mono" style={{ fontSize: 9, letterSpacing: "0.16em" }}>PÅ NETT</span>
            </div>
          </div>
          <div
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
            style={{ background: "rgba(5,6,15,0.75)", backdropFilter: "blur(8px)", border: "1px solid rgba(94,240,255,0.2)" }}
          >
            <Radio className="w-3 h-3 text-white/55" />
            <span className="text-white/70 font-mono" style={{ fontSize: 9, letterSpacing: "0.14em" }}>VENTER PÅ TUR</span>
          </div>
        </div>
      </div>

      {/* Full-screen radar map */}
      <div className="absolute inset-0">
        {/* Dark map base */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(160deg, #080c18 0%, #0c1022 60%, #080e1a 100%)" }}
        />

        {/* Street grid */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.08 }}>
          <defs>
            <pattern id="drivergrid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(94,240,255,0.8)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#drivergrid)" />
          <line x1="0" y1="38%" x2="100%" y2="62%" stroke="rgba(94,240,255,0.4)" strokeWidth="1" />
          <line x1="25%" y1="0" x2="65%" y2="100%" stroke="rgba(160,107,255,0.28)" strokeWidth="0.8" />
          <line x1="0" y1="68%" x2="55%" y2="22%" stroke="rgba(94,240,255,0.22)" strokeWidth="0.6" />
          <line x1="60%" y1="0" x2="90%" y2="100%" stroke="rgba(94,240,255,0.18)" strokeWidth="0.6" />
        </svg>

        {/* Demand glow zones */}
        <motion.div
          className="absolute rounded-full blur-3xl"
          style={{ background: "rgba(94,240,255,0.22)", width: 120, height: 120, top: "32%", left: "40%" }}
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.12, 1] }}
          transition={{ duration: 3.5, repeat: Infinity }}
        />
        <motion.div
          className="absolute rounded-full blur-2xl"
          style={{ background: "rgba(160,107,255,0.18)", width: 80, height: 80, top: "18%", right: "20%" }}
          initial={{ opacity: 0.3, scale: 1 }}
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.08, 1] }}
          transition={{ duration: 4.5, repeat: Infinity, delay: 0.8 }}
        />
        <motion.div
          className="absolute rounded-full blur-3xl"
          style={{ background: "rgba(94,240,255,0.10)", width: 90, height: 90, bottom: "26%", left: "16%" }}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1.5 }}
        />

        {/* Zone labels */}
        <div
          className="absolute font-mono text-[var(--aurora-cyan)]"
          style={{ fontSize: 8, letterSpacing: "0.14em", top: "36%", left: "44%", opacity: 0.7 }}
        >
          SENTRUM
        </div>
        <div
          className="absolute font-mono text-[var(--aurora-violet)]"
          style={{ fontSize: 8, letterSpacing: "0.12em", top: "20%", right: "18%", opacity: 0.6 }}
        >
          GRÜNERLØKKA
        </div>
        <div
          className="absolute font-mono text-white"
          style={{ fontSize: 7, letterSpacing: "0.12em", bottom: "32%", left: "12%", opacity: 0.35 }}
        >
          AKER BRYGGE
        </div>

        {/* Driver location — center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <motion.div
              className="absolute rounded-full"
              style={{ background: "rgba(94,240,255,0.12)", top: -20, left: -20, right: -20, bottom: -20 }}
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <motion.div
              className="absolute rounded-full"
              style={{ background: "rgba(94,240,255,0.20)", top: -10, left: -10, right: -10, bottom: -10 }}
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0.1, 0.8] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.4 }}
            />
            <div
              className="relative w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "var(--aurora-gradient)", boxShadow: "0 0 20px rgba(94,240,255,0.6)" }}
            >
              <Navigation2 className="w-5 h-5 text-[#05060f]" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom overlay */}
      <div
        className="absolute left-0 right-0 bottom-0 px-4 z-20"
        style={{
          paddingBottom: "max(env(safe-area-inset-bottom), 16px)",
          paddingTop: 20,
          background: "linear-gradient(to top, rgba(5,6,15,0.97) 55%, transparent)",
        }}
      >
        {/* Aurora Driver bar — clickable, opens chat */}
        <motion.button
          whileTap={{ scale: 0.99 }}
          onClick={() => go("driver-aurora-chat")}
          className="w-full mb-3 glass-panel rounded-2xl p-3.5 flex items-center gap-2.5 text-left"
          style={{ border: "1px solid rgba(94,240,255,0.25)" }}
        >
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "rgba(94,240,255,0.14)" }}
          >
            <Activity className="w-4 h-4 text-[var(--aurora-cyan)]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-white font-display" style={{ fontSize: 12 }}>
                Aurora Driver
              </span>
              <span className="relative flex w-1.5 h-1.5 shrink-0">
                <span className="absolute inset-0 rounded-full bg-[var(--aurora-cyan)] animate-ping opacity-70" />
                <span className="relative w-1.5 h-1.5 rounded-full bg-[var(--aurora-cyan)]" />
              </span>
            </div>
            <div className="text-white/70 truncate mt-0.5" style={{ fontSize: 11 }}>
              Høy aktivitet nær Sentrum. Flytt deg mot Grünerløkka.
            </div>
          </div>
          <div
            className="shrink-0 rounded-lg px-2.5 py-1"
            style={{ background: "rgba(94,240,255,0.16)", border: "1px solid rgba(94,240,255,0.3)" }}
          >
            <span className="text-[var(--aurora-cyan)] font-display" style={{ fontSize: 10, letterSpacing: "0.06em" }}>
              Åpne
            </span>
          </div>
        </motion.button>

        {/* CTAs */}
        <div className="space-y-2">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => go("driver-trip-request")}
            className="w-full rounded-2xl h-13 flex items-center justify-center gap-2"
            style={{ background: "rgba(94,240,255,0.12)", border: "1px solid rgba(94,240,255,0.3)", height: 48 }}
          >
            <MapPin className="w-3.5 h-3.5 text-[var(--aurora-cyan)]" />
            <span className="text-[var(--aurora-cyan)] font-mono" style={{ fontSize: 10, letterSpacing: "0.14em" }}>
              DEMO: SIMULER INNKOMMENDE TUR
            </span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => go("driver")}
            className="w-full glass-panel rounded-2xl text-white/70"
            style={{ height: 44, fontSize: 13 }}
          >
            Gå av nett
          </motion.button>
        </div>
      </div>
    </div>
  );
}
