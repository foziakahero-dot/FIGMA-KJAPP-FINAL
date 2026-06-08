import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { projectId, publicAnonKey } from "/utils/supabase/info";

const url =
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) ??
  (projectId ? `https://${projectId}.supabase.co` : undefined);
const anonKey =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ?? publicAnonKey;

let cached: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (cached) return cached;
  if (!url || !anonKey) {
    throw new Error(
      "Supabase env mangler. Sett VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY i .env.local",
    );
  }
  cached = createClient(url, anonKey, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false },
  });
  return cached;
}

export const isSupabaseConfigured = Boolean(url && anonKey);
