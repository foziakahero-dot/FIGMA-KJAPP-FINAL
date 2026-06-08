import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Check } from "lucide-react";
import { mGet, mPost } from "../../lib/makeServer";

const VERSION = "2026-06-07";
const LS_KEY = `kjapp.consent.${VERSION}`;

type Choice = {
  key: string;
  type: string;
  required: boolean;
  label: string;
  desc: string;
};

const CHOICES: Choice[] = [
  {
    key: "gdpr",
    type: "gdpr",
    required: true,
    label: "Personvern og bruksvilkår",
    desc: "Jeg godtar personvernerklæringen og bruksvilkårene.",
  },
  {
    key: "location_share",
    type: "location_share",
    required: true,
    label: "Lokasjon for tur-bestilling",
    desc: "GPS brukes kun ved aktiv tur og adresse-søk.",
  },
  {
    key: "marketing",
    type: "marketing",
    required: false,
    label: "E-post med tilbud (valgfritt)",
    desc: "Du kan slå av når som helst i Innstillinger.",
  },
];

export function ConsentModal({
  onAccepted,
  navigateTo,
}: {
  onAccepted?: () => void;
  navigateTo: (target: "privacy" | "terms") => void;
}) {
  const [open, setOpen] = useState(false);
  const [granted, setGranted] = useState<Record<string, boolean>>({
    gdpr: false,
    location_share: false,
    marketing: false,
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Quick local check first to avoid flicker
    if (localStorage.getItem(LS_KEY) === "1") return;
    // Then confirm with server (authoritative)
    mGet<{ accepted: boolean }>("/consent/status")
      .then((r) => {
        if (r.accepted) {
          localStorage.setItem(LS_KEY, "1");
        } else {
          setOpen(true);
        }
      })
      .catch(() => {
        // No server / not logged in → show modal anyway, server call will fail
        // gracefully on submit
        setOpen(true);
      });
  }, []);

  const canSubmit = CHOICES.filter((c) => c.required).every((c) => granted[c.key]);

  const submit = async () => {
    if (!canSubmit) {
      setError("Du må godta personvern og lokasjon for å bruke KJAPP.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await mPost("/consent/log", {
        consents: CHOICES.map((c) => ({
          type: c.type,
          granted: granted[c.key] ?? false,
          version: VERSION,
        })),
      });
      localStorage.setItem(LS_KEY, "1");
      setOpen(false);
      onAccepted?.();
    } catch (e) {
      // Server unavailable → still close so prototype works; user can re-grant later
      localStorage.setItem(LS_KEY, "1");
      setOpen(false);
      onAccepted?.();
      console.warn("Consent log failed (server unavailable):", e);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[230] flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ background: "rgba(4,6,16,0.85)", backdropFilter: "blur(14px)" }}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md mx-auto flex flex-col"
            style={{
              background: "linear-gradient(180deg, rgba(18,22,42,0.96), rgba(8,10,24,0.98))",
              border: "1px solid rgba(94,240,255,0.22)",
              borderRadius: "24px 24px 0 0",
              padding: "22px 22px max(env(safe-area-inset-bottom), 22px) 22px",
              gap: 14,
              maxHeight: "92vh",
              overflowY: "auto",
            }}
          >
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" style={{ color: "#5ef0ff" }} />
              <div
                className="font-mono uppercase"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.32em",
                  color: "#5ef0ff",
                }}
              >
                Samtykke — versjon {VERSION}
              </div>
            </div>

            <div style={{ color: "white", fontSize: 16, fontWeight: 600 }}>
              Før du kan bruke KJAPP
            </div>

            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, lineHeight: 1.5 }}>
              NexoraHub AS behandler dine data i henhold til GDPR. Du kan trekke
              samtykke når som helst i Innstillinger.
            </div>

            <div className="flex flex-col" style={{ gap: 10, marginTop: 4 }}>
              {CHOICES.map((c) => (
                <button
                  key={c.key}
                  onClick={() =>
                    setGranted((s) => ({ ...s, [c.key]: !s[c.key] }))
                  }
                  className="text-left active:scale-[0.99] transition"
                  style={{
                    display: "flex",
                    gap: 12,
                    padding: 12,
                    borderRadius: 14,
                    background: "rgba(255,255,255,0.04)",
                    border: granted[c.key]
                      ? "1px solid rgba(94,240,255,0.5)"
                      : "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 6,
                      background: granted[c.key]
                        ? "linear-gradient(135deg, #5ef0ff, #a06bff)"
                        : "transparent",
                      border: granted[c.key]
                        ? "none"
                        : "1.5px solid rgba(255,255,255,0.35)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    {granted[c.key] && (
                      <Check className="w-3.5 h-3.5" style={{ color: "#04060f" }} strokeWidth={3} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div style={{ color: "white", fontSize: 14, fontWeight: 500 }}>
                      {c.label}
                      {c.required && (
                        <span
                          className="font-mono"
                          style={{
                            marginLeft: 8,
                            fontSize: 9,
                            color: "#ffb048",
                            letterSpacing: "0.2em",
                          }}
                        >
                          PÅKREVD
                        </span>
                      )}
                    </div>
                    <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, marginTop: 2 }}>
                      {c.desc}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div
              className="flex gap-3 font-mono uppercase"
              style={{
                fontSize: 10,
                letterSpacing: "0.28em",
                color: "var(--aurora-cyan, #5ef0ff)",
                paddingTop: 4,
              }}
            >
              <button onClick={() => navigateTo("privacy")}>
                Les personvernerklæring →
              </button>
              <button onClick={() => navigateTo("terms")}>
                Les bruksvilkår →
              </button>
            </div>

            {error && (
              <div style={{ color: "#ff7a9d", fontSize: 12 }}>{error}</div>
            )}

            <button
              onClick={submit}
              disabled={busy || !canSubmit}
              className="active:scale-[0.98] transition"
              style={{
                marginTop: 6,
                padding: "14px 18px",
                borderRadius: 14,
                background: canSubmit
                  ? "linear-gradient(135deg, #5ef0ff, #a06bff)"
                  : "rgba(94,240,255,0.18)",
                color: canSubmit ? "#04060f" : "rgba(255,255,255,0.5)",
                fontSize: 15,
                fontWeight: 600,
                border: "none",
              }}
            >
              {busy ? "Lagrer…" : "Godta og fortsett"}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
