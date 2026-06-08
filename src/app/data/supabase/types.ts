// Frontend-side type shapes mirroring DB. Hand-maintained until codegen is wired.

export type UserRole = "customer" | "driver" | "fleet_owner" | "super_admin";
export type RideStatus =
  | "requested" | "matched" | "accepted" | "driver_arrived"
  | "in_progress" | "completed" | "cancelled" | "rejected";
export type PaymentStatus = "pending" | "authorized" | "captured" | "refunded" | "failed";
export type PaymentProvider = "stripe" | "vipps" | "apple_pay" | "google_pay" | "card" | "invoice";
export type Tier = "Eco" | "Standard" | "Premium" | "XL";

export type Profile = {
  id: string;
  role: UserRole;
  full_name: string | null;
  phone: string | null;
  email: string | null;
  language: string;
  created_at: string;
};

export type Ride = {
  id: string;
  customer_id: string;
  driver_id: string | null;
  vehicle_id: string | null;
  tier: Tier;
  status: RideStatus;
  pickup_lng: number;
  pickup_lat: number;
  pickup_address: string;
  destination_lng: number;
  destination_lat: number;
  destination_address: string;
  estimated_fare_nok: number | null;
  final_fare_nok: number | null;
  distance_km: number | null;
  duration_min: number | null;
  mva_amount_nok: number | null;
  platform_fee_nok: number | null;
  driver_payout_nok: number | null;
  requested_at: string;
  accepted_at: string | null;
  completed_at: string | null;
};

export type Payment = {
  id: string;
  ride_id: string;
  provider: PaymentProvider;
  amount_nok: number;
  platform_fee_nok: number;
  driver_payout_nok: number;
  mva_amount_nok: number;
  status: PaymentStatus;
  captured_at: string | null;
};
