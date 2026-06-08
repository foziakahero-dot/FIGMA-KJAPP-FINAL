import { useState } from "react";
import { Receipt, MapPin, Calendar } from "lucide-react";
import { SubScreen } from "../SubScreen";
import { GlassPanel } from "../GlassPanel";
import type { Screen } from "../../App";

type Tab = "kommende" | "tidligere";

type Ride = {
  id: string;
  place: string;
  when: string;
  time: string;
  price?: number;
  driver: string;
  car: string;
  status?: "kommende" | "ferdig";
};

const UPCOMING: Ride[] = [
  {
    id: "u1",
    place: "Maaemo, Schweigaards gate",
    when: "I kveld",
    time: "19:30",
    driver: "Aurora velger sjåfør",
    car: "Kjapp Premium",
    status: "kommende",
  },
  {
    id: "u2",
    place: "Gardermoen",
    when: "Lørdag 14. juni",
    time: "17:05",
    driver: "Bekreftet · Jonas B.",
    car: "Kjapp Eco · Tesla M3",
    status: "kommende",
  },
];

const PAST: Ride[] = [
  {
    id: "p1",
    place: "Operaen → Hjem",
    when: "Lørdag",
    time: "23:42",
    price: 245,
    driver: "Jonas Berg · 4.99★",
    car: "Mercedes EQS",
    status: "ferdig",
  },
  {
    id: "p2",
    place: "Tøyen T → Gardermoen",
    when: "Mandag",
    time: "06:18",
    price: 689,
    driver: "Sara Lien · 4.96★",
    car: "Tesla M3",
    status: "ferdig",
  },
  {
    id: "p3",
    place: "Hjem → Aker Brygge",
    when: "I går",
    time: "08:12",
    price: 219,
    driver: "Petter A. · 4.92★",
    car: "VW ID.4",
    status: "ferdig",
  },
];

export function RideHistory({ go }: { go: (s: Screen) => void }) {
  const [tab, setTab] = useState<Tab>("kommende");
  const rides = tab === "kommende" ? UPCOMING : PAST;

  return (
    <SubScreen title="Mine turer" onBack={() => go("profile")}>
      {/* Tabs */}
      <div className="glass-panel rounded-full p-1 flex items-center mb-4">
        <TabBtn label="Kommende" active={tab === "kommende"} onClick={() => setTab("kommende")} />
        <TabBtn label="Tidligere" active={tab === "tidligere"} onClick={() => setTab("tidligere")} />
      </div>

      <div className="space-y-2 pb-4">
        {rides.map((r) => (
          <GlassPanel key={r.id} className="rounded-2xl p-3.5">
            <div className="flex items-start gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background:
                    r.status === "kommende"
                      ? "rgba(94,240,255,0.14)"
                      : "rgba(160,107,255,0.18)",
                  color:
                    r.status === "kommende" ? "var(--aurora-cyan)" : "var(--aurora-violet)",
                }}
              >
                {r.status === "kommende" ? (
                  <Calendar className="w-4 h-4" />
                ) : (
                  <MapPin className="w-4 h-4" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white truncate" style={{ fontSize: 13 }}>
                  {r.place}
                </div>
                <div className="text-white/65 mt-0.5" style={{ fontSize: 11 }}>
                  {r.when} · {r.time}
                </div>
                <div className="text-white/50 mt-0.5 truncate" style={{ fontSize: 10.5 }}>
                  {r.car} · {r.driver}
                </div>
              </div>
              <div className="text-right shrink-0">
                {r.price ? (
                  <div className="text-white font-display" style={{ fontSize: 13 }}>
                    {r.price} kr
                  </div>
                ) : (
                  <span
                    className="px-2 py-0.5 rounded-full font-mono"
                    style={{
                      background: "rgba(94,240,255,0.16)",
                      color: "var(--aurora-cyan)",
                      fontSize: 9,
                      letterSpacing: "0.1em",
                    }}
                  >
                    Planlagt
                  </span>
                )}
              </div>
            </div>
            {r.status === "ferdig" && (
              <button
                className="mt-3 w-full glass-panel rounded-xl py-2 flex items-center justify-center gap-1.5"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <Receipt className="w-3.5 h-3.5 text-white/80" />
                <span className="text-white/85" style={{ fontSize: 12 }}>
                  Last ned kvittering
                </span>
              </button>
            )}
          </GlassPanel>
        ))}
      </div>
    </SubScreen>
  );
}

function TabBtn({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 rounded-full py-2 transition font-display ${
        active ? "text-white" : "text-white/55"
      }`}
      style={{
        fontSize: 12,
        background: active ? "rgba(94,240,255,0.12)" : "transparent",
        boxShadow: active ? "inset 0 0 0 1px rgba(94,240,255,0.28)" : "none",
      }}
    >
      {label}
    </button>
  );
}
