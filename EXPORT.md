# KJAPP — Eksport fra Figma Make til APK/iOS

Denne guiden tar deg fra Figma Make-prosjektet til en signert APK + iOS TestFlight-build via Capacitor.

## 0. Forhåndsbetingelser (skaff dette først)

- [ ] GitHub-konto + tomt repo `kjapp-app`
- [ ] Node 20+ og pnpm 9+ lokalt
- [ ] Android Studio (siste stabile)
- [ ] Mac med Xcode 15+ (kun for iOS)
- [ ] Apple Developer-konto ($99/år, kun for iOS)
- [ ] Firebase-prosjekt (gratis, for FCM push)
- [ ] Supabase prosjekt-URL + anon-key (har du allerede)

## 1. Eksporter koden ut av Figma Make

I Figma Make: "Export project" → last ned ZIP. Pakk ut, push til GitHub. Klon lokalt.

```bash
git clone git@github.com:DITT-BRUKERNAVN/kjapp-app.git
cd kjapp-app
pnpm install
```

## 2. Legg til Vite-entrypoint (filene Figma Make blokkerer)

**Opprett `index.html` i rot:**

```html
<!doctype html>
<html lang="no">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no" />
    <meta name="theme-color" content="#04060f" />
    <title>KJAPP</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**Opprett `src/main.tsx`:**

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

**Slett Figma Make-runtime:**
- `__figma__entrypoint__.ts` (rot) — slett
- `vite.config.ts` — fjern eventuelle Figma Make-plugins, behold kun `@vitejs/plugin-react` + `@tailwindcss/vite`

**Verifiser:** `pnpm build && pnpm exec vite preview` → åpne `http://localhost:4173/#/home` → appen kjører.

## 3. Miljøvariabler

Opprett `.env.local` (gitignore):

```
VITE_SUPABASE_URL=https://DITT-PROSJEKT.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

Oppdater `src/utils/supabase/info.tsx` til å lese fra `import.meta.env`.

**ALDRI** legg service-role-key her — kun anon-key. Service-role hører hjemme i Supabase Edge Functions secrets (`supabase secrets set`).

## 4. Capacitor-wrapping

```bash
pnpm add @capacitor/core @capacitor/cli
pnpm add @capacitor/android @capacitor/ios
pnpm add @capacitor/geolocation @capacitor/push-notifications \
        @capacitor/status-bar @capacitor/splash-screen @capacitor/preferences \
        @capacitor/haptics @capacitor/app

pnpm exec cap init "KJAPP" "no.kjapp.app" --web-dir=dist
pnpm exec cap add android
pnpm exec cap add ios
```

**`capacitor.config.ts`:**

```ts
import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "no.kjapp.app",
  appName: "KJAPP",
  webDir: "dist",
  backgroundColor: "#04060f",
  plugins: {
    SplashScreen: {
      launchShowDuration: 1200,
      backgroundColor: "#04060f",
      androidSplashResourceName: "splash",
      showSpinner: false,
    },
    StatusBar: { style: "DARK", backgroundColor: "#04060f" },
  },
  android: { allowMixedContent: false },
  ios: { contentInset: "always" },
};
export default config;
```

## 5. Migrer `localStorage` → `@capacitor/preferences`

KJAPP bruker localStorage to steder (theme, navApp, consent). Bytt til `Preferences` for native-persistens:

```ts
import { Preferences } from "@capacitor/preferences";
await Preferences.set({ key: "kjapp.theme", value: "dark" });
const { value } = await Preferences.get({ key: "kjapp.theme" });
```

Behold localStorage som fallback for web.

## 6. Bygg + kjør

**Android (APK):**
```bash
pnpm build
pnpm exec cap sync android
pnpm exec cap open android
# I Android Studio: Build → Generate Signed Bundle/APK
```

**iOS (TestFlight):**
```bash
pnpm build
pnpm exec cap sync ios
pnpm exec cap open ios
# I Xcode: Product → Archive → Upload to App Store Connect
```

## 7. Sikkerhets-checklist før publisering

- [ ] `.env.local` i `.gitignore` — bekreft før første push
- [ ] Service-role-key kun i Supabase Vault, aldri i appen
- [ ] OpenAI/Vipps/Stripe-keys kun som Supabase Edge Function secrets
- [ ] RLS aktivert på alle SQL-tabeller (når du går fra KV → SQL)
- [ ] App-attest / SafetyNet aktivert via Capacitor-plugin
- [ ] App Store + Play Store: kobbel personvernerklæring (`https://kjapp.no/legal/privacy`)
- [ ] Datatilsynet: vurder DPIA-plikt (sjåfør-tracking trigger sannsynligvis)

## 8. Det som fortsatt er mock og må migreres før reell pilot

Se `plans/`-mappa for full liste. Hovedsaker:
- Stripe/Vipps end-to-end (capture-payment + kvittering)
- Driver location realtime (i dag KV-poll)
- Ride messages chat
- BankID KYC for sjåfør
- Mapbox/Kartverket ekte adressedata

Capacitor-shellen kan bygges først; mock-data skiftes ut bit for bit uten ny APK-publisering så lenge web-laget oppdateres.
