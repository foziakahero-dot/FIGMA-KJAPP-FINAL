import { useState } from "react";
import { ChevronLeft, MapPin, Info, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { HolographicBackground } from "../HolographicBackground";
import { GlassPanel } from "../GlassPanel";
import type { Screen } from "../../App";

type LocationToggle = { id: string; label: string; description: string };

const TOGGLES: LocationToggle[] = [
  { id: "online", label: "Del posisjon når jeg er på nett", description: "Brukes for turmatching og etterspørsel" },
  { id: "active", label: "Del posisjon under aktiv tur", description: "Nødvendig for live turstatus" },
  { id: "customer", label: "Vis min posisjon til kunde etter akseptert tur", description: "Kunden ser ETA og rute" },
  { id: "eta", label: "Send ETA til kunde", description: "Automatisk varsel med ankomsttid" },
  { id: "offline", label: "Stopp posisjonssporing når jeg går av nett", description: "Posisjon deles ikke utenfor aktive timer" },
];

function ToggleRow({
  toggle,
  value,
  onChange,
}: {
  toggle: LocationToggle;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div
      className="flex items-start gap-3 px-4 py-3.5"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
    >
      <MapPin className="w-4 h-4 text-[var(--aurora-cyan)] shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <div className="text-white" style={{ fontSize: 13 }}>{toggle.label}</div>
        <div className="text-white/50 mt-0.5" style={{ fontSize: 11 }}>{toggle.description}</div>
      </div>
      <button
        onClick={() => onChange(!value)}
        className="relative shrink-0 mt-0.5"
        style={{ width: 40, height: 22 }}
      >
        <div
          className="absolute inset-0 rounded-full transition-colors"
          style={{ background: value ? "var(--aurora-cyan)" : "rgba(255,255,255,0.12)" }}
        />
        <div
          className="absolute top-0.5 rounded-full bg-white transition-transform"
          style={{ width: 18, height: 18, transform: value ? "translateX(20px)" : "translateX(2px)" }}
        />
      </button>
    </div>
  );
}

export function DriverLocationSettings({ go }: { go: (s: Screen) => void }) {
  const [settings, setSettings] = useState<Record<string, boolean>>(
    Object.fromEntries(TOGGLES.map((t) => [t.id, true]))
  );

  const toggle = (id: string, v: boolean) => setSettings((s) => ({ ...s, [id]: v }));

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
              Posisjon og sporing
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
          <GlassPanel className="rounded-2xl overflow-hidden">
            {TOGGLES.map((t, i) => (
              <div
                key={t.id}
                style={{ borderBottom: i < TOGGLES.length - 1 ? undefined : "none" }}
              >
                <ToggleRow toggle={t} value={settings[t.id]} onChange={(v) => toggle(t.id, v)} />
              </div>
            ))}
          </GlassPanel>

          <GlassPanel className="rounded-2xl p-4 flex items-start gap-3">
            <Info className="w-4 h-4 text-[var(--aurora-cyan)] shrink-0 mt-0.5" />
            <div className="text-white/65" style={{ fontSize: 12, lineHeight: 1.55 }}>
              KJAPP bruker posisjon for matching, ETA, sikkerhet og live turstatus. Posisjon deles kun når du er på nett eller har aktiv tur.
            </div>
          </GlassPanel>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => go("driver-consent")}
            className="w-full rounded-2xl h-12 flex items-center justify-center gap-2 glass-panel holo-border"
          >
            <ShieldCheck className="w-4 h-4 text-[var(--aurora-cyan)]" />
            <span className="text-[var(--aurora-cyan)] font-display" style={{ fontSize: 13, letterSpacing: "0.08em" }}>
              Administrer samtykke
            </span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
