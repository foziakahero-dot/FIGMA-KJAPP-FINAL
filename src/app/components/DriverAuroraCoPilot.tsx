import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Activity, Navigation, FileText, HelpCircle, X, Send } from "lucide-react";
import { GlassPanel } from "./GlassPanel";
import type { Screen } from "../App";

type DriverState = "offline" | "online" | "new-trip" | "accepted" | "active" | "document-alert";

type QuickAction = {
  label: string;
  action: () => void;
};

function getMessage(state: DriverState): string {
  switch (state) {
    case "offline":
      return "Gå på nett når du er klar. Jeg hjelper deg med turer, navigasjon og status.";
    case "online":
      return "Høy aktivitet nær Sentrum. Flytt deg mot Grünerløkka for kortere ventetid.";
    case "new-trip":
      return "Ny tur fra Mathilde. Henting er 2 min unna. Betaling med Vipps.";
    case "accepted":
      return "Neste steg: naviger til hentestedet. Jeg kan åpne valgt navigasjonsapp.";
    case "active":
      return "Neste steg: kjør til Maaemo, Schweigaards gate. Åpne valgt navigasjon ved behov.";
    case "document-alert":
      return "Forsikring utløper snart. Oppdater dokumentet før fristen.";
  }
}

function getQuickActions(state: DriverState, go: (s: Screen) => void): QuickAction[] {
  const actions: QuickAction[] = [];

  if (state === "accepted" || state === "active") {
    actions.push({
      label: "Åpne valgt navigasjon",
      action: () => {},
    });
  }

  actions.push(
    {
      label: "Hva er neste steg?",
      action: () => {},
    },
    {
      label: "Hvor bør jeg vente?",
      action: () => {},
    }
  );

  if (state === "document-alert") {
    actions.push({
      label: "Dokumentstatus",
      action: () => go("driver-profile"),
    });
  }

  actions.push(
    {
      label: "Rapporter problem",
      action: () => {},
    },
    {
      label: "Kontakt support",
      action: () => {},
    }
  );

  return actions.slice(0, 4);
}

export function DriverAuroraCoPilot({
  state = "online",
  go,
  compact = true,
}: {
  state?: DriverState;
  go: (s: Screen) => void;
  compact?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const [input, setInput] = useState("");

  const message = getMessage(state);
  const quickActions = getQuickActions(state, go);

  if (compact && !expanded) {
    return (
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => setExpanded(true)}
        className="w-full"
      >
        <GlassPanel holo className="rounded-3xl p-4 relative overflow-hidden text-left">
          <div
            className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl pointer-events-none"
            style={{ background: "var(--aurora-gradient)", opacity: 0.22 }}
          />
          <div className="relative flex items-start gap-3">
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
              <div className="text-white font-display" style={{ fontSize: 13 }}>
                Aurora Driver
              </div>
              <div
                className="text-white/75 mt-1"
                style={{ fontSize: 11, lineHeight: 1.4 }}
              >
                {message}
              </div>
            </div>
          </div>
        </GlassPanel>
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      {expanded && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed inset-0 z-50 flex items-end"
          style={{ background: "rgba(5,6,15,0.8)" }}
          onClick={() => setExpanded(false)}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full"
            style={{
              maxHeight: "80vh",
              paddingBottom: "max(env(safe-area-inset-bottom), 16px)",
            }}
          >
            <GlassPanel holo className="rounded-t-3xl p-5">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(94,240,255,0.15)" }}
                  >
                    <Activity className="w-4 h-4 text-[var(--aurora-cyan)]" />
                  </div>
                  <div>
                    <div className="text-white font-display" style={{ fontSize: 13 }}>
                      Aurora Driver
                    </div>
                    <div className="text-white/55" style={{ fontSize: 10 }}>
                      Din kjøreassistent
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setExpanded(false)}
                  className="w-9 h-9 rounded-full glass-panel flex items-center justify-center active:scale-95 transition"
                  aria-label="Lukk"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Message */}
              <GlassPanel className="rounded-2xl p-4 mb-4">
                <div className="flex items-start gap-3">
                  <Activity className="w-4 h-4 text-[var(--aurora-cyan)] mt-0.5 shrink-0" />
                  <div className="text-white/85" style={{ fontSize: 12, lineHeight: 1.5 }}>
                    {message}
                  </div>
                </div>
              </GlassPanel>

              {/* Quick actions */}
              <div className="space-y-2 mb-4">
                <div
                  className="text-white/65 font-display uppercase mb-2 px-1"
                  style={{ fontSize: 10, letterSpacing: "0.22em" }}
                >
                  Hurtigvalg
                </div>
                {quickActions.map((action, i) => (
                  <motion.button
                    key={i}
                    whileTap={{ scale: 0.98 }}
                    onClick={action.action}
                    className="w-full glass-panel rounded-2xl px-3.5 py-2.5 text-left active:scale-[0.99] transition"
                  >
                    <span className="text-white" style={{ fontSize: 12 }}>
                      {action.label}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Input */}
              <div className="flex items-center gap-2">
                <div className="flex-1 glass-panel rounded-full px-4 py-2 flex items-center gap-2 min-w-0">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Skriv til Aurora Driver…"
                    className="bg-transparent flex-1 outline-none text-white placeholder:text-white/40 min-w-0"
                    style={{ fontSize: 12 }}
                  />
                </div>
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setInput("")}
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "var(--aurora-gradient)" }}
                  aria-label="Send"
                >
                  <Send className="w-3.5 h-3.5 text-[#05060f]" />
                </motion.button>
              </div>
            </GlassPanel>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
