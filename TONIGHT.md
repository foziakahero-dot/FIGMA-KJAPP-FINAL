# APK i hendene i kveld — 3 steg

Supabase er allerede koblet til (`utils/supabase/info.tsx` har ekte keys).
Du trenger **null GitHub secrets** for første debug-APK.

## Steg 1 — Eksporter til GitHub (2 min)

I Figma Make øverst i UI-et: klikk **"Push to GitHub"** (eller "Export project").
Velg eller opprett repo `kjapp-app`. Vent til pushen er ferdig.

## Steg 2 — Vent på GitHub Actions (15–20 min)

Gå til ditt nye repo på github.com → fane **"Actions"**.
Workflow `Build web + Android APK` starter automatisk og gjør:
- Installerer dependencies
- Bygger Vite web-bundle
- Wrapper i Capacitor
- Bygger usignert debug-APK

Du ser en grønn ✓ når den er ferdig.

## Steg 3 — Last ned APK + installer (5 min)

I samme Actions-kjøring, scroll ned til **"Artifacts"** → last ned `kjapp-debug-apk.zip`.
Pakk ut → `app-debug.apk`.

**Overfør til Android-telefonen:**
- E-post den til deg selv, eller
- USB-overføring, eller
- Google Drive / Dropbox

**På telefonen:** Innstillinger → Sikkerhet → tillat installering fra ukjente kilder for filbehandleren din. Tap APK-en → installer → åpne KJAPP.

---

## Hva som fungerer i denne APK-en

- ✅ Alle 50+ skjermer
- ✅ Splash, signin, role-select
- ✅ Bestillings-flyt (kunde → sjåfør via Supabase)
- ✅ Lagring av steder, profil, settings (via Supabase KV)
- ✅ GDPR-pakke (samtykke, eksport, slett konto)
- ✅ Stedssøk (Google Places, hvis du har lagt inn `GOOGLE_MAPS_API_KEY` som Edge Function secret allerede)

## Hva som IKKE fungerer ennå (krever ekte kontoer)

- ❌ Ekte SMS — OTP-koden vises kun i Supabase logs (jeg kan vise hvordan)
- ❌ Ekte betaling (Stripe/Vipps mangler)
- ❌ BankID
- ❌ Push notifications (FCM ikke satt opp)

## iOS — neste steg etter Android virker

1. Skaff Apple Developer-konto ($99/år)
2. Følg `SECRETS.md` punkt 3 (iOS-secrets)
3. Trigg workflow `Build iOS (TestFlight)` manuelt fra Actions-fanen

---

## Hvis Actions-bygget feiler

Vanligste årsaker:
- **`pnpm install` feiler:** Sjekk at `pnpm-lock.yaml` ble med i eksporten. Hvis ikke, slett den så genererer CI ny.
- **TypeScript-feil:** Logg viser hvilken fil. Send meg feilen.
- **Gradle minne:** Sjelden i CI. Re-run jobben fra Actions-UI.
