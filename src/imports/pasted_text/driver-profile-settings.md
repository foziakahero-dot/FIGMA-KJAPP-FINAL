Fix and expand ONLY the KJAPP Driver Profile / Settings area.

Do NOT redesign the driver app.
Do NOT create customer app screens.
Do NOT create admin panel.
Do NOT add Spotify or Instagram to the driver app.
Do NOT add Ruter/Entur as a driver feature.
Keep the KJAPP premium dark/cyan/violet style.

CURRENT PROBLEM:
Driver Profile only shows documents and navigation app.
It is missing proper settings for:

* fleet/løyvehaver vehicle selection
* AI policy
* privacy/consent
* communication settings
* location sharing
* support
* driver-specific integrations

IMPORTANT PRODUCT LOGIC:
Driver can only use vehicles connected to the approved fleet/løyvehaver.
Driver must not see vehicles outside their fleet.
Driver must not choose a vehicle that is not approved or already active.
Driver must consent to location sharing when online/active trip.
Aurora Driver AI can assist but cannot approve documents, change payout, approve vehicle, or override admin rules.

CREATE / FIX THESE AREAS:

1. Driver Profile top

Show:

* Amir
* Godkjent sjåfør
* Fleet badge: “Elite Transport AS”
* Secondary badge: “KJAPP Pilotflåte”

Current vehicle:
“Tesla Model Y”
“EL 88421 · 2024”

Button:
“Bytt bil”

2. Fleet / Løyvehaver section

Add section:
“Løyvehaver / flåte”

Card:
“Elite Transport AS”
“Godkjent flåte”
“3 biler tilgjengelig”
“2 sjåfører aktive”

Small text:
“Du kan kun kjøre biler som er godkjent og tilknyttet denne flåten.”

3. Vehicle selection screen

When tapping “Bytt bil”, open screen:

Title:
“Velg bil”

Subtitle:
“Du ser kun biler fra din godkjente flåte.”

Vehicle cards:

A.
“Toyota Corolla”
“EV 12345 · 2025”
Status: “Godkjent”
CTA: “Velg bil”

B.
“Tesla Model Y”
“EL 88421 · 2024”
Status: “Aktiv nå”
Badge: “Valgt”

C.
“Mercedes EQS”
“EK 41209 · 2025”
Status: “Godkjent”
CTA: “Velg bil”

D.
“Volkswagen ID. Buzz”
“EL 22017 · 2024”
Status: “Ikke tilgjengelig”
Reason: “Venter dokumentgodkjenning”
Disabled CTA

E.
“BMW i7”
“EK 90021 · 2025”
Status: “Opptatt”
Reason: “Brukes av annen sjåfør”
Disabled CTA

Confirmation modal:
“Bytte aktiv bil?”
“Du vil motta turer med valgt bil.”
CTA: “Bekreft bilvalg”

4. Driver-specific integrations / settings

Create section:
“Innstillinger”

Rows:

* Navigasjonsapp
* Kommunikasjon
* Aurora Driver AI
* Posisjon og sporing
* Varsler
* Sikkerhet og personvern
* Support
* Vilkår og betingelser
* Logg ut

5. Navigation app settings

Screen:
“Navigasjonsapp”

Text:
“Velg hvilken ekstern navigasjonsapp KJAPP skal åpne under tur.”

Options:

* Google Maps
* Apple Maps
* Waze

Selected:
“Google Maps”

Important note:
“KJAPP bruker ekstern navigasjon i MVP. Full innebygd navigasjon kan vurderes senere.”

6. Communication settings

Screen:
“Kommunikasjon”

Options:

* In-app meldinger: På
* Hurtigmeldinger til kunde: På
* Ring kunde via app: På
* Skjul privat telefonnummer: På
* SMS fallback: Kommer senere
* WhatsApp fallback: Kommer senere

Important:
Driver/customer communication should happen inside KJAPP where possible.
Phone numbers should be hidden/masked when possible.

7. Aurora Driver AI settings

Screen:
“Aurora Driver AI”

Show:

* Aurora Driver: På
* Turforslag: På
* Neste steg-varsler: På
* Dokumentvarsler: På
* Etterspørselsforslag: På
* Support AI: På

AI policy summary:
“Aurora kan hjelpe med forslag, navigasjon, dokumentstatus og support. Aurora kan ikke godkjenne dokumenter, endre pris, godkjenne bil, endre utbetaling eller overstyre KJAPP-admin.”

Button:
“Se AI-regler”

8. AI Policy screen

Title:
“AI-regler”

Sections:

Aurora Driver kan:

* Foreslå hvor du bør vente
* Forklare neste steg i turen
* Åpne valgt navigasjonsapp
* Varsle om dokumentstatus
* Hjelpe med support og rapportering

Aurora Driver kan ikke:

* Godkjenne sjåfør
* Godkjenne bil
* Endre betaling eller pris
* Endre utbetaling
* Se kundedata uten aktiv tur
* Overstyre KJAPP-admin eller løyvehaver

Critical issues:
“Kritiske saker sendes til KJAPP Support.”

9. Location / consent screen

Screen:
“Posisjon og sporing”

Show consent toggles:

* Del posisjon når jeg er på nett
* Del posisjon under aktiv tur
* Vis min posisjon til kunde etter akseptert tur
* Send ETA til kunde
* Stopp posisjonssporing når jeg går av nett

Important text:
“KJAPP bruker posisjon for matching, ETA, sikkerhet og live turstatus. Posisjon deles kun når du er på nett eller har aktiv tur.”

Button:
“Administrer samtykke”

10. Consent state

Create consent modal:

Title:
“Samtykke for sjåfør”

Text:
“For å motta turer må KJAPP bruke posisjon, dokumentstatus og turdata. Du kan gå av nett når som helst.”

Checkboxes:

* Jeg godtar posisjonsdeling når jeg er på nett
* Jeg godtar posisjonsdeling under aktiv tur
* Jeg godtar at Aurora Driver kan gi forslag basert på turstatus
* Jeg godtar at kritiske supportsaker kan sendes til KJAPP-admin

CTA:
“Godta og fortsett”

11. Support

Screen:
“KJAPP Driver Support”

Categories:

* Kunde møter ikke opp
* Problem med betaling
* Dokumentstatus
* Navigasjon
* App-feil
* Sikkerhet
* Annet

Add AI support box:
“KJAPP Driver Support AI”

Example:
Driver:
“Kunden møter ikke opp.”

Support AI:
“Ventetid er startet. Du kan rapportere no-show etter 5 minutter.”

Actions:

* Rapporter no-show
* Kontakt KJAPP Support
* Ring kunde

12. What NOT to include in driver settings

Do not include:

* Spotify Ride Vibe
* Instagram Beta Share
* Ruter/Entur “Rekk avgangen”

These belong to Customer App / KJAPP Connect, not Driver Profile.

13. Prototype Map

Add direct buttons:

* Driver Profile
* Velg bil
* Navigasjonsapp
* Kommunikasjon
* Aurora Driver AI
* AI-regler
* Posisjon og sporing
* Samtykke
* Driver Support

14. QA

Verify:

* Driver can change only fleet vehicles
* disabled vehicles are visible but cannot be selected
* navigation app can be selected
* AI policy is visible
* consent screen exists
* location rules are clear
* support screen exists
* no customer-only integrations appear in driver app
* no clipped content
* long screens scroll correctly

FINAL OUTPUT:
Return updated KJAPP Driver Profile / Settings / Consent / Vehicle Selection screens only.
Do not change unrelated screens.
