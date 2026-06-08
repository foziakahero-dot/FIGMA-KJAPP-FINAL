import { useState } from "react";
import { Building2, Car, FileText, CreditCard, ShieldCheck, Plus, Trash2, Upload, Check } from "lucide-react";
import { SubScreen } from "../SubScreen";
import { GlassPanel } from "../GlassPanel";
import type { Screen } from "../../App";

type Loyve = { id: string; loyveNr: string; regNr: string; merke: string; modell: string; aar: string; tier: "Standard" | "Premium" | "XL" | "Eco" };
type Docs = { firmaattest?: string; forsikring?: string; kjoreseddel?: string; konto?: string };

const STEPS = ["Bedrift", "Løyver", "Dokumenter", "Utbetaling", "Bekreft"];

const VIOLET = "#a06bff";
const CYAN = "#5ef0ff";

function StepHeader({ step }: { step: number }) {
  return (
    <div className="flex items-center justify-between mb-4">
      {STEPS.map((s, i) => (
        <div key={s} className="flex-1 flex flex-col items-center" style={{ gap: 4 }}>
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{
              background: i <= step ? VIOLET : "rgba(255,255,255,0.08)",
              color: i <= step ? "#05060f" : "rgba(255,255,255,0.4)",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 10,
            }}
          >
            {i < step ? <Check className="w-3 h-3" /> : i + 1}
          </div>
          <span
            className="font-mono uppercase"
            style={{ fontSize: 8, letterSpacing: "0.14em", color: i <= step ? "white" : "rgba(255,255,255,0.4)" }}
          >
            {s}
          </span>
        </div>
      ))}
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", maxLength }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; maxLength?: number }) {
  return (
    <label className="block">
      <div className="font-mono uppercase mb-1.5" style={{ fontSize: 9, letterSpacing: "0.18em", color: "rgba(255,255,255,0.6)" }}>{label}</div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full glass-panel rounded-xl px-3 py-2.5 text-white outline-none"
        style={{ fontSize: 13, background: "rgba(8,10,24,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}
      />
    </label>
  );
}

function DocUploadRow({ label, hint, value, onUpload }: { label: string; hint: string; value?: string; onUpload: () => void }) {
  return (
    <button
      onClick={onUpload}
      className="w-full glass-panel rounded-xl px-3 py-3 flex items-center gap-3 text-left active:scale-[0.99] transition"
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: value ? "rgba(94,240,255,0.16)" : "rgba(255,255,255,0.06)", color: value ? CYAN : "rgba(255,255,255,0.55)" }}
      >
        {value ? <Check className="w-4 h-4" /> : <Upload className="w-4 h-4" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-white" style={{ fontSize: 13 }}>{label}</div>
        <div className="text-white/55 truncate" style={{ fontSize: 10.5 }}>{value ?? hint}</div>
      </div>
    </button>
  );
}

export function LoyvehaverRegister({ go }: { go: (s: Screen) => void }) {
  const [step, setStep] = useState(0);

  const [orgnr, setOrgnr] = useState("");
  const [orgnavn, setOrgnavn] = useState("");
  const [adresse, setAdresse] = useState("");
  const [kontaktNavn, setKontaktNavn] = useState("");
  const [mobil, setMobil] = useState("");
  const [epost, setEpost] = useState("");

  const [loyver, setLoyver] = useState<Loyve[]>([
    { id: "1", loyveNr: "", regNr: "", merke: "", modell: "", aar: "", tier: "Standard" },
  ]);

  const [docs, setDocs] = useState<Docs>({});

  const [konto, setKonto] = useState("");
  const [kontohaver, setKontohaver] = useState("");

  const [samtykke, setSamtykke] = useState(false);
  const [sent, setSent] = useState(false);

  const lookupOrg = () => {
    // Mock Brønnøysund-oppslag
    if (orgnr.length === 9) {
      setOrgnavn("EKSEMPEL TAXI AS");
      setAdresse("Storgata 12, 0184 Oslo");
    }
  };

  const addLoyve = () => setLoyver([...loyver, { id: String(Date.now()), loyveNr: "", regNr: "", merke: "", modell: "", aar: "", tier: "Standard" }]);
  const removeLoyve = (id: string) => setLoyver(loyver.filter((l) => l.id !== id));
  const updateLoyve = (id: string, patch: Partial<Loyve>) => setLoyver(loyver.map((l) => (l.id === id ? { ...l, ...patch } : l)));

  const lookupReg = (id: string, regNr: string) => {
    if (regNr.length >= 7) updateLoyve(id, { merke: "Mercedes-Benz", modell: "E-Class", aar: "2023" });
  };

  const canNext = () => {
    if (step === 0) return orgnr.length === 9 && orgnavn && kontaktNavn && mobil.length >= 8 && epost.includes("@");
    if (step === 1) return loyver.every((l) => l.loyveNr && l.regNr);
    if (step === 2) return docs.firmaattest && docs.forsikring && docs.konto;
    if (step === 3) return konto.length === 11 && kontohaver.length > 1;
    if (step === 4) return samtykke;
    return false;
  };

  const submit = () => {
    setSent(true);
    setTimeout(() => go("signin"), 2400);
  };

  if (sent) {
    return (
      <SubScreen title="SØKNAD SENDT" onBack={() => go("signin")}>
        <div className="flex flex-col items-center justify-center pt-12" style={{ gap: 16 }}>
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, rgba(94,240,255,0.22), rgba(160,107,255,0.22))", border: "1px solid rgba(94,240,255,0.4)" }}
          >
            <Check className="w-9 h-9" style={{ color: CYAN }} />
          </div>
          <div className="text-white font-display text-center" style={{ fontSize: 18 }}>Søknad mottatt</div>
          <p className="text-white/65 text-center px-4" style={{ fontSize: 13, lineHeight: 1.5 }}>
            Vi ringer eller sender SMS innen 48 timer. Du kan logge inn med samme mobilnummer når søknaden er godkjent.
          </p>
        </div>
      </SubScreen>
    );
  }

  return (
    <SubScreen title="NY LØYVEHAVER" onBack={() => (step === 0 ? go("signin") : setStep(step - 1))}>
      <div className="pb-6">
        <StepHeader step={step} />

        {step === 0 && (
          <GlassPanel className="p-4 flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-1">
              <Building2 className="w-4 h-4" style={{ color: VIOLET }} />
              <span className="text-white font-display" style={{ fontSize: 14 }}>Bedrift</span>
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <Field label="Org.nr (9 siffer)" value={orgnr} onChange={setOrgnr} placeholder="999999999" maxLength={9} />
              </div>
              <button
                onClick={lookupOrg}
                className="self-end rounded-xl px-3 py-2.5 active:scale-95 transition"
                style={{ background: "rgba(160,107,255,0.18)", border: "1px solid rgba(160,107,255,0.35)", color: VIOLET, fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: "0.16em" }}
              >
                SLÅ OPP
              </button>
            </div>
            <Field label="Firmanavn" value={orgnavn} onChange={setOrgnavn} placeholder="Hentes fra Brønnøysund" />
            <Field label="Forretningsadresse" value={adresse} onChange={setAdresse} placeholder="Hentes automatisk" />
            <div className="h-px my-1" style={{ background: "rgba(255,255,255,0.08)" }} />
            <Field label="Kontaktperson" value={kontaktNavn} onChange={setKontaktNavn} placeholder="For- og etternavn" />
            <Field label="Mobilnummer" value={mobil} onChange={setMobil} placeholder="+47 9XX XX XXX" />
            <Field label="E-post" value={epost} onChange={setEpost} placeholder="navn@firma.no" type="email" />
          </GlassPanel>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-3">
            {loyver.map((l, i) => (
              <GlassPanel key={l.id} className="p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4" style={{ color: VIOLET }} />
                    <span className="text-white font-display" style={{ fontSize: 14 }}>Løyve #{i + 1}</span>
                  </div>
                  {loyver.length > 1 && (
                    <button onClick={() => removeLoyve(l.id)} className="text-white/55 active:scale-90 transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <Field label="Løyvenummer" value={l.loyveNr} onChange={(v) => updateLoyve(l.id, { loyveNr: v })} placeholder="OSL-0000" />
                <Field label="Reg.nr" value={l.regNr} onChange={(v) => { updateLoyve(l.id, { regNr: v.toUpperCase() }); lookupReg(l.id, v); }} placeholder="AB12345" />
                <div className="grid grid-cols-2 gap-2">
                  <Field label="Merke" value={l.merke} onChange={(v) => updateLoyve(l.id, { merke: v })} />
                  <Field label="Modell" value={l.modell} onChange={(v) => updateLoyve(l.id, { modell: v })} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Field label="Årsmodell" value={l.aar} onChange={(v) => updateLoyve(l.id, { aar: v })} maxLength={4} />
                  <label className="block">
                    <div className="font-mono uppercase mb-1.5" style={{ fontSize: 9, letterSpacing: "0.18em", color: "rgba(255,255,255,0.6)" }}>Tier</div>
                    <select
                      value={l.tier}
                      onChange={(e) => updateLoyve(l.id, { tier: e.target.value as Loyve["tier"] })}
                      className="w-full glass-panel rounded-xl px-3 py-2.5 text-white outline-none"
                      style={{ fontSize: 13, background: "rgba(8,10,24,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <option value="Eco">Eco</option>
                      <option value="Standard">Standard</option>
                      <option value="Premium">Premium</option>
                      <option value="XL">XL</option>
                    </select>
                  </label>
                </div>
              </GlassPanel>
            ))}
            <button
              onClick={addLoyve}
              className="glass-panel rounded-2xl p-3 flex items-center justify-center gap-2 active:scale-[0.99] transition"
              style={{ border: "1px dashed rgba(160,107,255,0.4)", color: VIOLET }}
            >
              <Plus className="w-4 h-4" />
              <span style={{ fontSize: 12 }}>Legg til løyve</span>
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2 mb-1">
              <FileText className="w-4 h-4" style={{ color: VIOLET }} />
              <span className="text-white font-display" style={{ fontSize: 14 }}>Dokumenter</span>
            </div>
            <p className="text-white/55 mb-1" style={{ fontSize: 11 }}>
              PDF eller foto. Lagres kryptert i kjapp-private bucket, kun synlig for deg + admin.
            </p>
            <DocUploadRow
              label="Firmaattest"
              hint="Hent fra Brønnøysund eller last opp PDF"
              value={docs.firmaattest}
              onUpload={() => setDocs({ ...docs, firmaattest: "firmaattest.pdf · 124 KB" })}
            />
            <DocUploadRow
              label="Forsikringsbevis (alle biler)"
              hint="Gyldig ansvars- og kasko"
              value={docs.forsikring}
              onUpload={() => setDocs({ ...docs, forsikring: "forsikring-2026.pdf · 312 KB" })}
            />
            <DocUploadRow
              label="Kjøreseddel-grunnlag"
              hint="Om du selv kjører som sjåfør"
              value={docs.kjoreseddel}
              onUpload={() => setDocs({ ...docs, kjoreseddel: "kjoreseddel.jpg · 1.2 MB" })}
            />
            <DocUploadRow
              label="Kontobekreftelse"
              hint="Kontoutskrift eller bank-bekreftelse"
              value={docs.konto}
              onUpload={() => setDocs({ ...docs, konto: "konto-bekreftelse.pdf · 88 KB" })}
            />
          </div>
        )}

        {step === 3 && (
          <GlassPanel className="p-4 flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-1">
              <CreditCard className="w-4 h-4" style={{ color: VIOLET }} />
              <span className="text-white font-display" style={{ fontSize: 14 }}>Utbetaling</span>
            </div>
            <p className="text-white/55" style={{ fontSize: 11 }}>
              Daglig utbetaling kl. 03:00 til denne kontoen. MVA spesifiseres i månedsrapport.
            </p>
            <Field label="Kontonummer (11 siffer)" value={konto} onChange={(v) => setKonto(v.replace(/\D/g, ""))} maxLength={11} placeholder="00000000000" />
            <Field label="Kontohaver" value={kontohaver} onChange={setKontohaver} placeholder="Må matche firmanavn" />
          </GlassPanel>
        )}

        {step === 4 && (
          <GlassPanel holo className="p-4 flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-4 h-4" style={{ color: CYAN }} />
              <span className="text-white font-display" style={{ fontSize: 14 }}>Samtykke og bekreftelse</span>
            </div>
            <div className="rounded-xl p-3" style={{ background: "rgba(8,10,24,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="text-white/85" style={{ fontSize: 12, lineHeight: 1.5 }}>
                <strong>{orgnavn || "Bedrift"}</strong> · {orgnr}<br />
                {loyver.length} løyve(r) · {Object.keys(docs).length} dokument(er)<br />
                Utbetaling til: {konto || "(ikke utfylt)"}
              </div>
            </div>
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input type="checkbox" checked={samtykke} onChange={(e) => setSamtykke(e.target.checked)} className="mt-0.5" />
              <span className="text-white/75" style={{ fontSize: 11.5, lineHeight: 1.5 }}>
                Jeg bekrefter at opplysningene er korrekte, og samtykker til at KJAPP behandler dataene i tråd med personvernerklæringen. Dokumenter lagres i 5 år (Bokføringsloven §10).
              </span>
            </label>
          </GlassPanel>
        )}

        <div className="mt-5 flex gap-2">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 glass-panel rounded-2xl py-3 text-white active:scale-[0.98] transition"
              style={{ fontSize: 13 }}
            >
              Tilbake
            </button>
          )}
          {step < STEPS.length - 1 ? (
            <button
              onClick={() => canNext() && setStep(step + 1)}
              disabled={!canNext()}
              className="flex-1 rounded-2xl py-3 active:scale-[0.98] transition"
              style={{
                background: canNext() ? "linear-gradient(135deg, #5ef0ff, #a06bff)" : "rgba(255,255,255,0.08)",
                color: canNext() ? "#05060f" : "rgba(255,255,255,0.35)",
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: 13,
                letterSpacing: "0.06em",
                fontWeight: 600,
                boxShadow: canNext() ? "0 8px 28px -8px rgba(160,107,255,0.55)" : "none",
              }}
            >
              Neste →
            </button>
          ) : (
            <button
              onClick={() => canNext() && submit()}
              disabled={!canNext()}
              className="flex-1 rounded-2xl py-3 active:scale-[0.98] transition"
              style={{
                background: canNext() ? "linear-gradient(135deg, #5ef0ff, #a06bff)" : "rgba(255,255,255,0.08)",
                color: canNext() ? "#05060f" : "rgba(255,255,255,0.35)",
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: 13,
                letterSpacing: "0.06em",
                fontWeight: 600,
              }}
            >
              Send til godkjenning
            </button>
          )}
        </div>
      </div>
    </SubScreen>
  );
}
