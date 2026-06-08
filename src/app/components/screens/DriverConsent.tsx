import { useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ShieldCheck, CheckSquare, Square } from "lucide-react";
import { HolographicBackground } from "../HolographicBackground";
import { GlassPanel } from "../GlassPanel";
import type { Screen } from "../../App";

const CONSENTS = [
  { id: "c1", text: "Jeg godtar posisjonsdeling når jeg er på nett" },
  { id: "c2", text: "Jeg godtar posisjonsdeling under aktiv tur" },
  { id: "c3", text: "Jeg godtar at Aurora Driver kan gi forslag basert på turstatus" },
  { id: "c4", text: "Jeg godtar at kritiske supportsaker kan sendes til KJAPP-admin" },
];

export function DriverConsent({ go }: { go: (s: Screen) => void }) {
  const [checked, setChecked] = useState<Record<string, boolean>>(
    Object.fromEntries(CONSENTS.map((c) => [c.id, false]))
  );
  const [accepted, setAccepted] = useState(false);

  const allChecked = CONSENTS.every((c) => checked[c.id]);

  const toggle = (id: string) => setChecked((s) => ({ ...s, [id]: !s[id] }));

  const handleAccept = () => {
    if (!allChecked) return;
    setAccepted(true);
    setTimeout(() => go("driver-location-settings"), 1200);
  };

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
            onClick={() => go("driver-location-settings")}
            aria-label="Tilbake"
            className="w-10 h-10 rounded-full glass-panel flex items-center justify-center active:scale-95 transition shrink-0"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <div className="flex-1 text-center">
            <div className="text-white font-display uppercase" style={{ fontSize: 11, letterSpacing: "0.32em" }}>
              Samtykke for sjåfør
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
          paddingBottom: "calc(max(env(safe-area-inset-bottom), 16px) + 100px)",
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-y",
          scrollbarWidth: "none",
        }}
      >
        <div className="space-y-4 pb-4">
          {/* Shield icon */}
          <div className="flex justify-center pt-2 pb-1">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: "rgba(94,240,255,0.12)" }}
            >
              <ShieldCheck className="w-7 h-7 text-[var(--aurora-cyan)]" />
            </div>
          </div>

          <div className="text-white/70 text-center" style={{ fontSize: 13, lineHeight: 1.6 }}>
            For å motta turer må KJAPP bruke posisjon, dokumentstatus og turdata. Du kan gå av nett når som helst.
          </div>

          {/* Consent checkboxes */}
          <GlassPanel className="rounded-2xl overflow-hidden">
            {CONSENTS.map((c, i) => (
              <motion.button
                key={c.id}
                whileTap={{ scale: 0.99 }}
                onClick={() => toggle(c.id)}
                className="w-full flex items-start gap-3 px-4 py-4 text-left"
                style={{ borderBottom: i < CONSENTS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
              >
                {checked[c.id] ? (
                  <CheckSquare className="w-4 h-4 text-[var(--aurora-cyan)] shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-4 h-4 text-white/35 shrink-0 mt-0.5" />
                )}
                <span className="text-white/85" style={{ fontSize: 13, lineHeight: 1.4 }}>
                  {c.text}
                </span>
              </motion.button>
            ))}
          </GlassPanel>

          {accepted && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
              style={{ color: "var(--aurora-cyan)", fontSize: 13 }}
            >
              Samtykke registrert ✓
            </motion.div>
          )}
        </div>
      </div>

      {/* Fixed CTA */}
      <div
        className="absolute left-0 right-0 bottom-0 px-5"
        style={{
          paddingBottom: "max(env(safe-area-inset-bottom), 20px)",
          paddingTop: 16,
          background: "linear-gradient(to top, rgba(5,6,15,0.97) 60%, transparent)",
        }}
      >
        <motion.button
          whileTap={allChecked ? { scale: 0.98 } : {}}
          onClick={handleAccept}
          className="w-full rounded-2xl h-14 relative overflow-hidden transition-opacity"
          style={{ opacity: allChecked ? 1 : 0.4 }}
        >
          <div className="absolute inset-0" style={{ background: "var(--aurora-gradient)" }} />
          <span
            className="relative text-[#05060f] font-display"
            style={{ fontSize: 13, letterSpacing: "0.12em" }}
          >
            Godta og fortsett
          </span>
        </motion.button>
      </div>
    </div>
  );
}
