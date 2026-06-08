import { useNavigate } from "react-router";
import type { Screen } from "../App";

export const screenToPath: Record<Screen, string> = {
  splash: "/",
  signin: "/signin",
  home: "/home",
  book: "/book",
  chat: "/aurora",
  track: "/track",
  complete: "/complete",
  profile: "/profile",
  driver: "/driver",
  "driver-online-map": "/driver/online",
  "driver-ride": "/driver/ride",
  "driver-profile": "/driver/profile",
  "driver-trip-request": "/driver/request",
  "driver-navigate": "/driver/navigate",
  "driver-trip-active": "/driver/active",
  "driver-trip-complete": "/driver/complete",
  "driver-trips": "/driver/trips",
  "driver-earnings": "/driver/earnings",
  "driver-aurora-chat": "/driver/aurora",
  "driver-onboarding": "/driver/onboarding",
  "driver-arrived": "/driver/arrived",
  "ride-chat": "/ride/chat",
  "driver-chat": "/driver/chat",
  voice: "/voice",
  "ar-pickup": "/ar-pickup",
  "driver-signin": "/driver/signin",
  "driver-access": "/driver/access",
  "become-driver": "/become-driver",
  settings: "/settings",
  payment: "/settings/payment",
  history: "/history",
  places: "/settings/places",
  support: "/settings/support",
  connect: "/connect",
  "rekk-avgangen": "/rekk-avgangen",
  "prototype-map": "/_debug/map",
  "driver-prototype-map": "/driver/_debug/map",
  "driver-support": "/driver/support",
  "support-inbox": "/driver/support/inbox",
  "driver-vehicle-select": "/driver/onboarding/vehicle",
  "driver-nav-app-settings": "/driver/settings/nav-app",
  "driver-communication-settings": "/driver/settings/communication",
  "driver-ai-settings": "/driver/settings/ai",
  "driver-ai-policy": "/driver/settings/ai-policy",
  "driver-location-settings": "/driver/settings/location",
  "driver-consent": "/driver/onboarding/consent",
  role: "/role",
  export: "/export",
  "loyvehaver-register": "/loyvehaver/registrer",
  "fleet-dashboard": "/loyvehaver/flate",
  "super-admin-inbox": "/super-admin/inbox",
  privacy: "/legal/privacy",
  terms: "/legal/terms",
  "data-export": "/settings/data-export",
};

export function useGo() {
  const navigate = useNavigate();
  return (s: Screen) => navigate(screenToPath[s]);
}

export function useGoBack() {
  const navigate = useNavigate();
  return () => navigate(-1);
}
