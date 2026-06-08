import { useEffect, useState } from "react";
import { getSupabase, isSupabaseConfigured } from "../data/supabase/client";
import type { Profile } from "../data/supabase/types";

export type AuthState = {
  loading: boolean;
  userId: string | null;
  profile: Profile | null;
  configured: boolean;
};

export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({
    loading: true,
    userId: null,
    profile: null,
    configured: isSupabaseConfigured,
  });

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setState((s) => ({ ...s, loading: false }));
      return;
    }
    const sb = getSupabase();
    let active = true;

    const load = async () => {
      const { data: { session } } = await sb.auth.getSession();
      if (!active) return;
      if (!session) {
        setState({ loading: false, userId: null, profile: null, configured: true });
        return;
      }
      const { data: profile } = await sb
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single<Profile>();
      if (!active) return;
      setState({ loading: false, userId: session.user.id, profile, configured: true });
    };

    load();
    const { data: sub } = sb.auth.onAuthStateChange(() => load());
    return () => { active = false; sub.subscription.unsubscribe(); };
  }, []);

  return state;
}

/** Send a SMS OTP to a Norwegian phone number. Supabase Auth handles SMS via provider. */
export async function sendOtp(phone: string): Promise<{ error?: string }> {
  if (!isSupabaseConfigured) return { error: "Supabase ikke konfigurert" };
  const normalized = normalizeNorwegianPhone(phone);
  if (!normalized) return { error: "Ugyldig norsk mobilnummer" };
  const sb = getSupabase();
  const { error } = await sb.auth.signInWithOtp({ phone: normalized });
  return error ? { error: error.message } : {};
}

export async function verifyOtp(phone: string, token: string): Promise<{ error?: string }> {
  if (!isSupabaseConfigured) return { error: "Supabase ikke konfigurert" };
  const normalized = normalizeNorwegianPhone(phone);
  if (!normalized) return { error: "Ugyldig norsk mobilnummer" };
  const sb = getSupabase();
  const { error } = await sb.auth.verifyOtp({
    phone: normalized,
    token,
    type: "sms",
  });
  return error ? { error: error.message } : {};
}

export async function signOut(): Promise<void> {
  if (!isSupabaseConfigured) return;
  await getSupabase().auth.signOut();
}

/** Accepts "9XX XX XXX", "+47…", "0047…", "47XXXXXXXX". Returns "+47XXXXXXXX" or null. */
export function normalizeNorwegianPhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 8) return `+47${digits}`;
  if (digits.startsWith("47") && digits.length === 10) return `+${digits}`;
  if (digits.startsWith("0047") && digits.length === 12) return `+${digits.slice(2)}`;
  return null;
}
