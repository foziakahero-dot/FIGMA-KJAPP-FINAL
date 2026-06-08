import { motion } from "motion/react";
import {
  Car,
  CreditCard,
  MapPin,
  Star,
  Gift,
  LifeBuoy,
  Settings as SettingsIcon,
  KeyRound,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Sparkles,
  Package,
  Briefcase,
  ShieldAlert,
} from "lucide-react";
import type { ReactNode } from "react";
import { HolographicBackground } from "../HolographicBackground";
import { GlassPanel } from "../GlassPanel";
import { BottomNavigation } from "../BottomNavigation";
import { user } from "../../data/mockData";
import type { Screen } from "../../App";

type MenuItem = {
  id: string;
  label: string;
  desc?: string;
  icon: ReactNode;
  to: Screen;
};

export function Profile({ go }: { go: (s: Screen) => void }) {
  const items: MenuItem[] = [
    { id: "history", label: "Mine turer", desc: "Kommende og tidligere", icon: <Car className="w-4 h-4" />, to: "history" },
    { id: "payment", label: "Betaling", desc: "Vipps · Apple Pay · kort", icon: <CreditCard className="w-4 h-4" />, to: "payment" },
    { id: "places", label: "Lagrede steder", desc: "Hjem, jobb, favoritter", icon: <MapPin className="w-4 h-4" />, to: "places" },
    { id: "plus", label: "KJAPP+", desc: "Aktiv · fornyes 12. juli", icon: <Star className="w-4 h-4" />, to: "payment" },
    { id: "invite", label: "Inviter venner", desc: "Få 150 kr per venn", icon: <Gift className="w-4 h-4" />, to: "support" },
    { id: "support", label: "Support", desc: "Hjelp og kontakt", icon: <LifeBuoy className="w-4 h-4" />, to: "support" },
    { id: "settings", label: "Innstillinger", desc: "Konto, app, sikkerhet", icon: <SettingsIcon className="w-4 h-4" />, to: "settings" },
    { id: "driver", label: "Bli sjåfør", desc: "Søk eller logg inn", icon: <KeyRound className="w-4 h-4" />, to: "become-driver" },
    { id: "export", label: "Eksport-senter", desc: "Last ned bygg-filer for pilot", icon: <Package className="w-4 h-4" />, to: "export" },
    { id: "fleet", label: "Flåte-panel", desc: "Løyvehaver-oversikt", icon: <Briefcase className="w-4 h-4" />, to: "fleet-dashboard" },
    { id: "admin", label: "Super-Admin", desc: "Godkjenn nye løyvehavere", icon: <ShieldAlert className="w-4 h-4" />, to: "super-admin-inbox" },
  ];

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
      <HolographicBackground intensity={0.85} />

      {/* Fixed header */}
      <div
        className="absolute top-0 left-0 right-0 z-20 px-5"
        style={{ paddingTop: "max(env(safe-area-inset-top), 16px)" }}
      >
        <div className="flex items-center justify-between gap-3 py-2">
          <button
            onClick={() => go("home")}
            aria-label="Tilbake"
            className="w-10 h-10 rounded-full glass-panel flex items-center justify-center active:scale-95 transition shrink-0"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <span
            className="text-white font-display uppercase"
            style={{ fontSize: 11, letterSpacing: "0.32em" }}
          >
            Profil
          </span>
          <button
            onClick={() => go("settings")}
            aria-label="Innstillinger"
            className="w-10 h-10 rounded-full glass-panel flex items-center justify-center active:scale-95 transition shrink-0"
          >
            <SettingsIcon className="w-4 h-4 text-white" />
          </button>
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
        {/* Profile hero card */}
        <GlassPanel holo glow className="rounded-3xl relative overflow-visible" style={{ minHeight: 88, padding: "14px 16px" }}>
          <motion.div
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none"
            style={{ background: "var(--aurora-gradient)", opacity: 0.35 }}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <div className="relative flex items-center gap-3">
            <div
              className="rounded-full flex items-center justify-center font-display shrink-0"
              style={{
                width: 52,
                height: 52,
                background: "var(--aurora-gradient)",
                color: "#05060f",
                fontSize: 22
              }}
            >
              {user.initial}
            </div>
            <div className="flex-1 min-w-0">
              <div
                className="text-white font-display"
                style={{ fontSize: 22, lineHeight: "28px", fontWeight: 700 }}
              >
                {user.name}
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <span
                  className="px-2 py-0.5 rounded-full font-display"
                  style={{
                    background: "rgba(94,240,255,0.16)",
                    color: "var(--aurora-cyan)",
                    fontSize: 9,
                    letterSpacing: "0.16em",
                  }}
                >
                  KJAPP+
                </span>
                <ShieldCheck className="w-3 h-3 text-[var(--aurora-cyan)]" />
                <span className="text-white/55 font-mono" style={{ fontSize: 9, letterSpacing: "0.1em" }}>
                  BankID-verifisert
                </span>
              </div>
              <div className="text-white/65 mt-1.5" style={{ fontSize: 11 }}>
                mathilde@kjapp.no · +47 9•• •• 421
              </div>
            </div>
          </div>
          <div className="relative mt-4 grid grid-cols-3 gap-2">
            <Stat value={user.rating} label="Rating" />
            <Stat value={user.trips} label="Turer" />
            <Stat value="42kg" label="CO₂ spart" />
          </div>
        </GlassPanel>

        {/* KJAPP Connect — compact card */}
        <motion.button
          whileTap={{ scale: 0.99 }}
          onClick={() => go("connect")}
          className="mt-3 w-full glass-panel holo-border rounded-3xl text-left relative overflow-hidden"
          style={{ padding: "16px" }}
        >
          <div
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none"
            style={{ background: "var(--aurora-gradient)", opacity: 0.34 }}
          />
          <div className="relative flex items-start gap-3">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: "var(--aurora-gradient)" }}
            >
              <Sparkles className="w-5 h-5 text-[#05060f]" strokeWidth={2.2} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <div
                  className="text-white font-display"
                  style={{ fontSize: 15, lineHeight: 1.3 }}
                >
                  KJAPP Connect
                </div>
                <span
                  className="font-mono uppercase px-1.5 py-0.5 rounded-full shrink-0"
                  style={{
                    fontSize: 8,
                    letterSpacing: "0.18em",
                    background: "rgba(160,107,255,0.18)",
                    color: "var(--aurora-violet)",
                  }}
                >
                  Beta
                </span>
              </div>
              <div
                className="text-white/70 mt-1"
                style={{ fontSize: 11.5, lineHeight: 1.4 }}
              >
                Musikk, kalender, deling og smarte reiser
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {["Ruter/Entur", "Spotify", "Instagram", "WhatsApp"].map((s) => (
                  <span
                    key={s}
                    className="font-mono uppercase px-2 py-0.5 rounded-full"
                    style={{
                      fontSize: 8,
                      letterSpacing: "0.14em",
                      background: "rgba(255,255,255,0.06)",
                      color: "rgba(255,255,255,0.7)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-white/65 shrink-0 mt-0.5" />
          </div>
        </motion.button>

        {/* Menu */}
        <div className="mt-3 space-y-2">
          {items.map((it) => (
            <MenuRow key={it.id} item={it} onClick={() => go(it.to)} />
          ))}
        </div>

        <button
          onClick={() => go("signin")}
          className="mt-4 w-full text-center text-white/65 py-2"
          style={{ fontSize: 12 }}
        >
          Logg ut
        </button>
        <div
          className="mt-1 pb-2 text-center text-white/45 font-mono"
          style={{ fontSize: 9, letterSpacing: "0.22em" }}
        >
          © 2026 KJAPP AS · v0.1
        </div>
      </div>

      <BottomNavigation active="profil" go={go} />
    </div>
  );
}

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="glass-panel rounded-xl py-2 text-center">
      <div className="text-white font-display" style={{ fontSize: 14 }}>
        {value}
      </div>
      <div
        className="text-white/60 font-mono uppercase mt-0.5"
        style={{ fontSize: 8, letterSpacing: "0.16em" }}
      >
        {label}
      </div>
    </div>
  );
}

function MenuRow({ item, onClick }: { item: MenuItem; onClick: () => void }) {
  return (
    <motion.button
      whileTap={{ scale: 0.985 }}
      onClick={onClick}
      className="w-full glass-panel rounded-2xl px-3.5 py-3 flex items-center gap-3 text-left"
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: "rgba(94,240,255,0.12)", color: "var(--aurora-cyan)" }}
      >
        {item.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-white" style={{ fontSize: 13 }}>
          {item.label}
        </div>
        {item.desc && (
          <div className="text-white/55 truncate" style={{ fontSize: 10.5 }}>
            {item.desc}
          </div>
        )}
      </div>
      <ChevronRight className="w-4 h-4 text-white/45" />
    </motion.button>
  );
}
