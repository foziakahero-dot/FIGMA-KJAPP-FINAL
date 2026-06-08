import { useState } from "react";
import { Moon, Sun, Sparkles, Clock } from "lucide-react";
import { GlassPanel } from "./GlassPanel";
import { getTheme, setTheme, resolveTheme, type Theme } from "../lib/theme";

const options: { id: Theme; label: string; sub: string; icon: React.ReactNode }[] = [
  { id: "auto",    label: "Auto",    sub: "Følger klokka i Oslo", icon: <Clock className="w-4 h-4" /> },
  { id: "dark",    label: "Mørk",    sub: "Polar Midnight",       icon: <Moon className="w-4 h-4" /> },
  { id: "light",   label: "Lys",     sub: "Fjordlys",             icon: <Sun className="w-4 h-4" /> },
  { id: "premium", label: "Premium", sub: "Dypere aurora",        icon: <Sparkles className="w-4 h-4" /> },
];

export function ThemePicker({ accent = "var(--aurora-cyan)" }: { accent?: string }) {
  const [t, setT] = useState<Theme>(getTheme());
  const resolved = resolveTheme(t);
  const choose = (id: Theme) => { setT(id); setTheme(id); };

  return (
    <GlassPanel className="p-3">
      <div className="flex items-center justify-between mb-2.5">
        <div>
          <div className="text-white text-[12px]">Utseende</div>
          <div className="text-white/60 text-[10px]">
            Nå: {resolved === "light" ? "Fjordlys" : resolved === "premium" ? "Premium aurora" : "Polar Midnight"}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {options.map((o) => {
          const active = t === o.id;
          return (
            <button
              key={o.id}
              onClick={() => choose(o.id)}
              className={`rounded-xl py-2.5 px-3 text-left flex items-start gap-2 ${active ? "" : "glass-panel"}`}
              style={active
                ? { background: `${accent}22`, boxShadow: `inset 0 0 0 1.5px ${accent}` }
                : undefined}
            >
              <div className="mt-0.5" style={{ color: accent }}>{o.icon}</div>
              <div className="min-w-0">
                <div className="text-white text-[11.5px]">{o.label}</div>
                <div className="text-white/60 text-[9.5px] truncate">{o.sub}</div>
              </div>
            </button>
          );
        })}
      </div>
    </GlassPanel>
  );
}
