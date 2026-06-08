import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Circle, Clock } from "lucide-react";
import { pollOffers, acceptRide, setActiveRideId, type Ride } from "../../data/rides";
import { haptic } from "../../lib/haptics";

const POLL_MS = 4000;
const COUNTDOWN_SECS = 30;

export function RideOfferPopup({
  enabled,
  onAccepted,
}: {
  enabled: boolean;
  onAccepted: (ride: Ride) => void;
}) {
  const [offer, setOffer] = useState<Ride | null>(null);
  const [secs, setSecs] = useState(COUNTDOWN_SECS);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  // Poll for offers
  useEffect(() => {
    if (!enabled) return;
    let stop = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = async () => {
      if (stop) return;
      try {
        const offers = await pollOffers();
        const fresh = offers.find((o) => !dismissed.has(o.id));
        if (fresh && (!offer || offer.id !== fresh.id)) {
          setOffer(fresh);
          setSecs(COUNTDOWN_SECS);
          haptic([10, 40, 10, 40, 10]);
        }
      } catch {
        /* swallow */
      }
      if (!stop) timer = setTimeout(tick, POLL_MS);
    };
    tick();
    return () => {
      stop = true;
      if (timer) clearTimeout(timer);
    };
  }, [enabled, offer?.id, dismissed]);

  // Countdown
  useEffect(() => {
    if (!offer) return;
    if (secs <= 0) {
      setDismissed((s) => new Set(s).add(offer.id));
      setOffer(null);
      return;
    }
    const t = setTimeout(() => setSecs((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secs, offer]);

  const handleAccept = async () => {
    if (!offer) return;
    setBusy(true);
    setError(null);
    try {
      const ride = await acceptRide(offer.id);
      setActiveRideId(ride.id);
      haptic([12, 60, 12]);
      setOffer(null);
      onAccepted(ride);
    } catch (e) {
      setError(String(e));
      setDismissed((s) => new Set(s).add(offer.id));
      setTimeout(() => setOffer(null), 1500);
    } finally {
      setBusy(false);
    }
  };

  const handleDecline = () => {
    if (!offer) return;
    setDismissed((s) => new Set(s).add(offer.id));
    setOffer(null);
  };

  return (
    <AnimatePresence>
      {offer && (
        <motion.div
          className="fixed inset-x-0 top-0 z-[220] flex justify-center"
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -200, opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          style={{ paddingTop: "max(env(safe-area-inset-top), 12px)" }}
        >
          <div
            className="mx-3 w-full max-w-md flex flex-col"
            style={{
              background: "linear-gradient(180deg, rgba(18,22,42,0.96), rgba(8,10,24,0.98))",
              border: "1px solid rgba(255,176,72,0.45)",
              borderRadius: 22,
              padding: 18,
              gap: 12,
              boxShadow: "0 18px 48px rgba(255,176,72,0.18)",
            }}
          >
            <div className="flex items-center justify-between">
              <div
                className="font-mono uppercase"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.32em",
                  color: "#ffb048",
                }}
              >
                Ny tur · {offer.tier}
              </div>
              <div
                className="flex items-center gap-1"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                <Clock className="w-3 h-3 text-white/55" />
                <span style={{ color: "white", fontSize: 13, fontWeight: 600 }}>
                  {secs}s
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center pt-1">
                <Circle className="w-2.5 h-2.5" style={{ color: "#5ef0ff", fill: "#5ef0ff" }} />
                <div className="w-px h-6 bg-white/20 my-1" />
                <MapPin className="w-3 h-3" style={{ color: "#ff6bd1" }} />
              </div>
              <div className="flex-1 min-w-0">
                <div style={{ color: "white", fontSize: 13 }}>{offer.pickup.address}</div>
                <div
                  style={{ color: "rgba(255,255,255,0.55)", fontSize: 12, marginTop: 4 }}
                >
                  {offer.destination.address}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    color: "white",
                    fontSize: 18,
                    fontWeight: 600,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {Math.round(offer.fare.driver_payout)} kr
                </div>
                <div
                  className="font-mono uppercase"
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.28em",
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  Til deg
                </div>
              </div>
            </div>

            <div
              className="flex items-center gap-3 font-mono"
              style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}
            >
              <span>{offer.distance_km.toFixed(1)} km</span>
              <span>·</span>
              <span>{offer.duration_min} min</span>
              <span>·</span>
              <span>Total {offer.fare.total} kr (MVA inkl.)</span>
            </div>

            {error && (
              <div style={{ color: "#ff7a9d", fontSize: 12 }}>{error}</div>
            )}

            <div className="flex gap-2">
              <button
                onClick={handleDecline}
                disabled={busy}
                style={{
                  flex: 1,
                  padding: "12px 14px",
                  borderRadius: 14,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.7)",
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                Avslå
              </button>
              <button
                onClick={handleAccept}
                disabled={busy}
                className="active:scale-[0.98] transition"
                style={{
                  flex: 2,
                  padding: "12px 14px",
                  borderRadius: 14,
                  background: busy
                    ? "rgba(255,176,72,0.3)"
                    : "linear-gradient(135deg, #ffb048, #ff6bd1)",
                  color: "#04060f",
                  fontSize: 14,
                  fontWeight: 600,
                  border: "none",
                }}
              >
                {busy ? "Aksepterer…" : "Aksepter tur"}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
