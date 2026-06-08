// Typed helper for calling Supabase Edge Functions with the user's JWT.

import { getSupabase, isSupabaseConfigured } from "../data/supabase/client";

export async function callEdge<T = unknown>(
  name: string,
  body?: Record<string, unknown>,
  opts?: { method?: "POST" | "GET"; query?: Record<string, string> },
): Promise<T> {
  if (!isSupabaseConfigured) throw new Error("Supabase ikke konfigurert");
  const sb = getSupabase();
  const { data: { session } } = await sb.auth.getSession();
  const url = import.meta.env.VITE_SUPABASE_URL as string;
  const qs = opts?.query
    ? "?" + new URLSearchParams(opts.query).toString()
    : "";
  const res = await fetch(`${url}/functions/v1/${name}${qs}`, {
    method: opts?.method ?? "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.access_token ?? import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      apikey: import.meta.env.VITE_SUPABASE_ANON_KEY as string,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${name} ${res.status}: ${text}`);
  }
  return res.json();
}
