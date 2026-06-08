# KJAPP — EAS Build Setup

## Steg 1: Lag Expo-konto
Gå til https://expo.dev og opprett en gratis konto.

## Steg 2: Hent EXPO_TOKEN
1. Gå til https://expo.dev/accounts/[din-bruker]/settings/access-tokens
2. Klikk "Create token"
3. Gi den navn: `KJAPP-github`
4. Kopier tokenet

## Steg 3: Legg token i GitHub
1. Gå til https://github.com/foziakahero-dot/FIGMA-KJAPP-FINAL/settings/secrets/actions
2. Klikk "New repository secret"
3. Name: `EXPO_TOKEN`
4. Value: lim inn tokenet fra Expo

## Steg 4: Koble EAS til prosjektet
Kjør lokalt (eller be en utvikler gjøre det):
```bash
npm install -g eas-cli
eas login
eas init
```

## Steg 5: Bygg APK
Gå til GitHub → Actions → "EAS Build (APK/iOS)"
- Klikk "Run workflow"
- Platform: `android`
- Profile: `preview`
- Klikk "Run workflow"

APK-filen lastes opp til expo.dev og kan lastes ned direkte!

## Byggetider
- Android APK (preview): ~5-10 min
- iOS IPA: ~15-20 min (krever Apple Developer-konto $99/år)
