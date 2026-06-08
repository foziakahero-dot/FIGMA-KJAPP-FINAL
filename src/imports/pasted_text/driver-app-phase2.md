You are now building PHASE 2 of KJAPP: the real KJAPP Driver App flow.

Do NOT change the customer app.
Do NOT change the public login screen except keeping “Sjåfør? Logg inn” connected to Driver Access.
Do NOT use brown/gold as the main driver theme.
Do NOT make the driver app look like a different product.

KJAPP Driver must use the same KJAPP premium identity:

* dark premium UI
* cyan/blue/violet holographic accents
* glassmorphism
* clean Norwegian UI
* professional taxi/mobility feeling
* minimal buttons
* AI-first where useful
* safe-area correct
* real mobile scroll behavior

BUSINESS LOGIC FOR NORWAY / KJAPP PILOT:

KJAPP Driver is not open for anyone to drive instantly.
A driver must be connected to an approved fleet/løyvehaver.

Correct hierarchy:

1. KJAPP platform/admin approves a løyvehaver/fleet owner.
2. Løyvehaver registers vehicles and taxi permits/løyver with KJAPP.
3. Løyvehaver sends invite link or invite code to drivers.
4. Driver opens invite link and submits onboarding information.
5. Driver uploads documents.
6. KJAPP/admin or fleet owner reviews and approves.
7. Driver becomes linked to that fleet.
8. Driver can only select vehicles registered under that approved fleet.
9. Driver can go online and receive trips.

IMPORTANT:
Existing approved drivers should not need invitation code every time.
Invitation code/link is only for new beta onboarding.

CREATE THESE DRIVER SCREENS AND FLOWS:

1. KJAPP Driver Access

Purpose:
Separate existing approved drivers from new invited drivers.

Screen title:
“KJAPP Driver Access”

Section A:
“Logg inn som sjåfør”
“For godkjente KJAPP-sjåfører.”

Fields/buttons:

* Telefonnummer
* Send engangskode
* Logg inn med BankID as secondary/future option

Section B:
“Ny sjåfør?”
“Har du fått invitasjon fra løyvehaver eller KJAPP?”

Fields/buttons:

* Invitasjonskode
* Fortsett
* Jeg har ikke kode
* Søk om å bli KJAPP-sjåfør

Small explanation:
“Invitasjon brukes kun for beta-onboarding av godkjente sjåfører.”

2. Driver Invite / Onboarding

Create a driver onboarding flow opened from invite link/code.

Title:
“Bli KJAPP-sjåfør”

Steps:
A. Personinfo

* Navn
* Telefon
* E-post
* Profilbilde

B. Dokumenter

* Førerkort
* Kjøreseddel
* Profilbilde
* Eventuelt BankID later

C. Flåtetilknytning
Show:
“Invitert av”
“Løyvehaver / flåte”
Example:
“Elite Transport AS”
or generic:
“KJAPP Pilotflåte”

D. Velg tilgjengelig bil
Driver can only see cars registered under the approved fleet.
Show example vehicles:

* Toyota Corolla · EV 12345
* Mercedes EQS · EK 41209
* Tesla Model Y · EL 88421

E. Send til godkjenning
CTA:
“Send til godkjenning”

Status after submit:
“Venter på godkjenning”
“KJAPP eller løyvehaver vurderer dokumentene dine.”

3. Fleet Owner / Løyvehaver Invite Concept Screen

Create a simple screen to show how fleet owners invite drivers.

Title:
“Inviter sjåfør”

Fields:

* Sjåførens navn
* Telefonnummer
* E-post

Fleet:
“Elite Transport AS” or “KJAPP Pilotflåte”

Available vehicles:

* Toyota Corolla
* Mercedes EQS
* Tesla Model Y

CTA:
“Send invitasjonslink”

Generated link preview:
“kjappapp.no/driver/invite/ABC123”

This can be internal/admin preview, not part of normal driver app.

4. Driver Dashboard / Home

Title:
“KJAPP Driver”

Top:

* Driver avatar
* “Amir”
* Status: “Av nett” or “På nett”
* Settings icon

Main card:
If offline:

* Large CTA: “Gå på nett”
* Text: “Du mottar turer når du er på nett.”

If online:

* Status: “På nett”
* Text: “Venter på nye turer”
* Add live radar/map background
* Show nearby demand zones lightly

Stats:

* “0 kr i dag”
* “0 turer”
* “5.0 rating”

Aurora Driver CoPilot card:
Title:
“Aurora Driver”

When offline:
“Gå på nett når du er klar. Jeg hjelper deg med turer, navigasjon og status.”

When online:
“Jeg følger med på etterspørsel og varsler deg når en relevant tur kommer.”

Bottom driver nav:

* Hjem
* Turer
* Inntekt
* Profil

5. Driver Live Map / Online State

Create online map state.

Show:

* Driver location marker
* Demand glow zones
* “Venter på tur”
* “Høy aktivitet nær Sentrum”
* Aurora Driver suggestion:
  “Flytt deg mot Grünerløkka for kortere ventetid.”

CTA:
“Gå av nett”

Keep this minimal and not cluttered.

6. New Trip Request

When a customer books, show urgent trip request.

Title:
“Ny tur”

Show:

* Pickup: “Thorvald Meyers gate 41”
* Destination: “Maaemo, Schweigaards gate”
* Customer: “Mathilde”
* Customer rating: “5.0”
* Distance to pickup: “2 min unna”
* Estimated trip time: “12 min”
* Estimated fare: “249 kr”
* Payment: “Vipps”
* Preference: “Stille tur” or “Vanlig tur” as optional

Actions:

* Primary: “Aksepter tur”
* Secondary: “Avslå”

Countdown:
“15 sek”

This must be extremely clear for driver use.

7. Accepted Trip / Navigate to Pickup

After “Aksepter tur”, show:

Title:
“Hent kunde”

Show:

* Customer: “Mathilde”
* Pickup address
* ETA to pickup
* Map background
* Call button
* Message button

Navigation:
Use selected navigation app from driver settings.

Buttons:

* “Åpne i Google Maps”
* “Åpne i Apple Maps”
* “Åpne i Waze”

Primary CTA:
“Jeg er fremme”

Important:
KJAPP should not build full turn-by-turn navigation in MVP.
Use external navigation apps.

8. Arrived / Customer Pickup

After “Jeg er fremme”, show:

Title:
“Kunde varslet”

Show:

* “Mathilde er varslet om at du er fremme.”
* Waiting timer
* Call customer
* Message customer
* No-show / problem button

CTA:
“Start tur”

9. Trip In Progress

After “Start tur”, show:

Title:
“Tur pågår”

Show:

* Destination
* ETA
* Estimated fare
* Payment method
* Map background

Navigation:

* “Åpne valgt navigasjon”
* show selected navigation app

CTA:
“Fullfør tur”

Secondary:
“Rapporter problem”

10. Trip Completed

After “Fullfør tur”, show:

Title:
“Tur fullført”

Show:

* Fare: “249 kr”
* Payment: “Vipps”
* KJAPP fee placeholder
* Driver/fleet payout placeholder
* Customer rating prompt
* Receipt status

CTA:
“Tilbake til dashboard”

11. Driver Trips Screen

Tab:
“Turer”

Sections:

* Aktiv tur
* I dag
* Tidligere

Ride cards:

* Time
* Pickup
* Destination
* Fare
* Status

12. Driver Earnings Screen

Tab:
“Inntekt”

Show:

* “0 kr i dag”
* “Denne uken”
* “Antall turer”
* “Bonus”
* “Utbetaling”
* “KJAPP-fee”

Add note:
“Utbetaling håndteres etter avtale med løyvehaver.”

13. Driver Profile / Vehicle Screen

Tab:
“Profil”

Top:

* Driver: “Amir”
* Status: “Godkjent sjåfør”
* Fleet badge: “KJAPP Pilotflåte” or “Elite Transport AS”

Fleet section:
“Løyvehaver / flåte”
Show approved fleet only.

Vehicle section:
Driver can only choose vehicles registered to their fleet.

Show:

* Toyota Corolla · EV 12345 · 2025
* Mercedes EQS · EK 41209 · 2025
* Tesla Model Y · EL 88421 · 2024

Document section:

* Førerkort: Godkjent
* Kjøreseddel: Godkjent
* Forsikring: Utløper snart
* Vognkort: Godkjent
* EU-kontroll: Godkjent

Navigation settings:
“Foretrukket navigasjonsapp”
Options:

* Google Maps
* Apple Maps
* Waze

Other settings:

* Varsler
* Sikkerhet
* Personvern
* Support
* Logg ut

14. Customer live map connection

Create a note / visual state showing that when a driver accepts a trip:

* Customer sees driver live location
* Customer sees ETA
* Customer sees driver name
* Customer sees car model and registration
* Customer can call/message
* Customer can share trip

This should connect customer active trip screen with driver accepted trip state.

15. Prototype Map / Screen Index

Update Prototype Map with all driver screens:

* Driver Access
* Driver Onboarding
* Fleet Owner Invite
* Driver Dashboard
* Driver Online Map
* New Trip Request
* Accepted Trip / Navigate
* Arrived / Pickup
* Trip In Progress
* Trip Completed
* Driver Turer
* Driver Inntekt
* Driver Profil

Make every screen reachable for testing.

16. Technical layout rules

Every screen must:

* use 100dvh / 100svh
* support safe-area top and bottom
* have no clipped content
* have no hidden bottom content
* use real vertical scroll if long
* remove grey side handles and editor artifacts
* no horizontal overflow
* minimum 44px touch targets
* readable Norwegian UI

17. Visual consistency

Do not invent unrelated taxi companies.
Do not use “Oslo Taxi Sentralen AS”.
Do not use random fleet owners.
Use neutral KJAPP pilot data or “Elite Transport AS” as pilot partner.

Do not use placeholder text like:
“Placeholder for Phase 2”

Make it look like a real beta product.

FINAL OUTPUT:
Create a full KJAPP Driver App prototype connected to the customer app logic, including:

* driver access
* invite/onboarding
* fleet/løyvehaver connection
* vehicle selection
* document upload/status
* driver dashboard
* AI driver assistant
* live online map
* trip request
* navigation to pickup
* active trip
* completed trip
* earnings
* profile/settings
* external map navigation preferences

Keep the product premium, Norwegian, AI-first and realistic for a KJAPP taxi pilot.
