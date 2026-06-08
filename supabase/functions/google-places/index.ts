// Google Places Autocomplete + Geocoding proxy.
// Keeps Google API key server-side. Norway-biased.

import { handleCors, jsonResponse } from "../_shared/cors.ts";

Deno.serve(async (req) => {
  const cors = handleCors(req);
  if (cors) return cors;

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get("action") ?? "autocomplete";
    const key = Deno.env.get("GOOGLE_MAPS_API_KEY");
    if (!key) return jsonResponse({ error: "GOOGLE_MAPS_API_KEY missing" }, 500);

    if (action === "autocomplete") {
      const q = url.searchParams.get("q") ?? "";
      const sessionToken = url.searchParams.get("session") ?? crypto.randomUUID();
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(q)}&components=country:no&language=no&sessiontoken=${sessionToken}&key=${key}`,
      );
      const data = await res.json();
      return jsonResponse({
        predictions: (data.predictions ?? []).map((p: { place_id: string; description: string; structured_formatting?: { main_text?: string; secondary_text?: string } }) => ({
          place_id: p.place_id,
          description: p.description,
          main_text: p.structured_formatting?.main_text,
          secondary_text: p.structured_formatting?.secondary_text,
        })),
        session: sessionToken,
      });
    }

    if (action === "details") {
      const place_id = url.searchParams.get("place_id");
      if (!place_id) return jsonResponse({ error: "place_id required" }, 400);
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=geometry,formatted_address&language=no&key=${key}`,
      );
      const data = await res.json();
      const r = data.result;
      if (!r) return jsonResponse({ error: "not found" }, 404);
      return jsonResponse({
        address: r.formatted_address,
        lng: r.geometry?.location?.lng,
        lat: r.geometry?.location?.lat,
      });
    }

    return jsonResponse({ error: "unknown action" }, 400);
  } catch (e) {
    return jsonResponse({ error: (e as Error).message }, 500);
  }
});
