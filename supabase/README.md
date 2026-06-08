# KJAPP Supabase — pilot-ready backend

Eier: **NexoraHub AS** (orgnr 914 827 442). Produkt: **KJAPP**.

## Hva ligger her

```
supabase/
  migrations/
    0001_init_auth_profiles.sql      profiles, roles, consent_log, settings, saved_places
    0002_fleets_drivers_vehicles.sql fleets, vehicles, drivers, locations, applications
    0003_rides_payments.sql          rides, events, messages, ratings, payments, receipts
  functions/
    _shared/                         cors, supabase admin client, pricing helpers
    stripe-create-intent             POST {ride_id} → PaymentIntent client_secret
    stripe-webhook                   Stripe → DB (capture/fail/refund)
    request-ride                     POST {tier, pickup, destination, distance, duration}
    accept-ride                      POST {ride_id, vehicle_id?} — driver claims a ride
    update-ride-status               POST {ride_id, status, final_fare_nok?, cancel_reason?}
    openai-aurora-chat               POST {messages, mode?} → gpt-4o-mini reply
    google-places                    GET ?action=autocomplete|details
    google-directions                POST {origin, destination} → distance/duration/polyline
```

## Pris-modell (norsk taxi)

- **12% MVA** persontransport, inkludert i pris til kunde
- **10% KJAPP-provisjon** av netto (etter MVA)
- Sjåfør-utbetaling = netto − 10% provisjon

Helper: `supabase/functions/_shared/pricing.ts → breakdownNok(total)`.

## Sett opp lokalt

```bash
# 1. Install Supabase CLI: https://supabase.com/docs/guides/cli
supabase link --project-ref <your-project-ref>

# 2. Apply migrations
supabase db push

# 3. Set secrets (kun edge runtime, ALDRI i frontend)
supabase secrets set STRIPE_SECRET_KEY=sk_test_...
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...
supabase secrets set OPENAI_API_KEY=sk-...
supabase secrets set GOOGLE_MAPS_API_KEY=AIza...

# 4. Deploy functions
supabase functions deploy stripe-create-intent
supabase functions deploy stripe-webhook --no-verify-jwt
supabase functions deploy request-ride
supabase functions deploy accept-ride
supabase functions deploy update-ride-status
supabase functions deploy openai-aurora-chat
supabase functions deploy google-places
supabase functions deploy google-directions
```

`stripe-webhook` deployes med `--no-verify-jwt` fordi Stripe ikke sender Supabase-JWT — signaturen verifiseres via `STRIPE_WEBHOOK_SECRET`.

## Stripe webhook config

I Stripe Dashboard → Developers → Webhooks → Add endpoint:
- URL: `https://<project>.supabase.co/functions/v1/stripe-webhook`
- Events: `payment_intent.succeeded`, `payment_intent.payment_failed`, `charge.refunded`

Kopier signing secret til `STRIPE_WEBHOOK_SECRET`.

## SMS OTP (Supabase Auth)

Aktivér i Dashboard → Authentication → Providers → Phone. Velg SMS-leverandør:
- **Pilot**: Twilio test-credentials (raskest)
- **Norge prod**: LinkMobility eller MessageBird (bedre delivery)

Test-nummer i utvikling: legg til i Authentication → Phone → Test OTP (slipper SMS-kost).

## Sikkerhet

- Alle tabeller har RLS, default-deny
- Service role key brukes KUN i edge functions
- Frontend bruker kun anon key + bruker-JWT
- Webhook signaturer verifiseres
- `audit_log` tabell logger admin-handlinger
- Hard slett av payment_methods + driver_documents; rides/payments anonymiseres etter 30-dagers grace (Bokføringsloven §10 krever 5 års oppbevaring)

## Roller

- `customer` (default): kunde
- `driver`: sjåfør (krever `drivers`-rad)
- `fleet_owner`: løyvehaver (krever godkjent `loyvehaver_applications` + `fleets`-rad)
- `super_admin`: kun NexoraHub-eier (settes manuelt i Studio)

Promotér til super_admin (en gang, etter første innlogging):
```sql
update public.profiles set role = 'super_admin' where phone = '+47XXXXXXXX';
```
