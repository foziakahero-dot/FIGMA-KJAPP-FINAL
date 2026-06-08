import { motion } from "motion/react";
import { ChevronLeft, ShieldAlert, CreditCard, Package, AlertTriangle, Clock, Lock } from "lucide-react";
import { HolographicBackground } from "../HolographicBackground";
import { GlassPanel } from "../GlassPanel";
import type { Screen } from "../../App";

type Priority = "Kritisk" | "Høy" | "Normal";

type SupportCase = {
  id: string;
  category: string;
  priority: Priority;
  customer: string;
  tourId: string;
  summary: string;
  icon: React.ReactNode;
};

const CASES: SupportCase[] = [
  {
    id: "1042",
    category: "Betaling feilet",
    priority: "Kritisk",
    customer: "Mathilde",
    tourId: "KJAPP-20240604-A41",
    summary: "Betaling via Vipps feilet etter endt tur. Kunden ble belastet feil beløp.",
    icon: <CreditCard className="w-4 h-4" />,
  },
  {
    id: "1043",
    category: "Kunde møter ikke opp",
    priority: "Normal",
    customer: "Jonas",
    tourId: "KJAPP-20240604-B22",
    summary: "Sjåfør ventet over 5 minutter. No-show rapportert av sjåfør Amir.",
    icon: <AlertTriangle className="w-4 h-4" />,
  },
  {
    id: "1044",
    category: "Mistet eiendel",
    priority: "Høy",
    customer: "Aisha",
    tourId: "KJAPP-20240603-C18",
    summary: "Kunde rapporterte mistet veske i bilen etter tur til Gardermoen.",
    icon: <Package className="w-4 h-4" />,
  },
  {
    id: "1045",
    category: "Sikkerhet",
    priority: "Kritisk",
    customer: "Lars",
    tourId: "KJAPP-20240603-D07",
    summary: "Sikkerhetshendelse rapportert under aktiv tur. Eskalert automatisk av AI.",
    icon: <ShieldAlert className="w-4 h-4" />,
  },
];

function priorityColor(p: Priority): { bg: string; text: string } {
  switch (p) {
    case "Kritisk": return { bg: "rgba(255,122,122,0.18)", text: "#ff7a7a" };
    case "Høy": return { bg: "rgba(255,181,71,0.18)", text: "#ffb547" };
    case "Normal": return { bg: "rgba(94,240,255,0.14)", text: "var(--aurora-cyan)" };
  }
}

export function SupportInbox({ go }: { go: (s: Screen) => void }) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", maxHeight: "100dvh", scrollbarWidth: "none", overscrollBehavior: "none" }}
    >
      <HolographicBackground intensity={0.8} />

      {/* Fixed header */}
      <div
        className="absolute top-0 left-0 right-0 z-20 px-5"
        style={{ paddingTop: "max(env(safe-area-inset-top), 16px)", paddingBottom: 12 }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => go("support")}
            className="w-10 h-10 rounded-full glass-panel flex items-center justify-center active:scale-95 transition shrink-0"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <div className="flex-1 text-center">
            <div className="text-white font-display uppercase" style={{ fontSize: 11, letterSpacing: "0.28em" }}>
              KJAPP Support Inbox
            </div>
            <div className="text-white/50 mt-0.5" style={{ fontSize: 10 }}>
              Admin Panel · Kommer snart
            </div>
          </div>
          <div className="w-10 h-10" />
        </div>
      </div>

      {/* Scrollable content */}
      <div
        className="relative h-full overflow-y-auto px-4"
        style={{
          paddingTop: "calc(max(env(safe-area-inset-top), 16px) + 72px)",
          paddingBottom: "calc(max(env(safe-area-inset-bottom), 16px) + 24px)",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-y",
        }}
      >
        <div className="space-y-3 pb-4">
          {/* Placeholder banner */}
          <GlassPanel className="rounded-2xl p-4 relative overflow-hidden"
            style={{ border: "1px solid rgba(94,240,255,0.18)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(94,240,255,0.12)" }}
              >
                <Lock className="w-5 h-5 text-[var(--aurora-cyan)]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-display" style={{ fontSize: 13 }}>Kommer i Admin Panel</div>
                <div className="text-white/55 mt-0.5" style={{ fontSize: 11, lineHeight: 1.35 }}>
                  Dette er en forhåndsvisning av innboksen for kritiske AI-saker. Full administrasjon bygges i Admin Panel.
                </div>
              </div>
            </div>
          </GlassPanel>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Åpne saker", value: "4" },
              { label: "Kritiske", value: "2" },
              { label: "Venter", value: "4" },
            ].map((stat) => (
              <div key={stat.label} className="glass-panel rounded-xl p-3 text-center">
                <div className="text-white font-display" style={{ fontSize: 20 }}>{stat.value}</div>
                <div className="text-white/50 mt-0.5" style={{ fontSize: 9 }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Section label */}
          <div
            className="text-white/55 font-display uppercase px-1"
            style={{ fontSize: 10, letterSpacing: "0.22em" }}
          >
            Innkommende saker
          </div>

          {/* Case cards */}
          {CASES.map((c, idx) => {
            const p = priorityColor(c.priority);
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 }}
              >
                <GlassPanel className="rounded-2xl p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: p.bg, color: p.text }}
                    >
                      {c.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-display" style={{ fontSize: 13 }}>
                            Sak #{c.id}
                          </span>
                          <span
                            className="px-2 py-0.5 rounded-full font-mono"
                            style={{ background: p.bg, color: p.text, fontSize: 8, letterSpacing: "0.12em" }}
                          >
                            {c.priority.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <Clock className="w-3 h-3 text-white/35" />
                          <span className="text-white/35" style={{ fontSize: 10 }}>Nå</span>
                        </div>
                      </div>

                      <div className="text-[var(--aurora-cyan)]" style={{ fontSize: 11, marginBottom: 4 }}>
                        {c.category}
                      </div>
                      <div className="text-white/65" style={{ fontSize: 11, lineHeight: 1.4 }}>
                        {c.summary}
                      </div>

                      <div className="flex items-center gap-3 mt-2.5 pt-2.5 border-t border-white/5">
                        <span className="text-white/45" style={{ fontSize: 10 }}>
                          {c.customer} · {c.tourId}
                        </span>
                        <span
                          className="ml-auto px-2 py-0.5 rounded-full glass-panel"
                          style={{ fontSize: 9, color: "rgba(255,255,255,0.45)" }}
                        >
                          Venter på behandling
                        </span>
                      </div>
                    </div>
                  </div>
                </GlassPanel>
              </motion.div>
            );
          })}

          <div
            className="text-center text-white/30 font-mono pt-2"
            style={{ fontSize: 9, letterSpacing: "0.18em" }}
          >
            KJAPP ADMIN PANEL · INTERN BRUK · PROTOTYPE
          </div>
        </div>
      </div>
    </div>
  );
}
