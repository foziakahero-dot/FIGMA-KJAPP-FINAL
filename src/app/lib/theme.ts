// Tema-styring. Dark = Polar Midnight, Light = Aurora Frost.
// Auto følger sol opp/ned i Oslo (lat 59,91° N) — relevant fordi dagslys
// varierer fra 0t (desember) til 24t (juni) i Norge.
export type Theme = "dark" | "premium" | "light" | "auto";
const KEY = "kjapp.theme";

export function getTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  return (localStorage.getItem(KEY) as Theme) || "auto";
}

/** Approks. sol opp/ned i Oslo for gjeldende dag — i timer (lokal tid). */
function osloDaylight(date = new Date()): { sunrise: number; sunset: number } {
  // Dag-på-året 0..365
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / 86400000);
  // Sinusbølge sentrert rundt sommersolverv (dag 172)
  const phase = ((dayOfYear - 172) / 365) * 2 * Math.PI;
  // Oslo: solverv 03:53 / 22:43 (juni), 09:18 / 15:12 (desember)
  const sunrise = 6.6 + 2.7 * Math.cos(phase);   // ~3.9 (sommer) → ~9.3 (vinter)
  const sunset  = 18.9 - 3.7 * Math.cos(phase);  // ~22.6 (sommer) → ~15.2 (vinter)
  return { sunrise, sunset };
}

export function resolveTheme(t: Theme): "dark" | "premium" | "light" {
  if (t !== "auto") return t;
  const now = new Date();
  const hourFloat = now.getHours() + now.getMinutes() / 60;
  const { sunrise, sunset } = osloDaylight(now);
  return hourFloat >= sunrise && hourFloat < sunset ? "light" : "dark";
}

export function applyTheme(t: Theme) {
  const resolved = resolveTheme(t);
  document.documentElement.setAttribute("data-theme", resolved);
}

export function setTheme(t: Theme) {
  localStorage.setItem(KEY, t);
  applyTheme(t);
}
