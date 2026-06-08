import { TrendingUp, DollarSign, Star, Award, Info } from "lucide-react";
import { HolographicBackground } from "../HolographicBackground";
import { GlassPanel } from "../GlassPanel";
import type { Screen } from "../../App";

const WEEK_EARNINGS = [
  { day: "Mandag", amount: 820 },
  { day: "Tirsdag", amount: 640 },
  { day: "Onsdag", amount: 0 },
  { day: "Torsdag", amount: 1210 },
  { day: "Fredag", amount: 750 },
  { day: "Lørdag", amount: 0 },
  { day: "Søndag", amount: 0 },
];

const RIDE_EARNINGS = [
  { destination: "Maaemo", amount: 249 },
  { destination: "Gardermoen", amount: 699 },
  { destination: "Grünerløkka", amount: 189 },
];

export function DriverEarnings({ go }: { go: (s: Screen) => void }) {
  const todayEarnings = 249;
  const todayTrips = 1;
  const weekEarnings = 3420;
  const weekTrips = 18;
  const rating = 5.0;
  const bonus = 0;

  const maxWeekAmount = Math.max(...WEEK_EARNINGS.map((e) => e.amount));

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
            Inntekt
          </span>
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
          {/* Today summary */}
          <GlassPanel holo glow className="rounded-3xl p-5 relative overflow-hidden">
            <div
              className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none"
              style={{
                background: "linear-gradient(135deg, #ffb547 0%, #ff8c42 100%)",
                opacity: 0.28,
              }}
            />
            <div className="relative text-center">
              <div className="text-white/55 font-mono uppercase" style={{ fontSize: 9, letterSpacing: "0.16em" }}>
                I dag
              </div>
              <div className="text-white font-display mt-1" style={{ fontSize: 36 }}>
                {todayEarnings} kr
              </div>
              <div className="text-white/65 mt-1" style={{ fontSize: 12 }}>
                {todayTrips} fullført tur
              </div>
            </div>
          </GlassPanel>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3">
            <GlassPanel className="rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-[var(--aurora-cyan)]" />
                <span
                  className="text-white/55 font-mono uppercase"
                  style={{ fontSize: 9, letterSpacing: "0.16em" }}
                >
                  Denne uken
                </span>
              </div>
              <div className="text-white font-display" style={{ fontSize: 20 }}>
                {weekEarnings.toLocaleString()} kr
              </div>
              <div className="text-white/55 mt-1" style={{ fontSize: 10 }}>
                {weekTrips} turer
              </div>
            </GlassPanel>

            <GlassPanel className="rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-[var(--aurora-cyan)]" />
                <span
                  className="text-white/55 font-mono uppercase"
                  style={{ fontSize: 9, letterSpacing: "0.16em" }}
                >
                  Rating
                </span>
              </div>
              <div className="text-white font-display" style={{ fontSize: 20 }}>
                {rating}
              </div>
              <div className="text-white/55 mt-1" style={{ fontSize: 10 }}>
                {weekTrips} vurderinger
              </div>
            </GlassPanel>
          </div>

          {/* Bonus */}
          <GlassPanel className="rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[var(--aurora-violet)]" />
                <div>
                  <div className="text-white" style={{ fontSize: 13 }}>
                    Bonus
                  </div>
                  <div className="text-white/55" style={{ fontSize: 10 }}>
                    Denne uken
                  </div>
                </div>
              </div>
              <div className="text-white font-display" style={{ fontSize: 18 }}>
                {bonus} kr
              </div>
            </div>
          </GlassPanel>

          {/* Payout info */}
          <div>
            <div
              className="text-white/65 font-display uppercase mb-2 px-1"
              style={{ fontSize: 10, letterSpacing: "0.22em" }}
            >
              Utbetaling
            </div>
            <GlassPanel holo className="rounded-2xl p-4">
              <div className="flex items-start gap-3 mb-4">
                <Info className="w-5 h-5 text-[var(--aurora-cyan)] shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="text-white" style={{ fontSize: 13, lineHeight: 1.4 }}>
                    Utbetaling håndteres etter avtale med løyvehaver.
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-white/5">
                <div className="flex items-center justify-between">
                  <span className="text-white/65" style={{ fontSize: 11 }}>
                    Estimert brutto
                  </span>
                  <span className="text-white" style={{ fontSize: 12 }}>
                    {todayEarnings} kr
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/65" style={{ fontSize: 11 }}>
                    KJAPP-fee
                  </span>
                  <span className="text-white/55" style={{ fontSize: 11 }}>
                    beregnes
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/65" style={{ fontSize: 11 }}>
                    Utbetaling
                  </span>
                  <span className="text-white/55" style={{ fontSize: 11 }}>
                    via løyvehaver
                  </span>
                </div>
              </div>
            </GlassPanel>
          </div>

          {/* Weekly breakdown */}
          <div>
            <div
              className="text-white/65 font-display uppercase mb-2 px-1"
              style={{ fontSize: 10, letterSpacing: "0.22em" }}
            >
              Ukentlig oversikt
            </div>
            <GlassPanel className="rounded-2xl p-4">
              <div className="space-y-2.5">
                {WEEK_EARNINGS.map((entry) => (
                  <div key={entry.day} className="flex items-center gap-3">
                    <span className="text-white/65 w-20" style={{ fontSize: 11 }}>
                      {entry.day}
                    </span>
                    <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-white/5">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${entry.amount > 0 ? (entry.amount / maxWeekAmount) * 100 : 0}%`,
                          background:
                            entry.amount > 0
                              ? "linear-gradient(90deg, var(--aurora-cyan) 0%, var(--aurora-violet) 100%)"
                              : "transparent",
                        }}
                      />
                    </div>
                    <span className="text-white font-display w-16 text-right" style={{ fontSize: 11 }}>
                      {entry.amount > 0 ? `${entry.amount} kr` : "—"}
                    </span>
                  </div>
                ))}
              </div>
            </GlassPanel>
          </div>

          {/* Ride earnings */}
          <div>
            <div
              className="text-white/65 font-display uppercase mb-2 px-1"
              style={{ fontSize: 10, letterSpacing: "0.22em" }}
            >
              Turer i dag
            </div>
            <div className="space-y-2">
              {RIDE_EARNINGS.map((ride, i) => (
                <GlassPanel key={i} className="rounded-2xl px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-4 h-4 text-white/55" />
                    <span className="text-white" style={{ fontSize: 12 }}>
                      {ride.destination}
                    </span>
                  </div>
                  <span className="text-white font-display" style={{ fontSize: 13 }}>
                    {ride.amount} kr
                  </span>
                </GlassPanel>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <div
        className="absolute left-4 right-4 z-40 pointer-events-none"
        style={{ bottom: "max(env(safe-area-inset-bottom), 12px)" }}
      >
        <GlassPanel className="rounded-full px-2 py-1.5 flex items-center justify-around holo-border pointer-events-auto">
          <NavButton label="Hjem" onClick={() => go("driver")} />
          <NavButton label="Turer" onClick={() => go("driver-trips")} />
          <NavButton label="Inntekt" active onClick={() => go("driver-earnings")} />
          <NavButton label="Profil" onClick={() => go("driver-profile")} />
        </GlassPanel>
      </div>
    </div>
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
