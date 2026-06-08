import { useState } from "react";
import { motion } from "motion/react";
import { AuroraOrb } from "../AuroraOrb";
import { OtpModal } from "../signin/OtpModal";
import { DynamicBackground } from "../signin/DynamicBackground";
import { KJAPPLogo } from "../signin/KJAPPLogo";
import { GreetingHeader } from "../signin/GreetingHeader";
import { VippsLoginCard } from "../signin/VippsLoginCard";
import { SecondaryLoginButton } from "../signin/SecondaryLoginButton";
import { ExploreLink } from "../signin/ExploreLink";
import { DriverLoginButton } from "../signin/DriverLoginButton";
import { LegalFooter } from "../signin/LegalFooter";
import type { Screen } from "../../App";

export function SignIn({ go }: { go: (s: Screen) => void }) {
  const [otpOpen, setOtpOpen] = useState(false);
  return (
    <div
      className="relative w-full overflow-hidden flex flex-col"
      style={{
        height: "100svh",
        maxHeight: "100dvh",
        paddingTop: "max(env(safe-area-inset-top), 10px)",
        paddingBottom: "max(env(safe-area-inset-bottom), 22px)",
        // Skjul eventuelle scrollbar-artefakter i innebygd preview
        scrollbarWidth: "none",
        overscrollBehavior: "none",
      }}
    >
      <DynamicBackground />

      <div
        className="relative flex-1 min-h-0 flex flex-col px-5 w-full overflow-hidden"
        style={{ gap: "clamp(6px, 1.4vh, 12px)" }}
      >
        {/* TOPP — kompakt brand-blokk */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center shrink-0"
          style={{ paddingTop: "clamp(2px, 0.6vh, 8px)" }}
        >
          <AuroraOrb size={42} />
          <div style={{ marginTop: "clamp(6px, 1.2vh, 12px)" }}>
            <KJAPPLogo size={28} />
          </div>
          <GreetingHeader />
        </motion.div>

        {/* MIDT — Vipps + sekundærknapper + explore. Plassert nær toppen for
            å fjerne det tomme rommet, men beholder pust med padding-top. */}
        <div
          className="flex-1 min-h-0 flex flex-col justify-start"
          style={{
            gap: "clamp(10px, 1.8vh, 16px)",
            paddingTop: "clamp(6px, 1.4vh, 14px)",
          }}
        >
          <VippsLoginCard onClick={() => go("home")} />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3"
          >
            <div className="flex-1 h-px" style={{ background: "var(--glass-border)" }} />
            <span
              className="font-mono uppercase"
              style={{
                color: "var(--text-secondary)",
                fontSize: 9,
                letterSpacing: "0.32em",
                opacity: 0.7,
              }}
            >
              eller
            </span>
            <div className="flex-1 h-px" style={{ background: "var(--glass-border)" }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-3 gap-2.5"
          >
            <SecondaryLoginButton variant="bankid" label="BankID" onClick={() => go("home")} />
            <SecondaryLoginButton variant="apple" label="Apple" onClick={() => go("home")} />
            <SecondaryLoginButton variant="google" label="Google" onClick={() => go("home")} />
          </motion.div>

          <div
            className="flex justify-center"
            style={{ marginTop: "clamp(2px, 0.6vh, 6px)" }}
          >
            <button
              onClick={() => setOtpOpen(true)}
              className="font-mono uppercase active:scale-95 transition"
              style={{
                fontSize: 10,
                letterSpacing: "0.28em",
                color: "var(--aurora-cyan, #5ef0ff)",
                padding: "8px 16px",
                borderRadius: 999,
                border: "1px solid rgba(94,240,255,0.35)",
                background: "rgba(94,240,255,0.08)",
              }}
            >
              Logg inn med SMS →
            </button>
          </div>

          <div className="flex justify-center">
            <ExploreLink onClick={() => go("home")} />
          </div>
        </div>

        {/* BUNN — sjåfør sitter komfortabelt over juridisk footer */}
        <div className="flex flex-col items-center shrink-0" style={{ gap: 10 }}>
          <DriverLoginButton onClick={() => go("driver-access")} />
          <button
            onClick={() => go("loyvehaver-register")}
            className="font-mono uppercase active:scale-95 transition"
            style={{
              fontSize: 10,
              letterSpacing: "0.28em",
              color: "var(--aurora-violet, #a06bff)",
              padding: "6px 14px",
              borderRadius: 999,
              border: "1px solid rgba(160,107,255,0.35)",
              background: "rgba(160,107,255,0.08)",
            }}
          >
            Ny løyvehaver? Søk her →
          </button>
          <LegalFooter />
        </div>
      </div>

      <OtpModal
        open={otpOpen}
        onClose={() => setOtpOpen(false)}
        onSuccess={() => {
          setOtpOpen(false);
          go("home");
        }}
      />
    </div>
  );
}
