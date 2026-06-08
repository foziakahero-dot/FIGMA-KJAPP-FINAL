import { useState } from "react";
import {
  Train,
  Share2,
  Instagram,
  Music2,
  CalendarDays,
  Wallet,
  Plane,
  Map as MapIcon,
  CreditCard,
  HeartHandshake,
  ChevronRight,
  Check,
} from "lucide-react";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import { SubScreen } from "../SubScreen";
import { GlassPanel } from "../GlassPanel";
import type { Screen } from "../../App";

type Status = "Aktiv" | "Koble til" | "Kommer snart";

type Card = {
  id: string;
  title: string;
  subtitle: string;
  status: Status;
  icon: ReactNode;
};

const CARDS: Card[] = [
  { id: "ruter", title: "Ruter / Entur — Rekk avgangen", subtitle: "Koble KJAPP med T-bane, buss, trikk, tog og båt.", status: "Kommer snart", icon: <Train className="w-4 h-4" /> },
  { id: "share", title: "WhatsApp / SMS — Del reisen", subtitle: "Del live-tur, ETA og sjåførinfo trygt.", status: "Aktiv", icon: <Share2 className="w-4 h-4" /> },
  { id: "ig", title: "Instagram — Beta Share", subtitle: "Inviter venner og få velkomstbonus.", status: "Koble til", icon: <Instagram className="w-4 h-4" /> },
  { id: "spotify", title: "Spotify — Ride Vibe", subtitle: "Tilpass stemningen på reisen.", status: "Koble til", icon: <Music2 className="w-4 h-4" /> },
  { id: "cal", title: "Kalender — Aurora planlegger", subtitle: "La Aurora foreslå henting basert på avtaler.", status: "Koble til", icon: <CalendarDays className="w-4 h-4" /> },
  { id: "wallet", title: "Wallet — KJAPP Beta Pass", subtitle: "Beta-kreditt og KJAPP+ medlemskap.", status: "Kommer snart", icon: <Wallet className="w-4 h-4" /> },
  { id: "airport", title: "Flyplass — Gardermoen Assist", subtitle: "Aurora følger flytid og anbefaler henting.", status: "Kommer snart", icon: <Plane className="w-4 h-4" /> },
  { id: "maps", title: "Google / Apple Maps — Sjåførnavigasjon", subtitle: "Ekstern navigasjon for sjåfør.", status: "Aktiv", icon: <MapIcon className="w-4 h-4" /> },
  { id: "vipps", title: "Vipps / Betaling", subtitle: "Rask og trygg betaling for Norge.", status: "Aktiv", icon: <CreditCard className="w-4 h-4" /> },
  { id: "senior", title: "Senior / Familie-modus", subtitle: "Enklere reiser, trygg deling, Aurora-hjelp.", status: "Kommer snart", icon: <HeartHandshake className="w-4 h-4" /> },
];

export function KjappConnect({ go }: { go: (s: Screen) => void }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <SubScreen title="KJAPP Connect" onBack={() => go("profile")}>
      <p className="text-white/65 leading-snug mb-4" style={{ fontSize: 12.5 }}>
        Koble reisen din til musikk, kalender, kollektiv, deling og smarte varsler.
      </p>

      <div className="space-y-2 pb-4">
        {CARDS.map((c) => (
          <div key={c.id}>
            <button
              onClick={() => setOpen(open === c.id ? null : c.id)}
              className="w-full glass-panel rounded-2xl px-3.5 py-3 flex items-center gap-3 text-left active:scale-[0.99] transition"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: "rgba(94,240,255,0.12)",
                  color: "var(--aurora-cyan)",
                }}
              >
                {c.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white" style={{ fontSize: 13, lineHeight: 1.3 }}>
                  {c.title}
                </div>
                <div className="text-white/55" style={{ fontSize: 11, lineHeight: 1.35 }}>
                  {c.subtitle}
                </div>
              </div>
              <StatusBadge status={c.status} />
            </button>
            {open === c.id && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2"
              >
                <CardDetails id={c.id} go={go} />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </SubScreen>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const styles =
    status === "Aktiv"
      ? { bg: "rgba(94,240,255,0.16)", fg: "var(--aurora-cyan)" }
      : status === "Koble til"
      ? { bg: "rgba(160,107,255,0.18)", fg: "var(--aurora-violet)" }
      : { bg: "rgba(255,255,255,0.06)", fg: "rgba(255,255,255,0.6)" };
  return (
    <span
      className="px-2 py-1 rounded-full font-mono shrink-0"
      style={{
        background: styles.bg,
        color: styles.fg,
        fontSize: 9,
        letterSpacing: "0.12em",
      }}
    >
      {status.toUpperCase()}
    </span>
  );
}

function CardDetails({
  id,
  go,
}: {
  id: string;
  go: (s: Screen) => void;
}) {
  if (id === "ruter") return <RuterDetail />;
  if (id === "share") return <ShareDetail />;
  if (id === "ig") return <InstagramDetail />;
  if (id === "spotify") return <SpotifyDetail />;
  if (id === "cal") return <CalendarDetail go={go} />;
  if (id === "wallet") return <WalletDetail />;
  if (id === "airport") return <AirportDetail />;
  if (id === "maps") return <MapsDetail />;
  if (id === "vipps") return <VippsDetail go={go} />;
  if (id === "senior") return <SeniorDetail />;
  return null;
}

function Inset({ children }: { children: ReactNode }) {
  return (
    <GlassPanel className="rounded-2xl p-3.5 holo-border">{children}</GlassPanel>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-white/65" style={{ fontSize: 11 }}>
        {label}
      </span>
      <span
        className={accent ? "font-display" : ""}
        style={{
          fontSize: 12,
          color: accent ? "var(--aurora-cyan)" : "rgba(255,255,255,0.92)",
        }}
      >
        {value}
      </span>
    </div>
  );
}

function CTA({
  label,
  primary,
  onClick,
}: {
  label: string;
  primary?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3.5 py-2 font-display active:scale-[0.98] transition ${
        primary ? "" : "glass-panel"
      }`}
      style={
        primary
          ? {
              background: "var(--aurora-gradient)",
              color: "#05060f",
              fontSize: 12,
              letterSpacing: "0.04em",
            }
          : { color: "#fff", fontSize: 12 }
      }
    >
      {label}
    </button>
  );
}

function RuterDetail() {
  return (
    <Inset>
      <div className="text-white font-display" style={{ fontSize: 13 }}>
        Majorstuen T-bane
      </div>
      <div className="mt-2 space-y-0.5">
        <Row label="Neste avgang" value="08:14" />
        <Row label="KJAPP henting" value="07:58" accent />
        <Row label="Buffer" value="9 min" />
        <Row label="Status" value="Du rekker avgangen" accent />
      </div>
      <div className="mt-3 space-y-1.5">
        <div className="text-white/60 font-mono uppercase" style={{ fontSize: 9, letterSpacing: "0.18em" }}>
          Alternativer
        </div>
        <div className="glass-panel rounded-xl px-3 py-2 flex items-center justify-between">
          <div>
            <div className="text-white" style={{ fontSize: 12 }}>KJAPP hele veien</div>
            <div className="text-white/55" style={{ fontSize: 10.5 }}>12 min · estimert 249 kr</div>
          </div>
          <ChevronRight className="w-4 h-4 text-white/45" />
        </div>
        <div className="glass-panel rounded-xl px-3 py-2 flex items-center justify-between">
          <div>
            <div className="text-white" style={{ fontSize: 12 }}>KJAPP + kollektiv</div>
            <div className="text-white/55" style={{ fontSize: 10.5 }}>23 min · taxi til Majorstuen + T-bane</div>
          </div>
          <ChevronRight className="w-4 h-4 text-white/45" />
        </div>
        <div className="glass-panel rounded-xl px-3 py-2 flex items-center justify-between">
          <div>
            <div className="text-white" style={{ fontSize: 12 }}>Senior anbefaling</div>
            <div className="text-white/55" style={{ fontSize: 10.5 }}>Direkte KJAPP · enklest reise</div>
          </div>
          <ChevronRight className="w-4 h-4 text-white/45" />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <CTA label="Bestill til avgang" primary />
        <CTA label="Se andre alternativer" />
      </div>
    </Inset>
  );
}

function ShareDetail() {
  return (
    <Inset>
      <p className="text-white/75 leading-snug" style={{ fontSize: 12 }}>
        Send ETA, sjåfør og bilinfo trygt til noen du stoler på.
      </p>
      <div className="mt-3 glass-panel rounded-xl p-3 space-y-0.5">
        <Row label="Reisende" value="Mathilde" />
        <Row label="Sjåfør" value="Amir" />
        <Row label="Bil" value="Toyota Corolla" />
        <Row label="ETA" value="8 min" accent />
        <Row label="Turstatus" value="På vei" accent />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <CTA label="SMS" primary />
        <CTA label="WhatsApp" />
        <CTA label="Kopier lenke" />
      </div>
    </Inset>
  );
}

function InstagramDetail() {
  return (
    <Inset>
      <div
        className="rounded-2xl p-4 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #5ef0ff 0%, #a06bff 50%, #ff5ed1 100%)",
        }}
      >
        <div className="text-[#05060f] font-display" style={{ fontSize: 16 }}>
          Jeg tester KJAPP
        </div>
        <div className="text-[#05060f]/85 mt-0.5" style={{ fontSize: 12 }}>
          Norsk AI taxi i beta
        </div>
        <div className="text-[#05060f]/85 mt-1.5" style={{ fontSize: 11 }}>
          Få velkomstbonus med min kode
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span
            className="px-2 py-1 rounded-md font-mono"
            style={{
              background: "rgba(5,6,15,0.85)",
              color: "var(--aurora-cyan)",
              fontSize: 11,
              letterSpacing: "0.18em",
            }}
          >
            MATHILDE-150
          </span>
          <div
            className="w-9 h-9 rounded-md grid grid-cols-3 grid-rows-3 gap-[2px] p-1"
            style={{ background: "rgba(5,6,15,0.9)" }}
            aria-hidden
          >
            {Array.from({ length: 9 }).map((_, i) => (
              <span
                key={i}
                style={{
                  background: [0, 2, 4, 6, 8].includes(i) ? "#fff" : "transparent",
                  borderRadius: 1,
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <CTA label="Del på Instagram" primary />
        <CTA label="Kopier invitasjonslenke" />
      </div>
    </Inset>
  );
}

function SpotifyDetail() {
  const moods = ["Stille", "Chill", "Energi", "Podcast", "Norsk", "Bollywood"];
  const [active, setActive] = useState("Chill");
  return (
    <Inset>
      <p className="text-white/75 leading-snug" style={{ fontSize: 12 }}>
        Velg stemningen for turen. Aurora tilpasser uten å gjøre bestillingen mer komplisert.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {moods.map((m) => (
          <button
            key={m}
            onClick={() => setActive(m)}
            className="px-3 py-1.5 rounded-full font-display"
            style={{
              fontSize: 11,
              color: active === m ? "#05060f" : "rgba(255,255,255,0.85)",
              background:
                active === m ? "var(--aurora-gradient)" : "rgba(255,255,255,0.05)",
              boxShadow:
                active === m
                  ? "none"
                  : "inset 0 0 0 1px var(--glass-border)",
            }}
          >
            {m}
          </button>
        ))}
      </div>
    </Inset>
  );
}

function CalendarDetail({ go }: { go: (s: Screen) => void }) {
  return (
    <Inset>
      <div className="text-white font-display" style={{ fontSize: 13 }}>
        Maaemo kl. 20:00
      </div>
      <div className="mt-2 space-y-0.5">
        <Row label="Anbefalt henting" value="19:30" accent />
        <Row label="Buffer" value="12 min" />
        <Row label="Bil-type" value="Kjapp Premium" />
      </div>
      <div className="mt-3">
        <CTA label="Koble til kalender" primary onClick={() => go("settings")} />
      </div>
    </Inset>
  );
}

function WalletDetail() {
  return (
    <Inset>
      <div className="text-white font-display" style={{ fontSize: 13 }}>
        KJAPP Beta Pass
      </div>
      <div className="mt-2 space-y-0.5">
        <Row label="Medlemskap" value="KJAPP+" accent />
        <Row label="Beta-kreditt" value="150 kr" accent />
        <Row label="Gyldig" value="Første tur" />
      </div>
      <div className="mt-3">
        <CTA label="Legg til i Wallet" primary />
      </div>
    </Inset>
  );
}

function AirportDetail() {
  return (
    <Inset>
      <div className="text-white font-display" style={{ fontSize: 13 }}>
        Gardermoen Assist
      </div>
      <div className="mt-2 space-y-0.5">
        <Row label="Flyet ditt" value="08:15" />
        <Row label="Anbefalt henting" value="06:25" accent />
        <Row label="Buffer" value="20 min" />
      </div>
    </Inset>
  );
}

function MapsDetail() {
  return (
    <Inset>
      <p className="text-white/75 leading-snug" style={{ fontSize: 12 }}>
        Etter akseptert tur kan sjåfør åpne navigasjon direkte i Google eller Apple Maps.
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button className="glass-panel rounded-xl px-3 py-2 text-white text-left" style={{ fontSize: 12 }}>
          Åpne i Google Maps
        </button>
        <button className="glass-panel rounded-xl px-3 py-2 text-white text-left" style={{ fontSize: 12 }}>
          Åpne i Apple Maps
        </button>
        <button className="glass-panel rounded-xl px-3 py-2 text-white text-left" style={{ fontSize: 12 }}>
          Naviger til hentested
        </button>
        <button className="glass-panel rounded-xl px-3 py-2 text-white text-left" style={{ fontSize: 12 }}>
          Naviger til destinasjon
        </button>
      </div>
    </Inset>
  );
}

function VippsDetail({ go }: { go: (s: Screen) => void }) {
  const opts = [
    { label: "Vipps", badge: "Anbefalt" },
    { label: "Apple Pay" },
    { label: "Google Pay" },
    { label: "Kort" },
    { label: "Bedrift / faktura", badge: "Kommer snart" },
  ];
  return (
    <Inset>
      <div className="space-y-1.5">
        {opts.map((o) => (
          <div
            key={o.label}
            className="flex items-center justify-between glass-panel rounded-xl px-3 py-2"
          >
            <span className="text-white" style={{ fontSize: 12 }}>
              {o.label}
            </span>
            {o.badge && (
              <span
                className="px-1.5 py-0.5 rounded-full font-mono"
                style={{
                  background:
                    o.badge === "Anbefalt"
                      ? "rgba(94,240,255,0.16)"
                      : "rgba(255,255,255,0.06)",
                  color:
                    o.badge === "Anbefalt"
                      ? "var(--aurora-cyan)"
                      : "rgba(255,255,255,0.6)",
                  fontSize: 9,
                  letterSpacing: "0.1em",
                }}
              >
                {o.badge}
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-3">
        <CTA label="Gå til betalingsside" primary onClick={() => go("payment")} />
      </div>
    </Inset>
  );
}

function SeniorDetail() {
  const feats = [
    "Stor tekst",
    "Talestyring",
    "Del reisen automatisk",
    "Nødkontakt",
    "Favorittadresser",
    "Ring support",
  ];
  return (
    <Inset>
      <div className="grid grid-cols-2 gap-2">
        {feats.map((f) => (
          <div
            key={f}
            className="glass-panel rounded-xl px-3 py-2 flex items-center gap-2"
          >
            <Check className="w-3.5 h-3.5 text-[var(--aurora-cyan)]" />
            <span className="text-white" style={{ fontSize: 11.5 }}>
              {f}
            </span>
          </div>
        ))}
      </div>
    </Inset>
  );
}

