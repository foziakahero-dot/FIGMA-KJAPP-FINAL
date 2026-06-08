You are now adding a premium integrations layer to the KJAPP customer app.

Do NOT redesign the whole app.
Do NOT remove the existing Reise, Aurora and Profil structure.
Do NOT remove the map, Aurora assistant, bottom navigation, Vipps login/payment direction, or premium dark holographic KJAPP style.

KJAPP is a premium Norwegian AI taxi and mobility app.
The app should not only be a taxi app. It should feel like a smart AI mobility assistant for Norway.

Your task:
Create a new connected feature area called:

“KJAPP Connect”

KJAPP Connect should live in:

1. Profil screen as a menu card
2. Aurora screen as smart suggested actions
3. Reise screen as selected contextual cards when relevant

Important:
Do not make all integrations look fully active if they are not MVP-ready.
Use status labels:

* “Aktiv”
* “Koble til”
* “Kommer snart”

The goal is to show a premium, realistic, beta-ready integration ecosystem.

GLOBAL DESIGN STYLE:

* Premium dark KJAPP Design 5
* Holographic cyan/blue/violet glow
* Glassmorphism cards
* Norwegian-first UI
* No emojis
* No childish icons
* No generic app-store style
* Clean mobile-first layout
* Safe-area correct on iPhone and Android
* Minimum 44px tap targets
* Bottom nav remains: Reise · Aurora · Profil

CREATE THESE INTEGRATION AREAS:

1. KJAPP Connect hub screen

Create a screen titled:

“KJAPP Connect”

Subtitle:
“Koble reisen din til musikk, kalender, kollektiv, deling og smarte varsler.”

Show premium integration cards:

A. Ruter / Entur – Rekk avgangen
Status: “Kommer snart”
Description:
“Koble KJAPP med T-bane, buss, trikk, tog og båt.”

Card actions:
“Planlegg med Aurora”
“Rekk avgangen”

Example:
“Majorstuen T-bane”
“Neste avgang: 08:14”
“KJAPP henting: 07:58”
“Buffer: 9 min”
“Status: Du rekker avgangen”

Important product logic:
This feature should not sell public transport tickets.
It should help users plan KJAPP rides to reach public transport departures on time.

B. WhatsApp / SMS – Del reisen
Status: “Aktiv”
Description:
“Del live-tur, ETA og sjåførinfo med familie eller venner.”

Options:
“Del med SMS”
“Del med WhatsApp”
“Kopier sikker lenke”

Use case:
A user can share trip status with spouse, family, friend or emergency contact.

C. Instagram – Beta Share
Status: “Koble til”
Description:
“Del at du tester KJAPP og få bonus når venner registrerer seg.”

Show:

* Story preview card
* Referral code
* “Del KJAPP Beta”
* “Inviter venner”

Example copy:
“Jeg tester KJAPP – norsk AI taxi i beta.”
“Bruk min kode og få velkomstbonus.”

Important product logic:
Do not make Instagram required for booking.
Instagram is optional marketing/referral only.

D. Spotify – Ride Vibe
Status: “Koble til”
Description:
“Tilpass stemningen på reisen.”

Options:
“Stille”
“Chill”
“Energi”
“Podcast”
“Norsk”
“Bollywood”

Important product logic:
Do not build a full music player inside KJAPP.
This should feel like mood personalization for the ride.

E. Kalender – Aurora planlegger
Status: “Koble til”
Description:
“La Aurora foreslå henting basert på avtaler.”

Example:
“Hei Mathilde. Du har bord på Maaemo kl. 20:00.”
“Skal jeg hente deg 19:30?”

Use cases:

* Restaurant booking
* Meeting
* Flight
* Doctor appointment
* School pickup
* Work commute

F. Wallet – KJAPP Beta Pass
Status: “Kommer snart”
Description:
“Legg til KJAPP Beta Pass, rabattkode og KJAPP+ medlemskap.”

Show:

* “150 kr beta-kreditt”
* “KJAPP+”
* “Legg til i Wallet”

G. Flyplass – Gardermoen Assist
Status: “Kommer snart”
Description:
“Aurora følger flytid og anbefaler riktig henting.”

Example:
“Flyet ditt går 08:15.”
“Anbefalt henting: 06:25.”
“Buffer: 20 min.”

H. Google Maps / Apple Maps – Sjåførnavigasjon
Status: “Aktiv”
Description:
“Sjåføren kan åpne navigasjon direkte etter akseptert tur.”

Show driver-side actions:
“Åpne i Google Maps”
“Åpne i Apple Maps”
“Naviger til hentested”
“Naviger til destinasjon”

Important product logic:
KJAPP should not build full turn-by-turn navigation in MVP.
Use external maps for driver navigation first.

I. Vipps / Betaling
Status: “Aktiv”
Description:
“Rask og trygg betaling for Norge.”

Show payment options:
“Vipps”
“Apple Pay”
“Google Pay”
“Kort”
“Bedrift/faktura – kommer snart”

Vipps should be shown as recommended for Norway.

J. Senior / Familie-modus
Status: “Kommer snart”
Description:
“Enklere reiser, trygg deling og hjelp fra Aurora.”

Show features:
“Stor tekst”
“Talestyring”
“Del reisen automatisk”
“Nødkontakt”
“Favorittadresser”
“Ring support”

2. Add KJAPP Connect card to Profil screen

Inside Profil, add a premium card:

Title:
“KJAPP Connect”

Subtitle:
“Musikk, kalender, deling og smarte reiser”

Small status row:
“Ruter/Entur · Spotify · Instagram · WhatsApp · Kalender”

This card should open the KJAPP Connect hub.

Also keep existing Profil menu:

* Mine turer
* Betaling
* Lagrede steder
* KJAPP+
* Inviter venner
* Support
* Innstillinger
* Bli sjåfør / Sjåfør-login

3. Add Aurora smart prompts

Inside Aurora screen, add suggested prompts:

“Rekk neste T-bane”
“Planlegg taxi til bussen”
“Del reisen med familien”
“Lag en chill Ride Vibe”
“Bestill taxi til kalenderavtale”
“Følg flytiden min”
“Finn smarteste vei med KJAPP + kollektiv”

Aurora should feel like the AI core of the app.

4. Add Reise screen contextual cards

On Reise screen, show only relevant integration cards, not all at once.

Examples:

If near public transport:
“Rekk avgangen”
“KJAPP hjelper deg å rekke T-bane, buss og tog.”

If active trip:
“Del reisen”
“Send live ETA til familie eller venner.”

If going to airport:
“Gardermoen Assist”
“Aurora kan anbefale henting basert på flytid.”

If evening/weekend:
“Ride Vibe”
“Velg stemning for turen.”

5. Create Ruter/Entur “Rekk avgangen” flow

Create a sheet or screen where the user can choose:

“Hvilken avgang vil du rekke?”

Transport options:

* T-bane
* Buss
* Trikk
* Tog
* Båt

Fields:

* “Hvor skal du?”
* “Fra hvilket stoppested?”
* “Når må du være fremme?”

Result card:
“Majorstuen T-bane”
“Neste avgang: 08:14”
“KJAPP henting: 07:58”
“Buffer: 9 min”
“Du rekker avgangen”

Primary CTA:
“Bestill til avgang”

Secondary CTA:
“Se andre alternativer”

Smart comparison:
A. “KJAPP hele veien”
“12 min · estimert 249 kr”

B. “KJAPP + kollektiv”
“23 min · taxi til Majorstuen + T-bane videre”

C. “Senior anbefaling”
“Direkte KJAPP · enklest reise”

6. Create active trip sharing state

When a trip is active, add a premium “Del reisen” panel:

Title:
“Del reisen”

Description:
“Send ETA, sjåfør og bilinfo trygt til noen du stoler på.”

Buttons:
“SMS”
“WhatsApp”
“Kopier lenke”

Shared trip preview:
“Mathilde er på vei med KJAPP.”
“Sjåfør: Amir”
“Bil: Toyota Corolla”
“ETA: 8 min”
“Turstatus: På vei”

7. Create Instagram Beta Share state

Create a story preview card:

Text:
“Jeg tester KJAPP”
“Norsk AI taxi i beta”
“Få velkomstbonus med min kode”

Show:

* Referral code
* QR placeholder
* Button: “Del på Instagram”
* Button: “Kopier invitasjonslenke”

Keep it premium, not childish.

8. Create Spotify Ride Vibe state

Create a simple mood selector:

Title:
“Ride Vibe”

Subtitle:
“Velg stemningen for turen.”

Options:

* Stille
* Chill
* Energi
* Podcast
* Norsk
* Bollywood

Aurora message:
“Jeg kan tilpasse turstemningen uten å gjøre bestillingen mer komplisert.”

9. Create Calendar integration state

Title:
“Kalender”

Subtitle:
“La Aurora foreslå riktig hentetid.”

Example card:
“Maaemo kl. 20:00”
“Anbefalt henting: 19:30”
“Buffer: 12 min”

Button:
“Koble til kalender”

10. Create Wallet Beta Pass state

Title:
“KJAPP Beta Pass”

Show:
“KJAPP+”
“150 kr beta-kreditt”
“Gyldig for første tur”
“Legg til i Wallet”

11. Settings integration controls

Inside Innstillinger, add section:

“Integrasjoner”

Rows:

* Ruter / Entur
* Spotify
* Instagram
* WhatsApp / SMS
* Kalender
* Wallet
* Flyplass
* Kartnavigasjon

Each row should show status:
“Aktiv”, “Koble til” or “Kommer snart”.

12. Final navigation requirement

Make sure the prototype has these reachable flows:

* Profil → KJAPP Connect
* Aurora → smart prompts
* Reise → Rekk avgangen card
* Active trip → Del reisen
* Profil → Innstillinger → Integrasjoner
* Profil → Betaling
* Profil → Mine turer
* Profil → Support

13. MVP realism

Do not make KJAPP look unfinished.
If something is not ready for beta, label it clearly as “Kommer snart”.
Suggested MVP active:

* Vipps
* Google/Apple Maps driver navigation
* SMS/WhatsApp share trip
* Basic profile/payment/ride history

Suggested “Koble til”:

* Spotify
* Instagram
* Kalender

Suggested “Kommer snart”:

* Ruter/Entur smart planning
* Wallet
* Flyplass tracking
* Senior/family advanced mode

FINAL OUTPUT:
Create the complete KJAPP Connect integrations layer with connected screens, cards and states.

The result should feel innovative, premium, Norwegian, AI-first and beta-ready.
Do not create unrelated screens.
Do not remove the existing KJAPP app structure.
Do not overload the home screen.
Make integrations optional and intelligent through Aurora.
