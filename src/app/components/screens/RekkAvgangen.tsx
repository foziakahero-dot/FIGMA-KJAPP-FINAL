import { motion } from "motion/react";
import { useState } from "react";
import {
  TramFront,
  Bus,
  TrainFront,
  Ship,
  Sparkles,
  Clock,
  MapPin,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import type { ReactNode } from "react";
import { SubScreen } from "../SubScreen";
import { GlassPanel } from "../GlassPanel";
import type { Screen } from "../../App";

type Mode = "tbane" | "buss" | "trikk" | "tog" | "baat";

const MODES: { id: Mode; label: string; icon: ReactNode }[] = [
  { id: "tbane", label: "T-bane", icon: <TramFront className="w-4 h-4" /> },
  { id: "buss", label: "Buss", icon: <Bus className="w-4 h-4" /> },
  { id: "trikk", label: "Trikk", icon: <TramFront className="w-4 h-4" /> },
  { id: "tog", label: "Tog", icon: <TrainFront className="w-4 h-4" /> },
  { id: "baat", label: "Båt", icon: <Ship className="w-4 h-4" /> },
];

export function RekkAvgangen({ go }: { go: (s: Screen) => void }) {
  const [mode, setMode] = useState<Mode>("tbane");

  return (
    <SubScreen title="Rekk avgangen" onBack={() => go("home")}>
      <div className="space-y-4 pb-4">
        {/* Intro */}
        <GlassPanel holo className="rounded-3xl p-4 relative overflow-hidden">
          <div
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none"
            style={{ background: "var(--aurora-gradient)", opacity: 0.28 }}
          />
          <div className="relative flex items-start gap-3">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: "var(--aurora-gradient)" }}
            >
              <Sparkles className="w-[18px] h-[18px] text-[#05060f]" strokeWidth={2.2} />
            </div>
            <div className="flex-1 min-w-0">
              <div
                className="text-white font-display"
                style={{ fontSize: 16, lineHeight: 1.25, paddingTop: 1 }}
              >
                Rekk avgangen
              </div>
              <div
                className="text-white/70 mt-1"
                style={{ fontSize: 12, lineHeight: 1.4 }}
              >
                KJAPP hjelper deg å rekke T-bane, buss og tog.
              </div>
            </div>
          </div>
        </GlassPanel>

        {/* Felt */}
        <div className="space-y-2">
          <Field label="Hvor skal du?" placeholder="Adresse, sted eller arrangement" />
          <Field label="Fra hvilket stoppested?" placeholder="Majorstuen T-bane" />
          <Field label="Når må du være fremme?" placeholder="08:20" />
        </div>

        {/* Transportvalg */}
        <div>
          <div
            className="text-white/65 font-display uppercase mb-2 px-1"
            style={{ fontSize: 10, letterSpacing: "0.22em" }}
          >
            Transportmiddel
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1" style={{ scrollbarWidth: "none" }}>
            {MODES.map((m) => {
              const active = m.id === mode;
              return (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className="shrink-0 rounded-2xl px-3.5 py-2 flex items-center gap-2 transition"
                  style={{
                    background: active
                      ? "rgba(94,240,255,0.14)"
                      : "rgba(255,255,255,0.05)",
                    boxShadow: active
                      ? "inset 0 0 0 1px rgba(94,240,255,0.45), 0 0 24px -10px rgba(94,240,255,0.6)"
                      : "inset 0 0 0 1px rgba(255,255,255,0.08)",
                    color: active ? "var(--aurora-cyan)" : "rgba(255,255,255,0.75)",
                  }}
                >
                  {m.icon}
                  <span style={{ fontSize: 12 }}>{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Resultat */}
        <GlassPanel holo glow className="rounded-3xl p-4 relative overflow-hidden">
          <div
            className="absolute -bottom-12 -left-12 w-44 h-44 rounded-full blur-3xl pointer-events-none"
            style={{ background: "var(--aurora-gradient)", opacity: 0.22 }}
          />
          <div className="relative flex items-center gap-2 mb-3">
            <span
              className="font-mono uppercase px-1.5 py-0.5 rounded-full"
              style={{
                fontSize: 9,
                letterSpacing: "0.18em",
                background: "rgba(160,107,255,0.18)",
                color: "var(--aurora-violet)",
              }}
            >
              Aurora plan
            </span>
            <span
              className="text-white/55 font-mono"
              style={{ fontSize: 9, letterSpacing: "0.16em" }}
            >
              SANNTID
            </span>
          </div>

          <div className="relative">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[var(--aurora-cyan)]" />
              <div
                className="text-white font-display"
                style={{ fontSize: 15, lineHeight: 1.25 }}
              >
                Majorstuen T-bane
              </div>
            </div>

            <div className="mt-3 space-y-2">
              <ResultRow label="Neste avgang" value="08:14" />
              <ResultRow label="KJAPP henting" value="07:58" highlight />
              <ResultRow label="Buffer" value="9 min" />
            </div>

            <div
              className="mt-3 rounded-2xl px-3 py-2.5 flex items-center gap-2"
              style={{
                background: "rgba(94,240,255,0.12)",
                boxShadow: "inset 0 0 0 1px rgba(94,240,255,0.28)",
              }}
            >
              <CheckCircle2 className="w-4 h-4 text-[var(--aurora-cyan)] shrink-0" />
              <span className="text-white" style={{ fontSize: 12.5 }}>
                Du rekker avgangen
              </span>
            </div>
          </div>
        </GlassPanel>

        {/* CTA-er */}
        <div className="space-y-2 pt-1">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => go("book")}
            className="w-full rounded-2xl h-13 relative overflow-hidden"
            style={{ height: 52 }}
          >
            <div className="absolute inset-0" style={{ background: "var(--aurora-gradient)" }} />
            <div
              className="relative h-full flex items-center justify-center gap-2 text-[#05060f] font-display"
              style={{ fontSize: 13, letterSpacing: "0.12em" }}
            >
              BESTILL TIL AVGANG
              <Clock className="w-4 h-4" />
            </div>
          </motion.button>

          <button
            onClick={() => go("chat")}
            className="w-full glass-panel rounded-2xl py-3 flex items-center justify-center gap-2 text-white/80"
            style={{ fontSize: 12.5 }}
          >
            Se andre alternativer
            <ChevronRight className="w-4 h-4 text-white/55" />
          </button>
        </div>
      </div>
    </SubScreen>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div className="glass-panel rounded-2xl px-4 py-3">
      <div
        className="text-white/55 font-mono uppercase"
        style={{ fontSize: 9, letterSpacing: "0.16em" }}
      >
        {label}
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className="mt-0.5 w-full bg-transparent outline-none text-white placeholder:text-white/40"
        style={{ fontSize: 13 }}
      />
    </div>
  );
}

function ResultRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white/65" style={{ fontSize: 12 }}>
        {label}
      </span>
      <span
        className={highlight ? "text-[var(--aurora-cyan)] font-display" : "text-white font-mono"}
        style={{ fontSize: 13, letterSpacing: highlight ? "0.04em" : "0.06em" }}
      >
        {value}
      </span>
    </div>
  );
}
