# routes.tsx: bytt til HashRouter for Capacitor

Capacitor pakker appen som `file://`-baserte assets i en WebView. `BrowserRouter` (HTML5 history API) krever en server som svarer 200 på alle ruter — det finnes ikke i en WebView. `HashRouter` bruker `#/path`-prefiks som fungerer i `file://`.

## Endring i `src/app/routes.tsx`

**Linje 1 — bytt import:**

```diff
- import { createBrowserRouter, Outlet, useNavigate } from "react-router";
+ import { createHashRouter, Outlet, useNavigate } from "react-router";
```

**Linje 105 — bytt factory:**

```diff
- export const router = createBrowserRouter([
+ export const router = createHashRouter([
```

Ingen andre endringer trengs. Alle 47 ruter forblir intakte. URL-formen endres fra `https://app.com/home` til `https://app.com/#/home` — Capacitor og PWA fungerer med begge.

## Hvis du vil beholde BrowserRouter for web-deploy
Lag begge og velg ved bygg-tid:

```tsx
import { createBrowserRouter, createHashRouter } from "react-router";
const factory = import.meta.env.VITE_USE_HASH === "1" ? createHashRouter : createBrowserRouter;
export const router = factory([ /* ... */ ]);
```

Sett deretter `VITE_USE_HASH=1` ved Capacitor-bygg, og la default-en være BrowserRouter for Vercel/Netlify.
