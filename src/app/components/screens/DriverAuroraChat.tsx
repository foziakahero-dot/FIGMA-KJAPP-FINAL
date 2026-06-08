import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Send, Mic, ArrowLeft, Navigation, AlertTriangle, HeadphonesIcon } from "lucide-react";
import { HolographicBackground } from "../HolographicBackground";
import { AuroraOrb } from "../AuroraOrb";
import { GlassPanel } from "../GlassPanel";
import { NavAppPicker } from "../NavAppPicker";
import type { Screen } from "../../App";

type ActionCard = { label: string; onTap: () => void };
type Msg = { from: "driver" | "aurora"; text: string; action?: ActionCard };

const QUICK_ACTIONS = [
  "Hvor bør jeg vente?",
  "Hva er neste steg?",
  "Åpne valgt navigasjon",
  "Dokumentstatus",
  "Rapporter problem",
  "Kontakt support",
];

function driverReply(text: string, go: (s: Screen) => void): Omit<Msg, "from"> {
  const t = text.toLowerCase();

  if (t.includes("vente") || t.includes("hvor bør")) {
    return {
      text: "Høy aktivitet nær Sentrum. Flytt deg mot Grünerløkka for kortere ventetid.",
    };
  }

  if (t.includes("neste steg") || t.includes("neste")) {
    return {
      text: "Neste steg vises automatisk når en tur er aktiv.",
    };
  }

  if (t.includes("navigasjon") || t.includes("åpne valgt")) {
    return {
      text: "Velg navigasjonsapp. Kjøretøy er satt til Thorvald Meyers gate 41.",
      action: { label: "Åpne valgt navigasjon", onTap: () => {} },
    };
  }

  if (t.includes("dokument") || t.includes("status")) {
    return {
      text: "Forsikring utløper snart. Oppdater dokumentet før fristen.",
    };
  }

  if (t.includes("problem") || t.includes("rapporter")) {
    return {
      text: "Hva vil du rapportere? Jeg logger saken og varsler support.",
    };
  }

  if (t.includes("support") || t.includes("kontakt")) {
    return {
      text: "Kobler deg til KJAPP-support. Gjennomsnittlig ventetid er under 2 min.",
    };
  }

  return { text: "Jeg er her. Hva kan jeg hjelpe deg med?" };
}

const INITIAL_MSGS: Msg[] = [
  { from: "driver", text: "Hvor bør jeg vente?" },
  {
    from: "aurora",
    text: "Høy aktivitet nær Sentrum. Flytt deg mot Grünerløkka for kortere ventetid.",
  },
  { from: "driver", text: "Hva er neste steg?" },
  {
    from: "aurora",
    text: "Neste steg vises automatisk når en tur er aktiv.",
  },
  { from: "driver", text: "Dokumentstatus?" },
  {
    from: "aurora",
    text: "Forsikring utløper snart. Oppdater dokumentet før fristen.",
  },
];

export function DriverAuroraChat({ go }: { go: (s: Screen) => void }) {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [navPickerOpen, setNavPickerOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMsgs(
        INITIAL_MSGS.map((m) =>
          m.action
            ? { ...m, action: { ...m.action, onTap: () => setNavPickerOpen(true) } }
            : m
        )
      );
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, thinking]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { from: "driver", text }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      const r = driverReply(text, go);
      const withNavHandler = r.action
        ? { ...r, action: { ...r.action, onTap: () => setNavPickerOpen(true) } }
        : r;
      setMsgs((m) => [...m, { from: "aurora", ...withNavHandler }]);
      setThinking(false);
    }, 800);
  };

  return (
    <div
      className="relative w-full overflow-hidden flex flex-col"
      style={{
        height: "100svh",
        maxHeight: "100dvh",
        scrollbarWidth: "none",
        overscrollBehavior: "none",
      }}
    >
      <HolographicBackground intensity={0.8} />

      {/* Header */}
      <div
        className="relative px-5 flex items-center gap-3 z-10"
        style={{ paddingTop: "max(env(safe-area-inset-top), 16px)", paddingBottom: 12 }}
      >
        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={() => go("driver")}
          className="w-10 h-10 rounded-full glass-panel flex items-center justify-center shrink-0"
          aria-label="Tilbake"
        >
          <ArrowLeft className="w-4 h-4 text-white" />
        </motion.button>

        <div className="flex-1 flex items-center gap-2.5">
          <AuroraOrb size={32} listening />
          <div>
            <div className="text-white font-display" style={{ fontSize: 14 }}>
              Aurora Driver
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inset-0 rounded-full bg-[var(--aurora-cyan)] animate-ping opacity-70" />
                <span className="relative w-1.5 h-1.5 rounded-full bg-[var(--aurora-cyan)]" />
              </span>
              <span className="text-white/55 font-mono" style={{ fontSize: 9, letterSpacing: "0.16em" }}>
                KJØREASSISTENT
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-5 space-y-3 pb-3"
        style={{
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-y",
          scrollbarWidth: "none",
        }}
      >
        <AnimatePresence initial={false}>
          {msgs.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
              className={`flex ${m.from === "driver" ? "justify-end" : "justify-start flex-col"}`}
            >
              <div className={`flex ${m.from === "driver" ? "justify-end" : "justify-start items-end gap-2"}`}>
                {m.from === "aurora" && (
                  <div className="shrink-0">
                    <AuroraOrb size={24} />
                  </div>
                )}
                <div
                  className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl ${
                    m.from === "driver" ? "text-[#1a1206]" : "text-white glass-panel"
                  } ${m.from === "driver" ? "rounded-br-sm" : "rounded-bl-sm"}`}
                  style={{
                    fontSize: 13,
                    lineHeight: 1.45,
                    ...(m.from === "driver"
                      ? { background: "linear-gradient(135deg, #ffb547 0%, #ff8c42 100%)" }
                      : {}),
                  }}
                >
                  {m.text}
                </div>
              </div>

              {/* Action button */}
              {m.from === "aurora" && m.action && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="ml-8 mt-2"
                >
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={m.action.onTap}
                    className="glass-panel holo-border rounded-xl px-4 py-2.5 flex items-center gap-2"
                  >
                    <Navigation className="w-4 h-4 text-[var(--aurora-cyan)]" />
                    <span className="text-white font-display" style={{ fontSize: 12, letterSpacing: "0.06em" }}>
                      {m.action.label}
                    </span>
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {thinking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <AuroraOrb size={24} />
            <div className="glass-panel rounded-2xl px-3.5 py-2.5 flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-white/70"
                  initial={{ y: 0, opacity: 0.4 }}
                  animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Quick actions */}
      <div
        className="px-5 py-2 overflow-x-auto"
        style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
      >
        <div className="flex gap-2 w-max">
          {QUICK_ACTIONS.map((qa) => (
            <motion.button
              key={qa}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                qa === "Åpne valgt navigasjon" ? setNavPickerOpen(true) : send(qa)
              }
              className="glass-panel rounded-full px-3 py-1.5 shrink-0 flex items-center gap-1.5"
              style={{
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "rgba(255,181,71,0.22)",
              }}
            >
              {qa === "Rapporter problem" && (
                <AlertTriangle className="w-3 h-3 text-[#ffb547] shrink-0" />
              )}
              {qa === "Kontakt support" && (
                <HeadphonesIcon className="w-3 h-3 text-[#ffb547] shrink-0" />
              )}
              {qa === "Åpne valgt navigasjon" && (
                <Navigation className="w-3 h-3 text-[var(--aurora-cyan)] shrink-0" />
              )}
              <span className="text-white/80" style={{ fontSize: 11, whiteSpace: "nowrap" }}>
                {qa}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <NavAppPicker
        open={navPickerOpen}
        onClose={() => setNavPickerOpen(false)}
        address="Thorvald Meyers gate 41, Oslo"
      />

      {/* Input */}
      <div
        className="px-5 pb-5 flex items-center gap-2"
        style={{ paddingBottom: "max(env(safe-area-inset-bottom), 20px)" }}
      >
        <div
          className="flex-1 glass-panel rounded-full px-4 py-2.5 flex items-center gap-2 min-w-0"
          style={{
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: "rgba(255,181,71,0.22)",
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(input)}
            placeholder="Skriv til Aurora Driver…"
            className="bg-transparent flex-1 outline-none text-white placeholder:text-white/40 min-w-0"
            style={{ fontSize: 13 }}
          />
          <button
            onClick={() => go("voice")}
            aria-label="Stemmemodus"
            className="p-1 -m-1 shrink-0"
          >
            <Mic className="w-4 h-4 text-[#ffb547]" />
          </button>
        </div>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => send(input)}
          aria-label="Send"
          className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
          style={{ background: "linear-gradient(135deg, #ffb547 0%, #ff8c42 100%)" }}
        >
          <Send className="w-4 h-4 text-[#1a1206]" />
        </motion.button>
      </div>
    </div>
  );
}
