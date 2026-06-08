import { useState } from "react";
import {
  Search,
  Home as HomeIcon,
  Briefcase,
  Dumbbell,
  Sparkles,
  Clock,
  ChevronRight,
  CarFront,
  TramFront,
} from "lucide-react";
import { LiveMap } from "../LiveMap";
import { AuroraOrb } from "../AuroraOrb";
import { AuroraToast } from "../AuroraToast";
import { AuroraMiniChat } from "../AuroraMiniChat";
import { BottomNavigation } from "../BottomNavigation";
import { user, suggestions, auroraIntro } from "../../data/mockData";
import { useNearbyDrivers } from "../../data/useNearbyDrivers";
import type { Screen } from "../../App";

const iconFor = (id: string) => {
  if (id === "home") return <HomeIcon className="w-4 h-4" />;
  if (id === "work") return <Briefcase className="w-4 h-4" />;
  return <Dumbbell className="w-4 h-4" />;
};

export function Home({ go }: { go: (s: Screen) => void }) {
  const [miniChatOpen, setMiniChatOpen] = useState(false);
  const { drivers } = useNearbyDrivers();
  const fastest = drivers
    .filter((d) => d.status === "available")
    .reduce((m, d) => Math.min(m, d.etaMin), 99);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100svh",
        overflow: "hidden",
        background: "#05060f",
      }}
    >
      <AuroraToast
        message="Du pleier å dra hjem rundt denne tiden. Skal jeg bestille Eco til Thorvald Meyers gate 41?"
        cta="Ja, bestill"
        onAction={() => go("book")}
        delay={4000}
        duration={11000}
      />

      {/* LAYER 0 — Map zone, clipped to top 46% */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "46svh",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        <LiveMap drivers={drivers} />
      </div>

      {/* LAYER 1 — Top scrim */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "28%",
          zIndex: 1,
          background: "linear-gradient(to bottom, rgba(5,6,15,0.82) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* LAYER 1 — Bottom fade from map to panel */}
      <div
        style={{
          position: "absolute",
          top: "34svh", left: 0, right: 0,
          height: "12svh",
          zIndex: 1,
          background: "linear-gradient(to bottom, transparent 0%, rgba(5,6,15,1.0) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* LAYER 5 — Top chips row */}
      <div
        style={{
          position: "absolute",
          top: "max(env(safe-area-inset-top), 12px)",
          left: 16, right: 16,
          zIndex: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        {/* User chip */}
        <button
          onClick={() => go("profile")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(8,10,24,0.92)",
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: 999,
            paddingLeft: 4,
            paddingRight: 12,
            paddingTop: 4,
            paddingBottom: 4,
            backdropFilter: "blur(20px)",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: 32, height: 32,
              borderRadius: "50%",
              background: "var(--aurora-gradient)",
              color: "#05060f",
              fontSize: 13, fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            {user.initial}
          </div>
          <div style={{ textAlign: "left", lineHeight: 1.3 }}>
            <div style={{ color: "white", fontSize: 11 }}>{user.name}</div>
            <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 9, letterSpacing: "0.14em", fontFamily: "JetBrains Mono, monospace" }}>
              KJAPP+
            </div>
          </div>
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* KJAPP Oslo chip */}
          <div
            style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "rgba(8,10,24,0.92)",
              border: "1px solid rgba(94,240,255,0.25)",
              borderRadius: 999,
              paddingLeft: 6, paddingRight: 12, paddingTop: 4, paddingBottom: 4,
              backdropFilter: "blur(20px)",
            }}
          >
            <div
              style={{
                width: 24, height: 24, borderRadius: "50%",
                background: "var(--aurora-gradient)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <CarFront style={{ width: 12, height: 12, color: "#05060f" }} strokeWidth={2.2} />
            </div>
            <div style={{ lineHeight: 1.3, textAlign: "left" }}>
              <div style={{ color: "white", fontSize: 11, letterSpacing: "0.14em", fontWeight: 600 }}>KJAPP</div>
              <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 9, letterSpacing: "0.16em", fontFamily: "JetBrains Mono, monospace" }}>OSLO</div>
            </div>
          </div>

          {/* Prototype map shortcut */}
          <button
            onClick={() => go("prototype-map")}
            style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "rgba(8,10,24,0.85)",
              border: "1px solid rgba(255,255,255,0.10)",
              display: "flex", alignItems: "center", justifyContent: "center",
              backdropFilter: "blur(20px)",
              cursor: "pointer",
            }}
          >
            <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 10, fontFamily: "monospace" }}>···</span>
          </button>
        </div>
      </div>

      {/* LAYER 5 — Status chip (centered) */}
      <div
        style={{
          position: "absolute",
          top: "max(calc(env(safe-area-inset-top) + 58px), 70px)",
          left: 0, right: 0,
          zIndex: 5,
          display: "flex",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <div style={{ pointerEvents: "auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "rgba(8,10,24,0.90)",
              border: "1px solid rgba(94,240,255,0.22)",
              borderRadius: 16,
              paddingLeft: 12, paddingRight: 14, paddingTop: 6, paddingBottom: 6,
              backdropFilter: "blur(20px)",
              whiteSpace: "nowrap",
            }}
          >
            <span className="relative flex" style={{ width: 8, height: 8 }}>
              <span
                className="animate-ping absolute inline-flex rounded-full"
                style={{ inset: 0, background: "var(--aurora-cyan)", opacity: 0.7 }}
              />
              <span
                className="relative inline-flex rounded-full"
                style={{ width: 8, height: 8, background: "var(--aurora-cyan)" }}
              />
            </span>
            <div style={{ lineHeight: 1.35 }}>
              <div style={{ color: "white", fontSize: 11, fontWeight: 600 }}>
                {drivers.filter((d) => d.status === "available").length} biler i nærheten
              </div>
              <div style={{ color: "rgba(255,255,255,0.60)", fontSize: 9, letterSpacing: "0.12em", fontFamily: "JetBrains Mono, monospace" }}>
                RASKESTE {fastest} MIN
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LAYER 10 — Bottom solid panel, fully opaque */}
      <div
        style={{
          position: "absolute",
          top: "44svh", left: 0, right: 0, bottom: 0,
          zIndex: 10,
          background: "#070819",
          borderTop: "1px solid rgba(94,240,255,0.13)",
          boxShadow: "0 -16px 48px rgba(0,0,0,0.9)",
          overflowY: "auto",
          overflowX: "hidden",
          scrollbarWidth: "none",
          touchAction: "pan-y",
          WebkitOverflowScrolling: "touch",
          overscrollBehavior: "contain",
          paddingBottom: "calc(80px + max(env(safe-area-inset-bottom), 12px))",
        }}
      >
        {/* Drag handle — decorative only */}
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 10, paddingBottom: 12 }}>
          <div style={{ width: 40, height: 4, borderRadius: 999, background: "rgba(255,255,255,0.18)" }} />
        </div>

        <div style={{ paddingLeft: 16, paddingRight: 16 }}>

          {/* Search field — div wrapper to avoid nested button issue */}
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.11)",
              borderRadius: 20,
              padding: "13px 16px",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                width: 28, height: 28, borderRadius: "50%",
                background: "rgba(94,240,255,0.14)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Search style={{ width: 14, height: 14, color: "var(--aurora-cyan)" }} strokeWidth={2} />
            </div>
            <input
              type="text"
              placeholder="Hvor skal du?"
              onFocus={() => go("book")}
              onChange={() => go("book")}
              style={{
                flex: 1, minWidth: 0,
                background: "transparent", border: "none", outline: "none",
                padding: 0, color: "white", fontSize: 14,
              }}
            />
            <button
              onClick={() => setMiniChatOpen(true)}
              style={{ flexShrink: 0, background: "none", border: "none", padding: 0, cursor: "pointer" }}
              aria-label="Snakk med Aurora"
            >
              <AuroraOrb size={24} />
            </button>
          </div>

          {/* Quick destinations */}
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            {user.savedPlaces.map((p) => (
              <button
                key={p.id}
                onClick={() => go("book")}
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  borderRadius: 18,
                  padding: 10,
                  textAlign: "left",
                  cursor: "pointer",
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: "rgba(94,240,255,0.12)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "white", marginBottom: 6,
                  }}
                >
                  {iconFor(p.id)}
                </div>
                <div style={{ color: "white", fontSize: 11, lineHeight: 1.2 }}>{p.label}</div>
                <div style={{ color: "rgba(255,255,255,0.48)", fontSize: 9, lineHeight: 1.3, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {p.address.split(",")[0]}
                </div>
              </button>
            ))}
          </div>

          {/* Aurora card */}
          <button
            onClick={() => go("chat")}
            style={{
              marginTop: 12, width: "100%",
              background: "rgba(94,240,255,0.04)",
              border: "1px solid rgba(94,240,255,0.16)",
              borderRadius: 20, padding: 14,
              display: "flex", gap: 12, alignItems: "flex-start",
              textAlign: "left", cursor: "pointer", boxSizing: "border-box",
            }}
          >
            <AuroraOrb size={38} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: "rgba(255,255,255,0.48)", fontSize: 10, letterSpacing: "0.18em", fontFamily: "JetBrains Mono, monospace", marginBottom: 4 }}>
                AURORA
              </div>
              <p style={{ color: "white", fontSize: 13, lineHeight: 1.45, margin: 0 }}>
                {auroraIntro[0]} {auroraIntro[1]}
              </p>
              <p style={{ color: "rgba(255,255,255,0.62)", fontSize: 12, lineHeight: 1.45, margin: "4px 0 0 0" }}>
                {auroraIntro[2]}
              </p>
            </div>
          </button>

          {/* Rekk avgangen card */}
          <button
            onClick={() => go("rekk-avgangen")}
            style={{
              marginTop: 10, width: "100%",
              background: "rgba(160,107,255,0.06)",
              border: "1px solid rgba(160,107,255,0.18)",
              borderRadius: 20, padding: 14,
              display: "flex", alignItems: "flex-start", gap: 12,
              textAlign: "left", cursor: "pointer",
              position: "relative", overflow: "hidden", boxSizing: "border-box",
            }}
          >
            <div
              style={{
                position: "absolute", top: -32, right: -32,
                width: 100, height: 100, borderRadius: "50%",
                background: "var(--aurora-gradient)", opacity: 0.12,
                filter: "blur(24px)", pointerEvents: "none",
              }}
            />
            <div
              style={{
                width: 40, height: 40, borderRadius: 12,
                background: "rgba(94,240,255,0.11)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, position: "relative",
              }}
            >
              <TramFront style={{ width: 18, height: 18, color: "var(--aurora-cyan)" }} />
            </div>
            <div style={{ flex: 1, minWidth: 0, position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "white", fontSize: 13, lineHeight: 1.25 }}>Rekk avgangen</span>
                <span style={{ fontSize: 8, letterSpacing: "0.18em", background: "rgba(160,107,255,0.18)", color: "var(--aurora-violet)", borderRadius: 999, paddingLeft: 6, paddingRight: 6, paddingTop: 2, paddingBottom: 2, flexShrink: 0, fontFamily: "JetBrains Mono, monospace" }}>
                  CONNECT
                </span>
              </div>
              <div style={{ color: "rgba(255,255,255,0.68)", fontSize: 11, lineHeight: 1.35, marginTop: 2 }}>KJAPP + T-bane, buss og tog</div>
              <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 10, lineHeight: 1.35, marginTop: 1 }}>Aurora hjelper deg å rekke neste avgang</div>
            </div>
            <ChevronRight style={{ width: 16, height: 16, color: "rgba(255,255,255,0.38)", flexShrink: 0, marginTop: 4, position: "relative" }} />
          </button>

          {/* Aurora foreslår */}
          <div style={{ marginTop: 16 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Sparkles style={{ width: 13, height: 13, color: "var(--aurora-cyan)" }} />
                <span style={{ color: "white", fontSize: 10, letterSpacing: "0.18em", fontWeight: 600, textTransform: "uppercase" }}>
                  Aurora foreslår
                </span>
              </div>
              <span style={{ color: "rgba(255,255,255,0.38)", fontSize: 10 }}>basert på dagen din</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {suggestions.slice(0, 3).map((s) => (
                <button
                  key={s.id}
                  onClick={() => go("book")}
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 18, padding: 12,
                    display: "flex", alignItems: "center", gap: 12,
                    textAlign: "left", cursor: "pointer", boxSizing: "border-box",
                  }}
                >
                  <div
                    style={{
                      width: 36, height: 36, borderRadius: 11,
                      background: "rgba(160,107,255,0.13)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Clock style={{ width: 15, height: 15, color: "var(--aurora-violet)" }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: "white", fontSize: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.place}</div>
                    <div style={{ color: "rgba(255,255,255,0.48)", fontSize: 10, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginTop: 1 }}>{s.note}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ color: "rgba(255,255,255,0.78)", fontSize: 10, fontFamily: "JetBrains Mono, monospace" }}>{s.time}</div>
                    <ChevronRight style={{ width: 13, height: 13, color: "rgba(255,255,255,0.32)", marginLeft: "auto", marginTop: 2 }} />
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      <AuroraMiniChat open={miniChatOpen} onClose={() => setMiniChatOpen(false)} go={go} />

      {/* LAYER 40 — Bottom navigation */}
      <BottomNavigation active="reise" go={go} />
    </div>
  );
}
