-- Rides, ride events, messages, ratings, payments, receipts
-- Norwegian taxi: 12% MVA (persontransport), 10% KJAPP platform fee

do $$ begin
  create type ride_status as enum (
    'requested', 'matched', 'accepted', 'driver_arrived',
    'in_progress', 'completed', 'cancelled', 'rejected'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type payment_status as enum (
    'pending', 'authorized', 'captured', 'refunded', 'failed'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type payment_provider as enum ('stripe', 'vipps', 'apple_pay', 'google_pay', 'card', 'invoice');
exception when duplicate_object then null; end $$;

-- Payment methods (per customer)
create table if not exists public.payment_methods (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  provider payment_provider not null,
  external_token text,
  stripe_payment_method_id text,
  last4 text,
  vipps_msisdn text,
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index if not exists payment_methods_profile_idx on public.payment_methods(profile_id) where deleted_at is null;

-- Rides
create table if not exists public.rides (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.profiles(id) on delete restrict,
  driver_id uuid references public.profiles(id) on delete set null,
  vehicle_id uuid references public.vehicles(id) on delete set null,
  tier vehicle_tier not null default 'Standard',
  status ride_status not null default 'requested',

  pickup_lng double precision not null,
  pickup_lat double precision not null,
  pickup_address text not null,
  destination_lng double precision not null,
  destination_lat double precision not null,
  destination_address text not null,

  estimated_fare_nok numeric(10,2),
  final_fare_nok numeric(10,2),
  distance_km numeric(8,2),
  duration_min numeric(6,2),
  surge_multiplier numeric(4,2) not null default 1.00,

  -- Norway tax + platform fee
  mva_percent numeric(4,2) not null default 12.00,
  mva_amount_nok numeric(10,2),
  platform_fee_percent numeric(4,2) not null default 10.00,
  platform_fee_nok numeric(10,2),
  driver_payout_nok numeric(10,2),

  requested_at timestamptz not null default now(),
  matched_at timestamptz,
  accepted_at timestamptz,
  driver_arrived_at timestamptz,
  picked_up_at timestamptz,
  completed_at timestamptz,
  cancelled_at timestamptz,
  cancel_reason text
);

create index if not exists rides_customer_idx on public.rides(customer_id);
create index if not exists rides_driver_idx on public.rides(driver_id) where driver_id is not null;
create index if not exists rides_status_idx on public.rides(status);

-- Ride events (append-only audit log)
create table if not exists public.ride_events (
  id uuid primary key default gen_random_uuid(),
  ride_id uuid not null references public.rides(id) on delete cascade,
  event_type text not null,
  actor_profile_id uuid references public.profiles(id),
  payload jsonb not null default '{}'::jsonb,
  at timestamptz not null default now()
);

create index if not exists ride_events_ride_idx on public.ride_events(ride_id);

-- Ride messages (chat)
create table if not exists public.ride_messages (
  id uuid primary key default gen_random_uuid(),
  ride_id uuid not null references public.rides(id) on delete cascade,
  sender_profile_id uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now(),
  read_at timestamptz
);

create index if not exists ride_messages_ride_idx on public.ride_messages(ride_id);

-- Ride ratings (two-way)
create table if not exists public.ride_ratings (
  id uuid primary key default gen_random_uuid(),
  ride_id uuid not null references public.rides(id) on delete cascade,
  rater_profile_id uuid not null references public.profiles(id) on delete cascade,
  ratee_profile_id uuid not null references public.profiles(id) on delete cascade,
  stars int not null check (stars between 1 and 5),
  comment text,
  created_at timestamptz not null default now(),
  unique (ride_id, rater_profile_id)
);

-- Payments
create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  ride_id uuid not null unique references public.rides(id) on delete restrict,
  profile_id uuid not null references public.profiles(id),
  payment_method_id uuid references public.payment_methods(id),
  provider payment_provider not null,
  provider_reference text,
  stripe_payment_intent_id text,
  stripe_charge_id text,
  amount_nok numeric(10,2) not null,
  platform_fee_nok numeric(10,2) not null default 0,
  driver_payout_nok numeric(10,2) not null default 0,
  mva_amount_nok numeric(10,2) not null default 0,
  currency text not null default 'NOK',
  status payment_status not null default 'pending',
  captured_at timestamptz,
  refunded_at timestamptz,
  raw_response jsonb,
  created_at timestamptz not null default now()
);

create index if not exists payments_profile_idx on public.payments(profile_id);
create index if not exists payments_status_idx on public.payments(status);

-- Receipts
create table if not exists public.receipts (
  id uuid primary key default gen_random_uuid(),
  ride_id uuid not null unique references public.rides(id) on delete cascade,
  payment_id uuid not null references public.payments(id) on delete cascade,
  pdf_url text,
  html_body text,
  mva_breakdown jsonb not null default '{}'::jsonb,
  issued_at timestamptz not null default now(),
  emailed_to text
);

-- Pricing rules
create table if not exists public.pricing_rules (
  id uuid primary key default gen_random_uuid(),
  tier vehicle_tier not null,
  base_fare_nok numeric(8,2) not null,
  per_km_nok numeric(6,2) not null,
  per_min_nok numeric(6,2) not null,
  night_multiplier numeric(4,2) not null default 1.00,
  weekend_multiplier numeric(4,2) not null default 1.00,
  valid_from timestamptz not null default now(),
  valid_until timestamptz
);

-- Seed pricing (NOK, indicative)
insert into public.pricing_rules (tier, base_fare_nok, per_km_nok, per_min_nok, night_multiplier, weekend_multiplier)
values
  ('Eco',      55.00, 14.00, 4.00, 1.10, 1.15),
  ('Standard', 69.00, 17.00, 5.00, 1.15, 1.20),
  ('Premium', 109.00, 25.00, 7.00, 1.20, 1.25),
  ('XL',      129.00, 28.00, 8.00, 1.20, 1.25)
on conflict do nothing;

-- Audit log (admin actions)
create table if not exists public.audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_profile_id uuid references public.profiles(id),
  action text not null,
  target_table text not null,
  target_id uuid,
  before jsonb,
  after jsonb,
  at timestamptz not null default now()
);

-- Feedback
create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  ride_id uuid references public.rides(id) on delete set null,
  category text,
  body text not null,
  screenshot_url text,
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

-- RLS
alter table public.payment_methods enable row level security;
alter table public.rides enable row level security;
alter table public.ride_events enable row level security;
alter table public.ride_messages enable row level security;
alter table public.ride_ratings enable row level security;
alter table public.payments enable row level security;
alter table public.receipts enable row level security;
alter table public.pricing_rules enable row level security;
alter table public.audit_log enable row level security;
alter table public.feedback enable row level security;

-- Payment methods: own only
create policy "own payment methods rw" on public.payment_methods for all
  using (profile_id = auth.uid()) with check (profile_id = auth.uid());

-- Rides: customer creates + reads own; driver reads/updates assigned
create policy "customer creates own ride" on public.rides for insert
  with check (customer_id = auth.uid());
create policy "customer reads own rides" on public.rides for select
  using (customer_id = auth.uid() or driver_id = auth.uid());
create policy "driver updates assigned ride" on public.rides for update
  using (driver_id = auth.uid());
create policy "customer updates own pending ride" on public.rides for update
  using (customer_id = auth.uid() and status in ('requested', 'matched'));

-- Ride events: insertable by participants; readable by participants
create policy "ride event readable by participants" on public.ride_events for select
  using (exists (
    select 1 from public.rides r where r.id = ride_events.ride_id
      and (r.customer_id = auth.uid() or r.driver_id = auth.uid())
  ));
create policy "ride event insertable by participants" on public.ride_events for insert
  with check (exists (
    select 1 from public.rides r where r.id = ride_events.ride_id
      and (r.customer_id = auth.uid() or r.driver_id = auth.uid())
  ));

-- Ride messages: participants only
create policy "ride messages readable" on public.ride_messages for select
  using (exists (
    select 1 from public.rides r where r.id = ride_messages.ride_id
      and (r.customer_id = auth.uid() or r.driver_id = auth.uid())
  ));
create policy "ride messages insertable" on public.ride_messages for insert
  with check (sender_profile_id = auth.uid() and exists (
    select 1 from public.rides r where r.id = ride_messages.ride_id
      and (r.customer_id = auth.uid() or r.driver_id = auth.uid())
  ));

-- Ratings: rater only inserts; participants read
create policy "rating insertable by rater" on public.ride_ratings for insert
  with check (rater_profile_id = auth.uid());
create policy "rating readable by participants" on public.ride_ratings for select
  using (rater_profile_id = auth.uid() or ratee_profile_id = auth.uid());

-- Payments: customer reads own via ride; driver reads payout amounts only
create policy "customer reads own payments" on public.payments for select
  using (profile_id = auth.uid()
    or exists (select 1 from public.rides r where r.id = payments.ride_id and r.driver_id = auth.uid()));

-- Receipts: ride participants
create policy "receipt readable by ride participants" on public.receipts for select
  using (exists (
    select 1 from public.rides r where r.id = receipts.ride_id
      and (r.customer_id = auth.uid() or r.driver_id = auth.uid())
  ));

-- Pricing rules: public read
create policy "pricing rules public" on public.pricing_rules for select using (true);

-- Audit log: super_admin only
create policy "audit log super admin" on public.audit_log for select
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'super_admin'));

-- Feedback: self insert; super_admin reads all; self reads own
create policy "feedback self insert" on public.feedback for insert
  with check (profile_id = auth.uid() or profile_id is null);
create policy "feedback own read" on public.feedback for select
  using (profile_id = auth.uid()
    or exists (select 1 from public.profiles where id = auth.uid() and role = 'super_admin'));
