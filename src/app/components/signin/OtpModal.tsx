import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { sendOtp, verifyOtp, normalizeNorwegianPhone } from "../../lib/auth";
import { isSupabaseConfigured } from "../../data/supabase/client";

type Step = "phone" | "code";

export function OtpModal({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setStep("phone");
    setPhone("");
    setCode("");
    setError(null);
    setBusy(false);
  };

  const handleSend = async () => {
    setError(null);
    const normalized = normalizeNorwegianPhone(phone);
    if (!normalized) {
      setError("Ugyldig norsk mobilnummer (8 siffer)");
      return;
    }
    if (!isSupabaseConfigured) {
      setError("Supabase ikke konfigurert i denne forhåndsvisningen");
      return;
    }
    setBusy(true);
    const { error: err } = await sendOtp(normalized);
    setBusy(false);
    if (err) {
      setError(`Kunne ikke sende kode: ${err}`);
      return;
    }
    setStep("code");
  };

  const handleVerify = async () => {
    setError(null);
    if (code.length < 4) {
      setError("Skriv inn koden fra SMS");
      return;
    }
    setBusy(true);
    const { error: err } = await verifyOtp(phone, code);
    setBusy(false);
    if (err) {
      setError(`Feil kode: ${err}`);
      return;
    }
    reset();
    onSuccess();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ background: "rgba(4,6,16,0.72)", backdropFilter: "blur(12px)" }}
          onClick={() => {
            reset();
            onClose();
          }}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md mx-auto flex flex-col"
            style={{
              background: "linear-gradient(180deg, rgba(18,22,42,0.92), rgba(8,10,24,0.96))",
              border: "1px solid rgba(94,240,255,0.18)",
              borderRadius: "24px 24px 0 0",
              padding: "24px 22px max(env(safe-area-inset-bottom), 24px) 22px",
              gap: 16,
              boxShadow: "0 -24px 48px rgba(94,240,255,0.08)",
            }}
          >
            <div className="flex items-center justify-between">
              <div
                className="font-mono uppercase"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.32em",
                  color: "var(--aurora-cyan, #5ef0ff)",
                }}
              >
                {step === "phone" ? "Logg inn med SMS" : "Bekreft kode"}
              </div>
              <button
                onClick={() => {
                  reset();
                  onClose();
                }}
                className="font-mono uppercase active:scale-95 transition"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.28em",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                Lukk
              </button>
            </div>

            {step === "phone" ? (
              <>
                <label
                  className="font-mono uppercase"
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.32em",
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  Mobilnummer
                </label>
                <div
                  className="flex items-center"
                  style={{
                    border: "1px solid rgba(94,240,255,0.25)",
                    borderRadius: 14,
                    padding: "12px 14px",
                    background: "rgba(255,255,255,0.04)",
                    gap: 10,
                  }}
                >
                  <span
                    style={{
                      color: "rgba(255,255,255,0.7)",
                      fontSize: 15,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    +47
                  </span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    placeholder="9XX XX XXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoFocus
                    style={{
                      flex: 1,
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      color: "white",
                      fontSize: 17,
                      fontVariantNumeric: "tabular-nums",
                      letterSpacing: "0.04em",
                    }}
                  />
                </div>
                {error && (
                  <div style={{ color: "#ff7a9d", fontSize: 12 }}>{error}</div>
                )}
                <button
                  onClick={handleSend}
                  disabled={busy}
                  className="active:scale-[0.98] transition"
                  style={{
                    background: busy
                      ? "rgba(94,240,255,0.18)"
                      : "linear-gradient(135deg, #5ef0ff, #a06bff)",
                    color: busy ? "rgba(255,255,255,0.6)" : "#04060f",
                    padding: "14px 18px",
                    borderRadius: 14,
                    fontWeight: 600,
                    fontSize: 15,
                    letterSpacing: "0.02em",
                    border: "none",
                  }}
                >
                  {busy ? "Sender…" : "Send kode"}
                </button>
                <div
                  className="font-mono uppercase"
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.28em",
                    color: "rgba(255,255,255,0.4)",
                    textAlign: "center",
                  }}
                >
                  Vi sender en engangskode på SMS
                </div>
              </>
            ) : (
              <>
                <label
                  className="font-mono uppercase"
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.32em",
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  Engangskode sendt til +47 {phone}
                </label>
                <input
                  type="tel"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  placeholder="• • • • • •"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  autoFocus
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(94,240,255,0.25)",
                    borderRadius: 14,
                    padding: "14px 18px",
                    color: "white",
                    fontSize: 22,
                    letterSpacing: "0.4em",
                    textAlign: "center",
                    fontVariantNumeric: "tabular-nums",
                    outline: "none",
                  }}
                />
                {error && (
                  <div style={{ color: "#ff7a9d", fontSize: 12 }}>{error}</div>
                )}
                <button
                  onClick={handleVerify}
                  disabled={busy}
                  className="active:scale-[0.98] transition"
                  style={{
                    background: busy
                      ? "rgba(94,240,255,0.18)"
                      : "linear-gradient(135deg, #5ef0ff, #a06bff)",
                    color: busy ? "rgba(255,255,255,0.6)" : "#04060f",
                    padding: "14px 18px",
                    borderRadius: 14,
                    fontWeight: 600,
                    fontSize: 15,
                    border: "none",
                  }}
                >
                  {busy ? "Bekrefter…" : "Bekreft"}
                </button>
                <button
                  onClick={() => {
                    setStep("phone");
                    setCode("");
                    setError(null);
                  }}
                  className="font-mono uppercase active:scale-95 transition"
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "rgba(255,255,255,0.55)",
                    fontSize: 10,
                    letterSpacing: "0.28em",
                    padding: 6,
                  }}
                >
                  ← Endre nummer
                </button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
