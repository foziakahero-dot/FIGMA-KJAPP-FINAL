Her er svarene mine for KJAPP-oppsettet:

FORRETNING & JURIDISK

1. Orgnr + selskapsnavn
   Foreløpig bruker vi:

NexoraHub AS
Org.nr: 914 827 442
Prosjekt/produktnavn: KJAPP

KJAPP AS er ikke opprettet ennå. For Vipps Bedrift, LinkMobility, Supabase-fakturering og Stripe kan vi starte med NexoraHub AS, så lenge dette er juridisk riktig for pilotfasen. Hvis det blir krav om eget selskap senere, kan vi opprette KJAPP AS etterpå.

2. Vipps eller Stripe?
   Jeg ønsker helst begge på sikt.

Prioritet:

* Vipps først for norske kunder hvis onboarding og API-oppsett går raskt.
* Stripe som backup og for rask test/pilot, siden Stripe allerede er under oppsett.
* Betalingsarkitekturen bør bygges fleksibelt slik at appen kan støtte både Vipps og Stripe senere.

For pilot kan vi starte med Stripe test mode hvis det er raskest. Men for norsk marked ønsker jeg Vipps som hovedbetaling etter hvert.

KJAPP skal ta 10% plattformprovisjon per betalte tur. Persontransport-MVA skal håndteres som 12% MVA. Pris til kunde bør behandles som MVA-inkludert, med mindre vi bestemmer noe annet med regnskapsfører.

3. GDPR / DPO
   Vi har ikke utnevnt formell DPO/personvernombud ennå.

Min beslutning:

* For pilot: lag nødvendig GDPR-grunnlag, personvernerklæring, databehandleroversikt og DPIA-utkast.
* Vi kan ha intern ansvarlig først, men jeg ønsker anbefaling om ekstern DPO/personvernrådgiver før større lansering.
* Ikke bygg funksjoner som samler unødvendige persondata.
* Ikke aktiver kalender/Spotify-historikk eller lignende datainnsamling i MVP uten eksplisitt samtykke og separat vurdering.

4. Datatilsynet DPIA
   DPIA er ikke ferdig laget.

Vi trenger hjelp til:

* DPIA-utkast for KJAPP
* Behandlingsprotokoll
* Beskrivelse av GPS-sporing
* Lagringstid for ride history
* Rollefordeling mellom KJAPP, løyvehaver, sjåfør og kunde
* Tiltak for dataminimering, tilgangsstyring og sletting

Dette må være klart før større pilot/release.

API-KEYS / KONTOER

5. OpenAI-konto for Aurora AI
   OpenAI-konto/API finnes eller skal settes som backend secret.

Viktig:

* OpenAI API-key må aldri ligge i frontend, APK, Expo public env eller GitHub frontend code.
* Den må kun ligge i Supabase Edge Functions/backend secrets.

Modellvalg:

* For pilot: bruk billig og rask modell som gpt-4o-mini eller tilsvarende kostnadseffektiv OpenAI-modell.
* For mer kompliserte support- eller beslutningsoppgaver kan vi senere bruke en smartere modell.
* Aurora AI skal i MVP kun håndtere chat/voice-booking, support, ride status, enkle forslag og sjåførassistent.
* Ikke koble Aurora til kalender, Spotify, historikk eller sensitive datakilder i første versjon.

6. Google Maps Platform
   Trenger hjelp / må bekreftes.

Vi trenger:

* Maps for visning av kart
* Places/address autocomplete for pickup/destination
* Directions/Routes for ETA/ruting

Jeg er åpen for Google Maps først hvis det er raskest og mest stabilt. Alternativt kan Mapbox/MapLibre vurderes hvis kostnad blir høy.

For MVP/pilot:

* Bruk enkleste stabile kartløsning.
* Ikke bygg egen turn-by-turn navigation.
* Sjåførappen kan åpne ekstern navigasjon i Google Maps / Apple Maps / Waze.
* Appen bør fortsatt vise pickup/destination og live status internt.

7. Stripe-konto
   Stripe-konto er under oppsett i test/sandbox mode.

Vi trenger hjelp til:

* Test keys
* PaymentIntent / PaymentSheet
* Webhook
* Supabase Edge Function
* Payment status i Supabase
* 10% plattformprovisjon per tur
* 12% MVA-beregning
* Senere Stripe Connect for løyvehaver/fleet payout

Ikke aktiver live mode før test er fullført.

8. Supabase-konto
   Supabase-prosjekt finnes / er under bruk.

Vi trenger hjelp til:

* sjekke schema
* RLS policies
* auth/session
* roles: admin, customer, driver, fleet_owner
* payments table
* rides table
* driver documents
* vehicle documents
* sikker lagring av keys
* sikre at service-role key aldri eksponeres i appen

9. Apple Developer-konto
   Apple Developer-konto må bekreftes.

Hvis aktiv:

* bruk den for iOS TestFlight i Fase 4.

Hvis ikke aktiv:

* vi kan vente til Android APK og backend/payment/auth er ferdig testet først.
* men den må være klar før ekte iOS-release.

PILOT-SPESIFIKT

10. Test-telefonnummer for SMS OTP
    Vi kan bruke mitt eget testnummer først under utvikling.

Viktig:

* Bruk testnummer / testmiljø der det er mulig.
* Ikke spam ekte SMS.
* OTP må testes med norske telefonnummerformat.
* Feil OTP, resend og session persistence må testes.

MINE PRIORITERINGER

Fase 1:

* Login/OTP
* Supabase auth
* Ride booking flow
* Driver/customer roles
* Stripe test payment
* Payment status
* RLS/security
* No exposed secret keys

Fase 2:

* Vipps onboarding/payment
* Retool/internal admin
* Fleet owner portal
* Driver document approval
* Stripe Connect / payout model

Fase 3:

* iOS TestFlight
* Android Play Console
* Privacy/GDPR package
* Pilot with 5–10 cars

Konklusjon:
Please help me set this up in a clean, pilot-ready way. Do not overbuild. Do not redesign the app. Focus on security, payment, auth, booking flow, admin readiness and release blockers.
