import { Home as HomeIcon, Briefcase, Dumbbell, Plus, Star } from "lucide-react";
import type { ReactNode } from "react";
import { SubScreen } from "../SubScreen";
import { GlassPanel } from "../GlassPanel";
import type { Screen } from "../../App";

type Place = {
  id: string;
  label: string;
  address: string;
  icon: ReactNode;
};

const PLACES: Place[] = [
  {
    id: "home",
    label: "Hjem",
    address: "Thorvald Meyers gate 41, Grünerløkka",
    icon: <HomeIcon className="w-4 h-4" />,
  },
  {
    id: "work",
    label: "Jobb",
    address: "Aker Brygge 12, 0250 Oslo",
    icon: <Briefcase className="w-4 h-4" />,
  },
  {
    id: "gym",
    label: "Treningssenter",
    address: "SATS Majorstuen · Kirkeveien 64B",
    icon: <Dumbbell className="w-4 h-4" />,
  },
  {
    id: "fav",
    label: "Maaemo",
    address: "Schweigaards gate 15B",
    icon: <Star className="w-4 h-4" />,
  },
];

export function SavedPlaces({ go }: { go: (s: Screen) => void }) {
  return (
    <SubScreen title="Lagrede steder" onBack={() => go("profile")}>
      <div className="space-y-2 pb-4">
        {PLACES.map((p) => (
          <GlassPanel key={p.id} className="rounded-2xl p-3.5 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "rgba(94,240,255,0.14)", color: "var(--aurora-cyan)" }}
            >
              {p.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white" style={{ fontSize: 13 }}>
                {p.label}
              </div>
              <div className="text-white/60 truncate" style={{ fontSize: 11 }}>
                {p.address}
              </div>
            </div>
            <button
              className="text-[var(--aurora-cyan)] font-display"
              style={{ fontSize: 11, letterSpacing: "0.08em" }}
            >
              Endre
            </button>
          </GlassPanel>
        ))}

        <button className="w-full glass-panel holo-border rounded-2xl px-4 py-3 flex items-center justify-center gap-2 active:scale-[0.98] transition">
          <Plus className="w-4 h-4 text-[var(--aurora-cyan)]" />
          <span className="text-white font-display" style={{ fontSize: 13 }}>
            Legg til nytt sted
          </span>
        </button>
      </div>
    </SubScreen>
  );
}
