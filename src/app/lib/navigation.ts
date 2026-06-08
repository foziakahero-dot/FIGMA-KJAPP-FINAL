// Ekstern navigasjon. Sjåføren velger app i profil (lagres i localStorage).
export type NavApp = "google" | "apple" | "waze";
const KEY = "kjapp.driver.navApp";

export function getNavApp(): NavApp {
  if (typeof window === "undefined") return "google";
  return (localStorage.getItem(KEY) as NavApp) || "google";
}

export function setNavApp(app: NavApp) {
  localStorage.setItem(KEY, app);
}

export function openExternalMap(address: string) {
  const q = encodeURIComponent(address);
  const app = getNavApp();
  const url =
    app === "apple" ? `https://maps.apple.com/?daddr=${q}` :
    app === "waze"  ? `https://waze.com/ul?q=${q}&navigate=yes` :
                      `https://www.google.com/maps/dir/?api=1&destination=${q}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
