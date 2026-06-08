# src/main.tsx (lim inn ved eksport)

Filename: `src/main.tsx`

```tsx
import { StrictMode } from "react";
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
```

## Etter at du har lagt inn denne filen
1. Slett `__figma__entrypoint__.ts` fra prosjekt-roten (Figma Make-spesifikk)
2. Kjør `pnpm install`
3. Kjør `pnpm dev` for å verifisere lokalt
4. Kjør `pnpm build` for å produsere `dist/`-mappe
