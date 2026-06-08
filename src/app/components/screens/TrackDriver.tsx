import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Phone, MessageCircle, Shield, Star, Share2, Compass, HeadphonesIcon } from "lucide-react";
import { HolographicBackground } from "../HolographicBackground";
import { LiveMap } from "../LiveMap";
import { GlassPanel } from "../GlassPanel";
import { AuroraOrb } from "../AuroraOrb";
import { SpotifyHandoff } from "../SpotifyHandoff";
import { ShareTripSheet } from "../ShareTripSheet";
import { TripMessagingSheet } from "../TripMessagingSheet";
import { TopBar } from "../TopBar";
import { driver } from "../../data/mockData";
import { haptic } from "../../lib/haptics";
import { getActiveRideId, getRide, type Ride } from "../../data/rides";
import type { Screen } from "../../App";

export function TrackDriver({ go }: { go: (s: Screen) => void }) {
  const [eta, setEta] = useState(driver.eta);
  const [status, setStatus] = useState<"coming" | "arrived" | "ontrip">("coming");
  const [shareOpen, setShareOpen] = useState(false);
  const [msgOpen, setMsgOpen] = useState(false);
  const [realRide, setRealRide] = useState<Ride | null>(null);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

  // Poll real ride status every 3s if there's an active ride
  useEffect(() => {
    const rideId = getActiveRideId();
    if (!rideId) return;
    let stop = false;
    const tick = async () => {
      if (stop) return;
      const ride = await getRide(rideId);
      if (ride && !stop) {
        setRealRide(ride);
        if (ride.status === "requested") setWaitingForDriver(true);
        if (ride.status === "accepted") {
          setWaitingForDriver(false);
          setStatus("coming");
        }
        if (ride.status === "driver_arrived") setStatus("arrived");
        if (ride.status === "in_progress") setStatus("ontrip");
        if (ride.status === "completed") {
          stop = true;
          go("complete");
          return;
        }
      }
      if (!stop) setTimeout(tick, 3000);
    };
    tick();
    return () => {
      stop = true;
    };
  }, [go]);

  // Mock countdown only runs when there's no real ride
  useEffect(() => {
    if (realRide) return;
    if (status !== "coming") return;
    const id = setInterval(() => {
      setEta((e) => {
        if (e <= 1) {
          setStatus("arrived");
          clearInterval(id);
          return 0;
        }
        return e - 1;
      });
    }, 1800);
    return () => clearInterval(id);
  }, [status, realRide]);

  const primary = () => {
    if (status === "arrived") { haptic(8); setStatus("ontrip"); }
    else if (status === "ontrip") { haptic([6, 30, 12]); go("complete"); }
  };

  const statusText =
    waitingForDriver ? "Søker sjåfør i nærheten…"
    : status === "coming" ? `Sjåfør ankommer om ${eta} min`
    : status === "arrived" ? "Sjåfør har ankommet"
    : "På tur mot destinasjon";

  const ctaText =
    status === "coming" ? "VENTER PÅ SJÅFØR…"
    : status === "arrived" ? "JEG ER I BILEN →"
    : "AVSLUTT TUR";

  const ctaEnabled = status !== "coming";

  return (
    <div className="relative w-full h-full overflow-hidden">
      <HolographicBackground intensity={0.6} />
      <div className="absolute inset-0">
        <LiveMap showRoute={{ from: [10.7585, 59.9241], to: [10.7510, 59.9075] }} showCar />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#05060f]/30 via-transparent to-[#05060f]" />

      <div className="relative h-full flex flex-col px-5 pt-2">
        <TopBar onBack={() => go("book")} variant="close" title="LIVE-TUR" subtitle="Aurora sporer reisen" />

        {/* Status pill */}
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                    className="self-center glass-panel rounded-full px-4 py-2 flex items-center gap-2 holo-border mt-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--aurora-mint)] animate-pulse" />
          <span className="text-white text-[11px] font-display tracking-wider uppercase">
            {statusText}
          </span>
        </motion.div>

        <div className="flex-1" />

        {/* Aurora status nudge */}
        <GlassPanel className="p-3 mb-3 flex items-center gap-3">
          <AuroraOrb size={32} />
          <p className="flex-1 text-white/85 text-[12px] leading-snug">
            Amir tar Trondheimsveien — sparer 6 min sammenlignet med E6. Vil du høre dagens nyheter underveis?
          </p>
        </GlassPanel>

        {/* Action row — 2x2 grid */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setShareOpen(true)}
            className="glass-panel rounded-2xl p-3 flex items-center gap-2.5 text-left"
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                 style={{ background: "rgba(94,240,255,0.15)" }}>
              <Share2 className="w-4 h-4 text-[var(--aurora-cyan)]" />
            </div>
            <div className="min-w-0">
              <div className="text-white text-[12px]">Del reisen</div>
              <div className="text-white/60 text-[10px] truncate">Live · SOS</div>
            </div>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => go("ar-pickup")}
            disabled={status === "ontrip"}
            className="glass-panel rounded-2xl p-3 flex items-center gap-2.5 text-left disabled:opacity-50"
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                 style={{ background: "rgba(160,107,255,0.18)" }}>
              <Compass className="w-4 h-4 text-[var(--aurora-violet)]" />
            </div>
            <div className="min-w-0">
              <div className="text-white text-[12px]">AR-pickup</div>
              <div className="text-white/60 text-[10px] truncate">Pek på bilen</div>
            </div>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setMsgOpen(true)}
            className="glass-panel rounded-2xl p-3 flex items-center gap-2.5 text-left"
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                 style={{ background: "rgba(94,240,255,0.10)" }}>
              <MessageCircle className="w-4 h-4 text-[var(--aurora-cyan)]" />
            </div>
            <div className="min-w-0">
              <div className="text-white text-[12px]">Send melding</div>
              <div className="text-white/60 text-[10px] truncate">Til sjåfør</div>
            </div>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => go("support")}
            className="glass-panel rounded-2xl p-3 flex items-center gap-2.5 text-left"
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                 style={{ background: "rgba(255,255,255,0.06)" }}>
              <HeadphonesIcon className="w-4 h-4 text-white/70" />
            </div>
            <div className="min-w-0">
              <div className="text-white text-[12px]">Support</div>
              <div className="text-white/60 text-[10px] truncate">24/7 hjelp</div>
            </div>
          </motion.button>
        </div>

        <ShareTripSheet open={shareOpen} onClose={() => setShareOpen(false)} />
        <TripMessagingSheet open={msgOpen} onClose={() => setMsgOpen(false)} role="customer" />

        {/* Driver card */}
        <GlassPanel holo glow className="p-4 mb-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-display"
                   style={{ background: "var(--aurora-gradient)" }}>
                A
              </div>
              <div className="absolute -bottom-1 -right-1 bg-[#05060f] rounded-full p-1 border border-white/15">
                <Shield className="w-3 h-3 text-[var(--aurora-mint)]" />
              </div>
            </div>
            <div className="flex-1">
              <div className="text-white text-[14px]">Amir</div>
              <div className="flex items-center gap-1 text-white/60 text-[11px]">
                <Star className="w-3 h-3 fill-[var(--aurora-cyan)] text-[var(--aurora-cyan)]" />
                5.0 · 420 turer
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setMsgOpen(true)} aria-label="Send melding til sjåfør"
                      className="w-11 h-11 rounded-full glass-panel flex items-center justify-center active:scale-95 transition relative">
                <MessageCircle className="w-4 h-4 text-white" strokeWidth={1.75} />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[var(--aurora-mint)]" />
              </button>
              <button aria-label="Ring sjåfør" className="w-11 h-11 rounded-full flex items-center justify-center active:scale-95 transition"
                      style={{ background: "var(--aurora-gradient)" }}>
                <Phone className="w-4 h-4 text-[#05060f]" />
              </button>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
            <div>
              <div className="text-white/50 text-[10px] font-mono tracking-wider">BIL</div>
              <div className="text-white text-[12px]">Toyota Corolla</div>
            </div>
            <div className="text-right">
              <div className="text-white/50 text-[10px] font-mono tracking-wider">SKILT</div>
              <div className="text-white text-[12px] font-mono">EV 12345</div>
            </div>
          </div>
        </GlassPanel>

        {/* Spotify-overlevering — vises når kunden er i bilen */}
        {status === "ontrip" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-3">
            <SpotifyHandoff />
          </motion.div>
        )}

        {/* Primary action */}
        <motion.button
          whileTap={ctaEnabled ? { scale: 0.97 } : undefined}
          onClick={primary}
          disabled={!ctaEnabled}
          aria-label={ctaText}
          className="mb-4 relative rounded-2xl h-14 overflow-hidden text-white disabled:opacity-50"
        >
          {ctaEnabled ? (
            <div className="absolute inset-0" style={{ background: "var(--aurora-gradient)" }} />
          ) : (
            <div className="absolute inset-0 glass-panel" />
          )}
          <div className={`relative h-full flex items-center justify-center gap-2 font-display tracking-wider ${ctaEnabled ? "text-[#05060f]" : "text-white/70"}`}>
            {ctaText}
          </div>
        </motion.button>
      </div>
    </div>
  );
}
