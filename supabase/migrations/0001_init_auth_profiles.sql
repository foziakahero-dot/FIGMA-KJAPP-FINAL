-- KJAPP — init: profiles, roles, consent log, user settings, saved places
-- Norway pilot. Owner: NexoraHub AS (orgnr 914 827 442)

create extension if not exists "pgcrypto";

-- Roles enum
do $$ begin
  create type user_role as enum ('customer', 'driver', 'fleet_owner', 'super_admin');
exception when duplicate_object then null; end $$;

-- Profiles — extends auth.users 1:1
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role user_role not null default 'customer',
  full_name text,
  phone text unique,
  email text,
  language text not null default 'no',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index if not exists profiles_role_idx on public.profiles(role) where deleted_at is null;

-- Consent log — GDPR audit trail (append-only conceptually)
create table if not exists public.consent_log (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  consent_type text not null,
  version text not null,
  granted_at timestamptz not null default now(),
  withdrawn_at timestamptz,
  ip inet,
  user_agent text
);

create index if not exists consent_log_profile_idx on public.consent_log(profile_id);

-- User settings (1:1 with profile)
create table if not exists public.user_settings (
  profile_id uuid primary key references public.profiles(id) on delete cascade,
  theme text not null default 'aurora',
  notifications_push boolean not null default true,
  notifications_email boolean not null default false,
  marketing_opt_in boolean not null default false,
  default_payment_method_id uuid,
  receipts_email text,
  updated_at timestamptz not null default now()
);

-- Saved places
create table if not exists public.saved_places (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  label text not null,
  address text not null,
  lng double precision not null,
  lat double precision not null,
  icon text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists saved_places_profile_idx on public.saved_places(profile_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, phone, email)
  values (new.id, new.phone, new.email)
  on conflict (id) do nothing;

  insert into public.user_settings (profile_id)
  values (new.id)
  on conflict (profile_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- RLS
alter table public.profiles enable row level security;
alter table public.consent_log enable row level security;
alter table public.user_settings enable row level security;
alter table public.saved_places enable row level security;

create policy "own profile readable" on public.profiles
  for select using (auth.uid() = id);
create policy "own profile updatable" on public.profiles
  for update using (auth.uid() = id);

create policy "own consent readable" on public.consent_log
  for select using (auth.uid() = profile_id);
create policy "own consent insertable" on public.consent_log
  for insert with check (auth.uid() = profile_id);

create policy "own settings rw" on public.user_settings
  for all using (auth.uid() = profile_id) with check (auth.uid() = profile_id);

create policy "own places rw" on public.saved_places
  for all using (auth.uid() = profile_id) with check (auth.uid() = profile_id);
