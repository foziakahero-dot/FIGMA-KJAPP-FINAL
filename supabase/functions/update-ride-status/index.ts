// Driver progresses ride: driver_arrived → in_progress → completed.
// On completed: finalizes fare, freezes breakdown. Stripe capture triggered separately.

import { handleCors, jsonResponse } from "../_shared/cors.ts";
import { adminClient, authedUserId } from "../_shared/supabase.ts";
import { breakdownNok } from "../_shared/pricing.ts";

const ALLOWED = ["driver_arrived", "in_progress", "completed", "cancelled"] as const;

Deno.serve(async (req) => {
  const cors = handleCors(req);
  if (cors) return cors;

  try {
    const userId = await authedUserId(req);
    if (!userId) return jsonResponse({ error: "unauthorized" }, 401);

    const { ride_id, status, final_fare_nok, cancel_reason } = await req.json();
    if (!ride_id || !ALLOWED.includes(status)) {
      return jsonResponse({ error: "invalid status" }, 400);
    }

    const sb = adminClient();
    const { data: ride } = await sb.from("rides").select("*").eq("id", ride_id).single();
    if (!ride) return jsonResponse({ error: "not found" }, 404);
    if (ride.driver_id !== userId && ride.customer_id !== userId) {
      return jsonResponse({ error: "forbidden" }, 403);
    }

    const patch: Record<string, unknown> = { status };
    const nowIso = new Date().toISOString();
    if (status === "driver_arrived") patch.driver_arrived_at = nowIso;
    if (status === "in_progress") patch.picked_up_at = nowIso;
    if (status === "cancelled") {
      patch.cancelled_at = nowIso;
      patch.cancel_reason = cancel_reason ?? null;
    }
    if (status === "completed") {
      patch.completed_at = nowIso;
      const fare = Number(final_fare_nok ?? ride.estimated_fare_nok);
      patch.final_fare_nok = fare;
      const b = breakdownNok(fare);
      patch.mva_amount_nok = b.mva;
      patch.platform_fee_nok = b.platform_fee;
      patch.driver_payout_nok = b.driver_payout;
    }

    const { data: updated, error } = await sb
      .from("rides")
      .update(patch)
      .eq("id", ride_id)
      .select()
      .single();
    if (error) return jsonResponse({ error: error.message }, 500);

    await sb.from("ride_events").insert({
      ride_id,
      event_type: status,
      actor_profile_id: userId,
      payload: { final_fare_nok: patch.final_fare_nok ?? null },
    });

    return jsonResponse({ ride: updated });
  } catch (e) {
    return jsonResponse({ error: (e as Error).message }, 500);
  }
});
