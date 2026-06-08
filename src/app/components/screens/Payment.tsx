import { Check, Plus, CreditCard, Receipt, Building2 } from "lucide-react";
import type { ReactNode } from "react";
import { SubScreen } from "../SubScreen";
import { GlassPanel } from "../GlassPanel";
import type { Screen } from "../../App";

type Method = {
  id: string;
  label: string;
  sub: string;
  badge?: string;
  primary?: boolean;
  icon: ReactNode;
};

const METHODS: Method[] = [
  {
    id: "vipps",
    label: "Vipps",
    sub: "•• 8421 · Mathilde",
    badge: "Anbefalt i Norge",
    primary: true,
    icon: (
      <span
        className="px-2 py-0.5 rounded text-white font-display"
        style={{ background: "#ff5b24", fontSize: 10, letterSpacing: "0.04em" }}
      >
        vipps
      </span>
    ),
  },
  {
    id: "apple",
    label: "Apple Pay",
    sub: "iPhone · Face ID",
    icon: <CreditCard className="w-4 h-4 text-white" />,
  },
  {
    id: "google",
    label: "Google Pay",
    sub: "Knyttet til Gmail",
    icon: <CreditCard className="w-4 h-4 text-white" />,
  },
  {
    id: "card",
    label: "Bankkort",
    sub: "Visa •••• 4242 · Utløper 08/28",
    icon: <CreditCard className="w-4 h-4 text-white" />,
  },
  {
    id: "biz",
    label: "Faktura / bedrift",
    sub: "Kommer snart",
    icon: <Building2 className="w-4 h-4 text-white/70" />,
  },
];

export function Payment({ go }: { go: (s: Screen) => void }) {
  return (
    <SubScreen title="Betaling" onBack={() => go("profile")}>
      <div className="space-y-4 pb-4">
        <p className="text-white/65 leading-snug" style={{ fontSize: 12.5 }}>
          Administrer betalingsmåter og kvitteringer.
        </p>

        <div
          className="text-white/65 font-display uppercase"
          style={{ fontSize: 10, letterSpacing: "0.22em" }}
        >
          Betalingsmåter
        </div>

        <div className="space-y-2">
          {METHODS.map((m) => (
            <GlassPanel
              key={m.id}
              className={`rounded-2xl p-3.5 flex items-center gap-3 ${
                m.primary ? "holo-border" : ""
              }`}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(255,255,255,0.05)" }}
              >
                {m.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-white" style={{ fontSize: 13 }}>
                    {m.label}
                  </span>
                  {m.badge && (
                    <span
                      className="px-1.5 py-0.5 rounded-full font-mono"
                      style={{
                        background: "rgba(94,240,255,0.14)",
                        color: "var(--aurora-cyan)",
                        fontSize: 9,
                        letterSpacing: "0.1em",
                      }}
                    >
                      {m.badge}
                    </span>
                  )}
                </div>
                <div className="text-white/60 mt-0.5 truncate" style={{ fontSize: 11 }}>
                  {m.sub}
                </div>
              </div>
              {m.primary && (
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "rgba(94,240,255,0.16)" }}
                >
                  <Check className="w-3.5 h-3.5 text-[var(--aurora-cyan)]" strokeWidth={2.5} />
                </div>
              )}
            </GlassPanel>
          ))}
        </div>

        <button className="w-full glass-panel holo-border rounded-2xl px-4 py-3 flex items-center justify-center gap-2 active:scale-[0.98] transition">
          <Plus className="w-4 h-4 text-[var(--aurora-cyan)]" />
          <span className="text-white font-display" style={{ fontSize: 13 }}>
            Legg til betalingsmåte
          </span>
        </button>

        <div className="pt-2">
          <div
            className="text-white/65 font-display uppercase mb-2"
            style={{ fontSize: 10, letterSpacing: "0.22em" }}
          >
            Kvitteringer
          </div>
          <GlassPanel className="rounded-2xl p-3.5 flex items-center gap-3">
            <Receipt className="w-4 h-4 text-white/70" />
            <div className="flex-1">
              <div className="text-white" style={{ fontSize: 13 }}>
                Send til e-post automatisk
              </div>
              <div className="text-white/55" style={{ fontSize: 11 }}>
                mathilde@kjapp.no
              </div>
            </div>
            <span
              className="px-2 py-0.5 rounded-full font-mono"
              style={{
                background: "rgba(94,240,255,0.16)",
                color: "var(--aurora-cyan)",
                fontSize: 9,
              }}
            >
              På
            </span>
          </GlassPanel>
        </div>
      </div>
    </SubScreen>
  );
}
