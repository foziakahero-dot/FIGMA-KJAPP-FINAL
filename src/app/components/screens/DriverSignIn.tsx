import { motion } from "motion/react";
import { useState } from "react";
import { ShieldCheck, Building2, Lock, ArrowLeft, AlertCircle } from "lucide-react";
import { DriverBackground } from "../DriverBackground";
import { GlassPanel } from "../GlassPanel";
import { Wordmark } from "../brand/Wordmark";
import { fleet } from "../../data/driverMockData";
import type { Screen } from "../../App";

export function DriverSignIn({ go }: { go: (s: Screen) => void }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Demo: enhver 6-tegns kode godtas, "FAIL" gir feilmelding
  const submit = () => {
    setError(null);
    if (code.trim().length < 4) {
      setError("Invitasjonskoden må være minst 4 tegn.");
      return;
    }
    if (code.trim().toUpperCase() === "FAIL") {
      setError("Ugyldig kode. Be flåteeieren om en ny invitasjon.");
      return;
    }
    setLoading(true);
    setTimeout(() => { setLoading(false); go("driver"); }, 1200);
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <DriverBackground intensity={0.95} />

      <button
        onClick={() => go("signin")}
        aria-label="Tilbake til kunde-innlogging"
        className="absolute top-4 left-4 z-30 w-10 h-10 rounded-full glass-panel flex items-center justify-center"
      >
        <ArrowLeft className="w-4 h-4 text-white/85" />
      </button>

      <div className="relative h-full flex flex-col items-center px-6 pt-16 text-center overflow-y-auto">
        <Wordmark size="sm" showTagline={false} animateShimmer={false} />
        <div className="mt-2 text-[#ffb547] text-[10px] font-mono tracking-[0.4em]">PRO · SJÅFØR</div>

        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mt-6 w-20 h-20 rounded-2xl flex items-center justify-center"
          style={{ background: "var(--kjapp-amber-gradient)",
                   boxShadow: "0 12px 36px -8px rgba(255,181,71,0.55)" }}
        >
          <ShieldCheck className="w-9 h-9 text-[#1a1206]" strokeWidth={2.2} />
        </motion.div>

        <h2 className="mt-5 text-white font-display" style={{ fontSize: "22px", letterSpacing: "-0.01em" }}>
          Logg inn som sjåfør
        </h2>
        <p className="text-white/70 text-[12px] mt-2 max-w-[300px] leading-snug">
          Sjåfører kan ikke registrere seg selv. Du må være invitert av en
          <span className="text-[#ffb547]"> godkjent flåteeier</span> med kjøreseddel og org.nr.
        </p>

        {/* Invitasjonskode */}
        <GlassPanel className="mt-6 w-full p-4 text-left"
                    style={{ boxShadow: "inset 0 0 0 1px rgba(255,181,71,0.3)" }}>
          <label className="text-[#ffb547] text-[10px] font-mono tracking-wider">INVITASJONSKODE</label>
          <div className="mt-2 flex items-center gap-2 glass-panel rounded-xl px-3 py-3">
            <Lock className="w-4 h-4 text-[#ffb547]" />
            <input
              value={code}
              onChange={(e) => { setCode(e.target.value.toUpperCase()); setError(null); }}
              placeholder="F.EKS. OST-7K2X"
              maxLength={12}
              className="bg-transparent flex-1 outline-none text-white text-[14px] font-mono tracking-[0.18em] placeholder:text-white/30"
            />
          </div>
          {error && (
            <div className="mt-2 flex items-center gap-1.5 text-[#ff8a9b] text-[11px]">
              <AlertCircle className="w-3 h-3" /> {error}
            </div>
          )}
          <div className="mt-2 text-white/55 text-[10px] leading-snug">
            Sendt på SMS fra <span className="text-white/80">{fleet.invitedBy}</span> ved {fleet.name}.
          </div>
        </GlassPanel>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={submit}
          disabled={loading}
          aria-label="Verifiser og fortsett"
          className="mt-4 w-full rounded-2xl h-13 py-3.5 relative overflow-hidden disabled:opacity-60"
          style={{ background: "var(--kjapp-amber-gradient)",
                   boxShadow: "0 12px 36px -8px rgba(255,181,71,0.55)" }}
        >
          <div className="relative h-full flex items-center justify-center gap-2 text-[#1a1206] font-display tracking-[0.18em] text-[13px]">
            {loading ? "VERIFISERER…" : "VERIFISER & LOGG INN"}
          </div>
        </motion.button>

        {/* Krav */}
        <GlassPanel className="mt-4 w-full p-3.5 text-left">
          <div className="text-white/85 text-[11px] font-display tracking-wider uppercase mb-2 flex items-center gap-1.5">
            <Building2 className="w-3 h-3 text-[#ffb547]" />
            For å bli sjåfør hos Kjapp
          </div>
          <ul className="text-white/70 text-[11px] space-y-1.5 leading-snug">
            <li>· Du må ha gyldig <span className="text-white">kjøreseddel</span> fra Statens vegvesen</li>
            <li>· Du må være knyttet til en <span className="text-white">registrert flåteeier</span> (org.nr.)</li>
            <li>· Flåteeier sender deg invitasjonskode på SMS</li>
            <li>· Bakgrunnssjekk og taxiforsikring må være på plass</li>
          </ul>
        </GlassPanel>

        <button className="mt-4 text-white/65 text-[11px] underline decoration-dotted underline-offset-4">
          Er du flåteeier? Søk om å bli partner →
        </button>

        <div className="flex-1" />
        <div className="text-white/45 text-[10px] font-mono tracking-wider mt-6 mb-4">
          © 2026 KJAPP AS · KJAPP PRO
        </div>
      </div>
    </div>
  );
}
