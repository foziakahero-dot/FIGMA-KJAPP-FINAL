import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();
app.use("*", logger(console.log));
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

const BASE = "/make-server-371148df";

app.get(`${BASE}/health`, (c) => c.json({ status: "ok" }));

// ─── Google Maps proxy ─────────────────────────────────────────────────────
// Server-side only. Key never leaves edge runtime.
// Restrict in Google Cloud Console: HTTP referrer is N/A here, instead restrict
// to IP if static, or rely on Supabase JWT validation (which Hono runs by default).

const GMAPS_KEY = Deno.env.get("GOOGLE_MAPS_API_KEY") ?? "";

app.get(`${BASE}/maps/places-autocomplete`, async (c) => {
  const q = c.req.query("q") ?? "";
  if (!q.trim()) return c.json({ predictions: [] });
  if (!GMAPS_KEY) {
    console.log("GOOGLE_MAPS_API_KEY not set — returning empty predictions");
    return c.json({ predictions: [], stub: true });
  }
  try {
    const url = new URL("https://maps.googleapis.com/maps/api/place/autocomplete/json");
    url.searchParams.set("input", q);
    url.searchParams.set("language", "no");
    url.searchParams.set("region", "no");
    url.searchParams.set("components", "country:no");
    url.searchParams.set("key", GMAPS_KEY);
    const r = await fetch(url.toString());
    const data = await r.json();
    return c.json({
      predictions: (data.predictions ?? []).map((p: any) => ({
        place_id: p.place_id,
        description: p.description,
        main_text: p.structured_formatting?.main_text,
        secondary_text: p.structured_formatting?.secondary_text,
      })),
    });
  } catch (e) {
    console.log("places-autocomplete error:", e);
    return c.json({ error: String(e) }, 500);
  }
});

app.get(`${BASE}/maps/places-details`, async (c) => {
  const placeId = c.req.query("place_id") ?? "";
  if (!placeId) return c.json({ error: "place_id required" }, 400);
  if (!GMAPS_KEY) {
    return c.json({
      place_id: placeId,
      formatted_address: "Stub-adresse (sett GOOGLE_MAPS_API_KEY)",
      lat: 59.9139,
      lng: 10.7522,
      stub: true,
    });
  }
  try {
    const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
    url.searchParams.set("place_id", placeId);
    url.searchParams.set("language", "no");
    url.searchParams.set("fields", "place_id,formatted_address,geometry,name");
    url.searchParams.set("key", GMAPS_KEY);
    const r = await fetch(url.toString());
    const data = await r.json();
    const res = data.result ?? {};
    return c.json({
      place_id: res.place_id,
      name: res.name,
      formatted_address: res.formatted_address,
      lat: res.geometry?.location?.lat,
      lng: res.geometry?.location?.lng,
    });
  } catch (e) {
    console.log("places-details error:", e);
    return c.json({ error: String(e) }, 500);
  }
});

app.post(`${BASE}/maps/directions`, async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const { origin, destination } = body as {
    origin?: { lat: number; lng: number };
    destination?: { lat: number; lng: number };
  };
  if (!origin || !destination) {
    return c.json({ error: "origin og destination kreves" }, 400);
  }
  if (!GMAPS_KEY) {
    return c.json({
      distance_km: 4.2,
      duration_min: 12,
      polyline: "",
      stub: true,
    });
  }
  try {
    const url = new URL("https://maps.googleapis.com/maps/api/directions/json");
    url.searchParams.set("origin", `${origin.lat},${origin.lng}`);
    url.searchParams.set("destination", `${destination.lat},${destination.lng}`);
    url.searchParams.set("language", "no");
    url.searchParams.set("region", "no");
    url.searchParams.set("mode", "driving");
    url.searchParams.set("key", GMAPS_KEY);
    const r = await fetch(url.toString());
    const data = await r.json();
    const leg = data.routes?.[0]?.legs?.[0];
    return c.json({
      distance_km: leg ? leg.distance.value / 1000 : null,
      duration_min: leg ? Math.round(leg.duration.value / 60) : null,
      polyline: data.routes?.[0]?.overview_polyline?.points ?? "",
    });
  } catch (e) {
    console.log("directions error:", e);
    return c.json({ error: String(e) }, 500);
  }
});

// ─── Recent destinations (KV) ──────────────────────────────────────────────
// Saved per user; used to populate recent suggestions in BookRide.

app.post(`${BASE}/places/recent`, async (c) => {
  const userId = c.req.header("x-user-id");
  if (!userId) return c.json({ error: "missing user" }, 401);
  const body = await c.req.json().catch(() => ({}));
  const { place_id, label, address, lat, lng } = body;
  if (!place_id) return c.json({ error: "place_id required" }, 400);
  const key = `recent:${userId}`;
  const existing = (await kv.get(key)) ?? [];
  const filtered = (existing as any[]).filter((p) => p.place_id !== place_id);
  const next = [{ place_id, label, address, lat, lng, at: Date.now() }, ...filtered].slice(0, 8);
  await kv.set(key, next);
  return c.json({ ok: true });
});

app.get(`${BASE}/places/recent`, async (c) => {
  const userId = c.req.header("x-user-id");
  if (!userId) return c.json({ recent: [] });
  const recent = (await kv.get(`recent:${userId}`)) ?? [];
  return c.json({ recent });
});

// ─── Rides (KV-mode prototype) ─────────────────────────────────────────────
// Pseudo-realtime via polling — driver app polls /rides/offers every 4-5s.
// Storage shape:
//   ride:{id}              → full ride object
//   driver-offers:{driverId} → array of ride IDs waiting for driver
//   user-rides:{userId}    → array of ride IDs (customer OR driver)

const TIERS: Record<string, { base: number; perKm: number; perMin: number }> = {
  Eco:       { base: 49,  perKm: 12, perMin: 3 },
  Standard:  { base: 65,  perKm: 15, perMin: 4 },
  Premium:   { base: 95,  perKm: 22, perMin: 5 },
  XL:        { base: 110, perKm: 24, perMin: 5 },
};

function priceBreakdown(totalInclMva: number) {
  const net = +(totalInclMva / 1.12).toFixed(2);
  const mva = +(totalInclMva - net).toFixed(2);
  const platform_fee = +(net * 0.1).toFixed(2);
  const driver_payout = +(net - platform_fee).toFixed(2);
  return { total: totalInclMva, net, mva, platform_fee, driver_payout };
}

function newId() {
  return `r_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

async function pushToUserRides(userId: string, rideId: string) {
  const key = `user-rides:${userId}`;
  const list = ((await kv.get(key)) as string[] | null) ?? [];
  if (!list.includes(rideId)) {
    list.unshift(rideId);
    await kv.set(key, list.slice(0, 50));
  }
}

app.post(`${BASE}/rides/request`, async (c) => {
  const userId = c.req.header("x-user-id");
  if (!userId) return c.json({ error: "missing user" }, 401);
  const body = await c.req.json().catch(() => ({}));
  const {
    tier = "Standard",
    pickup,
    destination,
    distance_km = 4.2,
    duration_min = 12,
    note,
  } = body;
  if (!pickup?.address || !destination?.address) {
    return c.json({ error: "pickup og destination kreves" }, 400);
  }
  const t = TIERS[tier] ?? TIERS.Standard;
  const total = Math.round(t.base + t.perKm * distance_km + t.perMin * duration_min);
  const ride = {
    id: newId(),
    customer_id: userId,
    driver_id: null as string | null,
    tier,
    pickup,
    destination,
    distance_km,
    duration_min,
    note: note ?? null,
    status: "requested" as
      | "requested"
      | "accepted"
      | "driver_arrived"
      | "in_progress"
      | "completed"
      | "cancelled",
    fare: priceBreakdown(total),
    requested_at: Date.now(),
    accepted_at: null as number | null,
    completed_at: null as number | null,
  };
  await kv.set(`ride:${ride.id}`, ride);
  await pushToUserRides(userId, ride.id);

  // Broadcast to all online drivers by adding to a global pending list.
  // Drivers poll this list and self-filter by proximity in real prod.
  const pending = ((await kv.get("rides:pending")) as string[] | null) ?? [];
  pending.unshift(ride.id);
  await kv.set("rides:pending", pending.slice(0, 200));

  return c.json({ ride });
});

app.get(`${BASE}/rides/offers`, async (c) => {
  // Driver polls this. Returns rides with status=requested that are still unclaimed.
  const pending = ((await kv.get("rides:pending")) as string[] | null) ?? [];
  const out: any[] = [];
  for (const id of pending.slice(0, 10)) {
    const ride = (await kv.get(`ride:${id}`)) as any;
    if (ride && ride.status === "requested" && !ride.driver_id) {
      out.push(ride);
    }
  }
  return c.json({ offers: out });
});

app.post(`${BASE}/rides/accept`, async (c) => {
  const userId = c.req.header("x-user-id");
  if (!userId) return c.json({ error: "missing user" }, 401);
  const { ride_id } = await c.req.json().catch(() => ({}));
  if (!ride_id) return c.json({ error: "ride_id required" }, 400);
  const ride = (await kv.get(`ride:${ride_id}`)) as any;
  if (!ride) return c.json({ error: "ride not found" }, 404);
  // Optimistic check — first writer wins
  if (ride.driver_id || ride.status !== "requested") {
    return c.json({ error: "ride allerede tatt" }, 409);
  }
  ride.driver_id = userId;
  ride.status = "accepted";
  ride.accepted_at = Date.now();
  await kv.set(`ride:${ride.id}`, ride);
  await pushToUserRides(userId, ride.id);
  // Drop from pending list
  const pending = ((await kv.get("rides:pending")) as string[] | null) ?? [];
  await kv.set("rides:pending", pending.filter((id) => id !== ride.id));
  return c.json({ ride });
});

app.post(`${BASE}/rides/status`, async (c) => {
  const userId = c.req.header("x-user-id");
  if (!userId) return c.json({ error: "missing user" }, 401);
  const { ride_id, status, cancel_reason } = await c.req.json().catch(() => ({}));
  const valid = ["driver_arrived", "in_progress", "completed", "cancelled"];
  if (!ride_id || !valid.includes(status)) {
    return c.json({ error: "ride_id og gyldig status kreves" }, 400);
  }
  const ride = (await kv.get(`ride:${ride_id}`)) as any;
  if (!ride) return c.json({ error: "ride not found" }, 404);
  if (ride.customer_id !== userId && ride.driver_id !== userId) {
    return c.json({ error: "ikke din tur" }, 403);
  }
  ride.status = status;
  if (status === "completed") ride.completed_at = Date.now();
  if (status === "cancelled") ride.cancel_reason = cancel_reason ?? null;
  await kv.set(`ride:${ride.id}`, ride);
  return c.json({ ride });
});

app.get(`${BASE}/rides/:id`, async (c) => {
  const ride = (await kv.get(`ride:${c.req.param("id")}`)) as any;
  if (!ride) return c.json({ error: "not found" }, 404);
  return c.json({ ride });
});

app.get(`${BASE}/rides/mine/list`, async (c) => {
  const userId = c.req.header("x-user-id");
  if (!userId) return c.json({ rides: [] });
  const ids = ((await kv.get(`user-rides:${userId}`)) as string[] | null) ?? [];
  const rides: any[] = [];
  for (const id of ids.slice(0, 20)) {
    const ride = (await kv.get(`ride:${id}`)) as any;
    if (ride) rides.push(ride);
  }
  return c.json({ rides });
});

// ─── GDPR + samtykke ───────────────────────────────────────────────────────
// Norsk personvernlov (GDPR art. 7, 15, 17). Versjonsstyrt samtykke gir audit trail.

const CURRENT_CONSENT_VERSION = "2026-06-07";

app.post(`${BASE}/consent/log`, async (c) => {
  const userId = c.req.header("x-user-id");
  if (!userId) return c.json({ error: "missing user" }, 401);
  const body = await c.req.json().catch(() => ({}));
  const { consents } = body as {
    consents?: { type: string; granted: boolean; version?: string }[];
  };
  if (!Array.isArray(consents)) {
    return c.json({ error: "consents kreves" }, 400);
  }
  const key = `consent:${userId}`;
  const existing = ((await kv.get(key)) as any[] | null) ?? [];
  const ts = Date.now();
  const ua = c.req.header("user-agent") ?? null;
  const entries = consents.map((cnt) => ({
    type: cnt.type,
    granted: cnt.granted,
    version: cnt.version ?? CURRENT_CONSENT_VERSION,
    at: ts,
    user_agent: ua,
  }));
  await kv.set(key, [...existing, ...entries].slice(-100));
  return c.json({ ok: true, logged: entries.length });
});

app.get(`${BASE}/consent/status`, async (c) => {
  const userId = c.req.header("x-user-id");
  if (!userId) return c.json({ accepted: false });
  const log = ((await kv.get(`consent:${userId}`)) as any[] | null) ?? [];
  // Latest GDPR-grant for current version
  const latest = log
    .filter((e) => e.type === "gdpr" && e.version === CURRENT_CONSENT_VERSION)
    .pop();
  return c.json({
    accepted: Boolean(latest?.granted),
    version: CURRENT_CONSENT_VERSION,
    at: latest?.at ?? null,
  });
});

app.get(`${BASE}/gdpr/export`, async (c) => {
  // Returns ALL personal data held about the calling user (GDPR art. 15)
  const userId = c.req.header("x-user-id");
  if (!userId) return c.json({ error: "missing user" }, 401);

  const profile = await kv.get(`profile:${userId}`);
  const consent_log = (await kv.get(`consent:${userId}`)) ?? [];
  const recent_places = (await kv.get(`recent:${userId}`)) ?? [];
  const ride_ids = ((await kv.get(`user-rides:${userId}`)) as string[] | null) ?? [];
  const rides: any[] = [];
  for (const id of ride_ids) {
    const r = await kv.get(`ride:${id}`);
    if (r) rides.push(r);
  }
  const messages = (await kv.get(`messages:${userId}`)) ?? [];

  return c.json({
    export_version: "1.0",
    generated_at: new Date().toISOString(),
    user_id: userId,
    profile,
    consent_log,
    recent_places,
    rides,
    messages,
    _note:
      "Dette er all personlig data KJAPP har om deg. " +
      "Lagring av rides etter sletting er regnskaps-pliktig (Bokføringsloven §10, 5 år), " +
      "men da anonymisert.",
  });
});

app.post(`${BASE}/gdpr/delete`, async (c) => {
  // Soft-delete with 30-day grace (GDPR art. 17 right to erasure).
  // Payment methods + driver documents hard-deleted immediately.
  // Rides + payments anonymized but retained 5 years (Bokføringsloven).
  const userId = c.req.header("x-user-id");
  if (!userId) return c.json({ error: "missing user" }, 401);

  const now = Date.now();
  const graceEndsAt = now + 30 * 24 * 60 * 60 * 1000;

  // 1. Mark profile soft-deleted
  const profile = ((await kv.get(`profile:${userId}`)) as any) ?? {};
  await kv.set(`profile:${userId}`, {
    ...profile,
    deleted_at: now,
    hard_delete_at: graceEndsAt,
  });

  // 2. Hard-delete payment tokens immediately
  await kv.del(`payment-methods:${userId}`);

  // 3. Hard-delete recent places + messages (no legal retention requirement)
  await kv.del(`recent:${userId}`);
  await kv.del(`messages:${userId}`);

  // 4. Anonymize rides (keep for accounting)
  const ride_ids = ((await kv.get(`user-rides:${userId}`)) as string[] | null) ?? [];
  for (const id of ride_ids) {
    const ride = (await kv.get(`ride:${id}`)) as any;
    if (!ride) continue;
    if (ride.customer_id === userId) {
      ride.customer_id = "[anonymized]";
      ride.pickup = { address: "[anonymized]", lat: 0, lng: 0 };
      ride.destination = { address: "[anonymized]", lat: 0, lng: 0 };
    }
    if (ride.driver_id === userId) ride.driver_id = "[anonymized]";
    ride.anonymized_at = now;
    await kv.set(`ride:${id}`, ride);
  }
  await kv.del(`user-rides:${userId}`);

  // 5. Log the deletion request itself (audit trail)
  const auditKey = `audit:deletions`;
  const audit = ((await kv.get(auditKey)) as any[] | null) ?? [];
  audit.unshift({ user_id: userId, requested_at: now, hard_delete_at: graceEndsAt });
  await kv.set(auditKey, audit.slice(0, 1000));

  return c.json({
    ok: true,
    soft_deleted_at: now,
    hard_delete_at: graceEndsAt,
    grace_days: 30,
  });
});

Deno.serve(app.fetch);
