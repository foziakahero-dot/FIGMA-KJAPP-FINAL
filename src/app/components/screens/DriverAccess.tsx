import { motion } from "motion/react";
import { Phone, ShieldCheck, Key, Map } from "lucide-react";
import { SubScreen } from "../SubScreen";
import { GlassPanel } from "../GlassPanel";
import type { Screen } from "../../App";

export function DriverAccess({ go }: { go: (s: Screen) => void }) {
  return (
    <SubScreen title="KJAPP Driver Access" onBack={() => go("signin")} background>
      <div className="space-y-4 pb-4">
        {/* Existing driver login */}
        <GlassPanel holo className="rounded-3xl p-5 relative overflow-hidden">
          <div
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none"
            style={{ background: "var(--aurora-gradient)", opacity: 0.28 }}
          />
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: "var(--aurora-gradient)" }}
              >
                <ShieldCheck className="w-5 h-5 text-[#05060f]" strokeWidth={2.2} />
              </div>
              <div className="flex-1">
                <div className="text-white font-display" style={{ fontSize: 16, lineHeight: 1.25 }}>
                  Logg inn som sjåfør
                </div>
                <div className="text-white/65 mt-0.5" style={{ fontSize: 11, lineHeight: 1.35 }}>
                  For godkjente KJAPP-sjåfører.
                </div>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <div className="glass-panel rounded-2xl px-4 py-3">
                <div className="text-white/55 font-mono uppercase" style={{ fontSize: 9, letterSpacing: "0.16em" }}>
                  Telefonnummer
                </div>
                <input
                  type="tel"
                  placeholder="+47"
                  className="mt-0.5 w-full bg-transparent outline-none text-white placeholder:text-white/40"
                  style={{ fontSize: 13 }}
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => go("driver")}
                className="w-full rounded-2xl h-12 relative overflow-hidden"
              >
                <div className="absolute inset-0" style={{ background: "var(--aurora-gradient)" }} />
                <div className="relative h-full flex items-center justify-center gap-2 text-[#05060f] font-display" style={{ fontSize: 13, letterSpacing: "0.12em" }}>
                  <Phone className="w-4 h-4" />
                  SEND ENGANGSKODE
                </div>
              </motion.button>

              <button
                onClick={() => go("driver")}
                className="w-full glass-panel rounded-2xl py-3 flex items-center justify-center gap-2 text-white/80"
                style={{ fontSize: 12 }}
              >
                <ShieldCheck className="w-4 h-4 text-white/65" />
                Logg inn med BankID
              </button>
            </div>
          </div>
        </GlassPanel>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-white/45 font-mono uppercase" style={{ fontSize: 9, letterSpacing: "0.2em" }}>Eller</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* New driver onboarding */}
        <GlassPanel holo className="rounded-3xl p-5 relative overflow-hidden">
          <div
            className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-3xl pointer-events-none"
            style={{ background: "var(--aurora-gradient)", opacity: 0.24 }}
          />
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(160,107,255,0.18)" }}
              >
                <Key className="w-5 h-5 text-[var(--aurora-violet)]" strokeWidth={2.2} />
              </div>
              <div className="flex-1">
                <div className="text-white font-display" style={{ fontSize: 16, lineHeight: 1.25 }}>Ny sjåfør?</div>
                <div className="text-white/65 mt-0.5" style={{ fontSize: 11, lineHeight: 1.35 }}>
                  Har du fått invitasjon fra løyvehaver eller KJAPP?
                </div>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <div className="glass-panel rounded-2xl px-4 py-3">
                <div className="text-white/55 font-mono uppercase" style={{ fontSize: 9, letterSpacing: "0.16em" }}>
                  Invitasjonskode
                </div>
                <input
                  type="text"
                  placeholder="KJAPP-BETA-2026"
                  className="mt-0.5 w-full bg-transparent outline-none text-white placeholder:text-white/40"
                  style={{ fontSize: 13 }}
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => go("driver-onboarding")}
                className="w-full rounded-2xl h-12 relative overflow-hidden"
              >
                <div className="absolute inset-0" style={{ background: "rgba(160,107,255,0.85)" }} />
                <div className="relative h-full flex items-center justify-center text-white font-display" style={{ fontSize: 13, letterSpacing: "0.12em" }}>
                  FORTSETT
                </div>
              </motion.button>

              <button
                onClick={() => go("driver-onboarding")}
                className="w-full glass-panel rounded-2xl py-3 text-center text-white/80"
                style={{ fontSize: 12 }}
              >
                Jeg har ikke kode
              </button>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 text-white/50 text-center" style={{ fontSize: 10.5, lineHeight: 1.4 }}>
              Invitasjon brukes kun for beta-onboarding av godkjente sjåfører.
            </div>
          </div>
        </GlassPanel>

        <button
          onClick={() => go("driver-onboarding")}
          className="w-full text-center text-white/65 py-2"
          style={{ fontSize: 12 }}
        >
          Søk om å bli KJAPP-sjåfør
        </button>

        {/* Internal prototype map link */}
        <div className="flex items-center justify-center pt-2">
          <button
            onClick={() => go("driver-prototype-map")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{ background: "rgba(94,240,255,0.06)", border: "1px solid rgba(94,240,255,0.15)" }}
          >
            <Map className="w-3 h-3 text-[var(--aurora-cyan)]" />
            <span className="text-[var(--aurora-cyan)] font-mono" style={{ fontSize: 9, letterSpacing: "0.16em" }}>
              PROTOTYPE MAP
            </span>
            <span className="text-white/30 font-mono" style={{ fontSize: 8, letterSpacing: "0.1em" }}>
              · INTERN
            </span>
          </button>
        </div>
      </div>
    </SubScreen>
  );
}
