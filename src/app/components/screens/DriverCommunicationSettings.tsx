import { useState } from "react";
import { ChevronLeft, MessageSquare, Phone, EyeOff, Info } from "lucide-react";
import { HolographicBackground } from "../HolographicBackground";
import { GlassPanel } from "../GlassPanel";
import type { Screen } from "../../App";

type ToggleRowProps = {
  icon: React.ReactNode;
  label: string;
  description?: string;
  value: boolean;
  onChange?: (v: boolean) => void;
  comingSoon?: boolean;
};

function ToggleRow({ icon, label, description, value, onChange, comingSoon }: ToggleRowProps) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3.5"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: "rgba(94,240,255,0.10)" }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-white" style={{ fontSize: 13 }}>{label}</div>
        {description && (
          <div className="text-white/50 mt-0.5" style={{ fontSize: 11 }}>{description}</div>
        )}
      </div>
      {comingSoon ? (
        <span
          className="font-mono shrink-0"
          style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em" }}
        >
          SNART
        </span>
      ) : (
        <button
          onClick={() => onChange?.(!value)}
          className="relative shrink-0 transition-colors"
          style={{ width: 40, height: 22 }}
          aria-label={value ? "Slå av" : "Slå på"}
        >
          <div
            className="absolute inset-0 rounded-full transition-colors"
            style={{ background: value ? "var(--aurora-cyan)" : "rgba(255,255,255,0.12)" }}
          />
          <div
            className="absolute top-0.5 rounded-full bg-white transition-transform"
            style={{
              width: 18, height: 18,
              transform: value ? "translateX(20px)" : "translateX(2px)",
            }}
          />
        </button>
      )}
    </div>
  );
}

export function DriverCommunicationSettings({ go }: { go: (s: Screen) => void }) {
  const [inApp, setInApp] = useState(true);
  const [quickMsg, setQuickMsg] = useState(true);
  const [callViaApp, setCallViaApp] = useState(true);
  const [hidePhone, setHidePhone] = useState(true);

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
              Kommunikasjon
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
            <ToggleRow
              icon={<MessageSquare className="w-4 h-4 text-[var(--aurora-cyan)]" />}
              label="In-app meldinger"
              description="Chat med kunde via KJAPP"
              value={inApp}
              onChange={setInApp}
            />
            <ToggleRow
              icon={<MessageSquare className="w-4 h-4 text-[var(--aurora-cyan)]" />}
              label="Hurtigmeldinger til kunde"
              description="Forhåndsdefinerte meldinger"
              value={quickMsg}
              onChange={setQuickMsg}
            />
            <ToggleRow
              icon={<Phone className="w-4 h-4 text-[var(--aurora-cyan)]" />}
              label="Ring kunde via app"
              description="Maskert samtale via KJAPP"
              value={callViaApp}
              onChange={setCallViaApp}
            />
            <ToggleRow
              icon={<EyeOff className="w-4 h-4 text-[var(--aurora-cyan)]" />}
              label="Skjul privat telefonnummer"
              description="Vises aldri til kunden"
              value={hidePhone}
              onChange={setHidePhone}
            />
            <div style={{ borderBottom: "none" }}>
              <ToggleRow
                icon={<MessageSquare className="w-4 h-4 text-white/40" />}
                label="SMS fallback"
                description="Automatisk SMS ved tapte anrop"
                value={false}
                comingSoon
              />
            </div>
            <ToggleRow
              icon={<MessageSquare className="w-4 h-4 text-white/40" />}
              label="WhatsApp fallback"
              description="Send via WhatsApp ved behov"
              value={false}
              comingSoon
            />
          </GlassPanel>

          <GlassPanel className="rounded-2xl p-4 flex items-start gap-3">
            <Info className="w-4 h-4 text-[var(--aurora-cyan)] shrink-0 mt-0.5" />
            <div className="text-white/65" style={{ fontSize: 12, lineHeight: 1.5 }}>
              Sjåfør/kunde-kommunikasjon foregår inne i KJAPP der det er mulig. Telefonnumre skjules alltid.
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}
