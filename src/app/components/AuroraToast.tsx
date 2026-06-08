import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Sparkles, X } from "lucide-react";

type ToastProps = {
  message: string;
  cta?: string;
  onAction?: () => void;
  onDismiss?: () => void;
  delay?: number;
  duration?: number;
};

export function AuroraToast({ message, cta, onAction, onDismiss, delay = 3500, duration = 9000 }: ToastProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setOpen(true), delay);
    const t2 = setTimeout(() => setOpen(false), delay + duration);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [delay, duration]);

  const close = () => { setOpen(false); onDismiss?.(); };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: -40, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -40, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className="absolute left-4 right-4 top-28 z-50"
        >
          <div className="glass-panel holo-border rounded-2xl p-3 flex items-start gap-3 backdrop-blur-xl"
               style={{ boxShadow: "var(--aurora-glow-soft)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                 style={{ background: "var(--aurora-gradient)" }}>
              <Sparkles className="w-4 h-4 text-[#05060f]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white/65 text-[9px] font-mono tracking-wider mb-0.5">AURORA · PROAKTIV</div>
              <div className="text-white text-[12px] leading-snug">{message}</div>
              {cta && (
                <button
                  onClick={() => { onAction?.(); close(); }}
                  className="mt-2 text-[var(--aurora-cyan)] text-[11px] font-display tracking-wide"
                >
                  {cta} →
                </button>
              )}
            </div>
            <button onClick={close} aria-label="Lukk" className="text-white/50 hover:text-white/80">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
