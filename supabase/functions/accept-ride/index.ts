// Driver accepts a ride. Optimistic lock: only succeeds if status='requested'.

import { handleCors, jsonResponse } from "../_shared/cors.ts";
import { adminClient, authedUserId } from "../_shared/supabase.ts";

Deno.serve(async (req) => {
  const cors = handleCors(req);
  if (cors) return cors;

  try {
    const userId = await authedUserId(req);
    if (!userId) return jsonResponse({ error: "unauthorized" }, 401);

    const { ride_id, vehicle_id } = await req.json();
    if (!ride_id) return jsonResponse({ error: "ride_id required" }, 400);

    const sb = adminClient();

    const { data: driver } = await sb
      .from("drivers")
      .select("profile_id, online_status")
      .eq("profile_id", userId)
      .single();
    if (!driver) return jsonResponse({ error: "not a driver" }, 403);

    const { data: ride, error } = await sb
      .from("rides")
      .update({
        driver_id: userId,
        vehicle_id: vehicle_id ?? null,
        status: "accepted",
        accepted_at: new Date().toISOString(),
      })
      .eq("id", ride_id)
      .eq("status", "requested")
      .is("driver_id", null)
      .select()
      .single();

    if (error || !ride) {
      return jsonResponse({ error: "ride already taken" }, 409);
    }

    await sb.from("ride_events").insert({
      ride_id,
      event_type: "accepted",
      actor_profile_id: userId,
    });

    return jsonResponse({ ride });
  } catch (e) {
    return jsonResponse({ error: (e as Error).message }, 500);
  }
});
