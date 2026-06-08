import { useState } from "react";
import { ChevronLeft, Map, CheckCircle2, Info } from "lucide-react";
import { motion } from "motion/react";
import { HolographicBackground } from "../HolographicBackground";
import { GlassPanel } from "../GlassPanel";
import type { Screen } from "../../App";

const NAV_APPS = [
  { id: "google", label: "Google Maps", description: "Åpner i Google Maps-appen" },
  { id: "apple", label: "Apple Maps", description: "Åpner i Apple Maps (iOS)" },
  { id: "waze", label: "Waze", description: "Åpner i Waze-appen" },
];

export function DriverNavAppSettings({ go }: { go: (s: Screen) => void }) {
  const [selected, setSelected] = useState("google");

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
        <div className="flex items-center gap-3 py-2">
          <button
            onClick={() => go("driver-profile")}
            aria-label="Tilbake"
            className="w-10 h-10 rounded-full glass-panel flex items-center justify-center active:scale-95 transition shrink-0"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <div className="flex-1 text-center">
            <div className="text-white font-display uppercase" style={{ fontSize: 11, letterSpacing: "0.32em" }}>
              Navigasjonsapp
            </div>
          </div>
          <div className="w-10 h-10" />
        </div>
      </div>

      {/* Content */}
      <div
        className="relative h-full overflow-y-auto px-5"
        style={{
          paddingTop: "calc(max(env(safe-area-inset-top), 16px) + 56px)",
          paddingBottom: "calc(max(env(safe-area-inset-bottom), 16px) + 24px)",
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-y",
          scrollbarWidth: "none",
        }}
      >
        <div className="space-y-4 pb-4">
          <div className="text-white/65 text-center" style={{ fontSize: 13, lineHeight: 1.5 }}>
            Velg hvilken ekstern navigasjonsapp KJAPP skal åpne under tur.
          </div>

          <GlassPanel className="rounded-2xl overflow-hidden">
            {NAV_APPS.map((app, i) => (
              <motion.button
                key={app.id}
                whileTap={{ scale: 0.99 }}
                onClick={() => setSelected(app.id)}
                className="w-full flex items-center gap-3 px-4 py-4 text-left transition active:bg-white/5"
                style={{
                  borderBottom: i < NAV_APPS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  background: selected === app.id ? "rgba(94,240,255,0.06)" : "transparent",
                }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: selected === app.id ? "rgba(94,240,255,0.16)" : "rgba(255,255,255,0.06)",
                  }}
                >
                  <Map className="w-4 h-4" style={{ color: selected === app.id ? "var(--aurora-cyan)" : "rgba(255,255,255,0.55)" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white" style={{ fontSize: 13 }}>{app.label}</div>
                  <div className="text-white/50 mt-0.5" style={{ fontSize: 11 }}>{app.description}</div>
                </div>
                {selected === app.id && (
                  <CheckCircle2 className="w-4 h-4 text-[var(--aurora-cyan)] shrink-0" />
                )}
              </motion.button>
            ))}
          </GlassPanel>

          {/* Note */}
          <GlassPanel className="rounded-2xl p-4 flex items-start gap-3">
            <Info className="w-4 h-4 text-[var(--aurora-cyan)] shrink-0 mt-0.5" />
            <div className="text-white/65" style={{ fontSize: 12, lineHeight: 1.5 }}>
              KJAPP bruker ekstern navigasjon i MVP. Full innebygd navigasjon kan vurderes senere.
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}
