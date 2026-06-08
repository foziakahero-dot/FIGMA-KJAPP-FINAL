import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { MapPin, Circle, Star, Check, X, Navigation, MessageCircle } from "lucide-react";
import { openExternalMap, getNavApp } from "../../lib/navigation";
import { DriverBackground } from "../DriverBackground";
import { LiveMap } from "../LiveMap";
import { GlassPanel } from "../GlassPanel";
import { AuroraOrb } from "../AuroraOrb";
import { TopBar } from "../TopBar";
import { incomingRide } from "../../data/driverMockData";
import type { Screen } from "../../App";

type Phase = "incoming" | "accepted" | "ontrip" | "done";

export function DriverRide({ go }: { go: (s: Screen) => void }) {
  const [phase, setPhase] = useState<Phase>("incoming");
  const [count, setCount] = useState(incomingRide.countdown);

  useEffect(() => {
    if (phase !== "incoming") return;
    const id = setInterval(() => setCount((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(id);
  }, [phase]);

  const accept = () => setPhase("accepted");
  const startTrip = () => setPhase("ontrip");
  const reject = () => go("driver");

  return (
    <div className="relative w-full h-full overflow-hidden">
      <DriverBackground intensity={0.7} />
      <div className="absolute inset-0">
        <LiveMap
          showRoute={{ from: [10.7585, 59.9241], to: [10.7625, 59.9075] }}
          showCar={phase !== "incoming"}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#050405]/30 via-transparent to-[#050405]" />

      <div className="relative h-full flex flex-col px-5 pt-2">
        <TopBar
          onBack={phase === "incoming" ? reject : () => go("driver")}
          variant={phase === "incoming" ? "close" : "back"}
          title={phase === "incoming" ? "INNKOMMENDE TUR" : phase === "accepted" ? "PÅ VEI TIL KUNDE" : "PÅ TUR"}
          subtitle={phase === "incoming" ? `Auto-avslag om ${count}s` : "Aurora overvåker"}
        />

        <div className="flex-1" />

        {/* Aurora insight */}
        {phase === "incoming" && (
          <GlassPanel className="p-3 mb-3 flex items-center gap-3">
            <AuroraOrb size={32} />
            <p className="flex-1 text-white/85 text-[12px] leading-snug">
              Bra tur. 4-stjerners kunde, retning sentrum — perfekt for neste hot zone.
            </p>
          </GlassPanel>
        )}
        {phase !== "incoming" && (
          <button
            onClick={() => openExternalMap(phase === "accepted" ? incomingRide.pickup : incomingRide.destination)}
            className="mb-2 self-end glass-panel rounded-full px-3 py-1.5 flex items-center gap-2"
            style={{ boxShadow: "inset 0 0 0 1px rgba(255,181,71,0.4)" }}
          >
            <Navigation className="w-3.5 h-3.5 text-[#ffb547]" />
            <span className="text-white text-[11px] font-display tracking-wider">
              ÅPNE I {getNavApp().toUpperCase()} MAPS
            </span>
          </button>
        )}
        {phase === "accepted" && (
          <GlassPanel className="p-3 mb-3 flex items-center gap-3">
            <AuroraOrb size={32} />
            <p className="flex-1 text-white/85 text-[12px] leading-snug">
              Trondheimsveien ledig — jeg har ruta klar. ETA 3 min til pickup.
            </p>
          </GlassPanel>
        )}

        {/* Ride details card */}
        <GlassPanel holo glow className="p-4">
          <AnimatePresence mode="wait">
            {phase === "incoming" && (
              <motion.div
                key="incoming"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white/50 text-[10px] font-mono tracking-wider">UTBETALING</div>
                    <div className="text-white font-display text-[1.8rem] leading-none">
                      {incomingRide.fare} <span className="text-[13px] text-white/60">kr</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white/50 text-[10px] font-mono tracking-wider">DISTANSE</div>
                    <div className="text-white text-[13px]">{incomingRide.distance} · {incomingRide.duration}</div>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <div className="flex flex-col items-center pt-1">
                    <Circle className="w-2.5 h-2.5 text-[#ffb547] fill-[var(--aurora-cyan)]" />
                    <div className="w-px h-7 bg-white/15 my-1" />
                    <MapPin className="w-3 h-3 text-[var(--aurora-magenta)]" />
                  </div>
                  <div className="flex-1 space-y-2.5">
                    <div>
                      <div className="text-white/40 text-[9px] font-mono">PICKUP</div>
                      <div className="text-white text-[12px]">{incomingRide.pickup}</div>
                    </div>
                    <div className="h-px bg-white/10" />
                    <div>
                      <div className="text-white/40 text-[9px] font-mono">LEVERING</div>
                      <div className="text-white text-[12px]">{incomingRide.destination}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[12px] font-display"
                       style={{ background: "var(--kjapp-amber-gradient)" }}>
                    M
                  </div>
                  <div className="flex-1">
                    <div className="text-white text-[12px]">{incomingRide.passenger.name}</div>
                    <div className="flex items-center gap-1 text-white/55 text-[10px]">
                      <Star className="w-2.5 h-2.5 fill-[#ffb547] text-[#ffb547]" strokeWidth={1.5} />
                      {incomingRide.passenger.rating}
                    </div>
                  </div>
                  <button onClick={() => go("driver-chat")} aria-label="Meld kunden"
                          className="w-9 h-9 rounded-full glass-panel flex items-center justify-center"
                          style={{ boxShadow: "inset 0 0 0 1px rgba(255,181,71,0.35)" }}>
                    <MessageCircle className="w-4 h-4 text-[#ffb547]" strokeWidth={2} />
                  </button>
                </div>

                {/* Countdown bar */}
                <div className="mt-4 h-1 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full"
                    style={{ background: "var(--kjapp-amber-gradient)" }}
                    initial={{ width: "100%" }}
                    animate={{ width: `${(count / incomingRide.countdown) * 100}%` }}
                    transition={{ ease: "linear" }}
                  />
                </div>
              </motion.div>
            )}

            {phase !== "incoming" && (
              <motion.div
                key="active"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-display"
                       style={{ background: "var(--kjapp-amber-gradient)" }}>
                    M
                  </div>
                  <div className="flex-1">
                    <div className="text-white text-[14px]">{incomingRide.passenger.name}</div>
                    <div className="text-white/55 text-[11px]">{incomingRide.destination}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-display">{incomingRide.fare} kr</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassPanel>

        {/* Action buttons */}
        <div className="my-4">
          <AnimatePresence mode="wait">
            {phase === "incoming" && (
              <motion.div
                key="actions-in"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex gap-3"
              >
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={reject}
                  className="flex-1 glass-panel h-14 rounded-2xl flex items-center justify-center gap-2 text-white/80"
                >
                  <X className="w-4 h-4" />
                  <span className="font-display tracking-wider text-[12px]">AVSLÅ</span>
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={accept}
                  className="flex-[2] relative h-14 rounded-2xl overflow-hidden"
                  style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
                >
                  <div className="absolute inset-0" style={{ background: "var(--kjapp-amber-gradient)" }} />
                  <div className="relative h-full flex items-center justify-center gap-2 text-[#1a1206] font-display tracking-wider">
                    <Check className="w-5 h-5" strokeWidth={3} />
                    AKSEPTER · {incomingRide.fare} KR
                  </div>
                </motion.button>
              </motion.div>
            )}
            {phase === "accepted" && (
              <motion.button
                key="picked"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileTap={{ scale: 0.97 }}
                onClick={startTrip}
                className="w-full relative h-14 rounded-2xl overflow-hidden"
              >
                <div className="absolute inset-0" style={{ background: "var(--kjapp-amber-gradient)" }} />
                <div className="relative h-full flex items-center justify-center text-[#1a1206] font-display tracking-wider">
                  KUNDE ER I BILEN
                </div>
              </motion.button>
            )}
            {phase === "ontrip" && (
              <motion.button
                key="end"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => go("driver")}
                className="w-full glass-panel holo-border h-14 rounded-2xl flex items-center justify-center text-white font-display tracking-wider"
              >
                AVSLUTT TUR
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
