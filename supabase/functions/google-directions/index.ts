// Google Directions proxy — returns distance_km, duration_min, polyline.

import { handleCors, jsonResponse } from "../_shared/cors.ts";

Deno.serve(async (req) => {
  const cors = handleCors(req);
  if (cors) return cors;

  try {
    const { origin, destination } = await req.json();
    const key = Deno.env.get("GOOGLE_MAPS_API_KEY");
    if (!key) return jsonResponse({ error: "GOOGLE_MAPS_API_KEY missing" }, 500);
    if (!origin || !destination) {
      return jsonResponse({ error: "origin + destination required" }, 400);
    }

    const o = `${origin.lat},${origin.lng}`;
    const d = `${destination.lat},${destination.lng}`;
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${o}&destination=${d}&mode=driving&region=no&language=no&key=${key}`,
    );
    const data = await res.json();
    const route = data.routes?.[0];
    const leg = route?.legs?.[0];
    if (!leg) return jsonResponse({ error: "no route" }, 404);

    return jsonResponse({
      distance_km: leg.distance.value / 1000,
      duration_min: leg.duration.value / 60,
      polyline: route.overview_polyline?.points,
      start_address: leg.start_address,
      end_address: leg.end_address,
    });
  } catch (e) {
    return jsonResponse({ error: (e as Error).message }, 500);
  }
});
