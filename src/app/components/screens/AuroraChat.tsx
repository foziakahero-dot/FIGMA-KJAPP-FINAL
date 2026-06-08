import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Send, Mic, Clock, MapPin, Check } from "lucide-react";
import { HolographicBackground } from "../HolographicBackground";
import { AuroraOrb } from "../AuroraOrb";
import { BottomNavigation } from "../BottomNavigation";
import { GlassPanel } from "../GlassPanel";
import type { Screen } from "../../App";

type ActionCard = {
  title: string;
  lines: string[];
  cta: string;
  onTap: () => void;
};

type ActionButtons = {
  options: { label: string; onTap: () => void }[];
};

type ConfirmCard = {
  question: string;
  cta: string;
  onConfirm: () => void;
};

type Msg = {
  from: "aurora" | "me";
  text: string;
  action?: ActionCard;
  buttons?: ActionButtons;
  confirm?: ConfirmCard;
};

const CHIPS = [
  "Bestill taxi hjem",
  "Rekk neste T-bane",
  "Planlegg taxi til bussen",
  "Hva koster tur til Gardermoen?",
  "Del reisen med familien",
  "KJAPP + kollektiv",
];

function buildReply(text: string, go: (s: Screen) => void): Omit<Msg, "from"> {
  const t = text.toLowerCase();

  if (t.includes("t-bane") || t.includes("majorstuen") || t.includes("rekk")) {
    return {
      text: "Jeg hjelper deg. Neste avgang går 08:14. Jeg anbefaler KJAPP-henting 07:58 med 9 min buffer.",
      action: {
        title: "Rekk avgangen",
        lines: ["Majorstuen T-bane", "KJAPP-henting 07:58", "Buffer 9 min"],
        cta: "Planlegg tur",
        onTap: () => go("rekk-avgangen"),
      },
    };
  }

  if (t.includes("gardermoen") || t.includes("kost")) {
    return {
      text: "Estimert pris er 699 kr. Vil du se raskeste bil eller planlegge senere henting?",
      buttons: {
        options: [
          { label: "Raskeste bil", onTap: () => go("book") },
          { label: "Planlegg senere", onTap: () => go("book") },
          { label: "Se prisdetaljer", onTap: () => go("book") },
        ],
      },
    };
  }

  if (t.includes("hjem") || t.includes("bestill")) {
    return {
      text: "Skal jeg bekrefte denne turen hjem til Thorvald Meyers gate 41?",
      confirm: {
        question: "Skal jeg bekrefte denne turen?",
        cta: "Bekreft tur",
        onConfirm: () => go("book"),
      },
    };
  }

  if (t.includes("del") || t.includes("familien")) {
    return {
      text: "Jeg kan dele reisen live med familien. Du får en delbar link med sanntids ETA, sjåfør og bilinfo. Vil du aktivere dette på neste tur?",
    };
  }

  if (t.includes("buss") || t.includes("planlegg taxi")) {
    return {
      text: "Jeg kan planlegge taxi til bussen. Hvilken bussavgang må du rekke?",
    };
  }

  if (t.includes("kollektiv") || t.includes("kjapp +")) {
    return {
      text: "KJAPP Connect kombinerer taxi med T-bane, buss og tog for smarteste rute. Hvor skal du?",
    };
  }

  return { text: "Notert. Skal jeg legge det i planen?" };
}

const INITIAL_MSGS: Msg[] = [
  {
    from: "me",
    text: "Jeg må rekke T-banen fra Majorstuen.",
  },
  {
    from: "aurora",
    text: "Jeg hjelper deg. Neste avgang går 08:14. Jeg anbefaler KJAPP-henting 07:58 med 9 min buffer.",
    action: {
      title: "Rekk avgangen",
      lines: ["Majorstuen T-bane", "KJAPP-henting 07:58", "Buffer 9 min"],
      cta: "Planlegg tur",
      onTap: () => {},
    },
  },
  {
    from: "me",
    text: "Hva koster tur til Gardermoen?",
  },
  {
    from: "aurora",
    text: "Estimert pris er 699 kr. Vil du se raskeste bil eller planlegge senere henting?",
    buttons: {
      options: [
        { label: "Raskeste bil", onTap: () => {} },
        { label: "Planlegg senere", onTap: () => {} },
        { label: "Se prisdetaljer", onTap: () => {} },
      ],
    },
  },
];

export function AuroraChat({ go }: { go: (s: Screen) => void }) {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [kbOffset, setKbOffset] = useState(0);
  const [showConfirmDone, setShowConfirmDone] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMsgs(INITIAL_MSGS.map((m, i) =>
        i === 1
          ? { ...m, action: m.action ? { ...m.action, onTap: () => go("rekk-avgangen") } : undefined }
          : i === 3
          ? { ...m, buttons: m.buttons ? { options: m.buttons.options.map(o => ({ ...o, onTap: () => go("book") })) } : undefined }
          : m
      ));
    }, 300);
    return () => clearTimeout(timer);
  }, [go]);

  useEffect(() => {
    const vv = typeof window !== "undefined" ? window.visualViewport : null;
    if (!vv) return;
    const onResize = () => {
      const diff = window.innerHeight - vv.height - vv.offsetTop;
      setKbOffset(Math.max(0, diff));
    };
    vv.addEventListener("resize", onResize);
    vv.addEventListener("scroll", onResize);
    return () => {
      vv.removeEventListener("resize", onResize);
      vv.removeEventListener("scroll", onResize);
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, thinking]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { from: "me", text }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      const r = buildReply(text, go);
      setMsgs((m) => [...m, { from: "aurora", ...r }]);
      setThinking(false);
    }, 900);
  };

  const handleConfirm = (idx: number, onConfirm: () => void) => {
    setShowConfirmDone(idx);
    setTimeout(() => {
      onConfirm();
    }, 600);
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        height: "100svh",
        maxHeight: "100dvh",
        scrollbarWidth: "none",
        overscrollBehavior: "none",
      }}
    >
      <HolographicBackground intensity={1} />

      <div
        className="relative h-full flex flex-col"
        style={{
          paddingTop: "max(env(safe-area-inset-top), 14px)",
          paddingBottom: `calc(${kbOffset}px + 88px + max(env(safe-area-inset-bottom), 10px))`,
        }}
      >
        {/* Top header */}
        <div className="px-5 flex items-center justify-between gap-3 mb-3">
          <div className="w-10" />
          <span
            className="text-white font-display uppercase"
            style={{ fontSize: 11, letterSpacing: "0.32em" }}
          >
            Aurora
          </span>
          <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center">
            <AuroraOrb size={22} listening />
          </div>
        </div>

        {/* Aurora identity */}
        <div className="px-5 flex flex-col items-center text-center mb-4">
          <motion.div
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <AuroraOrb size={72} listening />
          </motion.div>
          <div className="mt-2.5 flex items-center gap-1.5">
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-[var(--aurora-cyan)] animate-ping opacity-70" />
              <span className="relative w-2 h-2 rounded-full bg-[var(--aurora-cyan)]" />
            </span>
            <span className="text-white/70 font-mono" style={{ fontSize: 10, letterSpacing: "0.18em" }}>
              PÅ NETT
            </span>
          </div>
          <div
            className="text-white/55 mt-1"
            style={{ fontSize: 11, lineHeight: 1.4 }}
          >
            Din AI-reiseassistent
          </div>
          <div
            className="text-white mt-2"
            style={{ fontSize: 15, lineHeight: 1.3 }}
          >
            Hei Mathilde. Hvor skal du i dag?
          </div>
        </div>

        {/* Chat messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-5 space-y-3 pb-2"
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
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${m.from === "me" ? "justify-end" : "justify-start flex-col"}`}
              >
                <div className={`flex ${m.from === "me" ? "justify-end" : "justify-start items-end gap-2"}`}>
                  {m.from === "aurora" && (
                    <div className="mb-0.5 shrink-0">
                      <AuroraOrb size={24} />
                    </div>
                  )}
                  <div
                    className={`max-w-[76%] px-3.5 py-2.5 rounded-2xl ${
                      m.from === "me" ? "text-[#05060f]" : "text-white glass-panel"
                    } ${m.from === "me" ? "rounded-br-md" : "rounded-bl-md"}`}
                    style={{
                      fontSize: 13,
                      lineHeight: 1.45,
                      ...(m.from === "me" ? { background: "var(--aurora-gradient)" } : {}),
                    }}
                  >
                    {m.text}
                  </div>
                </div>

                {/* Action card */}
                {m.from === "aurora" && m.action && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18 }}
                    className="ml-8 mt-2"
                  >
                    <GlassPanel holo className="rounded-2xl p-4">
                      <div className="flex items-start gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: "rgba(94,240,255,0.14)" }}
                        >
                          <Clock className="w-5 h-5 text-[var(--aurora-cyan)]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-white font-display" style={{ fontSize: 13 }}>
                            {m.action.title}
                          </div>
                          <div className="mt-1.5 space-y-0.5">
                            {m.action.lines.map((line, li) => (
                              <div key={li} className="text-white/65 flex items-center gap-1.5" style={{ fontSize: 11 }}>
                                <MapPin className="w-3 h-3 shrink-0 text-white/35" />
                                {line}
                              </div>
                            ))}
                          </div>
                          <motion.button
                            whileTap={{ scale: 0.97 }}
                            onClick={m.action.onTap}
                            className="mt-3 rounded-xl px-4 py-2"
                            style={{ background: "var(--aurora-gradient)" }}
                          >
                            <span
                              className="text-[#05060f] font-display"
                              style={{ fontSize: 12, letterSpacing: "0.08em" }}
                            >
                              {m.action.cta}
                            </span>
                          </motion.button>
                        </div>
                      </div>
                    </GlassPanel>
                  </motion.div>
                )}

                {/* Action buttons */}
                {m.from === "aurora" && m.buttons && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18 }}
                    className="ml-8 mt-2 flex flex-wrap gap-2"
                  >
                    {m.buttons.options.map((opt, oi) => (
                      <motion.button
                        key={oi}
                        whileTap={{ scale: 0.96 }}
                        onClick={opt.onTap}
                        className="glass-panel holo-border rounded-full px-3.5 py-2"
                        style={{ fontSize: 11 }}
                      >
                        <span className="text-white">{opt.label}</span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}

                {/* Confirmation card */}
                {m.from === "aurora" && m.confirm && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="ml-8 mt-2"
                  >
                    <GlassPanel holo className="rounded-2xl p-4">
                      <div className="text-white/80 mb-3" style={{ fontSize: 12 }}>
                        {m.confirm.question}
                      </div>
                      {showConfirmDone === i ? (
                        <div className="flex items-center gap-2">
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center"
                            style={{ background: "var(--aurora-gradient)" }}
                          >
                            <Check className="w-3.5 h-3.5 text-[#05060f]" />
                          </div>
                          <span className="text-white/70" style={{ fontSize: 11 }}>
                            Bekreftet
                          </span>
                        </div>
                      ) : (
                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleConfirm(i, m.confirm!.onConfirm)}
                          className="rounded-xl px-5 py-2"
                          style={{ background: "var(--aurora-gradient)" }}
                        >
                          <span
                            className="text-[#05060f] font-display"
                            style={{ fontSize: 12, letterSpacing: "0.08em" }}
                          >
                            {m.confirm.cta}
                          </span>
                        </motion.button>
                      )}
                    </GlassPanel>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {thinking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 ml-1"
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

        {/* Suggested chips */}
        <div
          className="px-5 pb-2 overflow-x-auto"
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
        >
          <div className="flex gap-2 w-max">
            {CHIPS.map((chip) => (
              <motion.button
                key={chip}
                whileTap={{ scale: 0.96 }}
                onClick={() => send(chip)}
                className="glass-panel holo-border rounded-full px-3 py-1.5 shrink-0"
              >
                <span className="text-white/80" style={{ fontSize: 11, whiteSpace: "nowrap" }}>
                  {chip}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Input bar */}
        <div className="px-5 mt-1 flex items-center gap-2">
          <div className="flex-1 glass-panel rounded-full px-4 py-2.5 flex items-center gap-2 holo-border min-w-0">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder="Skriv til Aurora…"
              className="bg-transparent flex-1 outline-none text-white placeholder:text-white/40 min-w-0"
              style={{ fontSize: 13 }}
            />
            <button
              onClick={() => go("voice")}
              aria-label="Åpne stemmemodus"
              className="p-1 -m-1 shrink-0"
            >
              <Mic className="w-4 h-4 text-[var(--aurora-cyan)]" />
            </button>
          </div>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => send(input)}
            aria-label="Send melding"
            className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "var(--aurora-gradient)" }}
          >
            <Send className="w-4 h-4 text-[#05060f]" />
          </motion.button>
        </div>
      </div>

      <BottomNavigation active="aurora" go={go} />
    </div>
  );
}
