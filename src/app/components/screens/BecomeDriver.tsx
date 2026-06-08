import { motion } from "motion/react";
import { Car, FileText, ShieldCheck, Key, ChevronRight } from "lucide-react";
import { SubScreen } from "../SubScreen";
import { GlassPanel } from "../GlassPanel";
import type { Screen } from "../../App";

export function BecomeDriver({ go }: { go: (s: Screen) => void }) {
  return (
    <SubScreen title="Bli KJAPP-sjåfør" onBack={() => go("profile")} background>
      <div className="space-y-4 pb-4">
        {/* Hero */}
        <GlassPanel holo glow className="rounded-3xl p-5 relative overflow-hidden">
          <div
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none"
            style={{ background: "var(--aurora-gradient)", opacity: 0.32 }}
          />
          <div className="relative flex items-start gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: "var(--aurora-gradient)" }}
            >
              <Car className="w-6 h-6 text-[#05060f]" strokeWidth={2.2} />
            </div>
            <div className="flex-1">
              <div
                className="text-white font-display"
                style={{ fontSize: 17, lineHeight: 1.25 }}
              >
                Søk om å kjøre med KJAPP
              </div>
              <div
                className="text-white/70 mt-1"
                style={{ fontSize: 12, lineHeight: 1.4 }}
              >
                Premium taxi-tjeneste med AI-assistent. Fleksible timer og topp betaling.
              </div>
            </div>
          </div>
        </GlassPanel>

        {/* Requirements */}
        <div>
          <div
            className="text-white/65 font-display uppercase mb-2 px-1"
            style={{ fontSize: 10, letterSpacing: "0.22em" }}
          >
            Krav
          </div>
          <div className="space-y-2">
            <RequirementCard
              icon={<ShieldCheck className="w-4 h-4" />}
              label="Gyldig løyve"
              desc="Drosjeløyve eller godkjent tillatelse"
            />
            <RequirementCard
              icon={<FileText className="w-4 h-4" />}
              label="Kjøreseddel"
              desc="Politiattest og helseerklæring"
            />
            <RequirementCard
              icon={<Car className="w-4 h-4" />}
              label="Bil"
              desc="Godkjent drosje eller privat bil (visse krav)"
            />
          </div>
        </div>

        {/* Invitation code field */}
        <div className="glass-panel rounded-2xl px-4 py-3">
          <div
            className="text-white/55 font-mono uppercase"
            style={{ fontSize: 9, letterSpacing: "0.16em" }}
          >
            Har du invitasjonskode? (valgfritt)
          </div>
          <input
            type="text"
            placeholder="KJAPP-BETA-2026"
            className="mt-0.5 w-full bg-transparent outline-none text-white placeholder:text-white/40"
            style={{ fontSize: 13 }}
          />
        </div>

        {/* CTA */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full rounded-2xl h-12 relative overflow-hidden"
        >
          <div className="absolute inset-0" style={{ background: "var(--aurora-gradient)" }} />
          <div
            className="relative h-full flex items-center justify-center gap-2 text-[#05060f] font-display"
            style={{ fontSize: 13, letterSpacing: "0.12em" }}
          >
            START SØKNAD
            <ChevronRight className="w-4 h-4" />
          </div>
        </motion.button>

        <button
          onClick={() => go("driver-access")}
          className="w-full glass-panel rounded-2xl py-3 text-center text-white/80"
          style={{ fontSize: 12 }}
        >
          Har allerede konto? Logg inn som sjåfør
        </button>

        {/* Info */}
        <div
          className="mt-2 text-center text-white/50"
          style={{ fontSize: 10.5, lineHeight: 1.4 }}
        >
          Søknader behandles manuelt. Du vil få beskjed innen 3–5 virkedager.
        </div>
      </div>
    </SubScreen>
  );
}

function RequirementCard({
  icon,
  label,
  desc,
}: {
  icon: React.ReactNode;
  label: string;
  desc: string;
}) {
  return (
    <div className="glass-panel rounded-2xl px-3.5 py-3 flex items-center gap-3">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: "rgba(94,240,255,0.14)", color: "var(--aurora-cyan)" }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-white" style={{ fontSize: 13 }}>
          {label}
        </div>
        <div className="text-white/60" style={{ fontSize: 11, lineHeight: 1.35 }}>
          {desc}
        </div>
      </div>
    </div>
  );
}
