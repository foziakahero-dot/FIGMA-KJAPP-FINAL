import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Send, Phone, MapPin, Clock, Check, CheckCheck } from "lucide-react";
import { HolographicBackground } from "../HolographicBackground";
import { DriverBackground } from "../DriverBackground";
import { GlassPanel } from "../GlassPanel";
import { TopBar } from "../TopBar";
import { user as customer, driver } from "../../data/mockData";
import type { Screen } from "../../App";

type Sender = "me" | "them";
type Msg = {
  id: string;
  from: Sender;
  text?: string;
  template?: "near" | "outside" | "running-late" | "pickup-spot";
  ts: string;
  status: "sent" | "delivered" | "read";
};

type Props = {
  go: (s: Screen) => void;
  role: "customer" | "driver"; // hvem snakker
};

const driverTemplates: { id: Msg["template"]; label: string; text: string }[] = [
  { id: "near", label: "1 min unna", text: "Hei! Jeg er 1 min unna." },
  { id: "outside", label: "Står utenfor", text: "Står utenfor — Mercedes EQS, midnattsblå, EK 41209." },
  { id: "running-late", label: "Forsinket 2 min", text: "Beklager — 2 min forsinket grunnet trafikk." },
  { id: "pickup-spot", label: "Hvor møtes?", text: "Hvor er det enklest å plukke deg opp?" },
];

const customerTemplates: { id: Msg["template"]; label: string; text: string }[] = [
  { id: "near", label: "Kommer ned", text: "Jeg kommer ned nå." },
  { id: "outside", label: "Står ute", text: "Jeg står utenfor inngangen." },
  { id: "running-late", label: "Trenger 2 min", text: "Trenger 2 minutter til." },
  { id: "pickup-spot", label: "Annet sted", text: "Kan du møte meg på hjørnet?" },
];

const now = () => new Date().toLocaleTimeString("nb-NO", { hour: "2-digit", minute: "2-digit" });

export function RideChat({ go, role }: Props) {
  const isDriver = role === "driver";
  const counterparty = isDriver
    ? { name: customer.name, initial: customer.initial, sub: "Kunde · Kjapp+" }
    : { name: driver.name, initial: driver.name[0], sub: `${driver.car} · ${driver.plate}` };
  const templates = isDriver ? driverTemplates : customerTemplates;
  const backScreen: Screen = isDriver ? "driver-ride" : "track";

  const [msgs, setMsgs] = useState<Msg[]>(() => isDriver
    ? [
        { id: "m1", from: "me", text: "Hei! Jeg er 3 min unna.", ts: now(), status: "read" },
        { id: "m2", from: "them", text: "Perfekt, jeg kommer ned.", ts: now(), status: "read" },
      ]
    : [
        { id: "m1", from: "them", text: "Hei! Jeg er 3 min unna.", ts: now(), status: "read" },
        { id: "m2", from: "me", text: "Perfekt, jeg kommer ned.", ts: now(), status: "read" },
      ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  const send = (text: string, template?: Msg["template"]) => {
    if (!text.trim()) return;
    const id = crypto.randomUUID();
    setMsgs((m) => [...m, { id, from: "me", text, template, ts: now(), status: "sent" }]);
    setInput("");
    // Simulate delivered → read
    setTimeout(() => setMsgs((m) => m.map((x) => x.id === id ? { ...x, status: "delivered" } : x)), 450);
    setTimeout(() => setMsgs((m) => m.map((x) => x.id === id ? { ...x, status: "read" } : x)), 1400);
    // Auto-svar fra motpart
    setTimeout(() => setTyping(true), 1700);
    setTimeout(() => {
      setTyping(false);
      const autoReply = isDriver
        ? "Tusen takk, jeg står utenfor."
        : "Bra! Jeg ser deg snart.";
      setMsgs((m) => [...m, { id: crypto.randomUUID(), from: "them", text: autoReply, ts: now(), status: "read" }]);
    }, 3400);
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {isDriver ? <DriverBackground intensity={0.7} /> : <HolographicBackground intensity={0.7} />}

      <div className="relative h-full flex flex-col px-5 pt-2">
        <TopBar
          onBack={() => go(backScreen)}
          title={counterparty.name.toUpperCase()}
          subtitle={counterparty.sub}
          right={
            <a href="tel:+4722000000"
               aria-label="Ring"
               className="w-11 h-11 rounded-full glass-panel flex items-center justify-center active:scale-95 transition"
               style={isDriver ? { boxShadow: "inset 0 0 0 1px rgba(255,181,71,0.35)" } : {}}>
              <Phone className="w-4 h-4" strokeWidth={1.75}
                     style={{ color: isDriver ? "#ffb547" : "var(--aurora-cyan)" }} />
            </a>
          }
        />

        {/* Ride context strip */}
        <GlassPanel className="mt-3 p-3 flex items-center gap-3"
                    style={isDriver ? { boxShadow: "inset 0 0 0 1px rgba(255,181,71,0.25)" } : {}}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
               style={{ background: isDriver ? "rgba(255,181,71,0.18)" : "rgba(94,240,255,0.15)" }}>
            <MapPin className="w-4 h-4" strokeWidth={1.75}
                    style={{ color: isDriver ? "#ffb547" : "var(--aurora-cyan)" }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-[12px] truncate">
              {isDriver ? "Thorvald Meyers gate 41" : "Mercedes EQS · EK 41209"}
            </div>
            <div className="text-white/60 text-[10px] flex items-center gap-1">
              <Clock className="w-2.5 h-2.5" strokeWidth={1.75} />
              ETA 3 min · midnattsblå
            </div>
          </div>
          <button
            onClick={() => go(backScreen)}
            className="text-[10px] font-display tracking-wider px-2.5 py-1.5 rounded-full"
            style={isDriver
              ? { background: "var(--kjapp-amber-gradient)", color: "#1a1206" }
              : { background: "var(--aurora-gradient)", color: "#05060f" }}
          >
            SE TUR
          </button>
        </GlassPanel>

        {/* Messages */}
        <div ref={listRef} className="flex-1 mt-3 -mx-1 px-1 overflow-y-auto space-y-2 pb-2">
          <AnimatePresence initial={false}>
            {msgs.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[78%] rounded-2xl px-3 py-2 ${m.from === "me" ? "" : "glass-panel"}`}
                     style={m.from === "me"
                       ? (isDriver
                          ? { background: "var(--kjapp-amber-gradient)", color: "#1a1206" }
                          : { background: "var(--aurora-gradient)", color: "#05060f" })
                       : undefined}>
                  <div className="text-[13px] leading-snug">{m.text}</div>
                  <div className={`flex items-center gap-1 mt-1 text-[9px] font-mono ${m.from === "me" ? "opacity-70" : "text-white/55"}`}>
                    {m.ts}
                    {m.from === "me" && (
                      m.status === "sent" ? <Check className="w-2.5 h-2.5" strokeWidth={2.5} /> :
                      m.status === "delivered" ? <CheckCheck className="w-2.5 h-2.5" strokeWidth={2.5} /> :
                      <CheckCheck className="w-2.5 h-2.5" strokeWidth={2.5}
                                  style={{ color: isDriver ? "#fff" : "#5ef0ff" }} />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {typing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="glass-panel rounded-2xl px-3 py-2.5 flex items-center gap-1">
                <Dot delay={0} /><Dot delay={0.15} /><Dot delay={0.3} />
              </div>
            </motion.div>
          )}
        </div>

        {/* Quick templates */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-none">
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => send(t.text, t.id)}
              className="glass-panel rounded-full px-3 py-1.5 text-white/85 text-[11px] whitespace-nowrap"
              style={isDriver ? { boxShadow: "inset 0 0 0 1px rgba(255,181,71,0.3)" } : { boxShadow: "inset 0 0 0 1px rgba(94,240,255,0.3)" }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="pb-4 pt-2">
          <GlassPanel className="rounded-full pl-4 pr-1.5 py-1.5 flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder="Skriv en melding…"
              className="flex-1 bg-transparent outline-none text-white text-[13px] placeholder:text-white/45"
            />
            <button
              onClick={() => send(input)}
              aria-label="Send"
              disabled={!input.trim()}
              className="w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-45"
              style={{ background: isDriver ? "var(--kjapp-amber-gradient)" : "var(--aurora-gradient)" }}
            >
              <Send className="w-4 h-4" strokeWidth={2} style={{ color: isDriver ? "#1a1206" : "#05060f" }} />
            </button>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <motion.span
      className="w-1.5 h-1.5 rounded-full bg-white/70 inline-block"
      initial={{ y: 0, opacity: 0.4 }}
      animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 1, repeat: Infinity, delay }}
    />
  );
}
