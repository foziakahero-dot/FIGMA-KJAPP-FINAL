export type LngLat = [number, number];

export type DriverStatus = "available" | "busy" | "offline";

export type NearbyDriver = {
  id: string;
  lngLat: LngLat;
  headingDeg: number;
  status: DriverStatus;
  etaMin: number;
  plate: string;
  tier: "Eco" | "Standard" | "Premium" | "XL";
};

export const OSLO_CENTER: LngLat = [10.7522, 59.9139];
