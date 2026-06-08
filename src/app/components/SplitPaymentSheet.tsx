import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { X, Check, Plus, Send } from "lucide-react";

const friends = [
  { id: "f1", name: "Ingrid Solberg",  handle: "@ingrid",  initial: "I" },
  { id: "f2", name: "Mathias Hagen",    handle: "@matti",   initial: "M" },
  { id: "f3", name: "Sofie Kvam",       handle: "@sofie",   initial: "S" },
  { id: "f4", name: "Nora Lien",        handle: "@nora",    initial: "N" },
];

export function SplitPaymentSheet({ open, onClose, total = 181 }: { open: boolean; onClose: () => void; total?: number }) {
  const [selected, setSelected] = useState<string[]>(["f1", "f2"]);
  const [sent, setSent] = useState(false);

  const toggle = (id: string) =>
    setSelected((xs) => (xs.includes(id) ? xs.filter((x) => x !== id) : [...xs, id]));

  const splitN = selected.length + 1;
  const perPerson = (total / splitN).toFixed(0);

  const send = () => {
    setSent(true);
    setTimeout(() => { setSent(false); onClose(); }, 1600);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 z-40 bg-[#05060f]/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="absolute left-0 right-0 bottom-0 z-50 px-4 pb-6"
          >
            <div className="glass-panel holo-border rounded-3xl p-5 relative overflow-hidden">
              <motion.div
                className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl pointer-events-none"
                style={{ background: "#ff5b24", opacity: 0.22 }}
              />

              <div className="relative flex items-start justify-between mb-4">
                <div>
                  <div className="text-[#ff8a5c] text-[10px] font-mono tracking-[0.22em]">VIPPS · SPLITT</div>
                  <div className="text-white font-display mt-0.5" style={{ fontSize: "20px", letterSpacing: "-0.01em" }}>
                    Splitt regningen
                  </div>
                  <div className="text-white/65 text-[12px] mt-0.5">
                    Vipps-forespørsel sendes til hver venn — du betaler din andel.
                  </div>
                </div>
                <button onClick={onClose} aria-label="Lukk"
                        className="w-9 h-9 rounded-full glass-panel flex items-center justify-center">
                  <X className="w-4 h-4 text-white/80" />
                </button>
              </div>

              {/* Total breakdown */}
              <div className="relative glass-panel rounded-2xl p-3 mb-3">
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-white/65">Totalt tur</span>
                  <span className="text-white font-display">{total} kr</span>
                </div>
                <div className="h-px bg-white/10 my-2" />
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-white">Per person ({splitN})</span>
                  <span className="text-[var(--aurora-cyan)] font-display" style={{ fontSize: "20px" }}>
                    {perPerson} kr
                  </span>
                </div>
              </div>

              {/* Friend chips */}
              <div className="relative mb-1 flex items-center justify-between">
                <span className="text-white/70 text-[10px] font-mono tracking-wider">VENNER I BILEN</span>
                <button className="flex items-center gap-1 text-[var(--aurora-cyan)] text-[10px] font-mono">
                  <Plus className="w-3 h-3" /> LEGG TIL
                </button>
              </div>
              <div className="relative space-y-1.5 mb-4">
                {friends.map((f) => {
                  const on = selected.includes(f.id);
                  return (
                    <button
                      key={f.id}
                      onClick={() => toggle(f.id)}
                      aria-pressed={on}
                      className={`w-full flex items-center gap-3 rounded-xl p-2 text-left transition ${on ? "" : "glass-panel"}`}
                      style={on
                        ? { background: "rgba(94,240,255,0.10)", boxShadow: "inset 0 0 0 1px rgba(94,240,255,0.45)" }
                        : undefined}
                    >
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[12px] font-display"
                           style={{ background: on ? "var(--aurora-gradient)" : "rgba(255,255,255,0.06)" }}>
                        {f.initial}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-[12px]">{f.name}</div>
                        <div className="text-white/55 text-[10px] font-mono">{f.handle}</div>
                      </div>
                      {on && (
                        <div className="w-6 h-6 rounded-full flex items-center justify-center"
                             style={{ background: "var(--aurora-gradient)" }}>
                          <Check className="w-3 h-3 text-[#05060f]" strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* CTA */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={send}
                disabled={selected.length === 0 || sent}
                className="w-full rounded-2xl h-14 relative overflow-hidden disabled:opacity-50"
                style={{ background: "linear-gradient(135deg, #ff8a5c 0%, #ff5b24 100%)" }}
              >
                <div className="relative h-full flex items-center justify-center gap-2 text-white font-display tracking-[0.18em]">
                  {sent ? (
                    <>
                      <Check className="w-4 h-4" /> SENDT TIL {selected.length} VENNER
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> SEND VIPPS · {selected.length} ×&nbsp;{perPerson} KR
                    </>
                  )}
                </div>
              </motion.button>
              <div className="text-center text-white/45 text-[10px] mt-2 font-mono">
                Du betaler din andel ({perPerson} kr) selv
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
