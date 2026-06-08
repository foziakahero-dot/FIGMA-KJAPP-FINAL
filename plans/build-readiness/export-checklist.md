# Eksport-sjekkliste: fra Figma Make til deployerbar app

Følg disse stegene **i rekkefølge** etter at du har eksportert prosjektet fra Figma Make til ditt eget Git-repo.

## 1. Initiell oppsett (10 min)
- [ ] Klon repoet lokalt: `git clone <din-url> && cd <repo>`
- [ ] Installer Node.js 20+ og pnpm: `npm i -g pnpm`
- [ ] Kjør `pnpm install`

## 2. Legg til Vite-entrypoint (5 min)
- [ ] Opprett `index.html` i prosjekt-rot (se `index.html.md` for innhold)
- [ ] Opprett `src/main.tsx` (se `main.tsx.md` for innhold)
- [ ] Slett `__figma__entrypoint__.ts` fra rot
- [ ] Verifiser: `pnpm dev` → åpne `http://localhost:5173` → splash-skjerm vises

## 3. Bytt router for native-kompatibilitet (2 min)
- [ ] Rediger `src/app/routes.tsx` per `routes-hashrouter.md`
- [ ] Verifiser: `pnpm dev` → URL endres til `localhost:5173/#/home` etc.

## 4. Verifiser produksjons-bygg (3 min)
- [ ] Kjør `pnpm build`
- [ ] Ingen feil i output, `dist/`-mappe opprettet
- [ ] Kjør `pnpm exec vite preview` → naviger gjennom alle hoved-flyter

## 5. PWA-wrap (1 dag — Fase 3)
- [ ] `pnpm add -D vite-plugin-pwa workbox-window`
- [ ] Legg PWA-plugin i `vite.config.ts` med `registerType: "autoUpdate"`
- [ ] Opprett `public/manifest.webmanifest` + ikoner (192/512 px)
- [ ] Deploy til Vercel: `pnpm dlx vercel`

## 6. Capacitor for APK + iOS (2–3 dager — Fase 4)
- [ ] `pnpm add @capacitor/core @capacitor/cli`
- [ ] `pnpm add @capacitor/android @capacitor/ios`
- [ ] `pnpm add @capacitor/geolocation @capacitor/push-notifications @capacitor/status-bar @capacitor/splash-screen @capacitor/preferences`
- [ ] `pnpm exec cap init "KJAPP" "no.kjapp.app" --web-dir=dist`
- [ ] `pnpm exec cap add android` (krever Android Studio)
- [ ] `pnpm exec cap add ios` (krever Mac + Xcode + Apple Developer-konto)
- [ ] Bytt `localStorage.getItem("kjapp.theme")` → `Preferences.get({ key: "kjapp.theme" })` i `src/app/lib/theme.ts`
- [ ] Bytt `localStorage.getItem("kjapp.driver.navApp")` → `Preferences.get(...)` i `src/app/lib/navigation.ts`
- [ ] Bygg: `pnpm build && pnpm exec cap sync android && pnpm exec cap open android`

## 7. Pilot (Fase 5)
- [ ] Installer Sentry: `pnpm add @sentry/react` + init i `main.tsx`
- [ ] Installer PostHog: `pnpm add posthog-js` + init
- [ ] Distribuér Android APK via Google Play Internal Testing
- [ ] Distribuér iOS via TestFlight
- [ ] Rekrutter 10–20 kunder + 5–10 sjåfører i Oslo
- [ ] Kjør 2–4 uker; sample minst 50 ekte turer

## Estimat
- Steg 1–4: **1 dag** (web-deployerbar versjon)
- Steg 5: **1 dag** (PWA install-to-home)
- Steg 6: **2–3 dager** (native binær — krever Mac for iOS)
- Steg 7: **2–4 uker** (pilot-validering)

**Total: 4–6 uker fra eksport til pilot live.**
