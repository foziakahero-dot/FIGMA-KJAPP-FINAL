import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Send, Mic, X, MapPin, Clock } from "lucide-react";
import { AuroraOrb } from "./AuroraOrb";
import { GlassPanel } from "./GlassPanel";
import type { Screen } from "../App";

type Msg = { from: "aurora" | "me"; text: string };

function miniReply(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("maaemo") || t.includes("20") || t.includes("19")) {
    return "Da anbefaler jeg henting 19:30. Skal jeg bestille Eco?";
  }
  if (t.includes("hjem")) {
    return "Jeg bestiller taxi hjem til Thorvald Meyers gate 41. Henting om 3 min?";
  }
  if (t.includes("gardermoen") || t.includes("flyplass")) {
    return "Tur til Gardermoen koster ca. 700 kr. Henting nå eller senere?";
  }
  return "Jeg hjelper deg. Hvor skal du?";
}

const INITIAL_MSGS: Msg[] = [
  { from: "me", text: "Jeg skal til Maaemo kl. 20." },
  { from: "aurora", text: "Da anbefaler jeg henting 19:30. Skal jeg bestille Eco?" },
];

export function AuroraMiniChat({
  open,
  onClose,
  go,
}: {
  open: boolean;
  onClose: () => void;
  go: (s: Screen) => void;
}) {
  const [msgs, setMsgs] = useState<Msg[]>(INITIAL_MSGS);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { from: "me", text }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setMsgs((m) => [...m, { from: "aurora", text: miniReply(text) }]);
      setThinking(false);
    }, 700);
  };

  const handleSeeProposal = () => {
    onClose();
    go("book");
  };

  const lastMsg = msgs[msgs.length - 1];
  const showActionCard = lastMsg?.from === "aurora" && !thinking;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop — keep map visible, semi-transparent */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 z-30"
            style={{ background: "rgba(5,6,15,0.5)" }}
          />

          {/* Chat sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 310 }}
            className="absolute left-0 right-0 z-40"
            style={{ bottom: 0 }}
          >
            <GlassPanel holo className="rounded-t-3xl px-5 pt-4 pb-5">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <AuroraOrb size={30} listening />
                  <div>
                    <div className="text-white font-display" style={{ fontSize: 14 }}>
                      Aurora
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="relative flex w-1.5 h-1.5">
                        <span className="absolute inset-0 rounded-full bg-[var(--aurora-cyan)] animate-ping opacity-70" />
                        <span className="relative w-1.5 h-1.5 rounded-full bg-[var(--aurora-cyan)]" />
                      </span>
                      <span className="text-white/55 font-mono" style={{ fontSize: 9, letterSpacing: "0.16em" }}>
                        PÅ NETT
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full glass-panel flex items-center justify-center active:scale-95 transition"
                  aria-label="Lukk"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Messages */}
              <div
                className="space-y-3 mb-4"
                style={{ maxHeight: "36vh", overflowY: "auto", scrollbarWidth: "none" }}
              >
                <AnimatePresence initial={false}>
                  {msgs.map((m, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${m.from === "me" ? "justify-end" : "justify-start items-end gap-2"}`}
                    >
                      {m.from === "aurora" && (
                        <div className="shrink-0">
                          <AuroraOrb size={20} />
                        </div>
                      )}
                      <div
                        className={`max-w-[76%] px-3 py-2.5 rounded-2xl ${
                          m.from === "me" ? "text-[#05060f]" : "text-white glass-panel"
                        } ${m.from === "me" ? "rounded-br-sm" : "rounded-bl-sm"}`}
                        style={{
                          fontSize: 13,
                          lineHeight: 1.4,
                          ...(m.from === "me" ? { background: "var(--aurora-gradient)" } : {}),
                        }}
                      >
                        {m.text}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {thinking && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2"
                  >
                    <AuroraOrb size={20} />
                    <div className="glass-panel rounded-2xl px-3 py-2 flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-1 h-1 rounded-full bg-white/70"
                          initial={{ y: 0, opacity: 0.4 }}
                          animate={{ y: [0, -2, 0], opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Action card */}
              {showActionCard && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 ml-7"
                >
                  <GlassPanel className="rounded-2xl p-3.5 holo-border">
                    <div className="space-y-1.5 mb-3">
                      <div className="flex items-center gap-2 text-white/80" style={{ fontSize: 12 }}>
                        <MapPin className="w-3 h-3 text-[var(--aurora-cyan)] shrink-0" />
                        Maaemo, Schweigaards gate
                      </div>
                      <div className="flex items-center gap-2 text-white/80" style={{ fontSize: 12 }}>
                        <Clock className="w-3 h-3 text-[var(--aurora-cyan)] shrink-0" />
                        Henting 19:30
                      </div>
                      <div className="text-white/55 pl-5" style={{ fontSize: 11 }}>
                        Estimert pris 249 kr
                      </div>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={handleSeeProposal}
                      className="w-full rounded-xl py-2.5"
                      style={{ background: "var(--aurora-gradient)" }}
                    >
                      <span
                        className="text-[#05060f] font-display"
                        style={{ fontSize: 12, letterSpacing: "0.08em" }}
                      >
                        Se turforslag
                      </span>
                    </motion.button>
                  </GlassPanel>
                </motion.div>
              )}

              {/* Input */}
              <div className="flex items-center gap-2">
                <div className="flex-1 glass-panel rounded-full px-4 py-2.5 flex items-center gap-2 min-w-0 holo-border">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && send(input)}
                    placeholder="Skriv til Aurora…"
                    className="bg-transparent flex-1 outline-none text-white placeholder:text-white/40 min-w-0"
                    style={{ fontSize: 13 }}
                  />
                  <button onClick={() => go("voice")} className="p-1 -m-1 shrink-0" aria-label="Stemmemodus">
                    <Mic className="w-3.5 h-3.5 text-[var(--aurora-cyan)]" />
                  </button>
                </div>
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={() => send(input)}
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "var(--aurora-gradient)" }}
                  aria-label="Send"
                >
                  <Send className="w-3.5 h-3.5 text-[#05060f]" />
                </motion.button>
              </div>
            </GlassPanel>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
