import { useState } from "react";
import { Check, X, FileText, Upload, ChevronRight, Building2, AlertCircle } from "lucide-react";
import { SubScreen } from "../SubScreen";
import { GlassPanel } from "../GlassPanel";
import type { Screen } from "../../App";

type AppStatus = "pending" | "approved" | "rejected";
type Application = {
  id: string;
  orgnr: string;
  orgnavn: string;
  kontakt: string;
  mobil: string;
  loyver: number;
  docs: number;
  submittedAt: string;
  status: AppStatus;
};

const INITIAL: Application[] = [
  { id: "a1", orgnr: "923456789", orgnavn: "OSLO PREMIUM TAXI AS", kontakt: "Lars Eriksen", mobil: "+47 901 23 456", loyver: 3, docs: 4, submittedAt: "2 t siden", status: "pending" },
  { id: "a2", orgnr: "918273645", orgnavn: "FJORD MOBILITY AS", kontakt: "Ingrid Solberg", mobil: "+47 934 56 789", loyver: 1, docs: 4, submittedAt: "5 t siden", status: "pending" },
  { id: "a3", orgnr: "987654321", orgnavn: "NORD TRANSPORT AS", kontakt: "Petter Haugen", mobil: "+47 902 11 223", loyver: 5, docs: 3, submittedAt: "i går", status: "pending" },
  { id: "a4", orgnr: "912121212", orgnavn: "AURORA RIDE AS", kontakt: "Maja Knudsen", mobil: "+47 988 77 665", loyver: 2, docs: 4, submittedAt: "i går", status: "pending" },
];

const VIOLET = "#a06bff";
const CYAN = "#5ef0ff";
const AMBER = "#ffb547";

export function SuperAdminInbox({ go }: { go: (s: Screen) => void }) {
  const [apps, setApps] = useState<Application[]>(INITIAL);
  const [selected, setSelected] = useState<Application | null>(null);
  const [csvOpen, setCsvOpen] = useState(false);

  const pending = apps.filter((a) => a.status === "pending");

  const approve = (id: string) => {
    setApps(apps.map((a) => (a.id === id ? { ...a, status: "approved" } : a)));
    setSelected(null);
  };
  const reject = (id: string) => {
    setApps(apps.map((a) => (a.id === id ? { ...a, status: "rejected" } : a)));
    setSelected(null);
  };

  if (selected) {
    return (
      <SubScreen title="SØKNAD" onBack={() => setSelected(null)}>
        <div className="pb-6 flex flex-col gap-3">
          <GlassPanel holo className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, rgba(94,240,255,0.18), rgba(160,107,255,0.18))", border: "1px solid rgba(94,240,255,0.35)" }}>
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-display" style={{ fontSize: 15 }}>{selected.orgnavn}</div>
                <div className="text-white/55 font-mono" style={{ fontSize: 10, letterSpacing: "0.14em", marginTop: 2 }}>
                  ORGNR · {selected.orgnr}
                </div>
                <div className="text-white/65 mt-1" style={{ fontSize: 12 }}>
                  {selected.kontakt} · {selected.mobil}
                </div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="glass-panel rounded-xl p-2 text-center">
                <div className="font-display" style={{ fontSize: 16, color: VIOLET }}>{selected.loyver}</div>
                <div className="text-white/60 font-mono uppercase" style={{ fontSize: 8, letterSpacing: "0.16em" }}>Løyver</div>
              </div>
              <div className="glass-panel rounded-xl p-2 text-center">
                <div className="font-display" style={{ fontSize: 16, color: CYAN }}>{selected.docs}/4</div>
                <div className="text-white/60 font-mono uppercase" style={{ fontSize: 8, letterSpacing: "0.16em" }}>Dokumenter</div>
              </div>
            </div>
          </GlassPanel>

          <GlassPanel className="p-4">
            <div className="text-white font-display mb-2" style={{ fontSize: 13 }}>Dokumenter</div>
            {["Firmaattest", "Forsikringsbevis", "Kjøreseddel-grunnlag", "Kontobekreftelse"].map((d, i) => (
              <button key={d} className="w-full flex items-center gap-3 py-2 active:scale-[0.99] transition">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: i < selected.docs ? "rgba(94,240,255,0.12)" : "rgba(255,181,71,0.12)", color: i < selected.docs ? CYAN : AMBER }}>
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <span className="flex-1 text-left text-white/85" style={{ fontSize: 12 }}>{d}</span>
                {i < selected.docs ? (
                  <span className="font-mono uppercase" style={{ fontSize: 9, letterSpacing: "0.14em", color: CYAN }}>Vedlagt</span>
                ) : (
                  <span className="font-mono uppercase" style={{ fontSize: 9, letterSpacing: "0.14em", color: AMBER }}>Mangler</span>
                )}
                <ChevronRight className="w-3.5 h-3.5 text-white/45" />
              </button>
            ))}
          </GlassPanel>

          <div className="flex gap-2">
            <button
              onClick={() => reject(selected.id)}
              className="flex-1 rounded-2xl py-3 flex items-center justify-center gap-2 active:scale-[0.98] transition"
              style={{ background: "rgba(255,107,107,0.12)", border: "1px solid rgba(255,107,107,0.35)", color: "#ff6b6b", fontFamily: "Space Grotesk, sans-serif", fontSize: 13, fontWeight: 600 }}
            >
              <X className="w-4 h-4" />
              Avslå
            </button>
            <button
              onClick={() => approve(selected.id)}
              className="flex-1 rounded-2xl py-3 flex items-center justify-center gap-2 active:scale-[0.98] transition"
              style={{ background: "linear-gradient(135deg, #5ef0ff, #a06bff)", color: "#05060f", fontFamily: "Space Grotesk, sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: "0.06em", boxShadow: "0 8px 28px -8px rgba(94,240,255,0.55)" }}
            >
              <Check className="w-4 h-4" />
              Godkjenn
            </button>
          </div>
        </div>
      </SubScreen>
    );
  }

  return (
    <SubScreen title="SUPER-ADMIN" onBack={() => go("profile")}>
      <div className="pb-6">
        <GlassPanel holo className="p-4 mb-3 flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(94,240,255,0.22), rgba(160,107,255,0.22))", border: "1px solid rgba(160,107,255,0.4)" }}>
            <AlertCircle className="w-5 h-5" style={{ color: VIOLET }} />
          </div>
          <div className="flex-1">
            <div className="text-white font-display" style={{ fontSize: 16 }}>{pending.length} venter på godkjenning</div>
            <div className="text-white/55" style={{ fontSize: 11 }}>30 på venteliste fra CSV-import</div>
          </div>
        </GlassPanel>

        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setCsvOpen(!csvOpen)}
            className="flex-1 glass-panel rounded-2xl py-2.5 flex items-center justify-center gap-2 active:scale-[0.98] transition"
            style={{ color: VIOLET, fontFamily: "JetBrains Mono, monospace", fontSize: 10.5, letterSpacing: "0.16em" }}
          >
            <Upload className="w-3.5 h-3.5" />
            CSV-IMPORT
          </button>
          <button
            className="flex-1 glass-panel rounded-2xl py-2.5 flex items-center justify-center gap-2 active:scale-[0.98] transition"
            style={{ color: CYAN, fontFamily: "JetBrains Mono, monospace", fontSize: 10.5, letterSpacing: "0.16em" }}
          >
            BULK-MODUS
          </button>
        </div>

        {csvOpen && (
          <GlassPanel className="p-4 mb-3 flex flex-col gap-2">
            <div className="text-white/85" style={{ fontSize: 12 }}>
              Last opp .csv med kolonner: <span className="font-mono" style={{ color: CYAN }}>orgnr, kontakt, mobil, epost</span>
            </div>
            <button className="rounded-xl py-2.5 flex items-center justify-center gap-2 active:scale-[0.98] transition"
              style={{ background: "rgba(160,107,255,0.18)", border: "1px dashed rgba(160,107,255,0.4)", color: VIOLET, fontSize: 12 }}
            >
              <Upload className="w-3.5 h-3.5" />
              Velg .csv-fil
            </button>
            <div className="text-white/55" style={{ fontSize: 10.5 }}>
              Systemet sender SMS-invitasjon til hver mottaker med ferdig-utfylt registreringsskjema.
            </div>
          </GlassPanel>
        )}

        <div className="flex flex-col gap-2">
          {pending.map((a) => (
            <button
              key={a.id}
              onClick={() => setSelected(a)}
              className="glass-panel rounded-2xl p-3 flex items-center gap-3 text-left active:scale-[0.99] transition"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(160,107,255,0.12)", color: VIOLET }}>
                <Building2 className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-white truncate" style={{ fontSize: 13 }}>{a.orgnavn}</span>
                </div>
                <div className="text-white/55 truncate" style={{ fontSize: 10.5 }}>
                  {a.kontakt} · {a.loyver} løyver · {a.submittedAt}
                </div>
              </div>
              <span
                className="font-mono uppercase px-2 py-0.5 rounded-full shrink-0"
                style={{ fontSize: 8, letterSpacing: "0.14em", background: a.docs < 4 ? "rgba(255,181,71,0.18)" : "rgba(94,240,255,0.18)", color: a.docs < 4 ? AMBER : CYAN }}
              >
                {a.docs}/4
              </span>
              <ChevronRight className="w-4 h-4 text-white/45" />
            </button>
          ))}
        </div>

        {apps.filter((a) => a.status !== "pending").length > 0 && (
          <div className="mt-4">
            <div className="font-mono uppercase mb-2" style={{ fontSize: 9, letterSpacing: "0.22em", color: "rgba(255,255,255,0.45)" }}>Behandlet i dag</div>
            <div className="flex flex-col gap-2">
              {apps.filter((a) => a.status !== "pending").map((a) => (
                <div key={a.id} className="glass-panel rounded-2xl p-3 flex items-center gap-3 opacity-60">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: a.status === "approved" ? "rgba(94,240,255,0.12)" : "rgba(255,107,107,0.12)", color: a.status === "approved" ? CYAN : "#ff6b6b" }}>
                    {a.status === "approved" ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white truncate" style={{ fontSize: 12 }}>{a.orgnavn}</div>
                    <div className="text-white/55" style={{ fontSize: 10.5 }}>{a.status === "approved" ? "Godkjent" : "Avslått"}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </SubScreen>
  );
}
