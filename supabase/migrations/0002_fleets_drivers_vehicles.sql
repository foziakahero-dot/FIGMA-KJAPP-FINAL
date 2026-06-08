-- Fleets (løyvehaver companies), drivers, vehicles, driver locations & sessions

do $$ begin
  create type online_status as enum ('online', 'offline', 'busy');
exception when duplicate_object then null; end $$;

do $$ begin
  create type vehicle_tier as enum ('Eco', 'Standard', 'Premium', 'XL');
exception when duplicate_object then null; end $$;

-- Fleets (løyvehaver)
create table if not exists public.fleets (
  id uuid primary key default gen_random_uuid(),
  owner_profile_id uuid not null references public.profiles(id) on delete restrict,
  name text not null,
  orgnr text unique not null,
  contact_phone text,
  contact_email text,
  address text,
  payout_iban text,
  payout_account_holder text,
  firmaattest_url text,
  firmaattest_valid_until date,
  approved_at timestamptz,
  approved_by_profile_id uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create index if not exists fleets_owner_idx on public.fleets(owner_profile_id);

-- Vehicles
create table if not exists public.vehicles (
  id uuid primary key default gen_random_uuid(),
  fleet_id uuid references public.fleets(id) on delete set null,
  plate text unique not null,
  loyve_nr text,
  make text not null,
  model text not null,
  year int,
  color text,
  tier vehicle_tier not null default 'Standard',
  capacity int not null default 4,
  accessibility_flags jsonb not null default '{}'::jsonb,
  inspection_valid_until date,
  insurance_valid_until date,
  insurance_doc_url text,
  eu_kontroll_valid_until date,
  registration_doc_url text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists vehicles_fleet_idx on public.vehicles(fleet_id);

-- Drivers (extends profile)
create table if not exists public.drivers (
  profile_id uuid primary key references public.profiles(id) on delete cascade,
  kjoreseddel_id text unique,
  kjoreseddel_valid_until date,
  kjoreseddel_status text not null default 'pending',
  bankid_verified boolean not null default false,
  fleet_id uuid references public.fleets(id) on delete set null,
  default_vehicle_id uuid references public.vehicles(id),
  online_status online_status not null default 'offline',
  rating numeric(3,2) not null default 5.00,
  total_trips int not null default 0,
  joined_at timestamptz not null default now()
);

create index if not exists drivers_fleet_idx on public.drivers(fleet_id);
create index if not exists drivers_online_idx on public.drivers(online_status) where online_status = 'online';

-- Live locations (UPSERT every 1.4s)
create table if not exists public.driver_locations (
  driver_id uuid primary key references public.drivers(profile_id) on delete cascade,
  lng double precision not null,
  lat double precision not null,
  heading_deg numeric,
  speed_kmh numeric,
  updated_at timestamptz not null default now()
);

create index if not exists driver_locations_updated_idx on public.driver_locations(updated_at);

-- Driver sessions (shift tracking for working time + MVA)
create table if not exists public.driver_sessions (
  id uuid primary key default gen_random_uuid(),
  driver_id uuid not null references public.drivers(profile_id) on delete cascade,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  total_km numeric not null default 0,
  total_hours numeric not null default 0
);

create index if not exists driver_sessions_driver_idx on public.driver_sessions(driver_id);

-- Driver documents (KYC)
create table if not exists public.driver_documents (
  id uuid primary key default gen_random_uuid(),
  driver_id uuid not null references public.drivers(profile_id) on delete cascade,
  doc_type text not null,
  file_url text not null,
  uploaded_at timestamptz not null default now(),
  verified_at timestamptz,
  expires_at date
);

-- Loyvehaver applications (pending fleet owner approvals)
create table if not exists public.loyvehaver_applications (
  id uuid primary key default gen_random_uuid(),
  orgnr text not null,
  orgnavn text not null,
  contact_name text not null,
  contact_phone text not null,
  contact_email text,
  payout_iban text,
  status text not null default 'pending',
  submitted_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by_profile_id uuid references public.profiles(id),
  reject_reason text,
  raw_documents jsonb not null default '[]'::jsonb,
  raw_vehicles jsonb not null default '[]'::jsonb
);

create index if not exists loyvehaver_applications_status_idx on public.loyvehaver_applications(status);

-- RLS
alter table public.fleets enable row level security;
alter table public.vehicles enable row level security;
alter table public.drivers enable row level security;
alter table public.driver_locations enable row level security;
alter table public.driver_sessions enable row level security;
alter table public.driver_documents enable row level security;
alter table public.loyvehaver_applications enable row level security;

-- Fleets: owner sees own, super_admin sees all
create policy "fleet owner reads own" on public.fleets for select
  using (owner_profile_id = auth.uid()
    or exists (select 1 from public.profiles where id = auth.uid() and role = 'super_admin'));

create policy "fleet owner updates own" on public.fleets for update
  using (owner_profile_id = auth.uid());

-- Vehicles: fleet owner sees own fleet's vehicles, drivers see assigned, super_admin all
create policy "vehicles readable by fleet/driver/admin" on public.vehicles for select
  using (
    exists (select 1 from public.fleets f where f.id = vehicles.fleet_id and f.owner_profile_id = auth.uid())
    or exists (select 1 from public.drivers d where d.profile_id = auth.uid() and d.default_vehicle_id = vehicles.id)
    or exists (select 1 from public.profiles where id = auth.uid() and role = 'super_admin')
  );

-- Drivers: self read/update; fleet owner reads own fleet drivers
create policy "driver self rw" on public.drivers for all
  using (profile_id = auth.uid()) with check (profile_id = auth.uid());

create policy "fleet owner reads own drivers" on public.drivers for select
  using (exists (select 1 from public.fleets f where f.id = drivers.fleet_id and f.owner_profile_id = auth.uid()));

-- Driver locations: driver upserts own; everyone reads online drivers
create policy "driver upsert own location" on public.driver_locations for all
  using (driver_id = auth.uid()) with check (driver_id = auth.uid());

create policy "everyone reads online driver locations" on public.driver_locations for select
  using (exists (select 1 from public.drivers d where d.profile_id = driver_locations.driver_id and d.online_status = 'online'));

create policy "driver session self rw" on public.driver_sessions for all
  using (driver_id = auth.uid()) with check (driver_id = auth.uid());

create policy "driver docs self rw" on public.driver_documents for all
  using (driver_id = auth.uid()) with check (driver_id = auth.uid());

-- Loyvehaver applications: anyone inserts, only super_admin reads
create policy "anyone submits application" on public.loyvehaver_applications for insert with check (true);
create policy "super admin reads applications" on public.loyvehaver_applications for select
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'super_admin'));
create policy "super admin updates applications" on public.loyvehaver_applications for update
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'super_admin'));
