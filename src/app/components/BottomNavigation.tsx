import { Navigation, Sparkles, User } from "lucide-react";
import type { ReactNode } from "react";
import { GlassPanel } from "./GlassPanel";
import type { Screen } from "../App";

export type NavTab = "reise" | "aurora" | "profil";

const TAB_TO_SCREEN: Record<NavTab, Screen> = {
  reise: "home",
  aurora: "chat",
  profil: "profile",
};

export function BottomNavigation({
  active,
  go,
}: {
  active: NavTab;
  go: (s: Screen) => void;
}) {
  return (
    <div
      className="absolute left-4 right-4 z-40 pointer-events-none"
      style={{ bottom: "max(env(safe-area-inset-bottom), 12px)" }}
    >
      <GlassPanel className="rounded-full px-2 py-1.5 flex items-center justify-around holo-border pointer-events-auto">
        <Tab
          label="Reise"
          isActive={active === "reise"}
          onClick={() => go(TAB_TO_SCREEN.reise)}
          icon={<Navigation className="w-[18px] h-[18px]" />}
        />
        <Tab
          label="Aurora"
          isActive={active === "aurora"}
          onClick={() => go(TAB_TO_SCREEN.aurora)}
          icon={<Sparkles className="w-[18px] h-[18px]" />}
        />
        <Tab
          label="Profil"
          isActive={active === "profil"}
          onClick={() => go(TAB_TO_SCREEN.profil)}
          icon={<User className="w-[18px] h-[18px]" />}
        />
      </GlassPanel>
    </div>
  );
}

function Tab({
  icon,
  label,
  isActive,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex flex-col items-center gap-0.5 py-2 rounded-full transition ${
        isActive ? "text-white" : "text-white/55"
      }`}
      style={
        isActive
          ? {
              background: "rgba(94,240,255,0.10)",
              boxShadow: "inset 0 0 0 1px rgba(94,240,255,0.28), 0 0 24px -8px rgba(94,240,255,0.5)",
            }
          : {}
      }
    >
      {icon}
      <span className="font-display" style={{ fontSize: 10, letterSpacing: "0.06em" }}>
        {label}
      </span>
    </button>
  );
}
