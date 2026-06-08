STOP and fix only the KJAPP Driver screens.

Do NOT change the customer app.
Do NOT change the public login screen except driver button connection.
Do NOT change Reise, Aurora, Profil, KJAPP Connect or customer flows.
Only fix the driver area.

CURRENT PROBLEM:
The driver screens became inconsistent and look like a different brown/gold app.
The dashboard says “Placeholder for Phase 2”, which must not appear in real UI.
The driver profile invents unrelated fleet data like “Oslo Taxi Sentralen AS” and fake names.
The driver style no longer matches KJAPP.
Some content is clipped.
There are still grey side handles / preview artifacts.

RESET DRIVER DESIGN DIRECTION:

KJAPP Driver must use the same premium KJAPP identity:

* dark premium background
* cyan/blue/violet holographic accents
* glassmorphism cards
* clean Norwegian UI
* professional mobility/taxi feeling
* no random brown/gold redesign

You may use small amber/gold accents ONLY for:

* earnings
* online status
* premium driver badge

But the main driver app must still feel like KJAPP.

FIX 1: Driver Access screen

Keep the current structure but polish it.

Title:
“KJAPP Driver Access”

Section A:
“Logg inn som sjåfør”
“For godkjente KJAPP-sjåfører.”

Fields/buttons:

* “Telefonnummer”
* “Send engangskode”
* “Logg inn med BankID” as secondary/future option

Section B:
“Ny sjåfør?”
“Har du fått invitasjonskode fra KJAPP?”

Field:
“Invitasjonskode”

CTA:
“Fortsett”

Secondary:
“Jeg har ikke kode”
“Søk om å bli KJAPP-sjåfør”

Important:
Existing approved drivers must NOT need invitation code every time.
Invitation code is only for beta onboarding of new approved drivers.

FIX 2: Replace Driver Dashboard completely

Delete the current brown “Driver Dashboard / Placeholder for Phase 2” screen and rebuild it.

New screen title:
“KJAPP Driver”

Main dashboard content:

Top:

* Driver name: “Amir”
* Status badge: “Av nett”
* Settings icon

Main online card:

* Large toggle/button: “Gå på nett”
* Small text: “Du mottar turer når du er på nett.”

Stats row:

* “0 kr i dag”
* “0 turer”
* “5.0 rating”

Main action area:
If offline:

* “Gå på nett for å motta turer”

If online preview state:

* “Venter på nye turer”
* subtle pulsing map/radar background

Bottom driver nav:

* “Hjem”
* “Turer”
* “Inntekt”
* “Profil”

Do NOT write “Placeholder for Phase 2” anywhere.

FIX 3: Create New Trip Request screen

Create a driver trip request screen.

Title:
“Ny tur”

Show:

* Pickup: “Thorvald Meyers gate 41”
* Destination: “Maaemo, Schweigaards gate”
* Distance to pickup: “2 min unna”
* Estimated trip: “12 min”
* Estimated fare: “249 kr”
* Payment: “Vipps”
* Customer: “Mathilde”
* Rating: “5.0”

Actions:

* Primary: “Aksepter tur”
* Secondary: “Avslå”

Use a countdown ring/timer:
“15 sek”

This screen should feel urgent, clear and safe for a driver.

FIX 4: Create Accepted Trip / Navigate screen

After driver accepts trip, show:

Title:
“Hent kunde”

Show:

* Customer: “Mathilde”
* Pickup address
* ETA to pickup
* Call button
* Message button
* Navigation buttons:
  “Åpne i Google Maps”
  “Åpne i Apple Maps”

CTA:
“Jeg er fremme”

Important:
KJAPP should not build full turn-by-turn navigation in MVP.
Use external maps first.

FIX 5: Create Trip In Progress screen

After “Jeg er fremme”, show:

Title:
“Tur startet”

Show:

* Destination
* Estimated arrival
* Fare estimate
* Route/map background

CTA:
“Fullfør tur”

Secondary:
“Rapporter problem”

FIX 6: Create Trip Completed screen

After “Fullfør tur”, show:

Title:
“Tur fullført”

Show:

* Fare: “249 kr”
* KJAPP fee placeholder
* Driver earnings placeholder
* Payment: “Vipps”
* Rating request
* CTA: “Tilbake til dashboard”

FIX 7: Driver Profile / Vehicle screen

Replace the current driver profile screen.

Do NOT use:

* “Oslo Taxi Sentralen AS”
* “Lars Hagen”
* random fleet owner names
* unrelated taxi company names

Use neutral pilot data:

Fleet:
“KJAPP Pilotflåte”
or
“Elite Transport AS” as pilot partner

Driver:
“Amir”
“Godkjent sjåfør”

Vehicle:
“Toyota Corolla”
“EV 12345”
“2025”
“Taxi-løyve kontrollert”

Documents:

* “Kjøreseddel”
* “Løyve”
* “Forsikring”
* “Vognkort”
  Statuses:
* “Godkjent”
* “Utløper snart”
* “Mangler”

Settings:

* Preferred navigation app:
  Google Maps
  Apple Maps
  Waze

FIX 8: Remove artifacts

Remove all grey side handles, resize bars, editor artifacts and fake scroll rails.
The app must look like a real mobile app preview.

FIX 9: Scrolling and safe area

All driver screens must:

* use 100dvh / 100svh
* support safe-area
* have no top clipping
* have no bottom clipping
* scroll if content is long
* keep bottom nav visible where appropriate
* have readable text and 44px tap targets

FINAL OUTPUT:
Return only the corrected KJAPP Driver screens and keep customer app unchanged.

Required driver screens:

1. Driver Access
2. Driver Dashboard
3. New Trip Request
4. Accepted Trip / Navigate
5. Trip In Progress
6. Trip Completed
7. Driver Profile / Vehicle
