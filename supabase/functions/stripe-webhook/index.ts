// Stripe webhook → updates payments + ride status on successful capture.
// Configure endpoint in Stripe Dashboard. Secret in env STRIPE_WEBHOOK_SECRET.

import Stripe from "https://esm.sh/stripe@14?target=deno";
import { adminClient } from "../_shared/supabase.ts";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2024-11-20.acacia",
  httpClient: Stripe.createFetchHttpClient(),
});

Deno.serve(async (req) => {
  const sig = req.headers.get("stripe-signature");
  const body = await req.text();
  if (!sig) return new Response("missing signature", { status: 400 });

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      sig,
      Deno.env.get("STRIPE_WEBHOOK_SECRET")!,
      undefined,
      Stripe.createSubtleCryptoProvider(),
    );
  } catch (err) {
    return new Response(`signature: ${(err as Error).message}`, { status: 400 });
  }

  const sb = adminClient();

  switch (event.type) {
    case "payment_intent.succeeded": {
      const pi = event.data.object as Stripe.PaymentIntent;
      const rideId = pi.metadata?.ride_id;
      await sb.from("payments").update({
        status: "captured",
        captured_at: new Date().toISOString(),
        stripe_charge_id: pi.latest_charge as string,
        raw_response: pi as unknown as Record<string, unknown>,
      }).eq("stripe_payment_intent_id", pi.id);
      if (rideId) {
        await sb.from("rides").update({ status: "completed" }).eq("id", rideId);
        await sb.from("ride_events").insert({
          ride_id: rideId,
          event_type: "payment_captured",
          payload: { payment_intent_id: pi.id, amount_nok: pi.amount / 100 },
        });
      }
      break;
    }
    case "payment_intent.payment_failed": {
      const pi = event.data.object as Stripe.PaymentIntent;
      await sb.from("payments").update({
        status: "failed",
        raw_response: pi as unknown as Record<string, unknown>,
      }).eq("stripe_payment_intent_id", pi.id);
      break;
    }
    case "charge.refunded": {
      const ch = event.data.object as Stripe.Charge;
      await sb.from("payments").update({
        status: "refunded",
        refunded_at: new Date().toISOString(),
      }).eq("stripe_charge_id", ch.id);
      break;
    }
  }

  return new Response("ok", { status: 200 });
});
