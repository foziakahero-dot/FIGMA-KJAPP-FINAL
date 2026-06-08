import { useEffect, useState } from "react";
import type { NearbyDriver, LngLat } from "./types";
import { OSLO_CENTER } from "./types";

const SEED: NearbyDriver[] = [
  { id: "c1", lngLat: [10.7585, 59.9241], headingDeg: 220, status: "available", etaMin: 2, plate: "EK 41209", tier: "Standard" },
  { id: "c2", lngLat: [10.7475, 59.9128], headingDeg: 90,  status: "available", etaMin: 3, plate: "EL 88421", tier: "Eco" },
  { id: "c3", lngLat: [10.7392, 59.9165], headingDeg: 45,  status: "busy",      etaMin: 6, plate: "EK 22107", tier: "Standard" },
  { id: "c4", lngLat: [10.7641, 59.9192], headingDeg: 300, status: "available", etaMin: 4, plate: "EK 90021", tier: "Premium" },
  { id: "c5", lngLat: [10.7556, 59.9098], headingDeg: 180, status: "available", etaMin: 5, plate: "EK 33102", tier: "XL" },
  { id: "c6", lngLat: [10.7438, 59.9220], headingDeg: 135, status: "busy",      etaMin: 7, plate: "EL 71204", tier: "Eco" },
  { id: "c7", lngLat: [10.7689, 59.9145], headingDeg: 260, status: "available", etaMin: 6, plate: "EK 55491", tier: "Standard" },
  { id: "c8", lngLat: [10.7510, 59.9275], headingDeg: 10,  status: "available", etaMin: 3, plate: "EL 12388", tier: "Eco" },
  { id: "c9", lngLat: [10.7720, 59.9082], headingDeg: 200, status: "busy",      etaMin: 9, plate: "EK 80014", tier: "Premium" },
  { id: "c10", lngLat: [10.7405, 59.9050], headingDeg: 70, status: "available", etaMin: 8, plate: "EL 44220", tier: "Standard" },
];

const BOUNDS = {
  minLng: 10.71,
  maxLng: 10.80,
  minLat: 59.895,
  maxLat: 59.940,
};

const STEP_M = 25;
const TICK_MS = 1400;

function metersToDegLng(m: number, lat: number) {
  return m / (111320 * Math.cos((lat * Math.PI) / 180));
}
function metersToDegLat(m: number) {
  return m / 110540;
}

function stepDriver(d: NearbyDriver): NearbyDriver {
  if (d.status === "offline") return d;

  const jitter = (Math.random() - 0.5) * 24;
  let heading = d.headingDeg + jitter;

  const rad = (heading * Math.PI) / 180;
  let lng = d.lngLat[0] + metersToDegLng(Math.sin(rad) * STEP_M, d.lngLat[1]);
  let lat = d.lngLat[1] + metersToDegLat(Math.cos(rad) * STEP_M);

  if (lng < BOUNDS.minLng || lng > BOUNDS.maxLng || lat < BOUNDS.minLat || lat > BOUNDS.maxLat) {
    heading = (heading + 180) % 360;
    lng = d.lngLat[0];
    lat = d.lngLat[1];
  }

  return { ...d, lngLat: [lng, lat] as LngLat, headingDeg: (heading + 360) % 360 };
}

export function useNearbyDrivers(_pickup: LngLat = OSLO_CENTER) {
  const [drivers, setDrivers] = useState<NearbyDriver[]>(SEED);

  useEffect(() => {
    const id = setInterval(() => {
      setDrivers((prev) => {
        const next = prev.map(stepDriver);
        if (Math.random() < 0.15) {
          const i = Math.floor(Math.random() * next.length);
          const d = next[i];
          if (d.status !== "offline") {
            next[i] = { ...d, status: d.status === "available" ? "busy" : "available" };
          }
        }
        return next;
      });
    }, TICK_MS);
    return () => clearInterval(id);
  }, []);

  return { drivers, status: "ok" as const };
}
