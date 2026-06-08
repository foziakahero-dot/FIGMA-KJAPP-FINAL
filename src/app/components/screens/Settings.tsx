import { ChevronRight, AlertTriangle } from "lucide-react";
import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SubScreen } from "../SubScreen";
import { GlassPanel } from "../GlassPanel";
import { mPost } from "../../lib/makeServer";
import type { Screen } from "../../App";

type Row = {
  label: string;
  value?: string;
  danger?: boolean;
  to?: Screen;
  action?: "delete-account";
};

const INTEGRATIONS: Row[] = [
  { label: "Ruter / Entur", value: "Kommer snart" },
  { label: "Spotify", value: "Koble til", to: "connect" },
  { label: "Instagram", value: "Koble til", to: "connect" },
  { label: "WhatsApp / SMS", value: "Aktiv", to: "connect" },
  { label: "Kalender", value: "Koble til", to: "connect" },
  { label: "Wallet", value: "Kommer snart" },
  { label: "Flyplass", value: "Kommer snart" },
  { label: "Kartnavigasjon", value: "Aktiv", to: "connect" },
];

const SECTIONS: { title: string; rows: Row[] }[] = [
  {
    title: "Konto",
    rows: [
      { label: "Navn", value: "Mathilde Berg" },
      { label: "Telefon", value: "+47 9•• •• 421" },
      { label: "E-post", value: "mathilde@kjapp.no" },
      { label: "Last ned mine data", to: "data-export" },
      { label: "Slett konto", danger: true, action: "delete-account" },
    ],
  },
  {
    title: "App",
    rows: [
      { label: "Språk", value: "Norsk" },
      { label: "Tema", value: "Auto" },
      { label: "Dynamisk KJAPP-tema", value: "Kveld" },
      { label: "Varsler", value: "På" },
    ],
  },
  {
    title: "Sikkerhet",
    rows: [
      { label: "BankID-verifisering", value: "Aktiv" },
      { label: "Personvern", to: "privacy" },
      { label: "Deling av posisjon", value: "Under tur" },
      { label: "Nødkontakt", value: "Sofie" },
    ],
  },
  {
    title: "Reise",
    rows: [
      { label: "Favoritt hentested", value: "Hjem", to: "places" },
      { label: "Lagrede steder", to: "places" },
      { label: "Standard betaling", value: "Vipps", to: "payment" },
      { label: "Kvitteringer", value: "På e-post", to: "payment" },
      { label: "Turhistorikk", to: "history" },
      { label: "Kundeservice", to: "support" },
    ],
  },
  {
    title: "Integrasjoner",
    rows: INTEGRATIONS,
  },
  {
    title: "Juridisk",
    rows: [
      { label: "Vilkår", to: "terms" },
      { label: "Personvern", to: "privacy" },
      { label: "Lisenser" },
    ],
  },
];

export function Settings({ go }: { go: (s: Screen) => void }) {
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <SubScreen title="Innstillinger" onBack={() => go("profile")}>
      <div className="space-y-5 pb-4">
        {SECTIONS.map((sec) => (
          <Section key={sec.title} title={sec.title}>
            <GlassPanel className="rounded-2xl divide-y divide-white/5 overflow-hidden">
              {sec.rows.map((r) => (
                <button
                  key={r.label}
                  onClick={() => {
                    if (r.action === "delete-account") setDeleteOpen(true);
                    else if (r.to) go(r.to);
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 text-left active:bg-white/[0.03]"
                >
                  <span
                    className={r.danger ? "text-[#ff7a7a]" : "text-white"}
                    style={{ fontSize: 13 }}
                  >
                    {r.label}
                  </span>
                  <span className="flex items-center gap-1.5 shrink-0">
                    {r.value && (
                      <span className="text-white/65" style={{ fontSize: 12 }}>
                        {r.value}
                      </span>
                    )}
                    {!r.danger && <ChevronRight className="w-4 h-4 text-white/40" />}
                  </span>
                </button>
              ))}
            </GlassPanel>
          </Section>
        ))}
      </div>

      <DeleteAccountModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onDeleted={() => go("signin")}
      />
    </SubScreen>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <div
        className="text-white/65 font-display uppercase mb-2"
        style={{ fontSize: 10, letterSpacing: "0.22em" }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

function DeleteAccountModal({
  open,
  onClose,
  onDeleted,
}: {
  open: boolean;
  onClose: () => void;
  onDeleted: () => void;
}) {
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canDelete = confirm.trim().toUpperCase() === "SLETT";

  const submit = async () => {
    if (!canDelete) return;
    setBusy(true);
    setError(null);
    try {
      await mPost("/gdpr/delete", {});
      try {
        Object.keys(localStorage)
          .filter((k) => k.startsWith("kjapp."))
          .forEach((k) => localStorage.removeItem(k));
      } catch {}
      onDeleted();
    } catch (e: any) {
      setError(e?.message || "Kunne ikke slette konto. Kontakt support@kjapp.no.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[240] flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ background: "rgba(4,6,16,0.85)", backdropFilter: "blur(14px)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md mx-auto flex flex-col"
            style={{
              background: "linear-gradient(180deg, rgba(40,18,22,0.96), rgba(20,8,10,0.98))",
              border: "1px solid rgba(255,122,157,0.3)",
              borderRadius: "24px 24px 0 0",
              padding: "22px 22px max(env(safe-area-inset-bottom), 22px) 22px",
              gap: 14,
              maxHeight: "92vh",
              overflowY: "auto",
            }}
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" style={{ color: "#ff7a9d" }} />
              <div
                className="font-mono uppercase"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.32em",
                  color: "#ff7a9d",
                }}
              >
                Slett konto permanent
              </div>
            </div>

            <div style={{ color: "white", fontSize: 16, fontWeight: 600 }}>
              Er du sikker?
            </div>

            <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, lineHeight: 1.5 }}>
              Vi sletter profil, lagrede steder, betalingsmetoder og meldinger
              umiddelbart. Tur-historikk anonymiseres men beholdes i 5 år
              (Bokføringsloven §10). Du har 30 dagers angrefrist før permanent
              sletting.
            </div>

            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>
              Skriv <strong style={{ color: "white" }}>SLETT</strong> for å bekrefte:
            </div>

            <input
              type="text"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoCapitalize="characters"
              style={{
                padding: "12px 14px",
                borderRadius: 12,
                background: "rgba(0,0,0,0.3)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "white",
                fontSize: 15,
                outline: "none",
                letterSpacing: "0.1em",
              }}
            />

            {error && (
              <div style={{ color: "#ff7a9d", fontSize: 12 }}>{error}</div>
            )}

            <div className="flex gap-2" style={{ marginTop: 4 }}>
              <button
                onClick={onClose}
                disabled={busy}
                style={{
                  flex: 1,
                  padding: "14px",
                  borderRadius: 14,
                  background: "rgba(255,255,255,0.08)",
                  color: "white",
                  fontSize: 14,
                  fontWeight: 500,
                  border: "none",
                }}
              >
                Avbryt
              </button>
              <button
                onClick={submit}
                disabled={!canDelete || busy}
                style={{
                  flex: 1,
                  padding: "14px",
                  borderRadius: 14,
                  background: canDelete
                    ? "linear-gradient(135deg, #ff5577, #cc2244)"
                    : "rgba(255,122,157,0.18)",
                  color: canDelete ? "white" : "rgba(255,255,255,0.4)",
                  fontSize: 14,
                  fontWeight: 600,
                  border: "none",
                }}
              >
                {busy ? "Sletter…" : "Slett konto"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
