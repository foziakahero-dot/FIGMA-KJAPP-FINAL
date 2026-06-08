import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { MapPin, Circle, Zap, Shield, Train, Leaf, Plus, Car, Gem, Truck } from "lucide-react";
import { HolographicBackground } from "../HolographicBackground";
import { LiveMap } from "../LiveMap";
import { GlassPanel } from "../GlassPanel";
import { TopBar } from "../TopBar";
import { RideVibePicker } from "../RideVibePicker";
import { PlacesSheet, type PlaceSelection } from "../booking/PlacesSheet";
import { carOptions } from "../../data/mockData";
import { haptic } from "../../lib/haptics";
import { requestRide } from "../../data/rides";
import type { Screen } from "../../App";

const TOLL = 22;
const T_BANE_CO2 = 0.05;

const iconFor = (id: string) => {
  if (id === "zap") return <Zap className="w-5 h-5" strokeWidth={2.5} />;
  if (id === "car") return <Car className="w-5 h-5" strokeWidth={2.5} />;
  if (id === "gem") return <Gem className="w-5 h-5" strokeWidth={2.5} />;
  if (id === "truck") return <Truck className="w-5 h-5" strokeWidth={2.5} />;
  return <Car className="w-5 h-5" strokeWidth={2.5} />;
};

export function BookRide({ go }: { go: (s: Screen) => void }) {
  const [selected, setSelected] = useState("std");
  const [safe, setSafe] = useState(false);
  const [stops, setStops] = useState<string[]>([]);
  const [pickup, setPickup] = useState<PlaceSelection | null>({
    place_id: "default-pickup",
    address: "Thorvald Meyers gate 41",
    lat: 59.9241,
    lng: 10.7585,
  });
  const [destination, setDestination] = useState<PlaceSelection | null>({
    place_id: "default-dest",
    address: "Maaemo · Schweigaards gate 15",
    lat: 59.9075,
    lng: 10.7510,
  });
  const [sheet, setSheet] = useState<null | "pickup" | "destination">(null);
  const [booking, setBooking] = useState(false);
  const [bookError, setBookError] = useState<string | null>(null);

  const tierMap: Record<string, string> = {
    eco: "Eco",
    std: "Standard",
    standard: "Standard",
    premium: "Premium",
    xl: "XL",
  };

  const handleBook = async () => {
    if (!pickup || !destination) {
      setBookError("Velg start- og destinasjons-adresse");
      return;
    }
    setBooking(true);
    setBookError(null);
    haptic([6, 30, 12]);
    try {
      await requestRide({
        tier: tierMap[car.id] ?? "Standard",
        pickup: {
          place_id: pickup.place_id,
          address: pickup.address,
          lat: pickup.lat,
          lng: pickup.lng,
        },
        destination: {
          place_id: destination.place_id,
          address: destination.address,
          lat: destination.lat,
          lng: destination.lng,
        },
      });
      go("track");
    } catch (e) {
      setBookError(`Kunne ikke bestille: ${e}`);
    } finally {
      setBooking(false);
    }
  };
  const car = carOptions.find((c) => c.id === selected)!;
  const total = car.price + TOLL;

  return (
    <div className="relative w-full h-full overflow-hidden">
      <HolographicBackground intensity={0.4} />
      <div className="absolute inset-0">
        <LiveMap showRoute={{ from: [10.7585, 59.9241], to: [10.7510, 59.9075] }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#05060f]/55 via-[#05060f]/20 to-[#05060f]" />

      <div className="relative h-full flex flex-col px-5 pt-2">
        <TopBar
          onBack={() => go("home")}
          title="PLANLEGG REISEN"
          subtitle="Vi finner raskeste vei"
        />

        {/* From / To */}
        <GlassPanel holo className="mt-4 p-4">
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center pt-1">
              <Circle className="w-2.5 h-2.5 text-[var(--aurora-cyan)] fill-[var(--aurora-cyan)]" />
              <div className="w-px h-7 bg-white/20 my-1" />
              <MapPin className="w-3 h-3 text-[var(--aurora-magenta)]" />
            </div>
            <div className="flex-1 space-y-2.5">
              <button
                onClick={() => setSheet("pickup")}
                className="text-left w-full active:opacity-80 transition"
              >
                <div className="text-white/60 text-[10px] font-mono tracking-wider">FRA</div>
                <div className="text-white text-[13px]">
                  {pickup?.address ?? "Velg startadresse"}
                </div>
              </button>
              <div className="h-px bg-white/10" />
              {stops.map((stop, i) => (
                <div key={i} className="flex items-center justify-between gap-2">
                  <div className="flex-1">
                    <div className="text-white/60 text-[10px] font-mono tracking-wider">STOPP {i + 1}</div>
                    <div className="text-white text-[13px]">{stop}</div>
                  </div>
                  <button
                    onClick={() => setStops(stops.filter((_, idx) => idx !== i))}
                    className="text-white/45 text-[11px] px-2 py-1"
                    aria-label="Fjern stopp"
                  >
                    Fjern
                  </button>
                </div>
              ))}
              <button
                onClick={() => setSheet("destination")}
                className="text-left w-full active:opacity-80 transition"
              >
                <div className="text-white/60 text-[10px] font-mono tracking-wider">TIL</div>
                <div className="text-white text-[13px]">
                  {destination?.address ?? "Hvor skal du?"}
                </div>
              </button>
              <button
                onClick={() => {
                  const next = prompt("Legg til stopp");
                  if (next && next.trim()) setStops([...stops, next.trim()]);
                }}
                className="flex items-center gap-1 text-[var(--aurora-cyan)] text-[11px]"
              >
                <Plus className="w-3 h-3" /> Legg til stopp
              </button>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[10px] font-mono">
            <span className="text-white/70">12 min</span>
            <span className="text-white/70">4,2 km</span>
            <span className="text-white/70">Bom 22 kr</span>
            <span className="flex items-center gap-1 text-[var(--aurora-mint)]">
              <Zap className="w-3 h-3" /> RASKESTE
            </span>
          </div>
        </GlassPanel>

        {/* Ruter-kombiner */}
        <button
          onClick={() => go("chat")}
          className="mt-3 w-full glass-panel rounded-2xl p-3 flex items-center gap-3 text-left active:scale-[0.99] transition"
        >
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
               style={{ background: "rgba(94,240,255,0.15)" }}>
            <Train className="w-4 h-4 text-[var(--aurora-cyan)]" />
          </div>
          <div className="flex-1">
            <div className="text-white text-[12px]">Kombiner med Ruter</div>
            <div className="text-white/65 text-[11px]">T-bane 5 + Kjapp fra Stortinget — spar 84 kr</div>
          </div>
          <span className="text-[var(--aurora-cyan)] text-[11px] font-display">Vis</span>
        </button>

        <div className="flex-1" />

        {/* Tur-stemning */}
        <div className="mt-3">
          <RideVibePicker />
        </div>

        {/* Trygg hjem-toggle */}
        <button
          onClick={() => setSafe(!safe)}
          className={`mt-3 w-full rounded-2xl p-3 flex items-center gap-3 transition active:scale-[0.99] ${safe ? "holo-border" : "glass-panel"}`}
          style={safe ? { background: "var(--aurora-gradient-soft)" } : {}}
          aria-pressed={safe}
        >
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
               style={{ background: safe ? "var(--aurora-gradient)" : "rgba(255,255,255,0.06)" }}>
            <Shield className={`w-4 h-4 ${safe ? "text-[#05060f]" : "text-[var(--aurora-cyan)]"}`} />
          </div>
          <div className="flex-1 text-left">
            <div className="text-white text-[12px]">Trygg hjem</div>
            <div className="text-white/65 text-[11px]">
              {safe ? "Deler tur med kontakten din · sjekkpunkter underveis" : "Del turen med en du stoler på"}
            </div>
          </div>
          <div className={`text-[11px] font-display tracking-wider ${safe ? "text-white" : "text-white/55"}`}>
            {safe ? "PÅ" : "AV"}
          </div>
        </button>

        {/* Car selection */}
        <div className="space-y-2 pb-3 mt-3">
          <div className="flex items-center justify-between mb-1 px-1">
            <span className="text-white text-[11px] font-display tracking-wider uppercase">Velg bil</span>
            <span className="flex items-center gap-1 text-[var(--aurora-mint)] text-[10px]">
              <Leaf className="w-3 h-3" />
              {car.co2 === 0 ? "0 g CO₂ · helelektrisk" : `${(car.co2 * 4.2).toFixed(1)} kg CO₂ · T-bane: ${(T_BANE_CO2 * 4.2).toFixed(2)} kg`}
            </span>
          </div>
          {carOptions.map((c, i) => {
            const active = c.id === selected;
            return (
              <motion.button
                key={c.id}
                onClick={() => setSelected(c.id)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full glass-panel rounded-2xl p-3 flex items-center gap-3 relative overflow-hidden text-left ${active ? "holo-border" : ""}`}
              >
                <AnimatePresence>
                  {active && (
                    <motion.div
                      layoutId="carHighlight"
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: "var(--aurora-gradient-soft)" }}
                    />
                  )}
                </AnimatePresence>
                <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center text-white ${active ? "text-[var(--aurora-cyan)]" : "text-white/70"}`}
                     style={{ background: active ? "rgba(94,240,255,0.15)" : "rgba(255,255,255,0.06)" }}>
                  {iconFor(c.icon)}
                </div>
                <div className="relative flex-1">
                  <div className="text-white text-[13px]">{c.name}</div>
                  <div className="text-white/65 text-[11px]">{c.desc} · {c.eta}</div>
                </div>
                <div className="relative text-right">
                  <div className="text-white text-[14px] font-display">{c.price} kr</div>
                  <div className="text-white/55 text-[10px] font-mono">+ bom 22</div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* CTA */}
        {bookError && (
          <div
            style={{
              color: "#ff7a9d",
              fontSize: 12,
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            {bookError}
          </div>
        )}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleBook}
          disabled={booking}
          aria-label={`Bestill for ${total} kroner`}
          className="mb-4 relative rounded-2xl h-14 overflow-hidden text-white"
          style={{ animation: booking ? undefined : "pulse-glow 3s ease-in-out infinite", opacity: booking ? 0.7 : 1 }}
        >
          <div className="absolute inset-0" style={{ background: "var(--aurora-gradient)" }} />
          <div className="absolute inset-0 opacity-30"
               style={{
                 background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                 backgroundSize: "200% 100%",
                 animation: "shimmer 2.5s linear infinite",
               }} />
          <div className="relative h-full flex items-center justify-center gap-2 text-[#05060f] font-display tracking-wider">
            {booking ? "BESTILLER…" : `BESTILL · ${total} KR`}
            {!booking && <span className="text-[10px] font-mono opacity-70">VIPPS</span>}
          </div>
        </motion.button>
      </div>

      <PlacesSheet
        open={sheet !== null}
        title={sheet === "pickup" ? "Velg startadresse" : "Hvor skal du?"}
        initialValue={
          sheet === "pickup" ? pickup?.address : destination?.address
        }
        onClose={() => setSheet(null)}
        onSelect={(place) => {
          if (sheet === "pickup") setPickup(place);
          else if (sheet === "destination") setDestination(place);
          setSheet(null);
        }}
      />
    </div>
  );
}
