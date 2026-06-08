import {
  ChevronLeft, ChevronRight, Car, FileText, ShieldCheck,
  CheckCircle2, AlertCircle, Clock, LifeBuoy, LogOut, Bell,
  Lock, Map as MapIcon, Activity, MessageSquare, Users, Building2,
} from "lucide-react";
import { HolographicBackground } from "../HolographicBackground";
import { GlassPanel } from "../GlassPanel";
import { AuroraDriverMiniCard } from "../AuroraDriverMiniCard";
import type { Screen } from "../../App";

type DocStatus = "Godkjent" | "Utløper snart" | "Mangler";

const DOCUMENTS = [
  { id: "forekort",   name: "Førerkort",    status: "Godkjent" as DocStatus, details: "Gyldig til 14.03.2029" },
  { id: "kjoreseddel",name: "Kjøreseddel",  status: "Godkjent" as DocStatus, details: "Gyldig til 12.08.2027" },
  { id: "forsikring", name: "Forsikring",   status: "Utløper snart" as DocStatus, details: "Fornyes 01.08.2026" },
  { id: "vognkort",   name: "Vognkort",     status: "Godkjent" as DocStatus, details: "Oppdatert 2026" },
  { id: "eu",         name: "EU-kontroll",  status: "Godkjent" as DocStatus, details: "Neste: mars 2027" },
];

const SETTINGS_ROWS: Array<{
  icon: React.ReactNode;
  bg: string;
  label: string;
  screen?: Screen;
}> = [
  { icon: <MapIcon className="w-4 h-4 text-[var(--aurora-cyan)]" />,    bg: "rgba(94,240,255,0.14)",   label: "Navigasjonsapp",        screen: "driver-nav-app-settings" },
  { icon: <MessageSquare className="w-4 h-4 text-[var(--aurora-cyan)]" />, bg: "rgba(94,240,255,0.14)", label: "Kommunikasjon",         screen: "driver-communication-settings" },
  { icon: <Activity className="w-4 h-4 text-[var(--aurora-violet)]" />, bg: "rgba(160,107,255,0.18)", label: "Aurora Driver AI",       screen: "driver-ai-settings" },
  { icon: <MapPin className="w-4 h-4 text-[var(--aurora-cyan)]" />,     bg: "rgba(94,240,255,0.10)",   label: "Posisjon og sporing",   screen: "driver-location-settings" },
  { icon: <Bell className="w-4 h-4 text-white/60" />,                   bg: "rgba(255,255,255,0.06)",  label: "Varsler" },
  { icon: <Lock className="w-4 h-4 text-[var(--aurora-violet)]" />,     bg: "rgba(160,107,255,0.12)", label: "Sikkerhet og personvern" },
  { icon: <LifeBuoy className="w-4 h-4 text-white/60" />,               bg: "rgba(255,255,255,0.06)",  label: "Support",               screen: "driver-support" },
  { icon: <FileText className="w-4 h-4 text-white/60" />,               bg: "rgba(255,255,255,0.06)",  label: "Vilkår og betingelser" },
];

function statusStyle(s: DocStatus) {
  if (s === "Godkjent") return { bg: "rgba(94,240,255,0.14)", text: "var(--aurora-cyan)" };
  if (s === "Utløper snart") return { bg: "rgba(255,181,71,0.16)", text: "#ffb547" };
  return { bg: "rgba(255,122,122,0.16)", text: "#ff7a7a" };
}

function statusIcon(s: DocStatus) {
  if (s === "Godkjent") return <CheckCircle2 className="w-4 h-4" style={{ color: "var(--aurora-cyan)" }} />;
  if (s === "Utløper snart") return <Clock className="w-4 h-4 text-[#ffb547]" />;
  return <AlertCircle className="w-4 h-4 text-[#ff7a7a]" />;
}

function MapPin(props: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function DriverProfile({ go }: { go: (s: Screen) => void }) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", maxHeight: "100dvh", scrollbarWidth: "none", overscrollBehavior: "none" }}
    >
      <HolographicBackground intensity={0.85} />

      {/* Header */}
      <div
        className="absolute top-0 left-0 right-0 z-20 px-5"
        style={{ paddingTop: "max(env(safe-area-inset-top), 16px)" }}
      >
        <div className="flex items-center justify-between gap-3 py-2">
          <button
            onClick={() => go("driver")}
            aria-label="Tilbake"
            className="w-10 h-10 rounded-full glass-panel flex items-center justify-center active:scale-95 transition shrink-0"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <span className="text-white font-display uppercase" style={{ fontSize: 11, letterSpacing: "0.32em" }}>
            Driver Profil
          </span>
          <div className="w-10 h-10" />
        </div>
      </div>

      {/* Scrollable content */}
      <div
        className="relative h-full overflow-y-auto px-5"
        style={{
          paddingTop: "calc(max(env(safe-area-inset-top), 16px) + 56px)",
          paddingBottom: "calc(80px + max(env(safe-area-inset-bottom), 16px))",
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-y",
          scrollbarWidth: "none",
        }}
      >
        <div className="space-y-4 pb-4">

          {/* ── Hero: Driver info + current vehicle ── */}
          <GlassPanel holo glow className="rounded-3xl p-5 relative overflow-hidden">
            <div
              className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none"
              style={{ background: "var(--aurora-gradient)", opacity: 0.28 }}
            />
            {/* Identity */}
            <div className="relative flex items-center gap-3 mb-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center font-display shrink-0"
                style={{ background: "var(--aurora-gradient)", color: "#05060f", fontSize: 24 }}
              >
                A
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-display" style={{ fontSize: 18 }}>Amir</div>
                <div className="text-white/65 mt-0.5" style={{ fontSize: 12 }}>Godkjent sjåfør</div>
                <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                  <span
                    className="px-2 py-0.5 rounded-full font-mono"
                    style={{ background: "rgba(94,240,255,0.16)", color: "var(--aurora-cyan)", fontSize: 9, letterSpacing: "0.14em" }}
                  >
                    Elite Transport AS
                  </span>
                  <span
                    className="px-2 py-0.5 rounded-full font-mono"
                    style={{ background: "rgba(160,107,255,0.16)", color: "var(--aurora-violet)", fontSize: 9, letterSpacing: "0.12em" }}
                  >
                    KJAPP Pilotflåte
                  </span>
                </div>
              </div>
            </div>

            {/* Current vehicle */}
            <div
              className="relative flex items-center gap-3 p-3 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(94,240,255,0.18)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(94,240,255,0.14)" }}
              >
                <Car className="w-5 h-5 text-[var(--aurora-cyan)]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white" style={{ fontSize: 13 }}>Tesla Model Y</div>
                <div className="text-white/60 mt-0.5" style={{ fontSize: 11 }}>EL 88421 · 2024</div>
              </div>
              <button
                onClick={() => go("driver-vehicle-select")}
                className="rounded-xl px-3 py-1.5 shrink-0"
                style={{ background: "rgba(94,240,255,0.12)", border: "1px solid rgba(94,240,255,0.25)" }}
              >
                <span className="text-[var(--aurora-cyan)] font-display" style={{ fontSize: 10, letterSpacing: "0.06em" }}>
                  Bytt bil
                </span>
              </button>
            </div>
          </GlassPanel>

          {/* ── Aurora Driver AI ── */}
          <AuroraDriverMiniCard
            message="Forsikring utløper snart. Oppdater dokumentet før fristen."
            go={go}
          />

          {/* ── Fleet / Løyvehaver ── */}
          <div>
            <SectionLabel>Løyvehaver / flåte</SectionLabel>
            <GlassPanel className="rounded-2xl p-4 relative overflow-hidden">
              <div
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl pointer-events-none"
                style={{ background: "var(--aurora-gradient)", opacity: 0.14 }}
              />
              <div className="relative flex items-start gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(94,240,255,0.12)" }}
                >
                  <Building2 className="w-5 h-5 text-[var(--aurora-cyan)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white" style={{ fontSize: 14 }}>Elite Transport AS</div>
                  <div
                    className="px-1.5 py-0.5 rounded-full font-mono inline-block mt-1"
                    style={{ background: "rgba(94,240,255,0.14)", color: "var(--aurora-cyan)", fontSize: 9, letterSpacing: "0.12em" }}
                  >
                    Godkjent flåte
                  </div>
                  <div className="flex gap-4 mt-2.5">
                    <div className="flex items-center gap-1.5">
                      <Car className="w-3 h-3 text-white/55" />
                      <span className="text-white/65" style={{ fontSize: 11 }}>3 biler tilgjengelig</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3 h-3 text-white/55" />
                      <span className="text-white/65" style={{ fontSize: 11 }}>2 sjåfører aktive</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 text-white/40" style={{ fontSize: 10, lineHeight: 1.5 }}>
                Du kan kun kjøre biler som er godkjent og tilknyttet denne flåten.
              </div>
            </GlassPanel>
          </div>

          {/* ── Documents ── */}
          <div>
            <SectionLabel>Dokumenter</SectionLabel>
            <div className="space-y-2">
              {DOCUMENTS.map((doc) => {
                const c = statusStyle(doc.status);
                return (
                  <button
                    key={doc.id}
                    className="w-full glass-panel rounded-2xl px-3.5 py-3 flex items-center gap-3 text-left active:scale-[0.99] transition"
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: c.bg }}>
                      {statusIcon(doc.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white" style={{ fontSize: 13 }}>{doc.name}</div>
                      {doc.details && (
                        <div className="text-white/55 mt-0.5" style={{ fontSize: 11 }}>{doc.details}</div>
                      )}
                    </div>
                    <span
                      className="px-2 py-0.5 rounded-full font-mono shrink-0"
                      style={{ background: c.bg, color: c.text, fontSize: 9, letterSpacing: "0.1em" }}
                    >
                      {doc.status}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Settings ── */}
          <div>
            <SectionLabel>Innstillinger</SectionLabel>
            <div className="space-y-2">
              {SETTINGS_ROWS.map(({ icon, bg, label, screen }) => (
                <button
                  key={label}
                  onClick={screen ? () => go(screen) : undefined}
                  className="w-full glass-panel rounded-2xl px-3.5 py-3 flex items-center gap-3 text-left active:scale-[0.99] transition"
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: bg }}>
                    {icon}
                  </div>
                  <span className="flex-1 text-white" style={{ fontSize: 13 }}>{label}</span>
                  <ChevronRight className="w-4 h-4 text-white/40" />
                </button>
              ))}
            </div>
          </div>

          {/* ── Logg ut ── */}
          <button
            onClick={() => go("driver-access")}
            className="w-full glass-panel rounded-2xl px-3.5 py-3 flex items-center gap-3 text-left active:scale-[0.99] transition"
            style={{ border: "1px solid rgba(255,122,122,0.15)" }}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(255,122,122,0.10)" }}>
              <LogOut className="w-4 h-4 text-[#ff7a7a]" />
            </div>
            <span className="flex-1 text-white/80" style={{ fontSize: 13 }}>Logg ut</span>
          </button>

          <div className="text-white/30 text-center" style={{ fontSize: 9, letterSpacing: "0.18em" }}>
            KJAPP DRIVER · v0.1 · © 2026 KJAPP AS
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <div
        className="absolute left-4 right-4 z-40 pointer-events-none"
        style={{ bottom: "max(env(safe-area-inset-bottom), 12px)" }}
      >
        <GlassPanel className="rounded-full px-2 py-1.5 flex items-center justify-around holo-border pointer-events-auto">
          <NavButton label="Hjem"   onClick={() => go("driver")} />
          <NavButton label="Turer"  onClick={() => go("driver-trips")} />
          <NavButton label="Inntekt" onClick={() => go("driver-earnings")} />
          <NavButton label="Profil" active onClick={() => go("driver-profile")} />
        </GlassPanel>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-white/65 font-display uppercase mb-2 px-1" style={{ fontSize: 10, letterSpacing: "0.22em" }}>
      {children}
    </div>
  );
}

function NavButton({ label, active, onClick }: { label: string; active?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex flex-col items-center gap-0.5 py-2 rounded-full transition ${active ? "text-white" : "text-white/55"}`}
      style={active ? { background: "rgba(94,240,255,0.10)", boxShadow: "inset 0 0 0 1px rgba(94,240,255,0.28)" } : {}}
    >
      <span className="font-display" style={{ fontSize: 10, letterSpacing: "0.06em" }}>{label}</span>
    </button>
  );
}
