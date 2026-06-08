import { AnimatePresence, motion } from "motion/react";
import { X, Send } from "lucide-react";
import { useState } from "react";
import { GlassPanel } from "./GlassPanel";

const CUSTOMER_QUICK = [
  "Jeg kommer ut nå",
  "Jeg står ved hovedinngangen",
  "Kan du vente 2 minutter?",
  "Jeg har bagasje",
  "Ring meg",
];

const DRIVER_QUICK = [
  "Jeg er fremme",
  "Jeg står utenfor",
  "Jeg er 2 minutter unna",
  "Jeg finner deg ikke",
  "Vennligst kom til hentestedet",
];

export function TripMessagingSheet({
  open,
  onClose,
  role,
}: {
  open: boolean;
  onClose: () => void;
  role: "customer" | "driver";
}) {
  const [input, setInput] = useState("");
  const [sent, setSent] = useState<string | null>(null);

  const quick = role === "customer" ? CUSTOMER_QUICK : DRIVER_QUICK;

  const handleSend = (msg: string) => {
    setSent(msg);
    setInput("");
    setTimeout(() => {
      setSent(null);
      onClose();
    }, 1600);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="absolute inset-0 z-40"
            style={{ background: "rgba(5,6,15,0.72)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="absolute left-0 right-0 z-50 px-4"
            style={{
              bottom: 0,
              paddingBottom: "max(env(safe-area-inset-bottom), 20px)",
            }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
          >
            <GlassPanel className="rounded-3xl p-5">
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-white font-display uppercase"
                  style={{ fontSize: 11, letterSpacing: "0.28em" }}
                >
                  Melding
                </span>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full glass-panel flex items-center justify-center active:scale-95 transition"
                >
                  <X className="w-3.5 h-3.5 text-white/70" />
                </button>
              </div>

              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-6 text-center"
                  >
                    <div
                      className="text-[var(--aurora-cyan)] font-display mb-1.5"
                      style={{ fontSize: 14 }}
                    >
                      Melding sendt
                    </div>
                    <div className="text-white/55" style={{ fontSize: 12 }}>
                      "{sent}"
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="compose"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="space-y-1.5 mb-4">
                      {quick.map((msg) => (
                        <button
                          key={msg}
                          onClick={() => handleSend(msg)}
                          className="w-full glass-panel rounded-xl px-4 py-2.5 text-left active:scale-[0.99] transition"
                          style={{ fontSize: 13, color: "rgba(255,255,255,0.88)" }}
                        >
                          {msg}
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && input.trim()) handleSend(input.trim());
                        }}
                        placeholder="Skriv melding…"
                        className="flex-1 rounded-xl px-4 py-2.5 outline-none"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.09)",
                          fontSize: 13,
                          color: "rgba(255,255,255,0.9)",
                        }}
                      />
                      <button
                        onClick={() => { if (input.trim()) handleSend(input.trim()); }}
                        disabled={!input.trim()}
                        className="w-11 h-11 rounded-xl flex items-center justify-center active:scale-95 transition disabled:opacity-35"
                        style={{ background: "var(--aurora-gradient)" }}
                      >
                        <Send className="w-4 h-4 text-[#05060f]" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassPanel>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
