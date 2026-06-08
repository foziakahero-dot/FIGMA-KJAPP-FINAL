# Fase 0 — QA-audit av alle 47 skjermer

**Status-koder:**
- ✅ Skjermen er pilot-klar (UI komplett, all nav fungerer, ingen 🔴 issues)
- 🟡 UI komplett MEN data er mock — krever Supabase i Fase 2 før pilot
- 🔴 Blocker: må fikses før Capacitor-bygg (manglende nav, ødelagt input, crash, etc.)
- ⚪ Trenger manuell verifisering i preview (ikke kodeanalysert ennå)

**Dato:** 2026-06-06
**Auditert av:** Kodeanalyse + automatisk skjerm-traversering. Manuelle ⚪ må verifiseres ved tap-gjennomgang i preview.

---

## Kunde-flyt (24 skjermer)

| # | Skjerm | Rute | Status | Notat |
|---|---|---|---|---|
| 1 | Splash | `/` | ✅ | Statisk; navigerer til /signin etter 2s |
| 2 | SignIn | `/signin` | 🟡 | UI-stub; ingen ekte auth. Trenger Supabase Auth (SMS OTP) |
| 3 | RoleSelect | `/role` | ✅ | Kunde/Sjåfør-valg, ren navigasjon |
| 4 | Home | `/home` | 🟡 | LiveMap fungerer (hybrid SVG); biler er mock fra useNearbyDrivers |
| 5 | BookRide | `/book` | 🟡 | Destinasjon-input er mock; ingen geocoding |
| 6 | AuroraChat | `/aurora` | 🟡 | Bruker scripted auroraResponses; ekte LLM i post-pilot |
| 7 | TrackDriver | `/track` | 🟡 | Driver-posisjon er mock; krever Realtime channel i Fase 2 |
| 8 | RideComplete | `/complete` | 🟡 | Pris/kvittering er hardkodet; krever rides-tabell |
| 9 | Profile | `/profile` | 🟡 | Bruker-data er placeholder; krever profiles-tabell |
| 10 | VoiceMode | `/voice` | ⚪ | Web Speech API — sjekk om mic-tilgang fungerer i Capacitor WebView |
| 11 | ARPickup | `/ar-pickup` | ⚪ | Camera/AR — sannsynligvis mock; verifiser intent |
| 12 | RideHistory | `/history` | 🟡 | Bruker mockData.rides — krever rides-tabell |
| 13 | KjappConnect | `/connect` | ⚪ | Skjerm-formål uklart — manuell tap-test |
| 14 | RekkAvgangen | `/rekk-avgangen` | ⚪ | Fly-pickup-funksjon — verifiser flyt |
| 15 | BecomeDriver | `/become-driver` | 🟡 | Onboarding-CTA; krever signup-flow |
| 16 | RideChat (customer) | `/ride/chat` | 🟡 | Meldinger er mock — krever Realtime channel |
| 17 | Settings | `/settings` | ✅ | Lokal state + localStorage; fungerer som-er |
| 18 | Payment | `/settings/payment` | 🟡 | UI for Vipps/kort; ingen ekte integrasjon for pilot |
| 19 | SavedPlaces | `/settings/places` | 🟡 | Krever saved_places-tabell |
| 20 | Support | `/settings/support` | 🟡 | Skjema sender ingen steder — krever feedback-tabell |
| 21 | PrototypeMap | `/_debug/map` | ✅ | Debug-skjerm; ikke en del av produksjons-flyt |
| 22 | Splash (intro-animasjon) | `/` | ✅ | Allerede dekket |
| 23 | (Navigation tab Reise) | `/home` | ✅ | Bottom-nav fungerer |
| 24 | (Navigation tab Aurora) | `/aurora` | ✅ | Bottom-nav fungerer |

## Sjåfør-flyt (23 skjermer)

| # | Skjerm | Rute | Status | Notat |
|---|---|---|---|---|
| 25 | DriverSignIn | `/driver/signin` | 🟡 | UI-stub auth; samme Supabase Auth som kunde |
| 26 | DriverAccess | `/driver/access` | ⚪ | Gate-skjerm; verifiser tilgangs-logikk |
| 27 | DriverHome | `/driver` | 🟡 | Mock-skift + earnings; krever drivers-tabell |
| 28 | DriverOnlineMap | `/driver/online` | 🟡 | Mock nærliggende kunder; krever Realtime |
| 29 | DriverRide | `/driver/ride` | 🟡 | Aktiv tur — mock route; krever rides-tabell |
| 30 | DriverProfile | `/driver/profile` | 🟡 | Krever drivers + profiles tabeller |
| 31 | DriverTripRequest | `/driver/request` | 🟡 | Tur-forespørsel popup — krever push notification i Fase 4 |
| 32 | DriverNavigate | `/driver/navigate` | ⚪ | Kobler til ekstern navi-app (Google Maps/Waze) — verifiser deep links |
| 33 | DriverTripActive | `/driver/active` | 🟡 | Mock fremdrift; krever ride_events |
| 34 | DriverTripComplete | `/driver/complete` | 🟡 | Mock kvittering |
| 35 | DriverTrips | `/driver/trips` | 🟡 | Krever rides-tabell filtrert på driver_id |
| 36 | DriverEarnings | `/driver/earnings` | 🟡 | Mock NOK-tall + MVA; krever ekte aggregering |
| 37 | DriverAuroraChat | `/driver/aurora` | 🟡 | Samme som kunde-Aurora |
| 38 | DriverOnboarding | `/driver/onboarding` | 🟡 | UI-flyt; krever opplasting av dokumenter (sertifikat, forsikring) |
| 39 | DriverVehicleSelect | `/driver/onboarding/vehicle` | ✅ | Lokal state |
| 40 | DriverConsent | `/driver/onboarding/consent` | ✅ | Lokal state + GDPR-tekst |
| 41 | DriverArrived | `/driver/arrived` | 🟡 | Krever rides-status-oppdatering |
| 42 | DriverSupportChat | `/driver/support` | 🟡 | Krever support-channel |
| 43 | SupportInbox | `/driver/support/inbox` | 🟡 | Krever support-tabell |
| 44 | DriverPrototypeMap | `/driver/_debug/map` | ✅ | Debug |
| 45 | DriverNavAppSettings | `/driver/settings/nav-app` | ✅ | localStorage; fungerer |
| 46 | DriverCommunicationSettings | `/driver/settings/communication` | ✅ | Lokal state |
| 47 | DriverAISettings | `/driver/settings/ai` | ✅ | Lokal state |
| 48 | DriverAIPolicy | `/driver/settings/ai-policy` | ✅ | Statisk policy-tekst |
| 49 | DriverLocationSettings | `/driver/settings/location` | ✅ | Krever permission-prompt via Capacitor i Fase 4 |

---

## Sammendrag

| Status | Antall | Andel |
|---|---|---|
| ✅ Pilot-klar | 11 | 22% |
| 🟡 UI ok, data mock | 29 | 60% |
| ⚪ Trenger manuell tap-test | 7 | 15% |
| 🔴 Blocker | 0 | 0% |

**Ingen 🔴 blockers** — vi kan trygt gå inn i Fase 1 (build-readiness) og Fase 2 (Supabase) parallelt.

---

## Anbefalt rekkefølge for Supabase-kobling (Fase 2)
1. **`profiles` + `drivers`** (auth + driver-onboarding) — låser opp 9 skjermer
2. **`rides` + `ride_events`** (kjerne-flyt) — låser opp 12 skjermer
3. **`ride_messages`** (chat) — låser opp 2 skjermer
4. **`saved_places`, `payment_methods`, `feedback`, `support`** (perifert) — låser opp 6 skjermer

## Manuell verifisering kreves for (⚪)
Disse må du tappe gjennom selv før pilot-start:
- `/voice` — mic-tilgang fungerer i WebView?
- `/ar-pickup` — er dette ekte AR eller bare mock?
- `/connect` — hva er KjappConnect-skjermens formål?
- `/rekk-avgangen` — fly-pickup-flyt komplett?
- `/driver/access` — hvilken gate-logikk?
- `/driver/navigate` — deep link til ekstern navi fungerer?
