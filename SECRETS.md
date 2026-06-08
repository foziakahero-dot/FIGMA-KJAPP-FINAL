# KJAPP — GitHub Secrets sjekkliste

Lim inn disse i **GitHub → Settings → Secrets and variables → Actions → New repository secret**.

Du trenger ikke alle på dag én — grupperingen viser hva som trengs til hvilken workflow.

---

## 1. Minimum for web-bygg + Android APK (`build-web.yml`)

| Secret | Hvor du finner den | Påkrevd |
|---|---|---|
| `SUPABASE_URL` | Supabase Dashboard → Settings → API → "Project URL" | ✅ |
| `SUPABASE_ANON_KEY` | Supabase Dashboard → Settings → API → "anon public" key | ✅ |
| `ANDROID_KEYSTORE_BASE64` | Generer lokalt (se nedenfor), `base64 -i kjapp.keystore` | ⚠️ kun for signert APK |
| `ANDROID_KEYSTORE_PASSWORD` | Passordet du satte ved keytool-generering | ⚠️ |
| `ANDROID_KEY_ALIAS` | f.eks. `kjapp` | ⚠️ |
| `ANDROID_KEY_PASSWORD` | Samme som keystore-passord normalt | ⚠️ |

**Generer Android keystore (én gang lokalt):**
```bash
keytool -genkey -v -keystore kjapp.keystore -alias kjapp \
  -keyalg RSA -keysize 2048 -validity 10000
base64 -i kjapp.keystore | pbcopy   # mac
# Lim inn i ANDROID_KEYSTORE_BASE64
```
**Lagre `kjapp.keystore` trygt (1Password/Bitwarden) — mister du den kan du aldri mer publisere oppdateringer til samme Play-app.**

---

## 2. Supabase auto-deploy (`deploy-supabase.yml`)

| Secret | Hvor | Påkrevd |
|---|---|---|
| `SUPABASE_ACCESS_TOKEN` | `supabase.com/account/tokens` → "Generate new token" | ✅ |
| `SUPABASE_DB_PASSWORD` | Du satte den da du opprettet prosjektet (eller resett i Settings → Database) | ✅ |
| `SUPABASE_PROJECT_REF` | URL-en `https://xxxx.supabase.co` → `xxxx`-delen | ✅ |

### Edge Function secrets (settes via workflow, brukes inni serveren)

| Secret | Når | Hvor |
|---|---|---|
| `GOOGLE_MAPS_API_KEY` | Allerede i bruk (places/directions) | Google Cloud Console → APIs → Credentials |
| `STRIPE_SECRET_KEY` | Når Stripe kobles | Stripe Dashboard → Developers → API keys → "Secret key" |
| `STRIPE_WEBHOOK_SECRET` | Når Stripe webhook konfigureres | Stripe → Webhooks → endpoint → "Signing secret" |
| `VIPPS_CLIENT_ID` | Når Vipps kobles | portal.vippsmobilepay.com → "Test/Production keys" |
| `VIPPS_CLIENT_SECRET` | Samme | Samme |
| `VIPPS_SUBSCRIPTION_KEY` | Samme | Samme |
| `VIPPS_MERCHANT_SERIAL` | Samme | Samme |
| `OPENAI_API_KEY` | Når Aurora AI får ekte LLM | platform.openai.com → API keys |
| `LINKMOBILITY_USERNAME` | Når ekte SMS-OTP kobles | LinkMobility-kontoen din |
| `LINKMOBILITY_PASSWORD` | Samme | Samme |

---

## 3. iOS TestFlight (`build-ios.yml`)

Kun nødvendig når du publiserer iOS — krever Apple Developer-konto ($99/år).

| Secret | Hvor |
|---|---|
| `IOS_DIST_CERT_BASE64` | Eksporter Distribution-cert fra Keychain Access som `.p12`, `base64 -i cert.p12` |
| `IOS_DIST_CERT_PASSWORD` | Passordet du satte ved `.p12`-eksport |
| `IOS_PROVISIONING_PROFILE_BASE64` | Last ned fra developer.apple.com → Profiles, `base64 -i profile.mobileprovision` |
| `IOS_KEYCHAIN_PASSWORD` | Velg fritt — bare brukt internt i CI-keychain |
| `APPSTORE_API_KEY_ID` | App Store Connect → Users and Access → Keys → "Key ID" |
| `APPSTORE_API_ISSUER` | Samme side → "Issuer ID" |
| `APPSTORE_API_KEY_BASE64` | Last ned `.p8`-fil der, `base64 -i AuthKey_XXXX.p8` |

---

## 4. Hva som ALDRI skal være i secrets eller koden

- ❌ **Supabase service-role key** — den hører hjemme KUN i Supabase Vault, brukes kun av Edge Functions internt
- ❌ Brukerfødselsnummer
- ❌ Vipps brukernes MSISDN (lagres som referanse av Vipps selv)
- ❌ Apple ID-passordet ditt (bruk App-Store Connect API-key i stedet)

---

## 5. Engangs-oppsett-rekkefølge

1. Opprett tom GitHub-repo `kjapp-app` (privat)
2. Eksporter prosjekt fra Figma Make → unzip → `git init && git push`
3. Opprett Supabase-prosjekt (Free eller Pro) i region `eu-north-1`
4. Lim inn `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_ACCESS_TOKEN`, `SUPABASE_DB_PASSWORD`, `SUPABASE_PROJECT_REF`, `GOOGLE_MAPS_API_KEY` i GitHub Secrets
5. Push til `main` → `deploy-supabase.yml` kjører migrasjoner + Edge Function automatisk
6. Push til `main` → `build-web.yml` lager web-bundle + APK-artefakt (uten signing fungerer det også, kun debug-APK)
7. Generer Android keystore (kommando over), legg inn 4 ANDROID_-secrets → neste push lager signert release-APK
8. Når klar for iOS: skaff Apple Developer-konto → følg iOS-secrets-blokken → trigger `build-ios.yml` manuelt

Etter steg 5–6 har du **kontinuerlig deploy**: hver push til `main` oppdaterer Supabase + bygger APK uten manuelt arbeid.
