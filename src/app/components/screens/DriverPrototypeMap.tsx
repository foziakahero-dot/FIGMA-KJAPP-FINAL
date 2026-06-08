import { motion } from "motion/react";
import { Map, X } from "lucide-react";
import { HolographicBackground } from "../HolographicBackground";
import { GlassPanel } from "../GlassPanel";
import type { Screen } from "../../App";

type MapEntry = { label: string; screen: Screen };

const SCREENS: MapEntry[] = [
  { label: "Driver Access", screen: "driver-access" },
  { label: "Driver Onboarding", screen: "driver-onboarding" },
  { label: "Driver Home", screen: "driver" },
  { label: "Online Map", screen: "driver-online-map" },
  { label: "Aurora Driver Chat", screen: "driver-aurora-chat" },
  { label: "New Trip Request", screen: "driver-trip-request" },
  { label: "Hent kunde", screen: "driver-navigate" },
  { label: "Melding", screen: "driver-chat" },
  { label: "Kunde varslet", screen: "driver-arrived" },
  { label: "Tur pågår", screen: "driver-trip-active" },
  { label: "Tur fullført", screen: "driver-trip-complete" },
  { label: "Turer", screen: "driver-trips" },
  { label: "Inntekt", screen: "driver-earnings" },
  { label: "Driver Profil", screen: "driver-profile" },
  { label: "Velg bil", screen: "driver-vehicle-select" },
  { label: "Navigasjonsapp", screen: "driver-nav-app-settings" },
  { label: "Kommunikasjon", screen: "driver-communication-settings" },
  { label: "Aurora Driver AI", screen: "driver-ai-settings" },
  { label: "AI-regler", screen: "driver-ai-policy" },
  { label: "Posisjon og sporing", screen: "driver-location-settings" },
  { label: "Samtykke", screen: "driver-consent" },
  { label: "Driver Support AI", screen: "driver-support" },
];

export function DriverPrototypeMap({ go }: { go: (s: Screen) => void }) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", maxHeight: "100dvh", scrollbarWidth: "none", overscrollBehavior: "none" }}
    >
      <HolographicBackground intensity={0.7} />

      {/* Header */}
      <div
        className="absolute top-0 left-0 right-0 z-20 px-5"
        style={{ paddingTop: "max(env(safe-area-inset-top), 16px)" }}
      >
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "var(--aurora-gradient)" }}
            >
              <Map className="w-4 h-4 text-[#05060f]" />
            </div>
            <div>
              <div className="text-white font-display" style={{ fontSize: 14 }}>
                KJAPP Driver Prototype Map
              </div>
              <div className="text-white/45 font-mono" style={{ fontSize: 8, letterSpacing: "0.18em" }}>
                INTERN · KUN FOR TESTING
              </div>
            </div>
          </div>
          <button
            onClick={() => go("driver-access")}
            className="w-9 h-9 rounded-full glass-panel flex items-center justify-center active:scale-95 transition"
            aria-label="Lukk"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Screen list */}
      <div
        className="relative h-full overflow-y-auto px-5"
        style={{
          paddingTop: "calc(max(env(safe-area-inset-top), 16px) + 64px)",
          paddingBottom: "max(env(safe-area-inset-bottom), 24px)",
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-y",
          scrollbarWidth: "none",
        }}
      >
        <div className="mb-3">
          <div
            className="text-white/45 font-mono uppercase px-1"
            style={{ fontSize: 9, letterSpacing: "0.22em" }}
          >
            Alle skjermer
          </div>
        </div>

        <GlassPanel holo className="rounded-3xl overflow-hidden">
          {SCREENS.map((entry, i) => (
            <motion.button
              key={entry.screen}
              whileTap={{ scale: 0.99 }}
              onClick={() => go(entry.screen)}
              className="w-full flex items-center justify-between px-4 py-3.5 text-left active:bg-white/5 transition"
              style={{
                borderBottom: i < SCREENS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 font-mono"
                  style={{
                    background: "rgba(94,240,255,0.12)",
                    color: "var(--aurora-cyan)",
                    fontSize: 9,
                  }}
                >
                  {i + 1}
                </div>
                <span className="text-white" style={{ fontSize: 13 }}>
                  {entry.label}
                </span>
              </div>
              <span className="text-white/35" style={{ fontSize: 11 }}>→</span>
            </motion.button>
          ))}
        </GlassPanel>

        <div
          className="mt-5 text-center text-white/30"
          style={{ fontSize: 10, lineHeight: 1.5 }}
        >
          Intern prototype · Kun for KJAPP-testing{"\n"}Ikke del med utenforstående
        </div>
      </div>
    </div>
  );
}
