import { projectId, publicAnonKey } from "/utils/supabase/info";
import { getSupabase, isSupabaseConfigured } from "../data/supabase/client";

const BASE = `https://${projectId}.supabase.co/functions/v1/make-server-371148df`;

async function authHeader(): Promise<string> {
  if (!isSupabaseConfigured) return `Bearer ${publicAnonKey}`;
  try {
    const { data: { session } } = await getSupabase().auth.getSession();
    return `Bearer ${session?.access_token ?? publicAnonKey}`;
  } catch {
    return `Bearer ${publicAnonKey}`;
  }
}

async function userId(): Promise<string | null> {
  if (!isSupabaseConfigured) return null;
  try {
    const { data: { user } } = await getSupabase().auth.getUser();
    return user?.id ?? null;
  } catch {
    return null;
  }
}

export async function mGet<T = unknown>(
  path: string,
  query?: Record<string, string>,
): Promise<T> {
  const qs = query ? "?" + new URLSearchParams(query).toString() : "";
  const uid = await userId();
  const r = await fetch(`${BASE}${path}${qs}`, {
    headers: {
      Authorization: await authHeader(),
      apikey: publicAnonKey,
      ...(uid ? { "x-user-id": uid } : {}),
    },
  });
  if (!r.ok) throw new Error(`${path} ${r.status}: ${await r.text()}`);
  return r.json();
}

export async function mPost<T = unknown>(
  path: string,
  body?: Record<string, unknown>,
): Promise<T> {
  const uid = await userId();
  const r = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: await authHeader(),
      apikey: publicAnonKey,
      ...(uid ? { "x-user-id": uid } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!r.ok) throw new Error(`${path} ${r.status}: ${await r.text()}`);
  return r.json();
}
