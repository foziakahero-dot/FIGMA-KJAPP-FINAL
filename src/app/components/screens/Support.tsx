import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  Send,
  ShieldAlert,
  AlertTriangle,
  CreditCard,
  Package,
  HelpCircle,
  Phone,
  FileText,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { HolographicBackground } from "../HolographicBackground";
import { GlassPanel } from "../GlassPanel";
import { AuroraOrb } from "../AuroraOrb";
import type { Screen } from "../../App";

type Msg = { id: string; from: "user" | "ai"; text: string };
type ActionCard = { label: string; screen?: Screen; escalate?: boolean };
type AiResponse = { text: string; actions?: ActionCard[]; escalate?: boolean; emergency?: boolean };

const CATEGORIES = [
  { id: "trip", label: "Turproblem", icon: <AlertTriangle className="w-3.5 h-3.5" />, color: "rgba(255,181,71,0.18)", textColor: "#ffb547" },
  { id: "pay", label: "Betaling", icon: <CreditCard className="w-3.5 h-3.5" />, color: "rgba(94,240,255,0.14)", textColor: "var(--aurora-cyan)" },
  { id: "receipt", label: "Kvittering", icon: <FileText className="w-3.5 h-3.5" />, color: "rgba(255,255,255,0.06)", textColor: "rgba(255,255,255,0.75)" },
  { id: "lost", label: "Mistet eiendel", icon: <Package className="w-3.5 h-3.5" />, color: "rgba(255,181,71,0.18)", textColor: "#ffb547" },
  { id: "safety", label: "Sikkerhet", icon: <ShieldAlert className="w-3.5 h-3.5" />, color: "rgba(255,122,122,0.18)", textColor: "#ff7a7a" },
  { id: "app", label: "App-feil", icon: <HelpCircle className="w-3.5 h-3.5" />, color: "rgba(255,255,255,0.06)", textColor: "rgba(255,255,255,0.75)" },
  { id: "other", label: "Annet", icon: <HelpCircle className="w-3.5 h-3.5" />, color: "rgba(255,255,255,0.06)", textColor: "rgba(255,255,255,0.75)" },
];

function buildAiReply(text: string): AiResponse {
  const t = text.toLowerCase();
  if (/(sikkerhet|fare|trussel|ulykke|trakassering|vold|redd)/.test(t)) {
    return {
      text: "Dette høres alvorlig ut. Saken er umiddelbart eskalert til KJAPP support. Ved akutt fare — ring nødhjelp.",
      emergency: true,
      escalate: true,
      actions: [
        { label: "Ring nødhjelp (112)", escalate: false },
        { label: "Kontakt KJAPP Support", escalate: false },
      ],
    };
  }
  if (/(fant ikke|finner ikke|sjåfør kom ikke|møtte ikke)/.test(t)) {
    return {
      text: "Jeg kan hjelpe. Var turen aktiv da dette skjedde?",
      actions: [
        { label: "Rapporter problem med tur", escalate: true },
        { label: "Kontakt support" },
        { label: "Be om refusjonsvurdering", escalate: true },
      ],
    };
  }
  if (/(betaling|betalt for mye|feil beløp|trukket|refusjon|tilbakebetaling|dispute)/.test(t)) {
    return {
      text: "Betalingsproblemer behandles som prioritet. Jeg sender saken til KJAPP support nå.",
      escalate: true,
      actions: [
        { label: "Be om refusjonsvurdering", escalate: true },
        { label: "Kontakt support" },
      ],
    };
  }
  if (/(kvittering|faktura|dokumentasjon)/.test(t)) {
    return {
      text: "Kvittering sendes automatisk til registrert e-post etter tur. Sjekk søppelpost. Vil du at jeg sender på nytt?",
      actions: [
        { label: "Send kvittering på nytt" },
        { label: "Kontakt support" },
      ],
    };
  }
  if (/(mistet|glemt|gjenstand|bag|veske|nøkkel|telefon)/.test(t)) {
    return {
      text: "Sak om mistet eiendel opprettes. Sjåfør varsles og vil kontakte deg innen 30 minutter.",
      escalate: true,
      actions: [
        { label: "Rapporter mistet eiendel", escalate: true },
        { label: "Ring sjåfør" },
        { label: "Kontakt support" },
      ],
    };
  }
  if (/(app|krasjet|virker ikke|feil i appen|laster ikke)/.test(t)) {
    return {
      text: "Beklager teknisk problem. Prøv å lukke og åpne appen. Vedvarer problemet, sender jeg det til vårt team.",
      actions: [
        { label: "Rapporter app-feil" },
        { label: "Kontakt support" },
      ],
    };
  }
  return {
    text: "Jeg forstår. Kan du fortelle mer om hva som skjedde? Velg en kategori eller skriv mer, så hjelper jeg deg videre.",
    actions: [
      { label: "Rapporter problem med tur", escalate: true },
      { label: "Kontakt support" },
    ],
  };
}

const CATEGORY_STARTERS: Record<string, string> = {
  trip: "Jeg hadde et problem med turen min.",
  pay: "Jeg har et betalingsproblem.",
  receipt: "Jeg trenger kvittering for turen min.",
  lost: "Jeg har mistet noe i bilen.",
  safety: "Jeg vil rapportere et sikkerhetsproblem.",
  app: "Appen fungerer ikke som den skal.",
  other: "Jeg trenger hjelp med noe annet.",
};

const CASE_ID = "1042";
const TOUR_ID = "KJAPP-20240604-A41";

export function Support({ go }: { go: (s: Screen) => void }) {
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: "ai-0", from: "ai", text: "Hei. Jeg er KJAPP Support AI. Hva kan jeg hjelpe deg med?" },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [escalated, setEscalated] = useState(false);
  const [lastActions, setLastActions] = useState<ActionCard[]>([]);
  const [emergency, setEmergency] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, thinking, escalated]);

  const sendMsg = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Msg = { id: `u-${Date.now()}`, from: "user", text: text.trim() };
    setMsgs((prev) => [...prev, userMsg]);
    setInput("");
    setThinking(true);
    setLastActions([]);

    setTimeout(() => {
      const reply = buildAiReply(text);
      const aiMsg: Msg = { id: `ai-${Date.now()}`, from: "ai", text: reply.text };
      setMsgs((prev) => [...prev, aiMsg]);
      setThinking(false);
      if (reply.actions) setLastActions(reply.actions);
      if (reply.emergency) setEmergency(true);
      if (reply.escalate) {
        setTimeout(() => setEscalated(true), 600);
      }
    }, 900);
  };

  const handleCategory = (catId: string) => {
    sendMsg(CATEGORY_STARTERS[catId] ?? "Jeg trenger hjelp.");
  };

  const handleAction = (action: ActionCard) => {
    if (action.escalate) {
      setEscalated(true);
    }
  };

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
            onClick={() => go("profile")}
            className="w-10 h-10 rounded-full glass-panel flex items-center justify-center active:scale-95 transition shrink-0"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <div className="flex-1 text-center">
            <div className="text-white font-display uppercase" style={{ fontSize: 11, letterSpacing: "0.28em" }}>
              KJAPP Support
            </div>
            <div className="text-white/50 mt-0.5" style={{ fontSize: 10 }}>
              Få hjelp med tur, betaling og trygghet
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
          paddingBottom: "calc(max(env(safe-area-inset-bottom), 16px) + 88px)",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-y",
        }}
      >
        <div className="space-y-3 pb-2">

          {/* AI identity */}
          <div className="flex items-center gap-2.5 px-1 mb-1">
            <AuroraOrb size={28} />
            <div>
              <div className="text-white font-display" style={{ fontSize: 12 }}>KJAPP Support AI</div>
              <div className="text-white/50" style={{ fontSize: 10 }}>Tilgjengelig 24/7</div>
            </div>
          </div>

          {/* Chat messages */}
          <div className="space-y-2">
            {msgs.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="max-w-[82%] rounded-2xl px-4 py-2.5"
                  style={{
                    background:
                      msg.from === "user"
                        ? "var(--aurora-gradient)"
                        : "rgba(255,255,255,0.07)",
                    color: msg.from === "user" ? "#05060f" : "rgba(255,255,255,0.9)",
                    fontSize: 13,
                    lineHeight: 1.45,
                  }}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}

            {/* Thinking indicator */}
            {thinking && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div
                  className="rounded-2xl px-4 py-2.5 flex items-center gap-1"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: "var(--aurora-cyan)" }}
                      initial={{ opacity: 0.3 }}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.22 }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Action cards from last AI reply */}
            {!thinking && lastActions.length > 0 && !escalated && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-1.5 pl-1"
              >
                {lastActions.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => handleAction(action)}
                    className="w-full glass-panel rounded-xl px-3.5 py-2.5 flex items-center justify-between text-left active:scale-[0.99] transition"
                  >
                    <span className="text-white" style={{ fontSize: 12 }}>{action.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-white/40 shrink-0" />
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Emergency safety block */}
          <AnimatePresence>
            {emergency && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl p-4"
                style={{
                  background: "rgba(255,122,122,0.10)",
                  border: "1px solid rgba(255,122,122,0.28)",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <ShieldAlert className="w-4 h-4 text-[#ff7a7a]" />
                  <span className="text-[#ff7a7a] font-display uppercase" style={{ fontSize: 10, letterSpacing: "0.16em" }}>
                    Akutt fare
                  </span>
                </div>
                <div className="text-white" style={{ fontSize: 13, lineHeight: 1.4 }}>
                  Ring nødhjelp umiddelbart.
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    className="flex-1 rounded-xl h-10 flex items-center justify-center gap-2"
                    style={{ background: "#ff3b30" }}
                  >
                    <Phone className="w-3.5 h-3.5 text-white" />
                    <span className="text-white font-display" style={{ fontSize: 11, letterSpacing: "0.08em" }}>
                      112
                    </span>
                  </button>
                  <button
                    className="flex-1 rounded-xl h-10 flex items-center justify-center glass-panel"
                  >
                    <span className="text-white" style={{ fontSize: 11 }}>Kontakt KJAPP Support</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Escalated case card */}
          <AnimatePresence>
            {escalated && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <GlassPanel holo glow className="rounded-3xl p-5 relative overflow-hidden">
                  <motion.div
                    className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl pointer-events-none"
                    style={{ background: "var(--aurora-gradient)", opacity: 0.22 }}
                  />
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle2 className="w-4 h-4 text-[var(--aurora-cyan)]" />
                      <span className="text-[var(--aurora-cyan)] font-display uppercase" style={{ fontSize: 10, letterSpacing: "0.16em" }}>
                        Saken er sendt til KJAPP support
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-display" style={{ fontSize: 15 }}>
                          Sak #{CASE_ID}
                        </span>
                        <span
                          className="px-2 py-0.5 rounded-full font-mono"
                          style={{ background: "rgba(255,122,122,0.18)", color: "#ff7a7a", fontSize: 9, letterSpacing: "0.12em" }}
                        >
                          KRITISK
                        </span>
                      </div>

                      {[
                        ["Tur-ID", TOUR_ID],
                        ["Kunde", "Mathilde"],
                        ["Kategori", "Turproblem / Betaling"],
                        ["Prioritet", "Kritisk"],
                        ["AI-sammendrag", "Kunde rapporterte problem etter tur — eskalert automatisk."],
                      ].map(([label, value]) => (
                        <div key={label} className="flex items-start gap-2 glass-panel rounded-xl px-3 py-2">
                          <span
                            className="text-white/55 font-mono uppercase shrink-0"
                            style={{ fontSize: 9, letterSpacing: "0.12em", marginTop: 1 }}
                          >
                            {label}
                          </span>
                          <span className="text-white/85 ml-auto text-right" style={{ fontSize: 11, lineHeight: 1.35 }}>
                            {value}
                          </span>
                        </div>
                      ))}

                      <div className="glass-panel rounded-xl px-3 py-2 flex items-center justify-between">
                        <span
                          className="text-white/55 font-mono uppercase"
                          style={{ fontSize: 9, letterSpacing: "0.12em" }}
                        >
                          Status
                        </span>
                        <span className="text-white/85" style={{ fontSize: 11 }}>
                          Venter på behandling
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => go("support-inbox")}
                      className="w-full mt-3 glass-panel rounded-xl px-4 py-2.5 flex items-center justify-between active:scale-[0.99] transition"
                    >
                      <span className="text-white/75" style={{ fontSize: 12 }}>Se alle saker (Support Inbox)</span>
                      <ChevronRight className="w-3.5 h-3.5 text-white/40" />
                    </button>
                  </div>
                </GlassPanel>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Categories — show only before any user input */}
          {msgs.length < 2 && (
            <div>
              <div
                className="text-white/55 font-display uppercase px-1 mb-2"
                style={{ fontSize: 10, letterSpacing: "0.22em" }}
              >
                Velg kategori
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategory(cat.id)}
                    className="glass-panel rounded-xl px-3 py-2.5 flex items-center gap-2 text-left active:scale-[0.99] transition"
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: cat.color, color: cat.textColor }}
                    >
                      {cat.icon}
                    </div>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.85)" }}>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Fixed input bar */}
      <div
        className="absolute left-0 right-0 bottom-0 px-4"
        style={{
          paddingBottom: "max(env(safe-area-inset-bottom), 16px)",
          paddingTop: 12,
          background: "linear-gradient(to top, rgba(5,6,15,0.97) 60%, transparent)",
        }}
      >
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") sendMsg(input); }}
            placeholder="Beskriv problemet ditt…"
            className="flex-1 rounded-xl px-4 py-3 outline-none"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.10)",
              fontSize: 13,
              color: "rgba(255,255,255,0.9)",
            }}
          />
          <button
            onClick={() => sendMsg(input)}
            disabled={!input.trim() || thinking}
            className="w-12 h-12 rounded-xl flex items-center justify-center active:scale-95 transition disabled:opacity-35"
            style={{ background: "var(--aurora-gradient)" }}
          >
            <Send className="w-4 h-4 text-[#05060f]" />
          </button>
        </div>
      </div>
    </div>
  );
}
