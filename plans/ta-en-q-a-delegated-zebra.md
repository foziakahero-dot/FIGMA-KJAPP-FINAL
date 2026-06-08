# KJAPP — Veikart fra prototype til pilot til app-store

## Tillegg (denne runden): Design-system-oppgradering (Aurora 2.0)

### Context — hvorfor

Brukeren spør om en senior-designers gjennomgang av alle skjermer. Etter en codebase-audit er den ærlige diagnosen:

**Estetikken er sterk, men design-system-infrastrukturen er svak.** Aurora-glass-uttrykket er visuelt sammenhengende og teknisk pent utført (HolographicBackground, AuroraOrb, GlassPanel), men under panseret finnes ingen typeskala, ingen spacing-skala, ingen semantisk fargekontrakt, og ingen primitiv-komponenter. Konkret:

1. **Typografi-kaos:** font-size satt inline i 40+ filer med 11 ulike verdier (8/9/10/10.5/11/12/13/14/15/17/18/22). Line-height varierer fra 1.2 til 1.5 uten system. Space Grotesk lastet i 5 weights, men `font-display`-klassen setter ingen weight — faller til 400.
2. **Hardkodet farge-misbruk:** CSS-variabler (`--aurora-cyan` osv) finnes, men 60%+ av kode bruker literal hex (`#5ef0ff`, `rgba(94,240,255,0.15)`). Premium- og Light-temaet overstyrer kun ~20% av faktiske farge-referanser → temaene fungerer ikke skikkelig.
3. **Letter-spacing-anarki:** 6 ulike tracking-verdier (0.06em, 0.14em, 0.16em, 0.18em, 0.22em, 0.32em) blandes uten taksonomi.
4. **Glass-panel-overload:** alt fra hero-kort til chips bruker samme blur/border. Ingen hierarki (whisper / standard / hero).
5. **Spacing uten rutenett:** padding 10–24px og gap 2–12px ad-hoc. Ingen 4/8-px grid.
6. **Animasjons-monotoni:** alle blobs/kort har samme easeInOut + scale[1,1.15,1] over 4–15s. Ingen rytme-kontrast.
7. **Ingen primitiver:** ingen Button/Input/Badge/Label/Card. Hver skjerm bygger sin egen versjon. Hver skjerm har sin egen MenuRow/NavButton/Tab.

**Konsekvens:** appen ser bra ut nå, men hver ny skjerm tar dobbelt så lang tid å bygge konsistent, og tema-bytte (Premium/Light/Driver) er halvferdig.

### Mål

Bygg **Aurora 2.0** — en oppgradert design-system-infrastruktur, så implementer en visuell refresh **uten å miste den unike aurora-stilen**. Ikke et skifte til Material/Apple — KJAPP skal fortsatt være kjennetegnelig.

### Anbefalt tilnærming — 4 trinn

**Trinn 1: Tokens + primitiver (3–4 dager, ingen synlig endring)**
Bygg fundamentet. Ingen skjerm endres ennå.

- **Type-skala** i `src/styles/theme.css` som CSS-variabler:
  - `--text-display-xl` (28/32, 600), `--text-display-lg` (22/28, 600), `--text-display-md` (17/22, 500)
  - `--text-body-lg` (15/22, 400), `--text-body` (13/20, 400), `--text-body-sm` (11.5/16, 400)
  - `--text-mono-md` (11/14, 500, 0.16em), `--text-mono-sm` (9.5/12, 500, 0.22em), `--text-mono-xs` (8/10, 500, 0.28em)
  - Eksponer som Tailwind v4 `@theme`-tokens så vi kan bruke `text-display-lg` osv.
- **Spacing-skala**: 4/8/12/16/20/24/32/48 px som `--space-1`..`--space-8`. Forbud mot ad-hoc tall i nye komponenter.
- **Radius-skala**: 8/12/16/24/999 som `--radius-sm/md/lg/xl/full`.
- **Glass-hierarki**: tre nivåer `--surface-whisper` (blur 12px, alpha 4%), `--surface-standard` (blur 24px, alpha 8%), `--surface-hero` (blur 32px, alpha 12% + holo-border).
- **Motion-taksonomi**: `--ease-snap` (0.25 cubic-bezier(0.16,1,0.3,1)), `--ease-glide` (0.5 ease-out), `--motion-loop-slow/med/fast` (12s/6s/3s) — i stedet for at hver komponent ruller sin egen.
- **Primitiver** i `src/app/components/ui/`:
  - `<Text variant="display-lg" tone="primary|secondary|accent" mono>` — én komponent erstatter alle inline fontSize/letterSpacing
  - `<Button variant="primary|secondary|ghost" size="sm|md|lg" icon>` — erstatter all bespoke knapp-styling
  - `<Surface elevation="whisper|standard|hero" holo glow>` — erstatter GlassPanel og ad-hoc glass-divs
  - `<Badge tone="cyan|violet|amber|neutral">` — erstatter alle KJAPP+/Beta/online-chips
  - `<Field label icon>` — erstatter all skjema-input
  - `<Row icon label value chevron>` — erstatter alle MenuRow-varianter på tvers av skjermer
- **Codemod**: bygg et lite Node-script som finner `style={{ fontSize: X }}` og erstatter med riktig Text-variant. Kjør én gang, manuell QA.

**Trinn 2: Visuell refresh som beholder Aurora-DNA (1 uke)**
Med primitiver på plass kan vi heve estetikken uten kaos.

- **Editorial display-moment**: Instrument Serif (allerede lastet, ikke brukt) bringes inn på hero-tall — turpris, ETA-tid, opptjent dag. Stor serif på siffer + liten mono-label. Premium-følelse uten å bryte stil.
- **Mer luft, mindre glass**: gå fra "alt er glass-kort" til lag-hierarki: glass-hero (én per skjerm, max), glass-standard (lister, panels), whisper (chip, sekundære rader). Backgroundsblobs dempes 30% — mindre konkurranse med innholdet.
- **Skarpere typografi**: Space Grotesk får riktig weight (600 på display, 500 på buttons, 400 på body). Fix-tracking-bonanza erstattes av 3 verdier (mono-tight/std/wide).
- **Status-fargesystem**: cyan (aktiv/live), violet (premium/brand), amber (varsel), mint (suksess), magenta (kritisk). Konsistent på alle 50 skjermer — i dag er amber brukt både for "varsel" og "sjåfør-tema".
- **Mikro-detaljer som hever**: tabular-nums på alle tall (priser, ETA, klokkeslett); subtil 1px inner-shadow på primær-knapper (gir dybde uten å bli barokk); status-dots med ekte glow-falloff i stedet for box-shadow.
- **Bottom-nav redesign**: dagens 3-fane med glow-på-aktiv blir 4-fane (Reise / Aurora / Flåte / Profil) med "magic-line" indikator under aktiv ikon i stedet for stor glow. Mer iOS 17-lett.
- **Splash + signin polish**: KJAPP-logo får ett editorial display-moment (Instrument Serif "kjapp" lowercase + Space Grotesk caps under). Vipps-kort får tactile press-state.

**Trinn 3: Skjerm-for-skjerm pass (1 uke parallelt med trinn 4)**
50 skjermer i 5 grupper, ½ dag per gruppe:

1. **Onboarding+auth** (Splash, SignIn, Role, DriverAccess, DriverSignIn, BecomeDriver, LoyvehaverRegister) — sett editorial-tone, fjern overflødige animasjoner
2. **Kunde-kjerne** (Home, BookRide, TrackDriver, RideComplete, RideChat, History, Connect) — hero-typografi på pris/ETA, glass-hierarki
3. **Sjåfør-kjerne** (DriverHome, DriverRide, DriverTrips, DriverEarnings, DriverArrived, DriverChat) — amber-teme strammes opp, samme primitiver
4. **Innstillinger + sekundære** (Settings, Payment, Places, Support, Profile, alle Driver-settings) — Row-primitiv overalt, fjern bespoke MenuRow
5. **Spesial** (Aurora, Voice, ARPickup, Connect, RekkAvgangen, Fleet, SuperAdmin) — beholder unike uttrykk men på nye tokens

Hver gruppe får ett "før/etter"-screenshot-par i `docs/design-pass/`.

**Trinn 4: Tilgjengelighet + ytelse (2 dager)**
- **Kontrast-revisjon**: WCAG AA på all kropp-tekst mot glass-bakgrunn. Mange `text-white/55` på `rgba(8,10,24,0.5)` ligger under 4.5:1.
- **Reduced-motion**: HolographicBackground respekterer allerede `prefers-reduced-motion`, men de 40+ ad-hoc motion.div'ene gjør det ikke. Wrappes i `<AuroraMotion>` som leser én global flag.
- **Render-ytelse**: backdrop-filter blur er dyr på Android-WebView. Reduser fra blur(24px) til blur(16px) på `standard`-laget; hero-laget får beholde 24px.
- **Touch-targets**: minimum 44×44px på alle interaktive elementer. Codemod-sjekk.
- **Skjermlesere**: aria-label på alle ikon-bare knapper. Codemod-finn.

### Tids- og innsats-estimat

| Trinn | Innsats | Synlig endring |
|---|---|---|
| 1 — Tokens + primitiver | 3–4 dager | Ingen ennå |
| 2 — Visuell refresh-spec | 1 uke | Spec + 3–5 referanse-skjermer pusset |
| 3 — Skjerm-for-skjerm pass | 1 uke | Alle 50 skjermer på nytt system |
| 4 — A11y + ytelse | 2 dager | Subtil men målbar |
| **Sum** | **~3 uker** | Aurora 2.0 ferdig |

### Rekkefølge mot Fase 1/2-løpet

Kan kjøres **parallelt med Fase 2 (Supabase)** fordi de rører ulike filer (design = komponenter + styles, backend = data-hooks + edge functions). To strømmer, ingen merge-konflikt. Hvis tid er knapp: gjør **kun trinn 1 + trinn 4** før pilot (8 dager) — primitivene + a11y/ytelse er det som faktisk gjør produktet skalerbart. Trinn 2/3 (visuell refresh) kan komme post-pilot.

### Kritiske filer

**Opprettes:**
- `src/app/components/ui/Text.tsx`, `Button.tsx`, `Surface.tsx`, `Badge.tsx`, `Field.tsx`, `Row.tsx`, `Tabs.tsx`, `AuroraMotion.tsx`
- `src/styles/tokens.css` — alle nye tokens, importeres øverst i `theme.css`
- `scripts/codemod-inline-typography.mjs` — finn-erstatt-script for `style={{ fontSize }}` → `<Text variant>`
- `docs/design-pass/` — før/etter-screenshots per gruppe

**Endres:**
- `src/styles/theme.css` — utvides med tokens (ingen brytende endring i runde 1)
- `tailwind`/`@theme`-eksponering av tokens
- Trinn 3 berører alle 50 skjermer, men kun med søk-erstatt-mønster + Surface-bytte

**Beholdes urørt:**
- `HolographicBackground.tsx`, `AuroraOrb.tsx`, `HoloMap.tsx`, `LiveMap.tsx`, `CarMarker.tsx` — det visuelle DNA-et beholdes
- Alle skjermers logikk og routing

### Tillegg fra bruker: KJAPP-logo + tagline + intro-løft

**Tagline-bytte (overalt der den vises):**
- FRA: "smart ai taxi"
- TIL: **"en smartere måte å reise på"**
- Konkret fil-treff: `src/app/components/signin/KJAPPLogo.tsx`, `src/app/components/signin/GreetingHeader.tsx`, splash-skjerm, eventuelt footer. Søk-erstatt på "smart ai taxi" + varianter.

**KJAPP wordmark-redesign (alle skjermer):**
- Bytt fra Space Grotesk caps "KJAPP" til **custom-tegnet wordmark** med:
  - Editorial Instrument Serif lowercase "kjapp" som hovedform — premium signatur
  - Alternativt: Space Grotesk 700 i mixed-case "Kjapp" med ligatur mellom k+j og forlenget terminal på siste p
  - Tagline-linje under i tight mono caps `JETBRAINS MONO 9px / 0.32em tracking`: EN SMARTERE MÅTE Å REISE PÅ
- **Aurora-skimring i logoen**: subtilt cyan→violet gradient sveiper over wordmark hver 8. sekund (kun ved aktive skjermer, ikke i hvile)
- Komponent: `src/app/components/brand/Wordmark.tsx` med `size="hero|md|sm"` og `variant="display|inline|mono"` — én sannhetskilde, brukes overalt
- Alle gamle KJAPPLogo-treff erstattes — Splash, SignIn, footer, BottomNav-mini-versjon

**Intro/Splash — premium "wow" upgrade:**
Splash i dag: AuroraOrb + KJAPP-tekst + tap-to-continue. For tamt for et premium-produkt.

Ny intro-koreografi (3.5 sek total, kan skippes med tap):
1. **0.0–0.6s** — svart skjerm med subtilt grain. Én lyspartikkel materialiserer i sentrum (60fps)
2. **0.6–1.4s** — partikkelen ekspanderer til AuroraOrb med ekte 3D-rotasjon (CSS perspective + rotateY/rotateX). Aurora-flammer (4 conic-gradient lag) starter å sveipe rundt orben i ulik takt
3. **1.4–2.2s** — bakgrunnen "puster ut" → HolographicBackground fader inn med tilt-parallax (følger device-orientation om mulig)
4. **2.2–3.0s** — wordmark **"kjapp"** tegner seg bokstav-for-bokstav i Instrument Serif italic, hver bokstav fader inn med 80ms forsinkelse + svak motion-blur
5. **3.0–3.5s** — tagline "EN SMARTERE MÅTE Å REISE PÅ" fader inn under, lyspartikler drysser ned fra wordmark som stjernestøv (lett canvas-confetti, allerede installert)
6. **3.5s+** — subtilt "tap for å fortsette" pulserer; auto-progresjon om 2 sek

Mikro-detaljer som gir "wow":
- Norske aurora-fargene mappet til ekte fysisk-aurora-spektrum (mer grønn-cyan-violet, mindre rosa)
- Sub-tone "vri" i bakgrunnen: lavfrekvent gradient som lager følelse av "uendelig dyp natt"
- Haptisk feedback (Capacitor `Haptics.impact({ style: 'light' })`) ved logo-reveal og tap
- Lyd valgfritt: 1.2s ambient drone i lav volum (kan toggles av i innstillinger)

**Filer som berøres:**
- Ny: `src/app/components/brand/Wordmark.tsx`, `IntroChoreography.tsx`, `AuroraParticleField.tsx`
- Endres: `Splash.tsx` (ny koreografi), `SignIn.tsx` (Wordmark-bytte), `KJAPPLogo.tsx` (deprecate, alias til Wordmark for bakoverkompatibilitet)
- Søk-erstatt tagline-streng på tvers

### Forslag på spesifikke vinn-momenter (om jeg fikk velge 5)

1. **Pris-display**: i RideComplete, DriverEarnings, BookRide — bruk Instrument Serif på selve tallet (32–48px), mono caps på "NOK" og "MVA inkl." under. Dette ene grep løfter "ekte taxi-app"-følelsen mer enn noe annet.
2. **Tab-bar med magic-line**: erstatt active-glow med en thin animert linje under aktiv ikon (200ms spring). Mer raffinert.
3. **Auroras hvile-tilstand**: i dag puls-animerer AuroraOrb hele tiden. Roe den ned til pulser hvert 5. sek i hvile, så føles den mer "edru".
4. **Avatar-system**: i stedet for initiale i gradient-sirkel, generér en deterministisk aurora-mønster per bruker (samme bruker = samme mønster). Subtilt distinkt, premium.
5. **Skjema-input-redesign**: bytte fra glass-input til en "underline + floating-label" stil i `<Field>`-primitiv. Mer luft, lettere å lese på liten skjerm.

### Verifisering

- Etter trinn 1: ingen visuell regresjon (skjermbilder pixel-diff < 1%). Bundle-size +2–4kb for primitiver.
- Etter trinn 2: design-review med 3 referanse-skjermer (Home, BookRide, RideComplete) — sjekk hierarki, typografi, glass-balanse.
- Etter trinn 3: 50/50 skjermer migrert til primitiver. Grep `style={{ fontSize` skal returnere < 10 treff (kun spesial-tilfeller).
- Etter trinn 4: Lighthouse Mobile a11y-score ≥ 95. Reduced-motion + screen-reader-pass på 5 nøkkel-skjermer.

---

## Tillegg (forrige runde): Løyvehaver-onboarding + flåte-panel + super-admin

**Volum ved oppstart:** 10 egne løyver + 30 løyvehavere på venteliste. Dette er launch-volum, ikke pilot.

**Beslutning:** Mobil-låsen beholdes. Alt bygges som skjermer i KJAPP-appen, ingen separat desktop.

### A. SignIn — ny CTA "Ny løyvehaver?"
- Lenke under eksisterende login → ny rute `/loyvehaver/registrer`
- Egen visuell stil (KJAPP+ violet-aksent) for å skille fra kunde/sjåfør

### B. Registreringsskjema for løyvehaver (mobil, multi-step)
Skjermer under `/loyvehaver/registrer/*`:
1. **Bedrift**: orgnr (Brønnøysund-oppslag auto-fyll navn/adresse), kontakt-navn, mobil, epost
2. **Løyver**: liste med løyve-nr + tilknyttet bil (reg-nr, merke, modell, år, tier). N rader, "+ Legg til løyve"
3. **Dokumenter** (Storage-upload, RLS-beskyttet bucket `kjapp-private`):
   - Firmaattest (PDF/bilde)
   - Forsikringsbevis per bil
   - Kjøreseddel-grunnlag (om sjåfør = løyvehaver selv)
   - Bankkonto-bekreftelse / kontoutskrift med kontonr
4. **Utbetaling**: kontonr (11 siffer, MOD11-validering), kontohaver-navn
5. **Samtykke + send inn**: GDPR-samtykke, databehandler-info, "Send til godkjenning"

Inserter rad i ny tabell `loyvehaver_applications` (status='pending') + push til super-admin.

### C. Super-Admin-skjerm (kun deg, gated `profiles.role='super_admin'`)
- Liste over ventende søknader, badges på antall
- Detalj-view: dokument-preview (PDF/bilde inline), all søknadsdata
- **Bulk-godkjenning**: sveip-gjennom-modus for å klare 30 ventende på en kveld
- **CSV-import**: upload .csv med 30 ventende (orgnr, kontakt, mobil) → systemet SMS-er invitasjon til hver, de fullfører resten i appen
- **Dokument-utløp-dashboard**: tabell sortert på neste utløp (forsikring, kjøreseddel, firmaattest) — push 30/14/3 dager før
- Godkjenn → oppretter `fleets`-rad + setter `drivers.role='fleet_owner'` + sender push/SMS til søker
- Avslå → med begrunnelse, søker får SMS

### D. Flåte-panel for godkjent løyvehaver (mobil-fane i KJAPP)
Bunn-nav får ekstra "Flåte"-fane når `role='fleet_owner'`:
1. **Oversikt**: dagens omsetning, antall aktive sjåfører, antall biler online
2. **Løyver/biler**: liste med status (aktiv/forsikring-utløpt/EU-kontroll mangler), CRUD
3. **Sjåfører**: liste med stjerne/turer/online-status. "Inviter sjåfør" → SMS med deep-link til onboarding (forhåndsfylt med flåte-ID)
4. **Inntekter**: dag/uke/måned per bil + per sjåfør, MVA-spesifisert, CSV-eksport
5. **Dokumenter**: alle bil-dokumenter med utløpsvarsel

### E. Nye/utvidede tabeller (legges til de 16 i §2.2)
- `loyvehaver_applications` (id, orgnr, contact_name, contact_phone, contact_email, payout_iban, status enum[pending,approved,rejected], submitted_at, reviewed_at, reviewed_by_profile_id, reject_reason, raw_documents jsonb)
- `fleets` utvides: `owner_profile_id`, `payout_iban`, `payout_account_holder`, `firmaattest_url`, `firmaattest_valid_until`, `approved_at`, `approved_by_profile_id`
- `vehicles` utvides: `loyve_nr`, `insurance_doc_url`, `insurance_valid_until`, `eu_kontroll_valid_until`
- `profiles.role` utvides med `fleet_owner` og `super_admin`
- RLS: fleet_owner ser KUN egne fleets/vehicles/drivers/payments-aggregat; super_admin ser alt

### F. Eksterne integrasjoner (tillegg)
- **Brønnøysund Enhetsregisteret** (gratis åpent API): auto-fyll bedriftsnavn/adresse fra orgnr
- **Statens Vegvesen Kjøretøyopplysninger** (åpent API): auto-fyll bil-merke/modell/EU-kontroll fra reg-nr

### G. Kritiske filer (nye)
- `src/app/components/screens/LoyvehaverRegister.tsx` (multi-step wizard)
- `src/app/components/screens/LoyvehaverDocuments.tsx`
- `src/app/components/screens/FleetDashboard.tsx`
- `src/app/components/screens/FleetVehicles.tsx`
- `src/app/components/screens/FleetDrivers.tsx`
- `src/app/components/screens/FleetEarnings.tsx`
- `src/app/components/screens/SuperAdminInbox.tsx`
- `src/app/components/screens/SuperAdminApplicationDetail.tsx`
- `src/app/components/screens/SuperAdminDocumentExpiry.tsx`
- `src/app/components/screens/SuperAdminCsvImport.tsx`
- Edge functions: `supabase/functions/loyvehaver-submit`, `loyvehaver-approve`, `loyvehaver-reject`, `bronnoysund-lookup`, `vegvesen-lookup`, `loyvehaver-csv-import`, `document-expiry-cron`

### H. Verifisering
- Fra SignIn: tap "Ny løyvehaver?" → 5-stegs skjema → send inn → rad i `loyvehaver_applications` (status=pending)
- Du logger inn med super_admin-rolle → ser ventende i innboks → åpner detalj → godkjenner → søker mottar SMS + ny rolle aktivert
- Søker logger inn igjen → ser "Flåte"-fane → kan invitere sjåfør → sjåfør får SMS deep-link
- CSV-import: last opp .csv med 30 rader → 30 SMS sendes → hver mottaker klikker lenke → forhåndsfylt skjema-stega

### I. Rekkefølge (slottes inn i Fase 2)
1. Først `profiles` + roller (uke 1, allerede planlagt)
2. Så denne `loyvehaver_applications` + Super-Admin-inbox + CSV-import (½ uke ekstra)
3. Så `fleets`/`vehicles` utvidelser + FleetDashboard (½ uke ekstra)
4. Sjåfør-invitasjons-deep-link integreres i eksisterende DriverOnboarding (1 dag)

**Total Fase 2-tid: 3 uker → 4 uker** (justert opp 1 uke for løyvehaver-flyt).

---

## Context (denne runden)
Brukeren vil gå fra Figma Make-prototype til ekte app for pilot, og til slutt levere APK + iOS-binær via Expo. Spør hva riktige steg er.

Etter audit av kodebasen (data-laget + build-config):
- **47 skjermer** er bygd i React DOM + Tailwind v4 + Radix + MapLibre + Motion + Recharts.
- **All data er mock** (`mockData.ts`, `driverMockData.ts`, `useNearbyDrivers.ts`). Null backend. Null auth (kun UI-stub i `SignIn`/`DriverSignIn`/`DriverAccess`).
- **Build-blockere:** `__figma__entrypoint__.ts` er Figma Make-spesifikk, mangler `index.html`, `BrowserRouter` må byttes til `HashRouter` for native, `@mui/material` + `@mui/icons-material` (~30MB) er installert men **null importer i koden** (kan slettes).
- **Native-hodepine:** `maplibre-gl` brukes i 3 filer, `react-dnd-html5-backend` i 1, `canvas-confetti`/`react-slick`/`recharts` er DOM/canvas-baserte.

### Anbefalt strategi: **Capacitor for pilot, ikke Expo-rewrite**

Expo (React Native) krever omskriving av alle 47 skjermer (`<div>` → `<View>`, Tailwind → NativeWind, MapLibre → react-native-maplibre, Radix → React Native-ekvivalenter, Motion → Reanimated). Estimat: **3–6 ukers arbeid** før første APK.

Capacitor wrapper den eksisterende web-appen i en native shell (WKWebView på iOS, WebView på Android). Samme React-kode, samme komponenter, samme Tailwind. Estimat: **2–3 dager** til første APK + iOS TestFlight-build.

For pilot er Capacitor riktig valg: validér UX, datamodell og forretningsflyt FØRST med ekte brukere, og vurder Expo-rewrite kun hvis Capacitor faktisk faller på native ytelse eller app-store-krav. De fleste taxi-MVP-er ser ingen forskjell.

---

## Veikart — 6 faser, ca 4–6 uker til pilot live

### Fase 0 — QA-audit av alle 47 skjermer (1–2 dager)
**Mål:** Vite-fri liste over alt som er stub, dødt, eller halv-implementert.

For HVER skjerm i `src/app/components/screens/`: åpne, tap deg gjennom alle knapper, verifiser:
- Tilbakeknapp fungerer og går riktig sted
- Alle CTA-er navigerer eller har reell effekt (ikke `() => {}`)
- Scroll fungerer på langt innhold
- Mobil-viewport (375×812, 390×844, 414×896) renderer riktig
- Mørkmodus + safe-area-inset er respektert
- Skjema-input fungerer (ikke kun `<button>` der det bør være `<input>`)

Lever som markdown-sjekkliste med ✅/🟡/🔴 per skjerm. Fiks 🔴 før Fase 1.

### Fase 1 — Build-readiness for standard Vite (1 dag)
**Mål:** `pnpm build` produserer en deployerbar `dist/`-mappe uten Figma Make-runtime.

Filer:
- **Opprett `index.html`** i rot — standard Vite-entrypoint, importerer `/src/main.tsx`.
- **Opprett `src/main.tsx`** — `ReactDOM.createRoot().render(<RouterProvider router={router} />)`, importerer `styles/index.css`.
- **Vurder `__figma__entrypoint__.ts`** — la stå (Figma Make trenger den), men `vite.config.ts` skal ikke avhenge av den i produksjons-bygg.
- **Slett `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`** fra `package.json` (sparer ~30MB, ingen importer).
- **Bytt `createBrowserRouter` → `createHashRouter`** i `src/app/routes.tsx`. Hash-routing er kravet for `file://`-baserte WebViews (Capacitor).
- **Verifiser:** `pnpm build && pnpm exec vite preview` — appen kjører i nettleser på `localhost:4173` med alle 47 ruter.

### Fase 2 — Ekte backend: Supabase + Vipps + GDPR (utvidet — 2–3 uker)

**Bakgrunn for utvidelse:** Brukeren ba om "klar gjort for ekte backend, GDPR, ekte bestilling kunde→sjåfør, kvittering, live bil-tracking, OTP-innlogging, Vipps, alt en taxi app skal ha, retningslinjer, sikkerhet, API". Fase 2 utvides derfor fra "minimum-viable backend" til **produksjons-klar pilot-backend** med alt Norge-spesifikt på plass.

**Mål for fasen:** Erstatte 100% av mock-data med ekte Supabase-tabeller, koble Vipps for ekte betaling, implementere SMS-OTP-auth via norsk SMS-leverandør, oppfylle GDPR-krav (samtykke-logg, eksport, sletting), og legge en sikkerhets-perimeter (RLS, rate-limits, audit log) som tåler ekte brukere.

---

#### 2.1 Hosting + region
- **Supabase Project**: `kjapp-pilot` i **eu-north-1 (Stockholm)** — nærmest Norge, EU/EØS for GDPR
- **Plan**: Pro ($25/mnd) — kreves for daglige backups, custom domain, 8 GB DB
- **Custom domain**: `api.kjapp.no` peker på Supabase REST/Realtime endepunkt
- **Storage bucket**: `kjapp-private` (KYC-dokumenter, kvittering-PDF) med RLS-beskyttet tilgang

#### 2.2 Database-skjema (16 tabeller)

**Auth & profil**
- `profiles` (id PK = auth.users.id, role enum[customer,driver,both], full_name, phone, email, language default 'no', created_at, updated_at, deleted_at)
- `consent_log` (id, profile_id FK, consent_type enum[gdpr,location_share,marketing,...], version, granted_at, withdrawn_at, ip, user_agent) — GDPR audit trail
- `user_settings` (profile_id PK FK, theme, notifications_push, notifications_email, marketing_opt_in, default_payment_method_id, receipts_email)
- `saved_places` (id, profile_id FK, label, address, lng, lat, icon, sort_order, created_at)

**Kunde-flyt**
- `rides` (id, customer_id FK, driver_id FK nullable, vehicle_id FK nullable, tier enum[Eco,Standard,Premium,XL], status enum[requested,matched,accepted,driver_arrived,in_progress,completed,cancelled,rejected], pickup_lng/lat/address, destination_lng/lat/address, estimated_fare_nok, final_fare_nok, distance_km, duration_min, surge_multiplier, requested_at, matched_at, accepted_at, picked_up_at, completed_at, cancelled_at, cancel_reason, mva_percent default 12, mva_amount_nok)
- `ride_events` (id, ride_id FK, event_type enum, actor_profile_id FK, payload jsonb, at) — **append-only audit log**
- `ride_messages` (id, ride_id FK, sender_profile_id FK, body, created_at, read_at) — chat
- `ride_ratings` (id, ride_id FK unique, rater_profile_id FK, ratee_profile_id FK, stars 1-5, comment, created_at) — toveis

**Sjåfør & flåte**
- `drivers` (profile_id PK FK, kjøreseddel_id unique, kjøreseddel_valid_until, kjøreseddel_status enum[pending,active,suspended,expired], bankid_verified bool, fleet_id FK nullable, default_vehicle_id FK nullable, online_status enum[online,offline,busy], rating numeric, total_trips int, joined_at)
- `driver_locations` (driver_id PK FK, lng, lat, heading_deg, speed_kmh, updated_at) — **UPSERT hver 1.4s tick, broadcast via Realtime**
- `driver_sessions` (id, driver_id FK, started_at, ended_at, total_km, total_hours) — skift-tracking for arbeidstid + MVA
- `fleets` (id, name, orgnr unique, contact_phone, contact_email, address, created_at)
- `vehicles` (id, fleet_id FK nullable, plate unique, make, model, year, color, tier, capacity, accessibility_flags jsonb, inspection_valid_until, insurance_valid_until, registration_doc_url, active bool)
- `driver_documents` (id, driver_id FK, doc_type enum[license,kjøreseddel,insurance,background_check], file_url, uploaded_at, verified_at, expires_at)

**Betaling**
- `payment_methods` (id, profile_id FK, provider enum[vipps,apple_pay,google_pay,card,invoice], external_token, last4, vipps_msisdn, is_default, created_at, deleted_at)
- `payments` (id, ride_id FK unique, profile_id FK, payment_method_id FK, provider, provider_reference, amount_nok, currency default 'NOK', status enum[pending,authorized,captured,refunded,failed], captured_at, refunded_at, raw_response jsonb)
- `receipts` (id, ride_id FK unique, payment_id FK, pdf_url, html_body, mva_breakdown jsonb, issued_at, emailed_to) — Norge krever skriftlig kvittering med MVA-spesifikasjon (Bokføringsloven §10)

**Drift**
- `pricing_rules` (id, tier, base_fare_nok, per_km_nok, per_min_nok, night_multiplier, weekend_multiplier, valid_from, valid_until)
- `surge_zones` (id, zone_polygon geography, multiplier, valid_until, created_at) — PostGIS-basert
- `feedback` (id, profile_id FK, ride_id FK nullable, category, body, screenshot_url, created_at, resolved_at)
- `audit_log` (id, actor_profile_id, action, target_table, target_id, before jsonb, after jsonb, at) — admin-handlinger

#### 2.3 Row Level Security (RLS) — default-deny på alle tabeller

| Tabell | Customer | Driver | Service role |
|---|---|---|---|
| profiles | SELECT/UPDATE eget | SELECT/UPDATE eget | ALL |
| rides | INSERT + SELECT egne (customer_id=uid) | SELECT/UPDATE der driver_id=uid | ALL |
| ride_messages | SELECT/INSERT der ride.customer_id=uid | SELECT/INSERT der ride.driver_id=uid | ALL |
| driver_locations | SELECT alle hvor status=online (filter 5km PostGIS-radius) | UPSERT eget | ALL |
| payment_methods | SELECT/INSERT/DELETE eget | — | ALL |
| payments | SELECT eget via ride.customer_id | SELECT amount-felt via ride.driver_id | ALL |
| driver_documents | — | SELECT/INSERT eget | ALL |
| consent_log | SELECT eget, INSERT eget | SELECT eget, INSERT eget | ALL |

**Prinsipp:** Sjåfør får KUN se sin egen kunde i ride-rader hvor `driver_id=uid`. Kunde får aldri se andre sjåfører enn den matchet på deres aktive ride.

#### 2.4 Edge Functions (`supabase/functions/<name>/index.ts`, Deno)
1. **`request-ride`** — kunde requester tur. Validerer service-area, beregner estimat fra `pricing_rules × surge_zones`, inserter `rides` (status=requested), broadcaster offer til nærmeste 5 sjåfører innenfor 3km
2. **`accept-ride`** — sjåfør aksepterer. Optimistic lock: `UPDATE rides SET driver_id, status='accepted' WHERE id=? AND status='requested'`. Push til kunde
3. **`update-ride-status`** — driver_arrived / in_progress / completed. Append `ride_events`. På completed → trigger `capture-payment`
4. **`capture-payment`** (intern) — kaller Vipps eCom API capture, inserter `payments`, genererer `receipts` (PDF via Edge-side renderer), sender epost hvis `receipts_email=true`
5. **`vipps-callback`** (webhook) — verifiserer HMAC-signatur, oppdaterer `payments.status`
6. **`cancel-ride`** — kanselleringsgebyr hvis driver > 1km eller > 2min unna
7. **`send-otp`** + **`verify-otp`** — SMS-OTP via LinkMobility (norsk). Hash + 5-min TTL i `otp_codes`
8. **`bankid-init`** + **`bankid-callback`** — Signicat-integrasjon, kun for sjåfør-KYC, lagrer ikke fnr (kun verified-flag)
9. **`gdpr-export`** — joiner alle bruker-tabeller, returnerer signed download-URL til JSON-arkiv i Storage
10. **`gdpr-delete`** — soft-delete profiles (30-dagers grace), hard-delete payment_methods + driver_documents, anonymiserer rides+payments (regnskaps-plikt 5 år)
11. **`nightly-payouts`** (CRON 03:00) — aggregerer dagens `payments` per sjåfør, oppretter payout-rad

#### 2.5 Realtime channels
- **`driver-locations`** (broadcast) — sjåfør publiserer hver 1.4s; kunde abonnerer filtrert på 5km radius. **Erstatter `useNearbyDrivers` med samme `{drivers, status}`-retur-shape — ingen UI-endring**
- **`ride:{rideId}`** (postgres_changes) — kunde + sjåfør abonnerer på `rides` + `ride_events`-endringer
- **`messages:{rideId}`** (postgres_changes) — chat
- **`driver-offers:{driverId}`** (broadcast) — tur-tilbud med 30-sek countdown

#### 2.6 Eksterne integrasjoner

**Vipps (betaling)**
- Konto: Vipps Bedrift (krever orgnr); API: vipps eCommerce v2 (developer.vippsmobilepay.com)
- Flow: Ved `update-ride-status: completed` → `initiatePayment` med Vipps Direct Capture
- Webhook signatur (HMAC-SHA256) verifiseres på `vipps-callback`
- Test-miljø: Vipps test-API + test-MSISDN under utvikling
- Vipps holder kort-data → PCI-scope minimal for oss; vi har MVA-rapporterings-ansvar

**SMS-OTP (LinkMobility)**
- Norsk leverandør, bedre delivery i Norge enn Twilio; sender-id "KJAPP"
- Krever Brønnøysund-orgnr ved oppretting
- Fallback Twilio hvis LinkMobility-onboarding tar > 1 uke

**BankID (sjåfør-KYC)**
- Signicat (lettest onboarding) eller Criipto (billigere ved lav volum)
- Returnerer navn + fnr → vi lagrer KUN verified-flag, aldri fnr
- Brukes for å validere kjøreseddel + bakgrunnssjekk; Statens Vegvesen API krever søknad

**Geocoding + ruting (Kartverket + Mapbox)**
- Adresse-søk: **Kartverket Stedsnavn-API** (gratis, norsk)
- Routing/ETA: **Mapbox Directions** for pilot ($0.50/1000 req); bytt til selv-hosted OSRM ved volum
- Reverse geocoding: Kartverket adresse-API

**Push notifications**
- FCM (Android, gratis) + APNs (iOS, krever Apple Developer-konto $99/år)
- Capacitor-plugin `@capacitor/push-notifications` abstraherer begge
- Edge function `send-push({profileId, title, body, data})`

#### 2.7 GDPR-checklist (norsk taxi-pilot)
1. **Samtykke ved opprettelse** — `consent_log` med checkbox-tekst + versjon. Versjon endres ⇒ re-samtykke
2. **Personvernerklæring** — `/legal/privacy` rute, norsk tekst basert på Datatilsynet.no-mal
3. **Databehandler-avtaler** — Supabase (standard EU DPA), Vipps, LinkMobility, Signicat, Mapbox
4. **Data-eksport** — `gdpr-export` edge function, knapp i Settings → "Last ned mine data"
5. **Sletting** — Settings → "Slett konto" → bekreftelse → soft-delete (30-dagers grace) → hard-delete. Rides + payments anonymiseres men beholdes 5 år (Bokføringsloven)
6. **Data-minimering** — fødselsnummer ALDRI lagret; kun nødvendige felt
7. **Retention policy** — driver_locations: 30 dager; ride_messages: 90 dager; rides: 5 år anonymisert
8. **Personvernombud (DPO)** — utnevnes ved > 250 brukere eller systematisk overvåking (sjåfør-tracking teller). Ekstern DPO ~3000 NOK/mnd
9. **Brudd-rapportering** — 72-timers melding til Datatilsynet. Lag intern runbook
10. **Barn under 16** — BankID-alder-sjekk; krev foresattes samtykke under 16

#### 2.8 Sikkerhets-perimeter
- RLS på alle tabeller (over)
- Service role JWT kun i Edge Functions, aldri eksponert i klient
- Per-bruker rate limits via Edge Function (10 ride-requests/min, 5 OTP/time)
- Webhook HMAC-signatur verifisering (Vipps)
- TLS 1.3 end-to-end; Supabase native AES-256 ved hvile
- Secrets i Supabase Vault (Vipps-key, LinkMobility-key, FCM-key) — **aldri** i env-filer som havner i git
- `audit_log`-tabell for alle admin-handlinger
- Sjåfør-app: 4-sifret PIN ved app-start (hindrer "venstre-tap → tilgang til kunde-data")
- App-attest / SafetyNet (Capacitor-plugin) for å oppdage rooted/jailbroken klienter

#### 2.9 Migrasjons-strategi (mock → ekte, én entitet av gangen)
Pattern per entitet (~½ dag): lag `src/app/data/supabase/use<Entity>.ts` med samme retur-shape som mock-hooken → bytt import i berørte skjermer én etter én → slett mock når alle skjermer er migrert. Appen er kjørbar gjennom hele migrasjonen.

Rekkefølge (entitet → skjermer låst opp):
1. `profiles` + `user_settings` → Profile, Settings
2. `saved_places` → SavedPlaces
3. `payment_methods` (UI-stub for Vipps) → Payment
4. `rides` + `request-ride` + `accept-ride` + Realtime → BookRide, TrackDriver, DriverHome, DriverTripRequest
5. `driver_locations` + Realtime (bytter `useNearbyDrivers` intern simulering) → Home, DriverOnlineMap
6. `ride_messages` + Realtime → RideChat
7. `update-ride-status` + `capture-payment` + Vipps live → DriverTripActive, DriverTripComplete, RideComplete, receipts
8. `drivers` + `vehicles` + `driver_documents` + BankID → DriverOnboarding, DriverVehicleSelect
9. `ride_ratings` → post-trip rating
10. `feedback`, `consent_log`, `audit_log`, `pricing_rules` → restene

#### 2.10 Nye filer + endrede filer

**Opprettes**
- `supabase/` (Supabase CLI prosjekt) — `config.toml`, `migrations/*.sql`, `functions/<name>/index.ts`, `seed.sql`
- `src/app/data/supabase/client.ts` — Supabase JS klient, singleton
- `src/app/data/supabase/use<Entity>.ts` — én fil per entitet
- `src/app/data/supabase/realtime.ts` — wrapper rundt channel-subscriptions
- `src/app/lib/auth.ts` — login/logout/OTP-flow
- `src/app/lib/vipps.ts` — klient-side init av Vipps-flow
- `src/app/components/screens/PrivacyPolicy.tsx`, `TermsOfService.tsx`, `DataExport.tsx`
- `src/app/components/AuthGate.tsx` — wrapper som dytter til /signin hvis ikke innlogget
- `.env.local` — `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` (kun anon, aldri service)
- `legal/personvernerklaering.md`, `legal/bruksvilkar.md`, `legal/databehandleravtale-template.md`

**Endres**
- `package.json` — `@supabase/supabase-js`
- Alle skjermer som importerer fra `mockData.ts` / `driverMockData.ts` — bytt til Supabase-hooks (samme retur-shape)
- `useNearbyDrivers.ts` — intern simulering ⇒ Realtime-subscription, behold ekstern API-form
- `routes.tsx` — legg til `/legal/*` ruter + AuthGate på beskyttede ruter
- `App.tsx` — wrap RouterProvider med AuthProvider

**Slettes (etter migrasjon)**
- `src/app/data/mockData.ts`, `src/app/data/driverMockData.ts`

#### 2.11 Tidsplan (2–3 uker fokusert arbeid)
- **Uke 1**: Supabase prosjekt + migrations + RLS + auth + OTP; profiles/saved_places/payment_methods migrert
- **Uke 2**: rides + ride_events + driver_locations + Realtime; Vipps test-miljø; chat
- **Uke 3**: Receipts + capture-payment + GDPR-flows + BankID sjåfør + legal-sider + audit log

#### 2.12 Eksplisitt UTENFOR scope for Fase 2
- Skatteetaten SAF-T integrasjon (manuell eksport fra `payments` for pilot)
- Multi-tenant fleet-admin-panel (én sjåfør per innlogging; fleet-admin via Supabase Studio for pilot)
- Aurora AI med ekte LLM (fortsatt scripted)
- Internasjonalisering (kun norsk)
- CarPlay / Android Auto
- Loyalty-program (KJAPP+ kun UI-stub)
- Forhåndsbetaling før tur (alltid post-pay via Vipps Direct Capture)

#### 2.13 Forhåndsbetingelser brukeren må skaffe (blocking)
- [ ] **Vipps Bedrift-konto** + orgnr → API-keys (kan ta 1-2 uker å få godkjent)
- [ ] **LinkMobility-konto** (eller godta Twilio som fallback)
- [ ] **Signicat eller Criipto BankID-konto** (kun nødvendig før Uke 3)
- [ ] **Mapbox-konto** med API-key (gratis under 50k req/mnd)
- [ ] **Apple Developer-konto** ($99/år, for APNs + iOS-bygg i Fase 4)
- [ ] **Firebase-prosjekt** for FCM (gratis)
- [ ] **Datatilsynet-meldeplikt vurdering** — sjåfør-tracking + ride-historikk kan utløse DPIA

#### 2.14 Verifisering per uke
**Uke 1 ferdig når:**
- Logg inn med eget norsk mobilnummer via SMS-OTP → profil opprettes i Supabase
- Endre profil-navn i Settings → persisterer på tvers av reload
- Legg til "Hjem"-adresse i SavedPlaces → vises i lista neste app-åpning

**Uke 2 ferdig når:**
- Kunde requester tur fra BookRide → Edge function returnerer estimat → rad i `rides` (status=requested)
- Sjåfør i DriverHome ser pop-up tur-tilbud → aksepterer → `rides.status=accepted`
- Begge ser hverandres posisjon live i TrackDriver/DriverRide (1.4s tick) via Realtime
- Trykk "Avslutt tur" på DriverTripActive → Vipps test-MSISDN trekkes → `payments`-rad oppdateres via webhook

**Uke 3 ferdig når:**
- Kunde ser kvittering med MVA-spesifikasjon i RideComplete + mottar epost
- Sjåfør gjennomfører BankID-flyt → `drivers.bankid_verified=true`
- Bruker klikker "Last ned mine data" → mottar JSON-arkiv med alle egne rader
- Bruker klikker "Slett konto" → soft-delete + 30-dagers ventetid
- Personvernerklæring + bruksvilkår synlige fra Settings → Legal

### Fase 3 — PWA-wrap (1 dag, parallelt med Fase 2)
**Mål:** Første brukere kan "install to home screen" fra Safari/Chrome før APK er klar.

- `pnpm add -D vite-plugin-pwa workbox-window`
- Konfigurer plugin i `vite.config.ts` med `registerType: "autoUpdate"`.
- Lag `public/manifest.webmanifest` med navn, ikoner (192/512 px PNG), theme-color matchende KJAPP-stilen, `display: "standalone"`.
- Generér ikoner fra en kjapp SVG-logo (kan bruke `pwa-asset-generator`).
- Deploy `dist/` til Vercel eller Netlify (gratis, krever ingen kort for hobby/pilot).
- Pilot-URL: `kjapp.vercel.app` eller egen domene.

### Fase 4 — Capacitor for APK + iOS (2–3 dager)
**Mål:** Native binær for Google Play intern test + Apple TestFlight.

**Installer:**
```
pnpm add @capacitor/core @capacitor/cli
pnpm add @capacitor/android @capacitor/ios
pnpm add @capacitor/geolocation @capacitor/push-notifications @capacitor/status-bar @capacitor/splash-screen @capacitor/preferences
pnpm exec cap init "KJAPP" "no.kjapp.app" --web-dir=dist
pnpm exec cap add android
pnpm exec cap add ios
```

**Konfigurasjon:**
- `capacitor.config.ts` — definér app-id (`no.kjapp.app`), splash-skjerm (aurora-gradient), status-bar (mørk).
- Bytt `localStorage` til `@capacitor/preferences` for cross-platform persistens (kun `kjapp.theme` og `kjapp.driver.navApp` finnes — trivielt).
- Geolocation: bytt mock `OSLO_CENTER` til ekte `Geolocation.getCurrentPosition()` ved app-start.
- Push: Supabase Edge Function sender push via FCM (Android) / APNs (iOS) når en sjåfør aksepterer en tur.

**Bygg:**
- Android: `pnpm build && pnpm exec cap sync android && pnpm exec cap open android` → Android Studio bygger signed APK/AAB.
- iOS: krever Mac + Xcode + Apple Developer-konto ($99/år). `cap open ios` → Xcode bygger arkiv → upload til App Store Connect → TestFlight.

**Native-hodepiner å løse:**
- **MapLibre i WebView:** WebGL fungerer i WKWebView/Chrome WebView, så `LiveMap` bør virke i Capacitor. Hvis ikke: fall tilbake til hybrid SVG-versjon (allerede levert i forrige runde) — den krever ingen WebGL.
- **`react-dnd-html5-backend`:** Sjekk om aktuelle skjerm trenger drag-drop på touch. Hvis ja, bytt til `react-dnd-touch-backend`.
- **`canvas-confetti`:** Fungerer i WebView, ingen endring.

### Fase 5 — Pilot-kjøring (2–4 uker)
**Mål:** Validér med ekte brukere før noen videreutvikling.

- **10–20 kunder + 5–10 sjåfører** i Oslo (rekrutter via venner/Facebook).
- **Telemetri:** `posthog-js` eller Sentry for crash-rapporter + brukerflyt. (`pnpm add posthog-js @sentry/react`.)
- **Feedback-kanal:** in-app "send tilbakemelding" → Supabase-tabell `feedback`.
- **Daglig stand-up med deg selv:** hvilke bugs, hvilke confused brukere, hvilke flyter blir aldri brukt.
- **Iterér i prod:** Capacitor live-update via `@capgo/capacitor-updater` (eller bare push ny TestFlight/Play Internal-build hver uke).

### Fase 6 — Vurdér Expo-rewrite (KUN hvis nødvendig, post-pilot)
**Mål:** Vurder om Capacitor er godt nok, eller om vi må over til ekte React Native.

Tegn på at Expo-rewrite trengs:
- Native ytelse merkbart dårlig (60 fps ikke holdbart)
- App-store-avvisning (sjelden for Capacitor, men kan skje)
- Behov for dyp native-integrasjon (CarPlay, Android Auto, Apple Pay native UI, etc.)
- Behov for offline-modus med komplekse native bakgrunnsjobber

Hvis ja: planlegg som egen større runde. Estimat 3–6 uker. Hold backend (Supabase) urørt — kun frontend skrives om.

---

## Kritiske filer (gjennom hele veikartet)

**Opprettes:**
- `index.html` (Vite-entrypoint)
- `src/main.tsx`
- `public/manifest.webmanifest` + PWA-ikoner
- `capacitor.config.ts`
- `src/app/data/supabase/client.ts` + `src/app/data/supabase/*.ts` (en fil per tabell-hook)
- `android/`, `ios/` (auto-generert av `cap add`)

**Endres:**
- `package.json` — slett MUI, legg til Supabase + Capacitor + PWA
- `vite.config.ts` — legg til PWA-plugin
- `src/app/routes.tsx` — `createBrowserRouter` → `createHashRouter`
- Alle hooks/skjermer som importerer fra `mockData.ts` — bytt til Supabase-hooks gradvis
- `src/app/lib/theme.ts`, `src/app/lib/navigation.ts` — `localStorage` → `Preferences`

**Slettes (eller flagges som unused):**
- `@mui/material`, `@mui/icons-material`, `@emotion/*` (ingen importer)
- Eventuelt `react-slick` hvis ikke brukt (verifiser)

**Beholdes som i dag:**
- `__figma__entrypoint__.ts` — Figma Make trenger den; produksjons-build bruker `index.html`
- `src/styles/*`, alle eksisterende komponenter, alle 47 skjermer

---

## Eksplisitt UTENFOR scope for denne pilot-runden
- **Expo / React Native-rewrite** — vurderes kun etter pilot, kun hvis nødvendig
- **Faktisk betalingsbehandling** (Stripe, Vipps API) — UI vises, men `payment.status = "pending"` settes manuelt for pilot
- **Skatteetaten/MVA-integrasjon** — sjåfør-rapporter vises som mock
- **CarPlay, Android Auto** — out of scope for pilot
- **Aurora AI med ekte LLM** — bruker fortsatt scripts/`auroraResponses` mock; ekte Claude-integrasjon vurderes post-pilot
- **Internasjonalisering** — KUN norsk for pilot

---

## Verifisering per fase
- **Fase 0:** Markdown-sjekkliste med 47 rader, alle ✅ eller 🟡 (ingen 🔴).
- **Fase 1:** `pnpm build` ferdig uten feil, `pnpm exec vite preview` viser alle ruter, `/home` → `/book` → `/track` → `/complete`-flyt fungerer.
- **Fase 2:** Logg inn med ekte telefonnummer via SMS-OTP. Bestill tur. Verifiser at en rad opprettes i `rides`-tabellen og status-events strømmer via Realtime.
- **Fase 3:** Åpne pilot-URL på iPhone Safari → "Legg til på Hjem-skjerm" → ikon dukker opp → starter i standalone-modus.
- **Fase 4:** Installer signed APK på fysisk Android-telefon. Bestill tur, motta push når sjåfør aksepterer. Samme på iOS TestFlight.
- **Fase 5:** 50+ ekte turer gjennomført, krasj-rate < 1%, NPS ≥ 30 fra pilot-brukere.

---

# Historikk: tidligere runder

## Tidligere runde: Premium bil-markører + zoom/pan på kart

## Context (denne runden)
Hybrid-løsningen (HoloMap SVG + projiserte HTML-markører) fungerer — kartet er synlig, søkefeltet skrivbart, panelet skroller. Men brukeren sier bil-markørene ser **billige** ut og at man bare ser ett lite område av Oslo. Trenger to ting:

1. **Premium bil-markører** — minst 3× høyere kvalitet. Dagens markør (`CarMarker.tsx`) er 28×28 px med flat rect-body, statisk glow, ingen reelt biluttrykk. Skal bli en detaljert top-down luksusbil-illustrasjon med dybde, frontlys-glow, ekte vinduer, hjul, og status-aware rim-light.
2. **Zoom-knapper på kartet** — `+` og `−` knapper øverst til høyre over kartet. Skal zoome inn/ut på Oslo-visningen slik at brukeren kan se mer enn ett område. Trenger også pan (drag).

Resten av planen under er forrige (allerede levert) for historikk.

---

## Endringer denne runden

### 1. Nytt premium `CarMarker.tsx`
**Fil:** `src/app/components/CarMarker.tsx` (erstatt eksisterende SVG-innhold)

- Øk størrelse fra 28×28 til **44×44 px** (synlig forskjell uten å overta kartet).
- Bytt fra flat rect → ekte top-down luksusbil med:
  - **Karosseri** med radial-gradient skygge (mørkere ved sider, lysere på taket → 3D-følelse).
  - **Vindusparti** delt i front-glass + bak-glass (to separate paths med tonet glass-overlay), midt-stag mellom dem.
  - **Frontlys** (to lyse halvellipser) med `filter: drop-shadow` for ekte lys-glow i kjøreretningen.
  - **Baklys** (to røde/oransje punkter).
  - **Hjul** synlige i fire hjørner som mørke ellipser med subtil høylys-rand.
  - **Sidespeil** som små vinger.
- **Status-rim** (cyan/amber/grå) som glødende ring rundt hele karosseriet via SVG `feGaussianBlur`-filter, ikke bare en stroke. Tier-farge subtilt i karosseri-tint (Eco grønnaktig, Premium hvit-perle, XL stålgrå).
- **Bevegelses-puls**: en sakte pulserende cirkel (3 s `animate`) bak bilen for "live" feel.
- **ETA-chip** redesigned: mindre, mer typografisk premium (JetBrains Mono, tighter padding, mikro-glow-border).
- Eksisterende `createCarMarkerElement` / `updateCarMarkerElement` API beholdes så `LiveMap.tsx` ikke trenger endringer.

### 2. Zoom + pan på `LiveMap.tsx`
**Fil:** `src/app/components/LiveMap.tsx`

- Wrappe `<HoloMap />` og markør-laget i et felles `<div>` med `transform: scale(${zoom}) translate(${panX}px, ${panY}px)` og `transformOrigin: "50% 50%"`.
- Lokal state: `zoom` (default 1, range 0.7–2.5), `pan` (default {x:0, y:0}).
- **Zoom-knapper** øverst til høyre (z-index over markør-laget): to runde glass-knapper med `+` og `−`. Klikk endrer zoom med faktor 1.25/0.8. Knapp for "reset" (kompass-ikon) som setter zoom=1, pan={0,0}.
- **Pan**: pointer-down → pointer-move → oppdater pan-state. Pointer-up frigjør. Begrens pan slik at kartet ikke kan dras helt ut av synsfeltet.
- Wheel-zoom (mus) som bonus — bruk `onWheel` med `e.preventDefault()`.
- Pinch-zoom for touch (to fingre): bruk `pointerdown`/`pointermove` med to aktive pointers og beregn distance-ratio.
- **Viktig:** Markør-projeksjonen er prosent-basert mot containeren, så zoom/pan på wrapperen tar markørene med automatisk. Ingen endring i projeksjon-matten.

### 3. Justeringer på `HoloMap.tsx` for å støtte zoom uten å bli pikselert
**Fil:** `src/app/components/HoloMap.tsx`

- Allerede `viewBox`-basert SVG, så zoom via CSS-transform skalerer skarpt. Eneste behov: legg til `vectorEffect="non-scaling-stroke"` på vei-paths slik at de ikke blir tynne pinner ved zoom-out (eller tykke ved zoom-in). Ingen andre endringer.

---

## Kritiske filer

**Endres:**
- `src/app/components/CarMarker.tsx` — full redesign av SVG-innholdet, API uendret
- `src/app/components/LiveMap.tsx` — wrap i zoomable container + zoom/pan-controls
- `src/app/components/HoloMap.tsx` — kun `vectorEffect` på paths

**Beholdes urørt:**
- `useNearbyDrivers.ts`, `types.ts`, alle skjermer (`Home`, `BookRide`, `TrackDriver`, `DriverRide`)

---

## Eksplisitt UTENFOR scope
- Ekte tile-basert kart (vurderes når sandbox-tilgang er bekreftet)
- Routing-engine, geolocation
- Animasjon av bil mellom heading-rotasjoner ut over enkel CSS-transition
- Driver-side kart (uendret)

---

## Verifisering
1. `/home` — bil-markørene ser umiddelbart mer premium ut: synlig karosseri-form, vinduer, frontlys-glow i kjøreretningen, status-rim som faktisk lyser.
2. Tap `+` knappen → kartet zoomer inn jevnt, biler vokser ikke i px (de er HTML-elementer over) men kommer nærmere hverandre når mer detalj synes.
3. Tap `−` → zoomer ut, ser hele bounding-boxen.
4. Dra på kartet → panner. Slipp → står stille.
5. Tap reset → tilbake til default visning.
6. Trackpad/scroll-wheel zoomer (desktop).
7. To-finger-pinch zoomer (mobil preview).
8. `/book`, `/track`, `/driver/ride` — markørene som vises der har samme nye look.

---

# Historikk: tidligere runder

## Forrige runde: Fiks Home (synlig kart, skrivbart søkefelt, skrollbart panel)

## Context
Forrige runde introduserte `LiveMap` (MapLibre + CartoDB raster) for å erstatte den statiske `HoloMap`-SVG-en. Etter deploy ser brukeren tre problemer på `/home`:

1. **Kartet er usynlig.** MapLibre initialiseres, men ingenting tegnes. Mest sannsynlig årsak: Figma Make sin preview-iframe blokkerer enten WebGL eller eksterne raster-tile-hosts (CSP `connect-src`/`img-src`). Ingen feil bobler opp fordi MapLibre svelger init-feil stille. Bytte av tile-host (OpenFreeMap → CartoDB Voyager) løste ikke problemet, noe som peker på at det ikke er tile-host som er roten — det er sandboxen som ikke tillater eksterne kart-ressurser.
2. **"Hvor skal du?" er en `<button>`** (`Home.tsx:279`) som navigerer til `/book` ved tap. Brukeren forventet et ekte inputfelt der man kan begynne å skrive en destinasjon direkte.
3. **Bunnpanelet skroller ikke** (`Home.tsx:234`). Det har `overflowY: auto` men mangler `touchAction: pan-y` og `WebkitOverflowScrolling: touch`, så touch-gester på iOS/preview-iframe blir spist av de absolutt-posisjonerte søsken-lagene over.

Målet med denne runden: gjøre `/home` brukbart igjen — et synlig kart, et fungerende søkefelt, og et skrollbart panel — uten å være avhengig av eksterne kart-tjenester som sandboxen kan blokkere.

---

## Endringer

### 1. Bytt MapLibre-tile-strategi til en som garantert renderes i sandboxen
**Fil:** `src/app/components/LiveMap.tsx`

Vi kan ikke stole på at WebGL + ekstern tile-CDN fungerer i Figma Make preview. Vi går derfor over til en **hybrid-strategi**:

- **Base-laget** blir den eksisterende `HoloMap` SVG-en (kjent god, alltid synlig, aurora-stil).
- **Live bil-markør-laget** legges som absolutt-posisjonerte HTML-divs oppå SVG-en, med posisjoner beregnet via en enkel **lng/lat → x/y mercator-projeksjon** mot SVG-ens viewBox (0..390 × 0..500).
- Bilene beveger seg fortsatt (data fra `useNearbyDrivers`), har heading-rotasjon, status-farge, og ETA-chip — alt det som var poenget med oppgraderingen.

Resultatet: brukeren ser et synlig Oslo-aktig kart med biler som faktisk glir rundt. Vi mister ekte gate-rendering og pan/zoom, men det er en akseptabel pris for noe som faktisk **fungerer** i preview-miljøet. Når vi senere bekrefter at sandboxen tillater WebGL + tiles (eller flytter til produksjons-bygg), kan vi swap'e tilbake til full MapLibre uten å røre `useNearbyDrivers` eller `CarMarker`-API-et.

Konkret:
- `LiveMap` rendrer `<HoloMap />` som bunn-lag (uten `availableCars`-prop — den brukes ikke lenger).
- Over SVG-en: en `<div className="absolute inset-0">` med én absolutt-posisjonert `CarMarker`-HTML-element per `driver`.
- Projeksjonsfunksjon: lineær mapping fra Oslo-bounding-box (`10.71..10.80` lng, `59.895..59.940` lat) til SVG-koordinater `0..390 × 500..0` (lat er invertert). Holder seg innenfor `46svh`-zonen via container-padding.
- `showRoute` + `showCar` faller fortsatt på `HoloMap`s eksisterende SVG-rute-rendering (allerede god nok for prototype).

### 2. Gjør "Hvor skal du?" skrivbart
**Fil:** `src/app/components/screens/Home.tsx` (linje 279–288)

- Bytt `<button>` til `<input type="text" placeholder="Hvor skal du?" />`.
- `onFocus` eller første `onChange` → `go("book")` (slik at brukeren havner i BookRide for full destinasjons-UI). Verdien videreføres ikke ennå — det krever en URL-param i BookRide som vi tar i en separat runde.
- Behold lupe-ikon og Aurora-orb til høyre.
- Sørg for at `<input>` har `background: transparent, border: none, outline: none, color: white` og samme `fontSize: 14` for å matche eksisterende look.

### 3. Fiks panel-skroll
**Fil:** `src/app/components/screens/Home.tsx` (linje 234, "LAYER 10")

Legg til på det skrollbare panelet:
- `touchAction: "pan-y"` — eksplisitt tillater vertikal touch-skroll, hindrer at preview-iframe-en hijacker gesten.
- `WebkitOverflowScrolling: "touch"` — momentum-scroll på iOS WebKit.
- `overscrollBehavior: "contain"` — hindrer at scroll lekker til parent-frame.

### 4. Verifiser at Bottom-nav ikke blokkerer touch
**Fil:** `src/app/components/BottomNavigation.tsx` (les først)

Sjekk at den ikke har `pointerEvents: all` på et større område enn nødvendig — kun selve nav-pillen skal være interaktiv. Hvis det er en full-bredde transparent wrapper, sett `pointerEvents: none` på wrapper og `pointerEvents: auto` på pillen.

---

## Kritiske filer

**Endres:**
- `src/app/components/LiveMap.tsx` — bytt fra MapLibre-canvas til HoloMap + projisert HTML-markør-lag
- `src/app/components/screens/Home.tsx` — input-felt, touch-action på panel
- `src/app/components/BottomNavigation.tsx` — verifiser/fiks pointer-events

**Beholdes urørt:**
- `src/app/data/useNearbyDrivers.ts` — driver-simulering trenger ingen endring
- `src/app/data/types.ts`
- `src/app/components/CarMarker.tsx` — HTML-markør-fabrikken kan brukes som-er
- `src/app/components/HoloMap.tsx` — blir nå produksjons-base, ikke kun debug
- `BookRide.tsx`, `TrackDriver.tsx`, `DriverRide.tsx` — bruker fortsatt `LiveMap` med samme props

**Slettes ikke ennå:**
- MapLibre-pakken og css-importen lar vi stå — billig, og vi kan swappe tilbake når sandboxen er verifisert.

---

## Eksplisitt UTENFOR scope
- Ekte gate-rendering / pan-zoom (krever WebGL + tilgang til tile-CDN i preview-miljøet)
- Forhåndsutfyll BookRide-destinasjon fra Home-søket (egen runde med URL-param)
- Supabase Realtime
- Endringer på sjåfør-skjermer (DriverHome, DriverOnlineMap, etc.) — disse er ikke berørt av problemene over

---

## Verifisering
1. Åpne `/home` i Figma Make preview.
2. **Kart synlig:** Du ser stilisert Oslo-kart (fjord + distrikter + veier). På toppen: 8–10 bil-ikoner som beveger seg jevnt med ~1.4 s tick, med heading-rotasjon og cyan/amber status-farge. ETA-chip på de tre nærmeste ledige bilene.
3. **Søkefelt:** Tap "Hvor skal du?" → tastatur dukker opp. Skriv én bokstav → navigerer til `/book`.
4. **Skroll:** Dra opp fra panelet → hele suggestions-listen scroller jevnt i preview-iframe. Bottom-nav forblir festet nederst.
5. **Ingen regresjoner:** `/book`, `/track`, `/driver/ride` viser fortsatt kart + rute (uendret).
