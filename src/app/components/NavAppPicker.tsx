import { motion, AnimatePresence } from "motion/react";
import { Map } from "lucide-react";

const NAV_APPS = [
  {
    label: "Google Maps",
    color: "#4285F4",
    url: (q: string) => `https://maps.google.com/maps?q=${encodeURIComponent(q)}`,
  },
  {
    label: "Apple Maps",
    color: "#ffffff",
    url: (q: string) => `https://maps.apple.com/?q=${encodeURIComponent(q)}`,
  },
  {
    label: "Waze",
    color: "#33CCFF",
    url: (q: string) => `https://waze.com/ul?q=${encodeURIComponent(q)}`,
  },
];

export function NavAppPicker({
  open,
  onClose,
  address,
}: {
  open: boolean;
  onClose: () => void;
  address: string;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-[100] flex items-end"
          style={{ background: "rgba(0,0,0,0.55)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full glass-panel rounded-t-3xl px-5 pt-4"
            style={{ paddingBottom: "max(env(safe-area-inset-bottom), 24px)" }}
          >
            <div className="flex justify-center mb-4">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>
            <div className="text-center mb-1">
              <div className="text-white font-display" style={{ fontSize: 14 }}>
                Åpne navigasjon
              </div>
            </div>
            <div
              className="text-white/55 text-center mb-5"
              style={{ fontSize: 11 }}
            >
              {address}
            </div>
            <div className="space-y-2">
              {NAV_APPS.map((app) => (
                <motion.button
                  key={app.label}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    window.open(app.url(address), "_blank");
                    onClose();
                  }}
                  className="w-full glass-panel rounded-2xl py-4 flex items-center gap-3 px-4 holo-border"
                >
                  <Map className="w-4 h-4 shrink-0" style={{ color: app.color }} />
                  <span className="text-white font-display" style={{ fontSize: 13 }}>
                    {app.label}
                  </span>
                </motion.button>
              ))}
            </div>
            <button
              onClick={onClose}
              className="w-full mt-4 py-3 text-white/45 text-center"
              style={{ fontSize: 12 }}
            >
              Avbryt
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
