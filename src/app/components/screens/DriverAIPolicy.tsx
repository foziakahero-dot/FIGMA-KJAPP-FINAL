import { ChevronLeft, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { HolographicBackground } from "../HolographicBackground";
import { GlassPanel } from "../GlassPanel";
import type { Screen } from "../../App";

const CAN_DO = [
  "Foreslå hvor du bør vente",
  "Forklare neste steg i turen",
  "Åpne valgt navigasjonsapp",
  "Varsle om dokumentstatus",
  "Hjelpe med support og rapportering",
];

const CANNOT_DO = [
  "Godkjenne sjåfør",
  "Godkjenne bil",
  "Endre betaling eller pris",
  "Endre utbetaling",
  "Se kundedata uten aktiv tur",
  "Overstyre KJAPP-admin eller løyvehaver",
];

export function DriverAIPolicy({ go }: { go: (s: Screen) => void }) {
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
            onClick={() => go("driver-ai-settings")}
            aria-label="Tilbake"
            className="w-10 h-10 rounded-full glass-panel flex items-center justify-center active:scale-95 transition shrink-0"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <div className="flex-1 text-center">
            <div className="text-white font-display uppercase" style={{ fontSize: 11, letterSpacing: "0.32em" }}>
              AI-regler
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
          {/* Aurora can */}
          <div>
            <div className="text-white/65 font-display uppercase mb-2 px-1" style={{ fontSize: 10, letterSpacing: "0.22em" }}>
              Aurora Driver kan
            </div>
            <GlassPanel className="rounded-2xl overflow-hidden">
              {CAN_DO.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-4 py-3.5"
                  style={{ borderBottom: i < CAN_DO.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
                >
                  <CheckCircle2 className="w-4 h-4 text-[var(--aurora-cyan)] shrink-0" />
                  <span className="text-white" style={{ fontSize: 13 }}>{item}</span>
                </div>
              ))}
            </GlassPanel>
          </div>

          {/* Aurora cannot */}
          <div>
            <div className="text-white/65 font-display uppercase mb-2 px-1" style={{ fontSize: 10, letterSpacing: "0.22em" }}>
              Aurora Driver kan ikke
            </div>
            <GlassPanel className="rounded-2xl overflow-hidden">
              {CANNOT_DO.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-4 py-3.5"
                  style={{ borderBottom: i < CANNOT_DO.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
                >
                  <XCircle className="w-4 h-4 text-[#ff7a7a] shrink-0" />
                  <span className="text-white/80" style={{ fontSize: 13 }}>{item}</span>
                </div>
              ))}
            </GlassPanel>
          </div>

          {/* Critical issues */}
          <GlassPanel
            className="rounded-2xl p-4 flex items-start gap-3"
            style={{ border: "1px solid rgba(255,181,71,0.22)" }}
          >
            <AlertTriangle className="w-4 h-4 text-[#ffb547] shrink-0 mt-0.5" />
            <div>
              <div className="text-[#ffb547] font-display mb-1" style={{ fontSize: 12, letterSpacing: "0.06em" }}>
                Kritiske saker
              </div>
              <div className="text-white/70" style={{ fontSize: 12, lineHeight: 1.5 }}>
                Kritiske saker sendes til KJAPP Support.
              </div>
            </div>
          </GlassPanel>

          <div className="text-white/35 text-center" style={{ fontSize: 10 }}>
            AI-regler er fastsatt av KJAPP AS og kan oppdateres i appen.
          </div>
        </div>
      </div>
    </div>
  );
}
