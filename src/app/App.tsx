import { useEffect } from "react";
import { RouterProvider } from "react-router";
import { applyTheme, getTheme } from "./lib/theme";
import { router } from "./routes";

export type Screen =
  | "splash"
  | "signin"
  | "home"
  | "book"
  | "chat"
  | "track"
  | "complete"
  | "profile"
  | "driver"
  | "driver-online-map"
  | "driver-ride"
  | "driver-profile"
  | "driver-trip-request"
  | "driver-navigate"
  | "driver-trip-active"
  | "driver-trip-complete"
  | "driver-trips"
  | "driver-earnings"
  | "driver-aurora-chat"
  | "driver-onboarding"
  | "driver-arrived"
  | "ride-chat"
  | "driver-chat"
  | "voice"
  | "ar-pickup"
  | "driver-signin"
  | "driver-access"
  | "become-driver"
  | "settings"
  | "payment"
  | "history"
  | "places"
  | "support"
  | "connect"
  | "rekk-avgangen"
  | "prototype-map"
  | "driver-prototype-map"
  | "driver-support"
  | "support-inbox"
  | "driver-vehicle-select"
  | "driver-nav-app-settings"
  | "driver-communication-settings"
  | "driver-ai-settings"
  | "driver-ai-policy"
  | "driver-location-settings"
  | "driver-consent"
  | "role"
  | "export"
  | "loyvehaver-register"
  | "fleet-dashboard"
  | "super-admin-inbox"
  | "privacy"
  | "terms"
  | "data-export";

export default function App() {
  useEffect(() => {
    applyTheme(getTheme());
    const id = setInterval(() => applyTheme(getTheme()), 5 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  return <RouterProvider router={router} />;
}
