import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";
import { HolographicBackground } from "./HolographicBackground";

/**
 * Felles ramme for sub-skjermer under Profil-hub: tilbake-knapp,
 * tittel, safe-area, scroll. Bunnav vises ikke her — undersidene
 * er stack-pushed over Profil og lukkes via «tilbake».
 */
export function SubScreen({
  title,
  onBack,
  right,
  children,
  background = true,
}: {
  title: string;
  onBack: () => void;
  right?: ReactNode;
  children: ReactNode;
  background?: boolean;
}) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        height: "100svh",
        maxHeight: "100dvh",
        scrollbarWidth: "none",
        overscrollBehavior: "none",
      }}
    >
      {background && <HolographicBackground intensity={0.7} />}

      <div
        className="relative h-full flex flex-col overflow-y-auto px-5"
        style={{
          paddingTop: "max(env(safe-area-inset-top), 16px)",
          paddingBottom: "max(env(safe-area-inset-bottom), 32px)",
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-y",
          scrollbarWidth: "none",
        }}
      >
        <div className="flex items-center justify-between gap-3 mb-4">
          <button
            onClick={onBack}
            aria-label="Tilbake"
            className="w-10 h-10 rounded-full glass-panel flex items-center justify-center active:scale-95 transition"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <span
            className="text-white font-display uppercase"
            style={{ fontSize: 11, letterSpacing: "0.32em" }}
          >
            {title}
          </span>
          <div className="w-10 h-10 flex items-center justify-center">{right ?? null}</div>
        </div>

        <div className="flex-1 min-h-0">{children}</div>
      </div>
    </div>
  );
}
