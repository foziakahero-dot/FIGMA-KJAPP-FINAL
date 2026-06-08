import { useState } from "react";
import { ChevronLeft, Activity, Info, FileText } from "lucide-react";
import { motion } from "motion/react";
import { HolographicBackground } from "../HolographicBackground";
import { GlassPanel } from "../GlassPanel";
import type { Screen } from "../../App";

type ToggleSetting = { id: string; label: string; description: string };

const TOGGLES: ToggleSetting[] = [
  { id: "aurora", label: "Aurora Driver", description: "AI-assistent aktivert" },
  { id: "turforslag", label: "Turforslag", description: "Foreslår optimaliseringsstrategier" },
  { id: "neste", label: "Neste steg-varsler", description: "Viser neste steg ved aktiv tur" },
  { id: "dok", label: "Dokumentvarsler", description: "Varsler ved utløpende dokumenter" },
  { id: "etterspørsel", label: "Etterspørselsforslag", description: "Viser høy-aktivitets-soner" },
  { id: "support", label: "Support AI", description: "AI-hjelp i supportsaker" },
];

function ToggleRow({
  setting,
  value,
  onChange,
}: {
  setting: ToggleSetting;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3.5"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div className="flex-1 min-w-0">
        <div className="text-white" style={{ fontSize: 13 }}>{setting.label}</div>
        <div className="text-white/50 mt-0.5" style={{ fontSize: 11 }}>{setting.description}</div>
      </div>
      <button
        onClick={() => onChange(!value)}
        className="relative shrink-0"
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

export function DriverAISettings({ go }: { go: (s: Screen) => void }) {
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
              Aurora Driver AI
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
          {/* Aurora orb + title */}
          <GlassPanel holo glow className="rounded-3xl p-5 relative overflow-hidden">
            <div
              className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl pointer-events-none"
              style={{ background: "var(--aurora-gradient)", opacity: 0.22 }}
            />
            <div className="relative flex items-center gap-3 mb-3">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(94,240,255,0.14)" }}
              >
                <Activity className="w-5 h-5 text-[var(--aurora-cyan)]" />
              </div>
              <div>
                <div className="text-white font-display" style={{ fontSize: 15 }}>Aurora Driver AI</div>
                <div className="text-white/55" style={{ fontSize: 11 }}>Din kjøreassistent</div>
              </div>
            </div>
            <div className="relative text-white/70" style={{ fontSize: 12, lineHeight: 1.55 }}>
              Aurora kan hjelpe med forslag, navigasjon, dokumentstatus og support. Aurora kan ikke godkjenne dokumenter, endre pris, godkjenne bil, endre utbetaling eller overstyre KJAPP-admin.
            </div>
          </GlassPanel>

          {/* Toggles */}
          <GlassPanel className="rounded-2xl overflow-hidden">
            {TOGGLES.map((t) => (
              <ToggleRow
                key={t.id}
                setting={t}
                value={settings[t.id]}
                onChange={(v) => toggle(t.id, v)}
              />
            ))}
          </GlassPanel>

          {/* See policy button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => go("driver-ai-policy")}
            className="w-full glass-panel rounded-2xl px-4 py-3.5 flex items-center gap-3 text-left holo-border"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "rgba(160,107,255,0.16)" }}
            >
              <FileText className="w-4 h-4 text-[var(--aurora-violet)]" />
            </div>
            <span className="flex-1 text-white" style={{ fontSize: 13 }}>Se AI-regler</span>
            <span className="text-white/40" style={{ fontSize: 11 }}>→</span>
          </motion.button>

          <GlassPanel className="rounded-2xl p-4 flex items-start gap-3">
            <Info className="w-4 h-4 text-[var(--aurora-cyan)] shrink-0 mt-0.5" />
            <div className="text-white/65" style={{ fontSize: 12, lineHeight: 1.5 }}>
              Aurora er underlagt KJAPP sine retningslinjer og kan aldri overstyre admin eller løyvehaver.
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}
