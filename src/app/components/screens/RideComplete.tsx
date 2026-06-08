import { motion } from "motion/react";
import { useState } from "react";
import { Star, Check, Leaf, Receipt, Users } from "lucide-react";
import { HolographicBackground } from "../HolographicBackground";
import { GlassPanel } from "../GlassPanel";
import { AuroraOrb } from "../AuroraOrb";
import { AuroraMemoryCard } from "../AuroraMemoryCard";
import { SplitPaymentSheet } from "../SplitPaymentSheet";
import { TopBar } from "../TopBar";
import type { Screen } from "../../App";

export function RideComplete({ go }: { go: (s: Screen) => void }) {
  const [rating, setRating] = useState(5);
  const [splitOpen, setSplitOpen] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <HolographicBackground intensity={0.55} />
      <SplitPaymentSheet open={splitOpen} onClose={() => setSplitOpen(false)} total={181} />

      <div
        className="relative h-full flex flex-col px-5 pt-2 overflow-y-auto"
        style={{ paddingBottom: "calc(24px + env(safe-area-inset-bottom))" }}
      >
        <TopBar onBack={() => go("home")} variant="close" title="TUR FULLFØRT" />
      <div className="flex flex-col items-center text-center pt-2">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 140, damping: 14 }}
          className="w-20 h-20 rounded-full flex items-center justify-center mt-2"
          style={{ background: "var(--aurora-gradient)" }}
        >
          <Check className="w-10 h-10 text-[#05060f]" strokeWidth={3} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-5 text-white font-display text-[1.6rem]"
        >
          Du er fremme.
        </motion.h2>
        <p className="text-white/55 text-[12px] mt-1">Maaemo · Schweigaards gate 15</p>

        {/* Receipt */}
        <GlassPanel holo className="w-full mt-6 p-4 text-left">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/70 text-[10px] font-mono tracking-wider">KVITTERING</span>
            <button className="flex items-center gap-1 text-[var(--aurora-cyan)] text-[10px] font-mono tracking-wider">
              <Receipt className="w-3 h-3" /> SEND TIL SKATT
            </button>
          </div>
          <Row label="Tur Grünerløkka → Maaemo" value="189 kr" />
          <Row label="Bompenger" value="22 kr" />
          <Row label="Kjapp-optimering" value="−18 kr" highlight />
          <Row label="Kjapp+ medlem" value="−12 kr" highlight />
          <div className="h-px bg-white/10 my-2" />
          <Row label="Totalt inkl. mva" value="181 kr" bold />
          <Row label="Betalt med Vipps" value="••8421" muted />
          <button
            onClick={() => setSplitOpen(true)}
            className="mt-3 w-full rounded-xl py-2.5 flex items-center justify-center gap-2 text-white text-[11px] font-display tracking-wide"
            style={{ background: "linear-gradient(135deg, rgba(255,138,92,0.18) 0%, rgba(255,91,36,0.18) 100%)",
                     boxShadow: "inset 0 0 0 1px rgba(255,91,36,0.45)" }}
          >
            <Users className="w-3.5 h-3.5" /> SPLITT MED VENNER · VIPPS
          </button>
        </GlassPanel>

        {/* Aurora-minner */}
        <div className="w-full mt-4">
          <AuroraMemoryCard />
        </div>

        {/* Climate badge */}
        <GlassPanel className="w-full mt-3 p-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
               style={{ background: "rgba(74,222,128,0.18)" }}>
            <Leaf className="w-4 h-4 text-[var(--aurora-mint)]" />
          </div>
          <div className="flex-1 text-left">
            <div className="text-white text-[12px]">Helelektrisk tur · 0 g CO₂</div>
            <div className="text-white/65 text-[11px]">Du har spart 2,4 kg CO₂ denne måneden</div>
          </div>
        </GlassPanel>

        {/* Rating */}
        <GlassPanel className="w-full mt-3 p-4 flex items-center gap-3">
          <AuroraOrb size={36} />
          <div className="flex-1 text-left">
            <div className="text-white text-[12px]">Hvordan var Jonas?</div>
            <div className="flex gap-1 mt-1.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setRating(n)}
                  className="w-9 h-9 flex items-center justify-center active:scale-90 transition"
                  aria-label={`${n} stjerner`}
                >
                  <Star
                    className={`w-6 h-6 ${n <= rating ? "fill-[var(--aurora-cyan)] text-[var(--aurora-cyan)]" : "text-white/25"}`}
                  />
                </button>
              ))}
            </div>
          </div>
        </GlassPanel>

        <div className="flex-1" />

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => go("home")}
          className="mb-4 w-full relative rounded-2xl h-14 overflow-hidden"
        >
          <div className="absolute inset-0" style={{ background: "var(--aurora-gradient)" }} />
          <div className="relative h-full flex items-center justify-center text-[#05060f] font-display tracking-wider">
            FERDIG
          </div>
        </motion.button>
      </div>
      </div>
    </div>
  );
}

function Row({ label, value, bold, muted, highlight }: any) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className={`text-[12px] ${muted ? "text-white/40" : "text-white/70"}`}>{label}</span>
      <span
        className={`text-[13px] ${
          highlight ? "text-[var(--aurora-mint)]" : muted ? "text-white/40" : "text-white"
        } ${bold ? "font-display" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}
