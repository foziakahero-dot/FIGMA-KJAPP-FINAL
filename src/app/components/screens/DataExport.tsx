import { useState } from "react";
import { Download, Check, AlertTriangle } from "lucide-react";
import { LegalScreen, H, P } from "../legal/LegalScreen";
import { mGet } from "../../lib/makeServer";
import type { Screen } from "../../App";

export function DataExport({ go }: { go: (s: Screen) => void }) {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const download = async () => {
    setBusy(true);
    setError(null);
    try {
      const data = await mGet<any>("/gdpr/export");
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `kjapp-mine-data-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setDone(true);
    } catch (e: any) {
      setError(e?.message || "Kunne ikke laste ned data. Prøv igjen senere.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <LegalScreen
      title="Last ned mine data"
      subtitle="GDPR Art. 15 — Rett til innsyn"
      onBack={() => go("settings")}
    >
      <P>
        Du har rett til å få en kopi av alle personopplysninger vi har lagret om
        deg. Filen leveres som JSON og inkluderer profil, tur-historikk,
        betalingsmetoder (anonymisert), meldinger og samtykke-logg.
      </P>

      <H>Hva inkluderes</H>
      <P>
        Profil, lagrede steder, tur-historikk (hentepunkt, leveringspunkt,
        pris, MVA), meldinger, samtykker, og payment-method-referanser. Sensitive
        kortdata lagres aldri hos oss.
      </P>

      <button
        onClick={download}
        disabled={busy}
        className="active:scale-[0.98] transition"
        style={{
          marginTop: 16,
          width: "100%",
          padding: "14px 18px",
          borderRadius: 14,
          background: done
            ? "rgba(94,240,255,0.18)"
            : "linear-gradient(135deg, #5ef0ff, #a06bff)",
          color: done ? "#5ef0ff" : "#04060f",
          fontSize: 15,
          fontWeight: 600,
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        {done ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
        {busy ? "Henter data…" : done ? "Nedlasting startet" : "Last ned mine data"}
      </button>

      {error && (
        <div
          style={{
            marginTop: 12,
            padding: 12,
            borderRadius: 12,
            background: "rgba(255,122,157,0.1)",
            color: "#ff7a9d",
            fontSize: 12,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </LegalScreen>
  );
}
