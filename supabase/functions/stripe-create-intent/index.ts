// Creates a Stripe PaymentIntent for a ride. Returns client_secret for PaymentSheet.
// 10% KJAPP platform fee + 12% MVA breakdown stored on payments row.

import Stripe from "https://esm.sh/stripe@14?target=deno";
import { handleCors, jsonResponse } from "../_shared/cors.ts";
import { adminClient, authedUserId } from "../_shared/supabase.ts";
import { breakdownNok } from "../_shared/pricing.ts";

Deno.serve(async (req) => {
  const cors = handleCors(req);
  if (cors) return cors;

  try {
    const userId = await authedUserId(req);
    if (!userId) return jsonResponse({ error: "unauthorized" }, 401);

    const { ride_id } = await req.json();
    if (!ride_id) return jsonResponse({ error: "ride_id required" }, 400);

    const sb = adminClient();
    const { data: ride, error } = await sb
      .from("rides")
      .select("*")
      .eq("id", ride_id)
      .eq("customer_id", userId)
      .single();
    if (error || !ride) return jsonResponse({ error: "ride not found" }, 404);

    const totalNok = Number(ride.final_fare_nok ?? ride.estimated_fare_nok);
    if (!totalNok || totalNok <= 0) {
      return jsonResponse({ error: "ride has no fare" }, 400);
    }

    const b = breakdownNok(totalNok);
    const amountOre = Math.round(totalNok * 100);

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
      apiVersion: "2024-11-20.acacia",
      httpClient: Stripe.createFetchHttpClient(),
    });

    const intent = await stripe.paymentIntents.create({
      amount: amountOre,
      currency: "nok",
      automatic_payment_methods: { enabled: true },
      metadata: {
        ride_id: ride.id,
        customer_id: userId,
        platform_fee_nok: String(b.platform_fee),
        mva_nok: String(b.mva),
      },
    });

    await sb.from("payments").upsert(
      {
        ride_id: ride.id,
        profile_id: userId,
        provider: "stripe",
        stripe_payment_intent_id: intent.id,
        amount_nok: b.total_incl_mva,
        platform_fee_nok: b.platform_fee,
        driver_payout_nok: b.driver_payout,
        mva_amount_nok: b.mva,
        currency: "NOK",
        status: "pending",
      },
      { onConflict: "ride_id" },
    );

    return jsonResponse({
      client_secret: intent.client_secret,
      payment_intent_id: intent.id,
      breakdown: b,
    });
  } catch (e) {
    console.error(e);
    return jsonResponse({ error: (e as Error).message }, 500);
  }
});
