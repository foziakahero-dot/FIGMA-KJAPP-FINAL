import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { X, Copy, Check, MessageSquare, MessageCircle, AlertTriangle } from "lucide-react";
import { driver } from "../data/mockData";

const SHARE_URL = "kjapp.no/t/aurora-9k2x";

export function ShareTripSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try { await navigator.clipboard?.writeText("https://" + SHARE_URL); } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
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
                className="absolute -top-20 left-1/2 -translate-x-1/2 w-60 h-60 rounded-full blur-3xl pointer-events-none"
                style={{ background: "var(--aurora-gradient)", opacity: 0.22 }}
              />

              <div className="relative flex items-start justify-between mb-4">
                <div>
                  <div className="text-[var(--aurora-cyan)] text-[10px] font-mono tracking-[0.22em]">SIKKERHET</div>
                  <div className="text-white font-display mt-0.5" style={{ fontSize: "20px", letterSpacing: "-0.01em" }}>
                    Del reisen
                  </div>
                  <div className="text-white/65 text-[12px] mt-0.5">
                    Send ETA, sjåfør og bilinfo trygt til noen du stoler på.
                  </div>
                </div>
                <button onClick={onClose} aria-label="Lukk"
                        className="w-9 h-9 rounded-full glass-panel flex items-center justify-center">
                  <X className="w-4 h-4 text-white/80" />
                </button>
              </div>

              {/* Mini-preview "live-prikk" */}
              <div className="relative h-24 rounded-2xl overflow-hidden mb-4"
                   style={{ background: "radial-gradient(ellipse at center, rgba(94,240,255,0.18) 0%, rgba(5,6,15,0.4) 70%)",
                            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)" }}>
                <svg className="absolute inset-0 w-full h-full opacity-50">
                  <defs>
                    <pattern id="gridShare" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(94,240,255,0.18)" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#gridShare)" />
                </svg>
                <motion.div
                  className="absolute left-1/4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                  style={{ background: "var(--aurora-cyan)", boxShadow: "0 0 24px var(--aurora-cyan)" }}
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                />
                <motion.div
                  className="absolute right-1/4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                  style={{ background: "var(--aurora-magenta)", boxShadow: "0 0 24px var(--aurora-magenta)" }}
                />
                <div className="absolute left-3 bottom-2 text-[9px] font-mono text-white/70 tracking-wider">DEG</div>
                <div className="absolute right-3 bottom-2 text-[9px] font-mono text-white/70 tracking-wider">MÅL</div>
              </div>

              {/* Link */}
              <div className="glass-panel rounded-2xl px-3 py-3 flex items-center gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="text-white/55 text-[9px] font-mono tracking-wider">LENKE · GYLDIG TIL ANKOMST</div>
                  <div className="text-white text-[12px] font-mono truncate">{SHARE_URL}</div>
                </div>
                <motion.button whileTap={{ scale: 0.94 }} onClick={copy}
                  className="px-3 py-2 rounded-xl flex items-center gap-1.5 text-[#05060f] text-[11px] font-display tracking-wide"
                  style={{ background: "var(--aurora-gradient)" }}>
                  {copied ? <><Check className="w-3.5 h-3.5" /> KOPIERT</> : <><Copy className="w-3.5 h-3.5" /> KOPIER</>}
                </motion.button>
              </div>

              {/* Quick share */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <ShareChip icon={<MessageSquare className="w-4 h-4" />} label="SMS" />
                <ShareChip icon={<MessageCircle className="w-4 h-4" />} label="WhatsApp" />
                <ShareChip icon={<Copy className="w-4 h-4" />} label="Kopier lenke" onClick={copy} />
              </div>

              {/* Trip facts */}
              <div className="glass-panel rounded-2xl p-3 mb-4">
                <div className="text-white/55 text-[9px] font-mono tracking-wider mb-1.5">FORHÅNDSVISNING</div>
                <ul className="text-white/85 text-[12px] space-y-1">
                  <li>Mathilde er på vei med KJAPP.</li>
                  <li>Sjåfør: <span className="text-white">{driver.name}</span></li>
                  <li>Bil: <span className="text-white">{driver.car}</span></li>
                  <li>ETA: <span className="text-white">8 min</span></li>
                  <li>Turstatus: <span className="text-white">På vei</span></li>
                </ul>
              </div>

              {/* SOS */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                aria-label="Send nødvarsel"
                className="w-full rounded-2xl py-3 flex items-center justify-center gap-2 text-white relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, #ff4d6d 0%, #c70039 100%)" }}
              >
                <AlertTriangle className="w-4 h-4" />
                <span className="font-display tracking-[0.18em] text-[12px]">SOS · NØDVARSEL</span>
              </motion.button>
              <div className="text-center text-white/45 text-[10px] mt-2 font-mono">
                Sender posisjon til 112 og nødkontakten din
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function ShareChip({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="glass-panel rounded-xl py-2.5 flex flex-col items-center gap-1 text-white/80 active:scale-95 transition"
    >
      {icon}
      <span className="text-[10px]">{label}</span>
    </button>
  );
}
