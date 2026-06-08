// Customer requests a ride. Calculates fare from pricing_rules + distance/duration.
// Inserts rides row + emits ride_events + broadcasts offer to nearby online drivers.

import { handleCors, jsonResponse } from "../_shared/cors.ts";
import { adminClient, authedUserId } from "../_shared/supabase.ts";
import { calcFare, breakdownNok, type Tier } from "../_shared/pricing.ts";

type Body = {
  tier: Tier;
  pickup: { lng: number; lat: number; address: string };
  destination: { lng: number; lat: number; address: string };
  distance_km: number;
  duration_min: number;
};

Deno.serve(async (req) => {
  const cors = handleCors(req);
  if (cors) return cors;

  try {
    const userId = await authedUserId(req);
    if (!userId) return jsonResponse({ error: "unauthorized" }, 401);

    const body = (await req.json()) as Body;
    const sb = adminClient();

    const { data: rule } = await sb
      .from("pricing_rules")
      .select("*")
      .eq("tier", body.tier)
      .lte("valid_from", new Date().toISOString())
      .order("valid_from", { ascending: false })
      .limit(1)
      .single();

    if (!rule) return jsonResponse({ error: "no pricing for tier" }, 400);

    const now = new Date();
    const isNight = now.getHours() < 6 || now.getHours() >= 22;
    const isWeekend = now.getDay() === 0 || now.getDay() === 6;

    const fare = calcFare({
      baseNok: Number(rule.base_fare_nok),
      perKmNok: Number(rule.per_km_nok),
      perMinNok: Number(rule.per_min_nok),
      distanceKm: body.distance_km,
      durationMin: body.duration_min,
      nightMultiplier: Number(rule.night_multiplier),
      weekendMultiplier: Number(rule.weekend_multiplier),
      isNight,
      isWeekend,
    });

    const b = breakdownNok(fare);

    const { data: ride, error } = await sb.from("rides").insert({
      customer_id: userId,
      tier: body.tier,
      status: "requested",
      pickup_lng: body.pickup.lng,
      pickup_lat: body.pickup.lat,
      pickup_address: body.pickup.address,
      destination_lng: body.destination.lng,
      destination_lat: body.destination.lat,
      destination_address: body.destination.address,
      estimated_fare_nok: fare,
      distance_km: body.distance_km,
      duration_min: body.duration_min,
      mva_amount_nok: b.mva,
      platform_fee_nok: b.platform_fee,
      driver_payout_nok: b.driver_payout,
    }).select().single();

    if (error) return jsonResponse({ error: error.message }, 500);

    await sb.from("ride_events").insert({
      ride_id: ride.id,
      event_type: "requested",
      actor_profile_id: userId,
      payload: { tier: body.tier, fare_nok: fare },
    });

    return jsonResponse({ ride, breakdown: b });
  } catch (e) {
    return jsonResponse({ error: (e as Error).message }, 500);
  }
});
