import { useState } from "react";
import { Car, Users, Banknote, FileWarning, UserPlus, ChevronRight, TrendingUp, Send } from "lucide-react";
import { SubScreen } from "../SubScreen";
import { GlassPanel } from "../GlassPanel";
import type { Screen } from "../../App";

const FLEET = {
  name: "EKSEMPEL TAXI AS",
  orgnr: "999888777",
  todayNok: 12480,
  weekNok: 84320,
  monthNok: 312500,
};

const VEHICLES = [
  { id: "1", plate: "AB12345", model: "Mercedes E-Class", tier: "Premium", status: "online", driver: "Mathilde H.", insuranceDays: 92 },
  { id: "2", plate: "CD67890", model: "Tesla Model Y", tier: "Eco", status: "online", driver: "Jonas R.", insuranceDays: 18 },
  { id: "3", plate: "EF11122", model: "Toyota Prius", tier: "Standard", status: "offline", driver: "Ledig", insuranceDays: 240 },
  { id: "4", plate: "GH33344", model: "VW Caravelle", tier: "XL", status: "online", driver: "Anders M.", insuranceDays: 3 },
];

const DRIVERS = [
  { id: "1", name: "Mathilde Hansen", rating: 4.92, trips: 1284, status: "online" },
  { id: "2", name: "Jonas Rasch", rating: 4.87, trips: 642, status: "online" },
  { id: "3", name: "Anders Møller", rating: 4.79, trips: 318, status: "online" },
  { id: "4", name: "Kari Olsen", rating: 4.95, trips: 89, status: "pending" },
];

const VIOLET = "#a06bff";
const CYAN = "#5ef0ff";
const AMBER = "#ffb547";

type Tab = "oversikt" | "biler" | "sjafor" | "okonomi";

export function FleetDashboard({ go }: { go: (s: Screen) => void }) {
  const [tab, setTab] = useState<Tab>("oversikt");
  const [inviteOpen, setInviteOpen] = useState(false);
  const [invitePhone, setInvitePhone] = useState("");

  const sendInvite = () => {
    setInviteOpen(false);
    setInvitePhone("");
  };

  return (
    <SubScreen title="FLÅTE-PANEL" onBack={() => go("profile")}>
      <div className="pb-6">
        <GlassPanel holo className="p-4 mb-3">
          <div className="text-white font-display" style={{ fontSize: 16 }}>{FLEET.name}</div>
          <div className="text-white/55 font-mono" style={{ fontSize: 10, letterSpacing: "0.14em", marginTop: 2 }}>
            ORGNR · {FLEET.orgnr}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <Stat label="I dag" value={`${(FLEET.todayNok / 1000).toFixed(1)}k`} accent={CYAN} />
            <Stat label="Denne uke" value={`${(FLEET.weekNok / 1000).toFixed(1)}k`} accent={VIOLET} />
            <Stat label="Denne mnd" value={`${(FLEET.monthNok / 1000).toFixed(0)}k`} accent={AMBER} />
          </div>
        </GlassPanel>

        <Tabs tab={tab} onChange={setTab} />

        {tab === "oversikt" && (
          <div className="mt-3 flex flex-col gap-3">
            <GlassPanel className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-display" style={{ fontSize: 13 }}>Status nå</span>
                <TrendingUp className="w-4 h-4" style={{ color: CYAN }} />
              </div>
              <Row icon={<Car className="w-4 h-4" />} label="Biler online" value={`${VEHICLES.filter((v) => v.status === "online").length} av ${VEHICLES.length}`} />
              <Row icon={<Users className="w-4 h-4" />} label="Sjåfører aktive" value={`${DRIVERS.filter((d) => d.status === "online").length}`} />
              <Row icon={<Banknote className="w-4 h-4" />} label="Turer i dag" value="48" />
            </GlassPanel>
            <GlassPanel className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileWarning className="w-4 h-4" style={{ color: AMBER }} />
                <span className="text-white font-display" style={{ fontSize: 13 }}>Dokumenter som utløper</span>
              </div>
              {VEHICLES.filter((v) => v.insuranceDays < 30).map((v) => (
                <div key={v.id} className="flex items-center justify-between py-1.5">
                  <div>
                    <div className="text-white" style={{ fontSize: 12 }}>{v.plate} — Forsikring</div>
                    <div className="text-white/55 font-mono" style={{ fontSize: 10 }}>{v.model}</div>
                  </div>
                  <div className="font-mono" style={{ fontSize: 11, color: v.insuranceDays < 7 ? "#ff6b6b" : AMBER }}>
                    {v.insuranceDays}d
                  </div>
                </div>
              ))}
            </GlassPanel>
          </div>
        )}

        {tab === "biler" && (
          <div className="mt-3 flex flex-col gap-2">
            {VEHICLES.map((v) => (
              <GlassPanel key={v.id} className="p-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(94,240,255,0.12)", color: CYAN }}>
                  <Car className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-mono" style={{ fontSize: 12 }}>{v.plate}</span>
                    <span
                      className="px-1.5 rounded-full font-mono uppercase"
                      style={{ fontSize: 8, letterSpacing: "0.14em", background: "rgba(160,107,255,0.18)", color: VIOLET }}
                    >
                      {v.tier}
                    </span>
                  </div>
                  <div className="text-white/65 truncate" style={{ fontSize: 11 }}>{v.model} · {v.driver}</div>
                </div>
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: v.status === "online" ? CYAN : "rgba(255,255,255,0.25)", boxShadow: v.status === "online" ? `0 0 8px ${CYAN}` : "none" }}
                />
              </GlassPanel>
            ))}
            <button
              className="glass-panel rounded-2xl p-3 flex items-center justify-center gap-2 active:scale-[0.99] transition"
              style={{ border: "1px dashed rgba(160,107,255,0.4)", color: VIOLET, fontSize: 12 }}
            >
              + Legg til bil/løyve
            </button>
          </div>
        )}

        {tab === "sjafor" && (
          <div className="mt-3 flex flex-col gap-2">
            <button
              onClick={() => setInviteOpen(true)}
              className="rounded-2xl p-3 flex items-center justify-center gap-2 active:scale-[0.98] transition"
              style={{ background: "linear-gradient(135deg, #5ef0ff, #a06bff)", color: "#05060f", fontFamily: "Space Grotesk, sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: "0.06em" }}
            >
              <UserPlus className="w-4 h-4" />
              INVITER SJÅFØR
            </button>
            {DRIVERS.map((d) => (
              <GlassPanel key={d.id} className="p-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: "var(--aurora-gradient, linear-gradient(135deg, #5ef0ff, #a06bff))", color: "#05060f", fontFamily: "Space Grotesk", fontSize: 13 }}>
                  {d.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white truncate" style={{ fontSize: 13 }}>{d.name}</div>
                  <div className="text-white/55 font-mono" style={{ fontSize: 10 }}>★ {d.rating} · {d.trips} turer</div>
                </div>
                {d.status === "pending" ? (
                  <span className="font-mono uppercase px-2 py-0.5 rounded-full" style={{ fontSize: 8, letterSpacing: "0.14em", background: "rgba(255,181,71,0.18)", color: AMBER }}>
                    Venter
                  </span>
                ) : (
                  <div className="w-2 h-2 rounded-full" style={{ background: CYAN, boxShadow: `0 0 8px ${CYAN}` }} />
                )}
              </GlassPanel>
            ))}

            {inviteOpen && (
              <GlassPanel holo className="p-4 mt-2 flex flex-col gap-3">
                <div className="text-white font-display" style={{ fontSize: 13 }}>Send SMS-invitasjon</div>
                <input
                  type="tel"
                  value={invitePhone}
                  onChange={(e) => setInvitePhone(e.target.value)}
                  placeholder="+47 9XX XX XXX"
                  className="w-full rounded-xl px-3 py-2.5 text-white outline-none"
                  style={{ fontSize: 13, background: "rgba(8,10,24,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}
                />
                <div className="flex gap-2">
                  <button onClick={() => setInviteOpen(false)} className="flex-1 glass-panel rounded-xl py-2.5 text-white" style={{ fontSize: 12 }}>Avbryt</button>
                  <button
                    onClick={sendInvite}
                    disabled={invitePhone.length < 8}
                    className="flex-1 rounded-xl py-2.5 flex items-center justify-center gap-2"
                    style={{
                      background: invitePhone.length >= 8 ? "linear-gradient(135deg, #5ef0ff, #a06bff)" : "rgba(255,255,255,0.08)",
                      color: invitePhone.length >= 8 ? "#05060f" : "rgba(255,255,255,0.35)",
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    <Send className="w-3.5 h-3.5" />
                    Send
                  </button>
                </div>
                <p className="text-white/55" style={{ fontSize: 10.5 }}>
                  Sjåføren får en SMS med deep-link til onboarding, forhåndsfylt med flåte-ID for {FLEET.name}.
                </p>
              </GlassPanel>
            )}
          </div>
        )}

        {tab === "okonomi" && (
          <div className="mt-3 flex flex-col gap-2">
            <GlassPanel className="p-4">
              <div className="text-white font-display mb-2" style={{ fontSize: 13 }}>Per bil i dag</div>
              {VEHICLES.map((v) => (
                <div key={v.id} className="flex items-center justify-between py-1.5">
                  <div>
                    <div className="text-white font-mono" style={{ fontSize: 12 }}>{v.plate}</div>
                    <div className="text-white/55" style={{ fontSize: 10.5 }}>{v.driver}</div>
                  </div>
                  <div className="text-white font-mono" style={{ fontSize: 12 }}>
                    {Math.round(2000 + Math.random() * 2500).toLocaleString("no")} kr
                  </div>
                </div>
              ))}
            </GlassPanel>
            <GlassPanel className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-display" style={{ fontSize: 13 }}>MVA-rapport · juni</div>
                  <div className="text-white/55" style={{ fontSize: 10.5 }}>12% transport · Bokføringsloven §10</div>
                </div>
                <ChevronRight className="w-4 h-4 text-white/55" />
              </div>
            </GlassPanel>
            <button className="glass-panel rounded-2xl p-3 flex items-center justify-center gap-2 active:scale-[0.99] transition" style={{ color: CYAN, fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.06em" }}>
              LAST NED CSV
            </button>
          </div>
        )}
      </div>
    </SubScreen>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="glass-panel rounded-xl py-2 text-center">
      <div className="font-display" style={{ fontSize: 16, color: accent }}>{value}</div>
      <div className="text-white/60 font-mono uppercase mt-0.5" style={{ fontSize: 8, letterSpacing: "0.16em" }}>{label}</div>
    </div>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 py-1.5">
      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(94,240,255,0.12)", color: CYAN }}>{icon}</div>
      <span className="flex-1 text-white/85" style={{ fontSize: 12 }}>{label}</span>
      <span className="text-white font-mono" style={{ fontSize: 12 }}>{value}</span>
    </div>
  );
}

function Tabs({ tab, onChange }: { tab: Tab; onChange: (t: Tab) => void }) {
  const items: { id: Tab; label: string }[] = [
    { id: "oversikt", label: "Oversikt" },
    { id: "biler", label: "Biler" },
    { id: "sjafor", label: "Sjåfør" },
    { id: "okonomi", label: "Økonomi" },
  ];
  return (
    <div className="glass-panel rounded-2xl p-1 grid grid-cols-4 gap-1">
      {items.map((it) => (
        <button
          key={it.id}
          onClick={() => onChange(it.id)}
          className="rounded-xl py-2 transition"
          style={{
            background: tab === it.id ? "linear-gradient(135deg, rgba(94,240,255,0.18), rgba(160,107,255,0.18))" : "transparent",
            color: tab === it.id ? "white" : "rgba(255,255,255,0.6)",
            fontSize: 11,
            fontFamily: "Space Grotesk, sans-serif",
          }}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}
