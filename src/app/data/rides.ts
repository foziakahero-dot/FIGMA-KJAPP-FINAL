import { mGet, mPost } from "../lib/makeServer";

export type PlaceRef = {
  place_id?: string;
  address: string;
  lat: number;
  lng: number;
};

export type Ride = {
  id: string;
  customer_id: string;
  driver_id: string | null;
  tier: string;
  pickup: PlaceRef;
  destination: PlaceRef;
  distance_km: number;
  duration_min: number;
  note: string | null;
  status:
    | "requested"
    | "accepted"
    | "driver_arrived"
    | "in_progress"
    | "completed"
    | "cancelled";
  fare: {
    total: number;
    net: number;
    mva: number;
    platform_fee: number;
    driver_payout: number;
  };
  requested_at: number;
  accepted_at: number | null;
  completed_at: number | null;
  cancel_reason?: string | null;
};

let activeRideId: string | null = null;
export const setActiveRideId = (id: string | null) => {
  activeRideId = id;
};
export const getActiveRideId = () => activeRideId;

export async function requestRide(input: {
  tier: string;
  pickup: PlaceRef;
  destination: PlaceRef;
  distance_km?: number;
  duration_min?: number;
  note?: string;
}): Promise<Ride> {
  const r = await mPost<{ ride: Ride }>("/rides/request", input);
  setActiveRideId(r.ride.id);
  return r.ride;
}

export async function pollOffers(): Promise<Ride[]> {
  const r = await mGet<{ offers: Ride[] }>("/rides/offers");
  return r.offers ?? [];
}

export async function acceptRide(rideId: string): Promise<Ride> {
  const r = await mPost<{ ride: Ride }>("/rides/accept", { ride_id: rideId });
  return r.ride;
}

export async function updateRideStatus(
  rideId: string,
  status: Ride["status"],
  cancel_reason?: string,
): Promise<Ride> {
  const r = await mPost<{ ride: Ride }>("/rides/status", {
    ride_id: rideId,
    status,
    cancel_reason,
  });
  return r.ride;
}

export async function getRide(rideId: string): Promise<Ride | null> {
  try {
    const r = await mGet<{ ride: Ride }>(`/rides/${rideId}`);
    return r.ride;
  } catch {
    return null;
  }
}
