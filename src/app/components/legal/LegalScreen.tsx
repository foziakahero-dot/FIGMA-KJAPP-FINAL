import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

export function LegalScreen({
  title,
  subtitle,
  onBack,
  children,
}: {
  title: string;
  subtitle?: string;
  onBack: () => void;
  children: ReactNode;
}) {
  return (
    <div
      className="relative w-full overflow-hidden flex flex-col"
      style={{
        height: "100svh",
        background: "#05060f",
        paddingTop: "max(env(safe-area-inset-top), 14px)",
      }}
    >
      <div className="flex items-center gap-3 px-5 pb-3">
        <button
          onClick={onBack}
          aria-label="Tilbake"
          style={{
            width: 36,
            height: 36,
            borderRadius: 999,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex-1">
          <div
            className="font-mono uppercase"
            style={{
              fontSize: 10,
              letterSpacing: "0.32em",
              color: "var(--aurora-cyan, #5ef0ff)",
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 11 }}>
              {subtitle}
            </div>
          )}
        </div>
      </div>

      <div
        className="flex-1 overflow-y-auto px-5 pb-10"
        style={{
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-y",
          color: "rgba(255,255,255,0.85)",
          fontSize: 14,
          lineHeight: 1.55,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function H({ children }: { children: ReactNode }) {
  return (
    <h2
      style={{
        color: "white",
        fontSize: 17,
        fontWeight: 600,
        margin: "22px 0 8px",
      }}
    >
      {children}
    </h2>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p style={{ marginBottom: 10 }}>{children}</p>;
}

export function L({ children }: { children: ReactNode }) {
  return (
    <ul style={{ paddingLeft: 18, marginBottom: 10, listStyle: "disc" }}>
      {children}
    </ul>
  );
}
