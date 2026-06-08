import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Search, X, Clock } from "lucide-react";
import { mGet, mPost } from "../../lib/makeServer";

export type PlaceSelection = {
  place_id: string;
  address: string;
  name?: string;
  lat: number;
  lng: number;
};

type Prediction = {
  place_id: string;
  description: string;
  main_text?: string;
  secondary_text?: string;
};

type Recent = {
  place_id: string;
  label?: string;
  address: string;
  lat: number;
  lng: number;
};

export function PlacesSheet({
  open,
  title,
  initialValue,
  onClose,
  onSelect,
}: {
  open: boolean;
  title: string;
  initialValue?: string;
  onClose: () => void;
  onSelect: (place: PlaceSelection) => void;
}) {
  const [q, setQ] = useState(initialValue ?? "");
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [recent, setRecent] = useState<Recent[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!open) return;
    setQ(initialValue ?? "");
    setError(null);
    mGet<{ recent: Recent[] }>("/places/recent")
      .then((r) => setRecent(r.recent ?? []))
      .catch(() => {});
  }, [open, initialValue]);

  useEffect(() => {
    if (!open) return;
    if (debRef.current) clearTimeout(debRef.current);
    if (!q.trim()) {
      setPredictions([]);
      return;
    }
    debRef.current = setTimeout(async () => {
      setBusy(true);
      try {
        const r = await mGet<{ predictions: Prediction[] }>(
          "/maps/places-autocomplete",
          { q },
        );
        setPredictions(r.predictions ?? []);
      } catch (e) {
        setError(String(e));
      } finally {
        setBusy(false);
      }
    }, 220);
    return () => {
      if (debRef.current) clearTimeout(debRef.current);
    };
  }, [q, open]);

  const choose = async (placeId: string, fallbackLabel?: string) => {
    setBusy(true);
    setError(null);
    try {
      const details = await mGet<{
        place_id: string;
        name?: string;
        formatted_address: string;
        lat: number;
        lng: number;
      }>("/maps/places-details", { place_id: placeId });
      const selection: PlaceSelection = {
        place_id: details.place_id,
        name: details.name,
        address: details.formatted_address ?? fallbackLabel ?? "",
        lat: details.lat,
        lng: details.lng,
      };
      mPost("/places/recent", {
        place_id: selection.place_id,
        label: selection.name,
        address: selection.address,
        lat: selection.lat,
        lng: selection.lng,
      }).catch(() => {});
      onSelect(selection);
    } catch (e) {
      setError(`Kunne ikke hente adresse-detaljer: ${e}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[210] flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ background: "rgba(4,6,16,0.92)", backdropFilter: "blur(14px)" }}
        >
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col h-full"
            style={{
              paddingTop: "max(env(safe-area-inset-top), 12px)",
              paddingBottom: "max(env(safe-area-inset-bottom), 16px)",
            }}
          >
            <div className="flex items-center gap-3 px-5 pb-3">
              <button
                onClick={onClose}
                aria-label="Lukk"
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
                <X className="w-4 h-4" />
              </button>
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
            </div>

            <div className="px-5">
              <div
                className="flex items-center gap-2"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(94,240,255,0.25)",
                  borderRadius: 14,
                  padding: "12px 14px",
                }}
              >
                <Search className="w-4 h-4 text-white/55" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Søk adresse, sted eller postnr"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  style={{
                    flex: 1,
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    color: "white",
                    fontSize: 15,
                  }}
                />
                {q && (
                  <button
                    onClick={() => setQ("")}
                    style={{ color: "rgba(255,255,255,0.5)" }}
                    aria-label="Tøm"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              {error && (
                <div style={{ color: "#ff7a9d", fontSize: 12, marginTop: 8 }}>
                  {error}
                </div>
              )}
            </div>

            <div
              className="flex-1 overflow-y-auto px-5 mt-3"
              style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-y" }}
            >
              {q.trim() ? (
                <>
                  {busy && predictions.length === 0 && (
                    <div
                      className="font-mono uppercase"
                      style={{
                        fontSize: 10,
                        letterSpacing: "0.28em",
                        color: "rgba(255,255,255,0.45)",
                        padding: 14,
                      }}
                    >
                      Søker…
                    </div>
                  )}
                  {predictions.map((p) => (
                    <button
                      key={p.place_id}
                      onClick={() => choose(p.place_id, p.description)}
                      className="w-full text-left active:scale-[0.99] transition"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "12px 4px",
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 12,
                          background: "rgba(94,240,255,0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <MapPin className="w-4 h-4 text-[var(--aurora-cyan,#5ef0ff)]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          style={{
                            color: "white",
                            fontSize: 14,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {p.main_text ?? p.description}
                        </div>
                        {p.secondary_text && (
                          <div
                            style={{
                              color: "rgba(255,255,255,0.55)",
                              fontSize: 11,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {p.secondary_text}
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </>
              ) : recent.length > 0 ? (
                <>
                  <div
                    className="font-mono uppercase"
                    style={{
                      fontSize: 9,
                      letterSpacing: "0.32em",
                      color: "rgba(255,255,255,0.45)",
                      padding: "8px 4px 10px",
                    }}
                  >
                    Nylige steder
                  </div>
                  {recent.map((r) => (
                    <button
                      key={r.place_id}
                      onClick={() => choose(r.place_id, r.address)}
                      className="w-full text-left active:scale-[0.99] transition"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "12px 4px",
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 12,
                          background: "rgba(255,255,255,0.05)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Clock className="w-4 h-4 text-white/55" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          style={{
                            color: "white",
                            fontSize: 14,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {r.label ?? r.address}
                        </div>
                        {r.label && (
                          <div
                            style={{
                              color: "rgba(255,255,255,0.55)",
                              fontSize: 11,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {r.address}
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </>
              ) : (
                <div
                  className="font-mono uppercase"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.28em",
                    color: "rgba(255,255,255,0.4)",
                    padding: 16,
                    textAlign: "center",
                  }}
                >
                  Begynn å skrive en adresse
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
