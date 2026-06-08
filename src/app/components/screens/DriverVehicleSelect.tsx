import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, Car, CheckCircle2, Clock, Lock, X } from "lucide-react";
import { HolographicBackground } from "../HolographicBackground";
import { GlassPanel } from "../GlassPanel";
import type { Screen } from "../../App";

type VehicleStatus = "active" | "available" | "unavailable" | "occupied";

const VEHICLES = [
  {
    id: "v1",
    model: "Toyota Corolla",
    plate: "EV 12345",
    year: "2025",
    status: "available" as VehicleStatus,
    statusLabel: "Godkjent",
    reason: null,
  },
  {
    id: "v2",
    model: "Tesla Model Y",
    plate: "EL 88421",
    year: "2024",
    status: "active" as VehicleStatus,
    statusLabel: "Aktiv nå",
    reason: null,
  },
  {
    id: "v3",
    model: "Mercedes EQS",
    plate: "EK 41209",
    year: "2025",
    status: "available" as VehicleStatus,
    statusLabel: "Godkjent",
    reason: null,
  },
  {
    id: "v4",
    model: "Volkswagen ID. Buzz",
    plate: "EL 22017",
    year: "2024",
    status: "unavailable" as VehicleStatus,
    statusLabel: "Ikke tilgjengelig",
    reason: "Venter dokumentgodkjenning",
  },
  {
    id: "v5",
    model: "BMW i7",
    plate: "EK 90021",
    year: "2025",
    status: "occupied" as VehicleStatus,
    statusLabel: "Opptatt",
    reason: "Brukes av annen sjåfør",
  },
];

function statusStyle(s: VehicleStatus) {
  if (s === "active") return { bg: "rgba(94,240,255,0.16)", color: "var(--aurora-cyan)" };
  if (s === "available") return { bg: "rgba(160,107,255,0.16)", color: "var(--aurora-violet)" };
  if (s === "occupied") return { bg: "rgba(255,181,71,0.16)", color: "#ffb547" };
  return { bg: "rgba(255,122,122,0.12)", color: "#ff7a7a" };
}

function isSelectable(s: VehicleStatus) {
  return s === "available";
}

export function DriverVehicleSelect({ go }: { go: (s: Screen) => void }) {
  const [activeId, setActiveId] = useState("v2");
  const [confirmVehicle, setConfirmVehicle] = useState<(typeof VEHICLES)[0] | null>(null);

  const handleSelect = (v: (typeof VEHICLES)[0]) => {
    if (!isSelectable(v.status)) return;
    setConfirmVehicle(v);
  };

  const handleConfirm = () => {
    if (confirmVehicle) setActiveId(confirmVehicle.id);
    setConfirmVehicle(null);
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", maxHeight: "100dvh", scrollbarWidth: "none", overscrollBehavior: "none" }}
    >
      <HolographicBackground intensity={0.85} />

      {/* Header */}
      <div
        className="absolute top-0 left-0 right-0 z-20 px-5"
        style={{ paddingTop: "max(env(safe-area-inset-top), 16px)" }}
      >
        <div className="flex items-center gap-3 py-2">
          <button
            onClick={() => go("driver-profile")}
            aria-label="Tilbake"
            className="w-10 h-10 rounded-full glass-panel flex items-center justify-center active:scale-95 transition shrink-0"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <div className="flex-1 text-center">
            <div className="text-white font-display uppercase" style={{ fontSize: 11, letterSpacing: "0.32em" }}>
              Velg bil
            </div>
          </div>
          <div className="w-10 h-10" />
        </div>
      </div>

      {/* Scrollable content */}
      <div
        className="relative h-full overflow-y-auto px-5"
        style={{
          paddingTop: "calc(max(env(safe-area-inset-top), 16px) + 56px)",
          paddingBottom: "calc(max(env(safe-area-inset-bottom), 16px) + 24px)",
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-y",
          scrollbarWidth: "none",
        }}
      >
        <div className="space-y-3 pb-4">
          {/* Subtitle */}
          <div className="text-white/55 text-center pb-1" style={{ fontSize: 12 }}>
            Du ser kun biler fra din godkjente flåte.
          </div>

          {/* Fleet badge */}
          <div className="flex justify-center">
            <span
              className="px-3 py-1 rounded-full font-mono"
              style={{ background: "rgba(94,240,255,0.12)", color: "var(--aurora-cyan)", fontSize: 9, letterSpacing: "0.16em" }}
            >
              ELITE TRANSPORT AS · KJAPP PILOTFLÅTE
            </span>
          </div>

          {/* Vehicle list */}
          {VEHICLES.map((v) => {
            const style = statusStyle(v.status);
            const active = v.id === activeId;
            const selectable = isSelectable(v.status);

            return (
              <motion.button
                key={v.id}
                whileTap={selectable ? { scale: 0.985 } : {}}
                onClick={() => handleSelect(v)}
                disabled={!selectable && v.status !== "active"}
                className="w-full rounded-2xl p-4 flex items-center gap-3 text-left transition"
                style={{
                  background: active
                    ? "rgba(94,240,255,0.08)"
                    : "rgba(255,255,255,0.04)",
                  border: active
                    ? "1px solid rgba(94,240,255,0.35)"
                    : "1px solid rgba(255,255,255,0.08)",
                  opacity: v.status === "unavailable" || v.status === "occupied" ? 0.6 : 1,
                  cursor: selectable ? "pointer" : "default",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: active ? "rgba(94,240,255,0.16)" : "rgba(255,255,255,0.06)" }}
                >
                  {v.status === "unavailable" || v.status === "occupied" ? (
                    <Lock className="w-5 h-5 text-white/40" />
                  ) : (
                    <Car className="w-5 h-5" style={{ color: active ? "var(--aurora-cyan)" : "rgba(255,255,255,0.55)" }} />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-white" style={{ fontSize: 14 }}>{v.model}</span>
                    {active && (
                      <span
                        className="px-1.5 py-0.5 rounded-full font-mono"
                        style={{ background: "rgba(94,240,255,0.18)", color: "var(--aurora-cyan)", fontSize: 8, letterSpacing: "0.12em" }}
                      >
                        VALGT
                      </span>
                    )}
                  </div>
                  <div className="text-white/60 mt-0.5" style={{ fontSize: 11 }}>
                    {v.plate} · {v.year}
                  </div>
                  {v.reason && (
                    <div className="text-white/40 mt-0.5" style={{ fontSize: 10 }}>{v.reason}</div>
                  )}
                </div>

                <div className="shrink-0 flex flex-col items-end gap-2">
                  <span
                    className="px-2 py-0.5 rounded-full font-mono"
                    style={{ background: style.bg, color: style.color, fontSize: 9, letterSpacing: "0.1em" }}
                  >
                    {v.statusLabel}
                  </span>
                  {v.status === "active" && <CheckCircle2 className="w-4 h-4 text-[var(--aurora-cyan)]" />}
                  {selectable && (
                    <span className="text-[var(--aurora-violet)]" style={{ fontSize: 10 }}>Velg bil</span>
                  )}
                  {(v.status === "unavailable" || v.status === "occupied") && (
                    <Clock className="w-3.5 h-3.5 text-white/30" />
                  )}
                </div>
              </motion.button>
            );
          })}

          <div className="text-white/35 text-center pt-1" style={{ fontSize: 10 }}>
            Kjøretøy fra Elite Transport AS · KJAPP Pilotflåte
          </div>
        </div>
      </div>

      {/* Confirmation modal */}
      <AnimatePresence>
        {confirmVehicle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-end"
            style={{ background: "rgba(0,0,0,0.6)" }}
            onClick={() => setConfirmVehicle(null)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full glass-panel rounded-t-3xl px-5 pt-5"
              style={{ paddingBottom: "max(env(safe-area-inset-bottom), 24px)" }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-white font-display" style={{ fontSize: 16 }}>Bytte aktiv bil?</div>
                  <div className="text-white/55 mt-1" style={{ fontSize: 12 }}>
                    Du vil motta turer med valgt bil.
                  </div>
                </div>
                <button
                  onClick={() => setConfirmVehicle(null)}
                  className="w-8 h-8 rounded-full glass-panel flex items-center justify-center shrink-0"
                >
                  <X className="w-3.5 h-3.5 text-white/70" />
                </button>
              </div>

              <GlassPanel className="rounded-2xl p-4 mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(160,107,255,0.16)" }}
                  >
                    <Car className="w-5 h-5 text-[var(--aurora-violet)]" />
                  </div>
                  <div>
                    <div className="text-white" style={{ fontSize: 14 }}>{confirmVehicle.model}</div>
                    <div className="text-white/60" style={{ fontSize: 11 }}>
                      {confirmVehicle.plate} · {confirmVehicle.year}
                    </div>
                  </div>
                </div>
              </GlassPanel>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleConfirm}
                className="w-full rounded-2xl h-14 relative overflow-hidden mb-2"
              >
                <div className="absolute inset-0" style={{ background: "var(--aurora-gradient)" }} />
                <span className="relative text-[#05060f] font-display" style={{ fontSize: 13, letterSpacing: "0.12em" }}>
                  Bekreft bilvalg
                </span>
              </motion.button>
              <button
                onClick={() => setConfirmVehicle(null)}
                className="w-full py-3 text-white/45 text-center"
                style={{ fontSize: 12 }}
              >
                Avbryt
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
