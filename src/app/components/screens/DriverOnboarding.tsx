import { motion } from "motion/react";
import { useState } from "react";
import { User, FileText, Building2, Car, Upload, Check, ArrowLeft } from "lucide-react";
import { HolographicBackground } from "../HolographicBackground";
import { GlassPanel } from "../GlassPanel";
import type { Screen } from "../../App";

type OnboardingStep = "personal" | "documents" | "fleet" | "vehicle" | "submit";

const VEHICLES = [
  { id: "v1", model: "Toyota Corolla", plate: "EV 12345", year: "2025" },
  { id: "v2", model: "Mercedes EQS", plate: "EK 41209", year: "2025" },
  { id: "v3", model: "Tesla Model Y", plate: "EL 88421", year: "2024" },
];

export function DriverOnboarding({ go }: { go: (s: Screen) => void }) {
  const [step, setStep] = useState<OnboardingStep>("personal");
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div
        className="relative w-full overflow-hidden flex flex-col items-center justify-center"
        style={{
          height: "100svh",
          maxHeight: "100dvh",
          scrollbarWidth: "none",
          overscrollBehavior: "none",
        }}
      >
        <HolographicBackground intensity={0.85} />
        <div className="relative px-5 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center"
            style={{ background: "rgba(94,240,255,0.15)" }}
          >
            <Check className="w-10 h-10 text-[var(--aurora-cyan)]" strokeWidth={2} />
          </motion.div>
          <div className="text-white font-display mb-2" style={{ fontSize: 20 }}>
            Venter på godkjenning
          </div>
          <div className="text-white/65 mb-6" style={{ fontSize: 13, lineHeight: 1.4 }}>
            KJAPP eller løyvehaver vurderer dokumentene dine.
          </div>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => go("driver-access")}
            className="w-full max-w-xs rounded-2xl h-12 glass-panel text-white"
            style={{ fontSize: 13 }}
          >
            Tilbake til innlogging
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        height: "100svh",
        maxHeight: "100dvh",
        scrollbarWidth: "none",
        overscrollBehavior: "none",
      }}
    >
      <HolographicBackground intensity={0.85} />

      <div
        className="relative h-full flex flex-col px-5 overflow-y-auto"
        style={{
          paddingTop: "max(env(safe-area-inset-top), 24px)",
          paddingBottom: "max(env(safe-area-inset-bottom), 24px)",
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-y",
          scrollbarWidth: "none",
        }}
      >
        <div className="text-center mb-5">
          <span
            className="text-white font-display uppercase"
            style={{ fontSize: 11, letterSpacing: "0.32em" }}
          >
            Bli KJAPP-sjåfør
          </span>
        </div>

        {/* Progress */}
        <div className="flex gap-1 mb-6">
          {["personal", "documents", "fleet", "vehicle", "submit"].map((s, i) => (
            <div
              key={s}
              className="flex-1 h-1 rounded-full"
              style={{
                background:
                  ["personal", "documents", "fleet", "vehicle", "submit"].indexOf(step) >= i
                    ? "var(--aurora-gradient)"
                    : "rgba(255,255,255,0.1)",
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="flex-1">
          {step === "personal" && <PersonalStep onNext={() => setStep("documents")} />}
          {step === "documents" && <DocumentsStep onNext={() => setStep("fleet")} />}
          {step === "fleet" && <FleetStep onNext={() => setStep("vehicle")} />}
          {step === "vehicle" && (
            <VehicleStep
              vehicles={VEHICLES}
              selected={selectedVehicle}
              onSelect={setSelectedVehicle}
              onNext={() => setStep("submit")}
            />
          )}
          {step === "submit" && <SubmitStep onSubmit={() => setSubmitted(true)} />}
        </div>
      </div>
    </div>
  );
}

function PersonalStep({ onNext }: { onNext: () => void }) {
  return (
    <GlassPanel holo className="rounded-3xl p-5">
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{ background: "var(--aurora-gradient)" }}
        >
          <User className="w-5 h-5 text-[#05060f]" />
        </div>
        <div className="text-white font-display" style={{ fontSize: 16 }}>
          Personinfo
        </div>
      </div>

      <div className="space-y-3">
        <InputField label="Navn" placeholder="Amir Hagen" />
        <InputField label="Telefon" placeholder="+47 XXX XX XXX" />
        <InputField label="E-post" placeholder="amir@example.com" />

        <div className="glass-panel rounded-2xl p-4 text-center">
          <Upload className="w-6 h-6 text-white/65 mx-auto mb-2" />
          <div className="text-white" style={{ fontSize: 12 }}>
            Last opp profilbilde
          </div>
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={onNext}
        className="w-full rounded-2xl h-12 mt-5"
        style={{ background: "var(--aurora-gradient)" }}
      >
        <span className="text-[#05060f] font-display" style={{ fontSize: 13, letterSpacing: "0.12em" }}>
          FORTSETT
        </span>
      </motion.button>
    </GlassPanel>
  );
}

function DocumentsStep({ onNext }: { onNext: () => void }) {
  return (
    <GlassPanel holo className="rounded-3xl p-5">
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{ background: "rgba(160,107,255,0.18)" }}
        >
          <FileText className="w-5 h-5 text-[var(--aurora-violet)]" />
        </div>
        <div className="text-white font-display" style={{ fontSize: 16 }}>
          Dokumenter
        </div>
      </div>

      <div className="space-y-2">
        {["Førerkort", "Kjøreseddel", "Profilbilde"].map((doc) => (
          <div key={doc} className="glass-panel rounded-2xl p-3 flex items-center justify-between">
            <span className="text-white" style={{ fontSize: 13 }}>
              {doc}
            </span>
            <button className="text-[var(--aurora-cyan)]" style={{ fontSize: 11 }}>
              Last opp
            </button>
          </div>
        ))}
      </div>

      <div className="text-white/55 text-center mt-4" style={{ fontSize: 11, lineHeight: 1.4 }}>
        BankID-verifisering kan gjøres senere
      </div>

      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={onNext}
        className="w-full rounded-2xl h-12 mt-5"
        style={{ background: "var(--aurora-gradient)" }}
      >
        <span className="text-[#05060f] font-display" style={{ fontSize: 13, letterSpacing: "0.12em" }}>
          FORTSETT
        </span>
      </motion.button>
    </GlassPanel>
  );
}

function FleetStep({ onNext }: { onNext: () => void }) {
  return (
    <GlassPanel holo className="rounded-3xl p-5">
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{ background: "rgba(94,240,255,0.14)" }}
        >
          <Building2 className="w-5 h-5 text-[var(--aurora-cyan)]" />
        </div>
        <div className="text-white font-display" style={{ fontSize: 16 }}>
          Flåtetilknytning
        </div>
      </div>

      <div className="glass-panel rounded-2xl p-4">
        <div className="text-white/55 font-mono uppercase mb-1" style={{ fontSize: 9, letterSpacing: "0.16em" }}>
          Løyvehaver
        </div>
        <div className="text-white font-display" style={{ fontSize: 15 }}>
          Elite Transport AS
        </div>
        <div className="text-white/65 mt-0.5" style={{ fontSize: 11 }}>
          KJAPP Pilotflåte · Godkjent løyvehaver
        </div>
      </div>

      <div className="text-white/55 text-center mt-4" style={{ fontSize: 11, lineHeight: 1.4 }}>
        Du blir tilknyttet denne flåteeieren og kan kjøre deres godkjente kjøretøy.
      </div>

      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={onNext}
        className="w-full rounded-2xl h-12 mt-5"
        style={{ background: "var(--aurora-gradient)" }}
      >
        <span className="text-[#05060f] font-display" style={{ fontSize: 13, letterSpacing: "0.12em" }}>
          FORTSETT
        </span>
      </motion.button>
    </GlassPanel>
  );
}

function VehicleStep({
  vehicles,
  selected,
  onSelect,
  onNext,
}: {
  vehicles: { id: string; model: string; plate: string; year: string }[];
  selected: string | null;
  onSelect: (id: string) => void;
  onNext: () => void;
}) {
  return (
    <GlassPanel holo className="rounded-3xl p-5">
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{ background: "rgba(94,240,255,0.14)" }}
        >
          <Car className="w-5 h-5 text-[var(--aurora-cyan)]" />
        </div>
        <div className="text-white font-display" style={{ fontSize: 16 }}>
          Velg bil
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {vehicles.map((v) => (
          <button
            key={v.id}
            onClick={() => onSelect(v.id)}
            className={`w-full rounded-2xl p-3 flex items-center gap-3 transition ${
              selected === v.id ? "" : "glass-panel"
            }`}
            style={
              selected === v.id
                ? {
                    background: "rgba(94,240,255,0.12)",
                    boxShadow: "inset 0 0 0 1.5px rgba(94,240,255,0.4)",
                  }
                : {}
            }
          >
            <Car className="w-5 h-5 text-white/70" />
            <div className="flex-1 text-left">
              <div className="text-white" style={{ fontSize: 13 }}>
                {v.model}
              </div>
              <div className="text-white/60" style={{ fontSize: 11 }}>
                {v.plate} · {v.year}
              </div>
            </div>
            {selected === v.id && <Check className="w-4 h-4 text-[var(--aurora-cyan)]" />}
          </button>
        ))}
      </div>

      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={onNext}
        disabled={!selected}
        className="w-full rounded-2xl h-12 mt-5"
        style={{
          background: selected ? "var(--aurora-gradient)" : "rgba(255,255,255,0.1)",
          opacity: selected ? 1 : 0.5,
        }}
      >
        <span className="text-[#05060f] font-display" style={{ fontSize: 13, letterSpacing: "0.12em" }}>
          FORTSETT
        </span>
      </motion.button>
    </GlassPanel>
  );
}

function SubmitStep({ onSubmit }: { onSubmit: () => void }) {
  return (
    <GlassPanel holo glow className="rounded-3xl p-5 text-center">
      <div className="text-white font-display mb-3" style={{ fontSize: 17 }}>
        Klar til å sende?
      </div>
      <div className="text-white/65 mb-5" style={{ fontSize: 12, lineHeight: 1.4 }}>
        Vi vurderer dokumentene dine og kontakter deg innen 3–5 virkedager.
      </div>

      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={onSubmit}
        className="w-full rounded-2xl h-12"
        style={{ background: "var(--aurora-gradient)" }}
      >
        <span className="text-[#05060f] font-display" style={{ fontSize: 13, letterSpacing: "0.12em" }}>
          SEND TIL GODKJENNING
        </span>
      </motion.button>
    </GlassPanel>
  );
}

function InputField({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div className="glass-panel rounded-2xl px-4 py-3">
      <div className="text-white/55 font-mono uppercase" style={{ fontSize: 9, letterSpacing: "0.16em" }}>
        {label}
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className="mt-0.5 w-full bg-transparent outline-none text-white placeholder:text-white/40"
        style={{ fontSize: 13 }}
      />
    </div>
  );
}
