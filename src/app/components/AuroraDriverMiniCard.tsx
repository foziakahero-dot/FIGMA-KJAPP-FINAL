import { useState } from "react";
import { motion } from "motion/react";
import { Activity, Navigation } from "lucide-react";
import { GlassPanel } from "./GlassPanel";
import { NavAppPicker } from "./NavAppPicker";
import type { Screen } from "../App";

export function AuroraDriverMiniCard({
  message,
  go,
  navAddress,
  navLabel,
}: {
  message: string;
  go: (s: Screen) => void;
  navAddress?: string;
  navLabel?: string;
}) {
  const [navPickerOpen, setNavPickerOpen] = useState(false);

  return (
    <div className="relative">
      <GlassPanel
        className="rounded-2xl p-3.5 relative overflow-hidden"
        style={{ border: "1px solid rgba(94,240,255,0.18)" }}
      >
        <div className="flex items-start gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
            style={{ background: "rgba(94,240,255,0.12)" }}
          >
            <Activity className="w-3.5 h-3.5 text-[var(--aurora-cyan)]" />
          </div>
          <div className="flex-1 min-w-0">
            <div
              className="text-white/50 font-mono uppercase mb-1"
              style={{ fontSize: 8, letterSpacing: "0.16em" }}
            >
              Aurora Driver
            </div>
            <div className="text-white/90" style={{ fontSize: 12, lineHeight: 1.45 }}>
              {message}
            </div>
            <div className="mt-2.5 flex gap-2 flex-wrap">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => go("driver-aurora-chat")}
                className="rounded-lg px-3 py-1.5"
                style={{
                  background: "rgba(94,240,255,0.12)",
                  border: "1px solid rgba(94,240,255,0.22)",
                }}
              >
                <span
                  className="text-[var(--aurora-cyan)] font-display"
                  style={{ fontSize: 10, letterSpacing: "0.06em" }}
                >
                  Åpne Aurora Driver
                </span>
              </motion.button>
              {navAddress && (
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setNavPickerOpen(true)}
                  className="rounded-lg px-3 py-1.5 flex items-center gap-1.5"
                  style={{
                    background: "rgba(160,107,255,0.12)",
                    border: "1px solid rgba(160,107,255,0.22)",
                  }}
                >
                  <Navigation className="w-3 h-3 text-[var(--aurora-violet)]" />
                  <span
                    className="text-[var(--aurora-violet)] font-display"
                    style={{ fontSize: 10, letterSpacing: "0.06em" }}
                  >
                    {navLabel ?? "Åpne navigasjon"}
                  </span>
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </GlassPanel>

      {navAddress && (
        <NavAppPicker
          open={navPickerOpen}
          onClose={() => setNavPickerOpen(false)}
          address={navAddress}
        />
      )}
    </div>
  );
}
