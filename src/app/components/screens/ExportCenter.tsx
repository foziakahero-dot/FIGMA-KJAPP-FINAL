import { Download, FileCode, FileText, Package, CheckCircle2 } from "lucide-react";
import { SubScreen } from "../SubScreen";
import { GlassPanel } from "../GlassPanel";
import type { Screen } from "../../App";

const INDEX_HTML = `<!doctype html>
<html lang="no">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="theme-color" content="#05060f" />
    <title>KJAPP</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;

const MAIN_TSX = `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./app/routes";
import "./styles/index.css";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Root element #root not found in index.html");

createRoot(rootEl).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
`;

const ROUTES_DIFF = `// I src/app/routes.tsx — kun to linjer endres:

// Linje 1:
- import { createBrowserRouter, Outlet, useNavigate } from "react-router";
+ import { createHashRouter, Outlet, useNavigate } from "react-router";

// Linje 105:
- export const router = createBrowserRouter([
+ export const router = createHashRouter([
`;

const EXPORT_CHECKLIST = `# KJAPP — Eksport-sjekkliste

## 1. Initiell oppsett
- [ ] Klon repoet: git clone <din-url>
- [ ] pnpm install

## 2. Vite-entrypoint
- [ ] Legg index.html i prosjekt-rot
- [ ] Legg src/main.tsx
- [ ] Slett __figma__entrypoint__.ts
- [ ] Verifiser: pnpm dev

## 3. Bytt router
- [ ] BrowserRouter -> HashRouter i src/app/routes.tsx

## 4. Produksjons-bygg
- [ ] pnpm build
- [ ] pnpm exec vite preview

## 5. PWA (Fase 3)
- [ ] pnpm add -D vite-plugin-pwa
- [ ] Konfigurer manifest + ikoner
- [ ] Deploy: pnpm dlx vercel

## 6. Capacitor (Fase 4)
- [ ] pnpm add @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios
- [ ] pnpm add @capacitor/geolocation @capacitor/push-notifications @capacitor/preferences
- [ ] pnpm exec cap init "KJAPP" "no.kjapp.app" --web-dir=dist
- [ ] pnpm exec cap add android
- [ ] pnpm exec cap add ios (krever Mac + Xcode)
- [ ] localStorage -> Preferences.get/set i theme.ts + navigation.ts
- [ ] pnpm build && pnpm exec cap sync && pnpm exec cap open android

## 7. Pilot (Fase 5)
- [ ] Sentry + PostHog
- [ ] Google Play Internal Testing
- [ ] TestFlight
- [ ] 10-20 kunder + 5-10 sjafører i Oslo
- [ ] 2-4 uker, 50+ ekte turer

Estimat: 4-6 uker fra eksport til pilot live.
`;

const QA_AUDIT_SUMMARY = `# Fase 0 QA-audit — sammendrag

Total: 47 skjermer

| Status | Antall | Andel |
|---|---|---|
| ✅ Pilot-klar | 11 | 22% |
| 🟡 UI ok, data mock | 29 | 60% |
| ⚪ Krever manuell tap-test | 7 | 15% |
| 🔴 Blocker | 0 | 0% |

Ingen 🔴 blockers — vi kan trygt starte Fase 1 + Fase 2 parallelt.

Manuell verifisering kreves for:
- /voice (mic-tilgang i WebView?)
- /ar-pickup (ekte AR eller mock?)
- /connect (formål uklart)
- /rekk-avgangen (fly-pickup-flyt komplett?)
- /driver/access (gate-logikk)
- /driver/navigate (deep link til ekstern navi)
- /driver/onboarding (dokument-opplasting)

Full audit-tabell ligger i plans/qa-audit.md.
`;

type FileItem = {
  filename: string;
  destination: string;
  content: string;
  size: string;
  icon: typeof FileCode;
  description: string;
};

const FILES: FileItem[] = [
  {
    filename: "index.html",
    destination: "Prosjekt-rot",
    content: INDEX_HTML,
    size: `${INDEX_HTML.length} B`,
    icon: FileCode,
    description: "Vite-entrypoint. Erstatter __figma__entrypoint__.ts.",
  },
  {
    filename: "main.tsx",
    destination: "src/",
    content: MAIN_TSX,
    size: `${MAIN_TSX.length} B`,
    icon: FileCode,
    description: "React DOM bootstrap. Mounter RouterProvider på #root.",
  },
  {
    filename: "routes-hashrouter-diff.txt",
    destination: "Lim inn i src/app/routes.tsx",
    content: ROUTES_DIFF,
    size: `${ROUTES_DIFF.length} B`,
    icon: FileText,
    description: "BrowserRouter → HashRouter. Kreves for Capacitor WebView.",
  },
  {
    filename: "export-checklist.md",
    destination: "Dokumentasjon",
    content: EXPORT_CHECKLIST,
    size: `${EXPORT_CHECKLIST.length} B`,
    icon: FileText,
    description: "Steg-for-steg fra eksport til APK + TestFlight.",
  },
  {
    filename: "qa-audit-summary.md",
    destination: "Dokumentasjon",
    content: QA_AUDIT_SUMMARY,
    size: `${QA_AUDIT_SUMMARY.length} B`,
    icon: FileText,
    description: "Fase 0 status for alle 47 skjermer.",
  },
];

function downloadFile(filename: string, content: string, mime = "text/plain") {
  const blob = new Blob([content], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function downloadAll() {
  FILES.forEach((f, i) => {
    setTimeout(() => downloadFile(f.filename, f.content), i * 200);
  });
}

export function ExportCenter({ go }: { go: (s: Screen) => void }) {
  return (
    <SubScreen title="EKSPORT-SENTER" onBack={() => go("profile")}>
      <div className="flex flex-col gap-4 pb-6">
        <GlassPanel holo className="p-5">
          <div className="flex items-start gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
              style={{
                background: "linear-gradient(135deg, rgba(94,240,255,0.18), rgba(160,107,255,0.18))",
                border: "1px solid rgba(94,240,255,0.35)",
              }}
            >
              <Package className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white font-display" style={{ fontSize: 16, letterSpacing: "0.02em" }}>
                Fase 1 — Build-readiness
              </div>
              <p className="text-white/65 mt-1" style={{ fontSize: 12.5, lineHeight: 1.5 }}>
                Last ned filene du trenger for å gå fra Figma Make-prototype til deployerbar Vite-app. Følg{" "}
                <span className="text-white/85">export-checklist.md</span> i rekkefølge.
              </p>
            </div>
          </div>

          <button
            onClick={downloadAll}
            className="mt-4 w-full py-3 rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition"
            style={{
              background: "linear-gradient(135deg, #5ef0ff, #a06bff)",
              color: "#05060f",
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: 13,
              letterSpacing: "0.06em",
              fontWeight: 600,
              boxShadow: "0 8px 28px -8px rgba(94,240,255,0.55)",
            }}
          >
            <Download className="w-4 h-4" />
            LAST NED ALLE FILER
          </button>
        </GlassPanel>

        <div className="flex flex-col gap-3">
          {FILES.map((f) => {
            const Icon = f.icon;
            return (
              <GlassPanel key={f.filename} className="p-4">
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: "rgba(94,240,255,0.10)",
                      border: "1px solid rgba(94,240,255,0.22)",
                    }}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <span
                        className="text-white truncate"
                        style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 13 }}
                      >
                        {f.filename}
                      </span>
                      <span
                        className="text-white/45 shrink-0"
                        style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10 }}
                      >
                        {f.size}
                      </span>
                    </div>
                    <div
                      className="text-white/50 mt-0.5"
                      style={{ fontSize: 10.5, letterSpacing: "0.08em" }}
                    >
                      → {f.destination}
                    </div>
                    <p className="text-white/65 mt-1.5" style={{ fontSize: 12, lineHeight: 1.45 }}>
                      {f.description}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => downloadFile(f.filename, f.content)}
                  className="mt-3 w-full py-2.5 rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition"
                  style={{
                    background: "rgba(8,10,24,0.6)",
                    border: "1px solid rgba(94,240,255,0.28)",
                    color: "#5ef0ff",
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 11,
                    letterSpacing: "0.06em",
                  }}
                >
                  <Download className="w-3.5 h-3.5" />
                  LAST NED
                </button>
              </GlassPanel>
            );
          })}
        </div>

        <GlassPanel className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-4 h-4 text-[#5ef0ff]" />
            <span
              className="text-white font-display uppercase"
              style={{ fontSize: 10.5, letterSpacing: "0.18em" }}
            >
              Status pr. fase
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {[
              { label: "Fase 0 — QA-audit", status: "Ferdig", color: "#5ef0ff" },
              { label: "Fase 1 — Build-readiness", status: "Filer klar", color: "#5ef0ff" },
              { label: "Fase 2 — Supabase backend", status: "Klar til kjøring", color: "#ffb547" },
              { label: "Fase 3 — PWA-wrap", status: "Venter på Fase 1-eksport", color: "rgba(255,255,255,0.45)" },
              { label: "Fase 4 — Capacitor APK + iOS", status: "Krever Mac + Android Studio", color: "rgba(255,255,255,0.45)" },
              { label: "Fase 5 — Pilot-kjøring", status: "Etter Fase 4", color: "rgba(255,255,255,0.45)" },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-3">
                <span className="text-white/75" style={{ fontSize: 12 }}>
                  {row.label}
                </span>
                <span
                  style={{
                    color: row.color,
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 10,
                    letterSpacing: "0.06em",
                  }}
                >
                  {row.status}
                </span>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>
    </SubScreen>
  );
}
