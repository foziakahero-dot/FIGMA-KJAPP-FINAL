import { MapPin, Navigation, Clock, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { HolographicBackground } from "../HolographicBackground";
import { GlassPanel } from "../GlassPanel";
import type { Screen } from "../../App";

type TripStatus = "Aktiv" | "Fullført" | "Kansellert";

type Trip = {
  id: string;
  customer: string;
  pickup: string;
  destination: string;
  time: string;
  fare: string;
  payment: "Vipps" | "Kort";
  status: TripStatus;
  eta?: string;
};

const ACTIVE_TRIP: Trip = {
  id: "active",
  customer: "Mathilde",
  pickup: "Thorvald Meyers gate 41",
  destination: "Maaemo",
  time: "Nå",
  fare: "249 kr",
  payment: "Vipps",
  status: "Aktiv",
  eta: "2 min",
};

const TODAY_TRIPS: Trip[] = [
  {
    id: "t1",
    customer: "Mathilde",
    pickup: "Thorvald Meyers gate 41",
    destination: "Maaemo",
    time: "19:30",
    fare: "249 kr",
    payment: "Vipps",
    status: "Fullført",
  },
  {
    id: "t2",
    customer: "Jonas",
    pickup: "Oslo S",
    destination: "Grünerløkka",
    time: "17:10",
    fare: "189 kr",
    payment: "Kort",
    status: "Fullført",
  },
  {
    id: "t3",
    customer: "Aisha",
    pickup: "Majorstuen",
    destination: "Gardermoen",
    time: "14:20",
    fare: "699 kr",
    payment: "Vipps",
    status: "Fullført",
  },
];

const EARLIER_TRIPS: Trip[] = [
  {
    id: "t4",
    customer: "Lars",
    pickup: "Frogner",
    destination: "Aker Brygge",
    time: "15 jun · 20:15",
    fare: "156 kr",
    payment: "Vipps",
    status: "Fullført",
  },
  {
    id: "t5",
    customer: "Emma",
    pickup: "Sentrum",
    destination: "Blindern",
    time: "14 jun · 18:40",
    fare: "178 kr",
    payment: "Kort",
    status: "Fullført",
  },
];

export function DriverTrips({ go }: { go: (s: Screen) => void }) {
  const [activeTab, setActiveTab] = useState<"aktiv" | "idag" | "tidligere">("idag");

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
        <div className="flex items-center justify-center gap-3 py-2">
          <span
            className="text-white font-display uppercase"
            style={{ fontSize: 11, letterSpacing: "0.32em" }}
          >
            Turer
          </span>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mt-3">
          <TabButton
            label="Aktiv"
            active={activeTab === "aktiv"}
            onClick={() => setActiveTab("aktiv")}
          />
          <TabButton
            label="I dag"
            active={activeTab === "idag"}
            onClick={() => setActiveTab("idag")}
          />
          <TabButton
            label="Tidligere"
            active={activeTab === "tidligere"}
            onClick={() => setActiveTab("tidligere")}
          />
        </div>
      </div>

      {/* Scrollable content */}
      <div
        className="relative h-full overflow-y-auto px-5"
        style={{
          paddingTop: "calc(max(env(safe-area-inset-top), 16px) + 96px)",
          paddingBottom: "calc(80px + max(env(safe-area-inset-bottom), 16px))",
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-y",
          scrollbarWidth: "none",
        }}
      >
        <div className="space-y-3 pb-4">
          {/* Aktiv tab */}
          {activeTab === "aktiv" && (
            <>
              {ACTIVE_TRIP ? (
                <TripCard trip={ACTIVE_TRIP} isActive onOpen={() => go("driver-trip-active")} />
              ) : (
                <GlassPanel className="rounded-2xl p-6 text-center">
                  <Clock className="w-10 h-10 text-white/40 mx-auto mb-2" />
                  <div className="text-white" style={{ fontSize: 14 }}>
                    Ingen aktiv tur
                  </div>
                  <div
                    className="text-white/55 mt-1"
                    style={{ fontSize: 11, lineHeight: 1.4 }}
                  >
                    Gå på nett for å motta nye turer.
                  </div>
                </GlassPanel>
              )}
            </>
          )}

          {/* I dag tab */}
          {activeTab === "idag" && (
            <>
              {TODAY_TRIPS.length === 0 ? (
                <GlassPanel className="rounded-2xl p-6 text-center">
                  <div className="text-white" style={{ fontSize: 14 }}>
                    Ingen turer i dag
                  </div>
                  <div
                    className="text-white/55 mt-1"
                    style={{ fontSize: 11, lineHeight: 1.4 }}
                  >
                    Turer vises her etter de er fullført.
                  </div>
                </GlassPanel>
              ) : (
                TODAY_TRIPS.map((trip) => <TripCard key={trip.id} trip={trip} />)
              )}
            </>
          )}

          {/* Tidligere tab */}
          {activeTab === "tidligere" && (
            <>
              {EARLIER_TRIPS.length === 0 ? (
                <GlassPanel className="rounded-2xl p-6 text-center">
                  <div className="text-white" style={{ fontSize: 14 }}>
                    Ingen tidligere turer
                  </div>
                </GlassPanel>
              ) : (
                EARLIER_TRIPS.map((trip) => <TripCard key={trip.id} trip={trip} compact />)
              )}
            </>
          )}
        </div>
      </div>

      {/* Bottom navigation */}
      <div
        className="absolute left-4 right-4 z-40 pointer-events-none"
        style={{ bottom: "max(env(safe-area-inset-bottom), 12px)" }}
      >
        <GlassPanel className="rounded-full px-2 py-1.5 flex items-center justify-around holo-border pointer-events-auto">
          <NavButton label="Hjem" onClick={() => go("driver")} />
          <NavButton label="Turer" active onClick={() => go("driver-trips")} />
          <NavButton label="Inntekt" onClick={() => go("driver-earnings")} />
          <NavButton label="Profil" onClick={() => go("driver-profile")} />
        </GlassPanel>
      </div>
    </div>
  );
}

function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-2 rounded-xl transition ${
        active ? "text-white" : "text-white/55"
      }`}
      style={
        active
          ? {
              background: "rgba(94,240,255,0.12)",
              boxShadow: "inset 0 0 0 1px rgba(94,240,255,0.3)",
            }
          : { background: "rgba(255,255,255,0.03)" }
      }
    >
      <span className="font-display" style={{ fontSize: 11, letterSpacing: "0.08em" }}>
        {label}
      </span>
    </button>
  );
}

function TripCard({
  trip,
  isActive,
  compact,
  onOpen,
}: {
  trip: Trip;
  isActive?: boolean;
  compact?: boolean;
  onOpen?: () => void;
}) {
  return (
    <GlassPanel
      holo={isActive}
      className={`rounded-2xl p-4 ${isActive ? "glow" : ""}`}
    >
      {isActive && (
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-white/5">
          <span
            className="px-2 py-0.5 rounded-full font-mono"
            style={{
              background: "rgba(94,240,255,0.16)",
              color: "var(--aurora-cyan)",
              fontSize: 9,
              letterSpacing: "0.1em",
            }}
          >
            PÅ VEI TIL KUNDE
          </span>
          {trip.eta && (
            <span className="text-white/65 ml-auto" style={{ fontSize: 11 }}>
              {trip.eta}
            </span>
          )}
        </div>
      )}

      <div className="flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-display shrink-0"
          style={{
            background: "var(--aurora-gradient)",
            color: "#05060f",
            fontSize: 14,
          }}
        >
          {trip.customer.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-white" style={{ fontSize: 13 }}>
            {trip.customer}
          </div>
          <div className="flex items-start gap-2 mt-1">
            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[var(--aurora-cyan)] shrink-0 mt-0.5" />
                <span className="text-white/75" style={{ fontSize: 11, lineHeight: 1.3 }}>
                  {trip.pickup}
                </span>
              </div>
              <div className="flex items-start gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-[var(--aurora-violet)] shrink-0 mt-0.5" />
                <span className="text-white/75" style={{ fontSize: 11, lineHeight: 1.3 }}>
                  {trip.destination}
                </span>
              </div>
            </div>
          </div>

          {!compact && (
            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-white/5">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-white/55" />
                <span className="text-white/65" style={{ fontSize: 11 }}>
                  {trip.time}
                </span>
              </div>
              <div className="text-white font-display" style={{ fontSize: 13 }}>
                {trip.fare}
              </div>
              <span
                className="px-2 py-0.5 rounded-full font-mono ml-auto"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  color: "var(--aurora-cyan)",
                  fontSize: 9,
                  letterSpacing: "0.1em",
                }}
              >
                {trip.payment}
              </span>
            </div>
          )}

          {compact && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-white/55" style={{ fontSize: 10 }}>
                {trip.time}
              </span>
              <span className="text-white/55" style={{ fontSize: 10 }}>·</span>
              <span className="text-white font-display" style={{ fontSize: 11 }}>
                {trip.fare}
              </span>
            </div>
          )}
        </div>

        {trip.status === "Fullført" && !isActive && (
          <CheckCircle2 className="w-5 h-5 text-[var(--aurora-cyan)] shrink-0" />
        )}
      </div>

      {isActive && onOpen && (
        <button
          onClick={onOpen}
          className="w-full mt-3 rounded-xl h-10 relative overflow-hidden active:scale-[0.98] transition"
        >
          <div className="absolute inset-0" style={{ background: "var(--aurora-gradient)" }} />
          <div
            className="relative h-full flex items-center justify-center text-[#05060f] font-display"
            style={{ fontSize: 11, letterSpacing: "0.14em" }}
          >
            ÅPNE TUR
          </div>
        </button>
      )}
    </GlassPanel>
  );
}

function NavButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex flex-col items-center gap-0.5 py-2 rounded-full transition ${
        active ? "text-white" : "text-white/55"
      }`}
      style={
        active
          ? {
              background: "rgba(94,240,255,0.10)",
              boxShadow: "inset 0 0 0 1px rgba(94,240,255,0.28)",
            }
          : {}
      }
    >
      <span className="font-display" style={{ fontSize: 10, letterSpacing: "0.06em" }}>
        {label}
      </span>
    </button>
  );
}
