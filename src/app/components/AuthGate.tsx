import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../lib/auth";

/**
 * Wrap protected routes. Sends unauthenticated users to /signin.
 * While Supabase is not configured yet, lets traffic through so the
 * existing mock UI continues to work during migration.
 */
export function AuthGate({ children }: { children: ReactNode }) {
  const { loading, userId, configured } = useAuth();
  const loc = useLocation();

  if (!configured) return <>{children}</>;
  if (loading) return null;
  if (!userId) return <Navigate to="/signin" replace state={{ from: loc.pathname }} />;
  return <>{children}</>;
}
