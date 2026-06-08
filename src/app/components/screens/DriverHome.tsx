import { useState } from "react";
import { motion } from "motion/react";
import { Power, Star, Activity, Settings } from "lucide-react";
import { HolographicBackground } from "../HolographicBackground";
import { GlassPanel } from "../GlassPanel";
import { RideOfferPopup } from "../driver/RideOfferPopup";
import { setActiveRideId } from "../../data/rides";
import type { Screen } from "../../App";

export function DriverHome({ go }: { go: (s: Screen) => void }) {
  const [online, setOnline] = useState(true);
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", maxHeight: "100dvh", scrollbarWidth: "none", overscrollBehavior: "none" }}
    >
      <HolographicBackground intensity={0.85} />

      <RideOfferPopup
        enabled={online}
        onAccepted={(ride) => {
          setActiveRideId(ride.id);
          go("driver-trip-active");
        }}
      />

      {/* Header */}
      <div
        className="absolute top-0 left-0 right-0 z-20 px-5"
        style={{ paddingTop: "max(env(safe-area-inset-top), 16px)" }}
      >
        <div className="flex items-center justify-between gap-3 py-2">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-display"
              style={{ background: "var(--aurora-gradient)", color: "#05060f", fontSize: 16 }}
            >
              A
            </div>
            <div>
              <div className="text-white" style={{ fontSize: 13 }}>Amir</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div
                  className="px-1.5 py-0.5 rounded-full font-mono"
                  style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.55)", fontSize: 8, letterSpacing: "0.14em" }}
                >
                  AV NETT
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => go("driver-profile")}
            aria-label="Innstillinger"
            className="w-10 h-10 rounded-full glass-panel flex items-center justify-center active:scale-95 transition shrink-0"
          >
            <Settings className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div
        className="relative h-full overflow-y-auto px-5"
        style={{
          paddingTop: "calc(max(env(safe-area-inset-top), 16px) + 66px)",
          paddingBottom: "calc(88px + max(env(safe-area-inset-bottom), 16px))",
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-y",
          scrollbarWidth: "none",
        }}
      >
        {/* Go online card */}
        <GlassPanel holo glow className="rounded-3xl relative overflow-hidden" style={{ padding: "24px 20px" }}>
          <div
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none"
            style={{ background: "var(--aurora-gradient)", opacity: 0.22 }}
          />
          <div className="relative text-center">
            <div className="text-white/65 mb-4" style={{ fontSize: 12, lineHeight: 1.4 }}>
              Du mottar turer når du er på nett.
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => go("driver-online-map")}
              className="w-full rounded-2xl h-14 flex items-center justify-center gap-2 font-display"
              style={{ background: "var(--aurora-gradient)", color: "#05060f" }}
            >
              <Power className="w-5 h-5" />
              <span style={{ fontSize: 14, letterSpacing: "0.12em" }}>GÅ PÅ NETT</span>
            </motion.button>
          </div>
        </GlassPanel>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <GlassPanel className="rounded-2xl p-3 text-center">
            <div className="text-white font-display" style={{ fontSize: 18 }}>0 kr</div>
            <div className="text-white/55 font-mono uppercase mt-0.5" style={{ fontSize: 9, letterSpacing: "0.16em" }}>I dag</div>
          </GlassPanel>
          <GlassPanel className="rounded-2xl p-3 text-center">
            <div className="text-white font-display" style={{ fontSize: 18 }}>0</div>
            <div className="text-white/55 font-mono uppercase mt-0.5" style={{ fontSize: 9, letterSpacing: "0.16em" }}>Turer</div>
          </GlassPanel>
          <GlassPanel className="rounded-2xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-white font-display" style={{ fontSize: 18 }}>
              <Star className="w-4 h-4 fill-[var(--aurora-cyan)] text-[var(--aurora-cyan)]" />
              5.0
            </div>
            <div className="text-white/55 font-mono uppercase mt-0.5" style={{ fontSize: 9, letterSpacing: "0.16em" }}>Rating</div>
          </GlassPanel>
        </div>

        {/* Aurora Driver card */}
        <GlassPanel holo className="mt-4 rounded-3xl p-4 relative overflow-hidden">
          <div
            className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl pointer-events-none"
            style={{ background: "var(--aurora-gradient)", opacity: 0.22 }}
          />
          <div className="relative">
            <div className="flex items-start gap-3 mb-3">
              <motion.div
                initial={{ opacity: 0.6 }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "rgba(94,240,255,0.15)" }}
              >
                <Activity className="w-5 h-5 text-[var(--aurora-cyan)]" />
              </motion.div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-display" style={{ fontSize: 13 }}>Aurora Driver</div>
                <div className="text-white/55 font-mono uppercase mt-0.5" style={{ fontSize: 9, letterSpacing: "0.16em" }}>Din kjøreassistent</div>
                <div className="text-white/75 mt-1.5" style={{ fontSize: 11, lineHeight: 1.4 }}>
                  Jeg hjelper deg med turer, navigasjon, etterspørsel og dokumentstatus.
                </div>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => go("driver-aurora-chat")}
              className="w-full rounded-xl py-2.5 flex items-center justify-center gap-2"
              style={{ background: "rgba(94,240,255,0.12)", border: "1px solid rgba(94,240,255,0.25)" }}
            >
              <Activity className="w-3.5 h-3.5 text-[var(--aurora-cyan)]" />
              <span className="text-[var(--aurora-cyan)] font-display" style={{ fontSize: 12, letterSpacing: "0.08em" }}>
                Åpne Aurora Driver
              </span>
            </motion.button>
          </div>
        </GlassPanel>
      </div>

      {/* Bottom navigation */}
      <div
        className="absolute left-4 right-4 z-40 pointer-events-none"
        style={{ bottom: "max(env(safe-area-inset-bottom), 12px)" }}
      >
        <GlassPanel className="rounded-full px-2 py-1.5 flex items-center justify-around holo-border pointer-events-auto">
          <NavButton label="Hjem" active onClick={() => go("driver")} />
          <NavButton label="Turer" onClick={() => go("driver-trips")} />
          <NavButton label="Inntekt" onClick={() => go("driver-earnings")} />
          <NavButton label="Profil" onClick={() => go("driver-profile")} />
        </GlassPanel>
      </div>
    </div>
  );
}

function NavButton({ label, active, onClick }: { label: string; active?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex flex-col items-center gap-0.5 py-2 rounded-full transition ${active ? "text-white" : "text-white/55"}`}
      style={active ? { background: "rgba(94,240,255,0.10)", boxShadow: "inset 0 0 0 1px rgba(94,240,255,0.28)" } : {}}
    >
      <span className="font-display" style={{ fontSize: 10, letterSpacing: "0.06em" }}>{label}</span>
    </button>
  );
}
