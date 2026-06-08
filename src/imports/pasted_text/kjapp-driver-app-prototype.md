Create a brand new clean KJAPP Driver App prototype from scratch.

This project is ONLY the KJAPP Driver App.
Do NOT create customer app screens.
Do NOT create admin panel.
Do NOT create fleet owner portal.
Do NOT import broken routing from previous prototype.
Do NOT create desktop dashboard.
Do NOT create random taxi companies.
Do NOT use brown/gold as main theme.

This must be a clean mobile-first driver app for KJAPP.

BRAND STYLE:
KJAPP Driver must use the same KJAPP premium identity:

* dark navy / black background
* cyan / blue / violet holographic accents
* glassmorphism cards
* clean Norwegian UI
* professional taxi/mobility feeling
* AI-first but minimal
* mobile-first
* safe-area correct
* no clipped content
* real scrolling on long screens

APP STRUCTURE:
Create a real clickable mobile prototype with direct screen access.

Main driver bottom nav:

* Hjem
* Turer
* Inntekt
* Profil

Also create an internal:
“KJAPP Driver Prototype Map”
for direct testing of every screen.

IMPORTANT BUSINESS LOGIC:
KJAPP Driver works for a Norwegian taxi pilot.
A driver cannot drive freely without approval.
A driver must be connected to an approved løyvehaver/fleet.
A driver can only choose vehicles registered under that approved fleet.
Invitation code/link is only for new driver onboarding.
Existing approved drivers log in normally.

CREATE THESE SCREENS:

1. Driver Access

Title:
“KJAPP Driver Access”

Section A:
“Logg inn som sjåfør”
“For godkjente KJAPP-sjåfører.”

Fields/buttons:

* Telefonnummer
* Send engangskode
* Logg inn med BankID

Section B:
“Ny sjåfør?”
“Har du fått invitasjon fra løyvehaver eller KJAPP?”

Fields/buttons:

* Invitasjonskode
* Fortsett
* Jeg har ikke kode
* Søk om å bli KJAPP-sjåfør

Small note:
“Invitasjon brukes kun for beta-onboarding av godkjente sjåfører.”

Clicking:

* Send engangskode → Driver Home
* Logg inn med BankID → Driver Home
* Fortsett → Driver Onboarding
* Søk om å bli KJAPP-sjåfør → Driver Onboarding

2. Driver Onboarding

Create step-based onboarding:

Steps:

* Personinfo
* Dokumenter
* Flåtetilknytning
* Velg bil
* Send til godkjenning

Personinfo:

* Navn
* Telefon
* E-post
* Profilbilde

Documents:

* Førerkort
* Kjøreseddel
* Profilbilde

Fleet:
Show:
“Elite Transport AS”
“KJAPP Pilotflåte”

Vehicle selection:
Only show vehicles from selected fleet:

* Toyota Corolla · EV 12345 · 2025
* Mercedes EQS · EK 41209 · 2025
* Tesla Model Y · EL 88421 · 2024

Final CTA:
“Send til godkjenning”

Final status:
“Venter på godkjenning”
“KJAPP eller løyvehaver vurderer dokumentene dine.”

3. Driver Home / Dashboard

Title:
“KJAPP Driver”

Top:

* Driver avatar
* “Amir”
* Status badge: “Av nett”
* Settings icon

Main card:

* Large CTA: “Gå på nett”
* Text: “Du mottar turer når du er på nett.”

Stats:

* “0 kr i dag”
* “0 turer”
* “5.0 rating”

Aurora Driver card:
Title:
“Aurora Driver”

Message:
“Jeg hjelper deg med turer, navigasjon, etterspørsel og dokumentstatus.”

Button:
“Åpne Aurora Driver”

Bottom nav:

* Hjem
* Turer
* Inntekt
* Profil

Clicking:

* Gå på nett → Online Map
* Åpne Aurora Driver → Aurora Driver Chat

4. Online Map / Radar State

When driver is online, show:

Title:
“KJAPP Driver”

Status:
“På nett”
“Venter på tur”

Visual:

* dark premium Oslo map/radar
* driver location marker
* nearby demand glow zones
* car/radar style, not random dots

Aurora Driver suggestion:
“Høy aktivitet nær Sentrum.”
“Flytt deg mot Grünerløkka for kortere ventetid.”

Buttons:

* Gå av nett
* Demo: Simuler innkommende tur

Clicking:

* Demo: Simuler innkommende tur → New Trip Request
* Gå av nett → Driver Home

5. Aurora Driver Chat

Create compact AI assistant screen/sheet.

Title:
“Aurora Driver”
Subtitle:
“Din kjøreassistent”

Chat messages:

Driver:
“Hvor bør jeg vente?”

Aurora Driver:
“Høy aktivitet nær Sentrum. Flytt deg mot Grünerløkka for kortere ventetid.”

Driver:
“Hva er neste steg?”

Aurora Driver:
“Neste steg vises automatisk når en tur er aktiv.”

Quick actions:

* Hvor bør jeg vente?
* Hva er neste steg?
* Åpne valgt navigasjon
* Dokumentstatus
* Rapporter problem
* Kontakt support

Input:
“Skriv til Aurora Driver…”

6. New Trip Request

Title:
“Ny tur”

Show:

* Kunde: Mathilde
* Henting: Thorvald Meyers gate 41
* Destinasjon: Maaemo, Schweigaards gate
* 2 min til henting
* Tur: 12 min
* Estimert pris: 249 kr
* Betaling: Vipps
* Kundepreferanse: Stille tur

Countdown:
“15 sek”

Buttons:

* Aksepter tur
* Avslå

Clicking:

* Aksepter tur → Hent kunde
* Avslå → Online Map

7. Accepted Trip / Hent kunde

Title:
“Hent kunde”

Show:

* Kunde: Mathilde
* Hentested: Thorvald Meyers gate 41
* ETA til henting: 2 min
* map background
* pickup marker
* driver marker

Contact:

* Ring kunde
* Send melding

Navigation:

* Åpne valgt navigasjon
* Google Maps
* Apple Maps
* Waze

Aurora Driver message:
“Neste steg: naviger til hentestedet.”

CTA:
“Jeg er fremme”

Clicking:

* Jeg er fremme → Kunde varslet

8. Customer Messaging Sheet

Create active trip messaging sheet.

Title:
“Melding”

Driver quick messages:

* Jeg er fremme
* Jeg står utenfor
* Jeg er 2 minutter unna
* Jeg finner deg ikke
* Vennligst kom til hentestedet

Input:
“Skriv melding…”

9. Arrived / Kunde varslet

Title:
“Kunde varslet”

Show:
“Mathilde er varslet om at du er fremme.”

Timer:
“00:02”

Small text:
“Gratis ventetid: 3 min · deretter 5 kr/min”

Buttons:

* Ring kunde
* Melding
* Kunde møter ikke opp
* Rapporter problem

CTA:
“Start tur”

Clicking:

* Start tur → Tur pågår

10. Trip In Progress

Title:
“Tur pågår”

Show:

* Destinasjon: Maaemo, Schweigaards gate
* ETA: 12 min
* Estimert pris: 249 kr
* Betaling: Vipps
* map background
* destination marker

Navigation:
“Åpne navigasjon til destinasjon”

Aurora Driver message:
“Kunden er hentet. Åpne navigasjon til destinasjonen.”

CTA:
“Fullfør tur”

Secondary:
“Rapporter problem”

Clicking:

* Fullfør tur → Tur fullført

11. Trip Completed

Title:
“Tur fullført”

Show:

* Pris: 249 kr
* Betaling: Vipps
* KJAPP-fee: beregnes
* Utbetaling: via løyvehaver
* Kvittering sendt
* Kundevurdering

CTA:
“Tilbake til dashboard”

Clicking:

* Tilbake til dashboard → Driver Home

12. Driver Turer Tab

Title:
“TURER”

Sections:

* Aktiv
* I dag
* Tidligere

Active card:
Mathilde
Thorvald Meyers gate 41 → Maaemo
På vei til kunde
2 min
CTA: Åpne tur

Today examples:

1. Mathilde
   Thorvald Meyers gate 41 → Maaemo
   19:30 · 249 kr · Vipps · Fullført

2. Jonas
   Oslo S → Grünerløkka
   17:10 · 189 kr · Kort · Fullført

3. Aisha
   Majorstuen → Gardermoen
   14:20 · 699 kr · Vipps · Fullført

Earlier:
Show 2 compact previous ride cards.

13. Driver Inntekt Tab

Title:
“INNTEKT”

Top card:
“249 kr i dag”
“1 fullført tur”

Stats:

* Denne uken: 3 420 kr
* Turer: 18
* Rating: 5.0
* Bonus: 0 kr

Payout card:
Title:
“Utbetaling”

Text:
“Utbetaling håndteres etter avtale med løyvehaver.”

Show:

* Estimert brutto: 249 kr
* KJAPP-fee: beregnes
* Utbetaling: via løyvehaver

Weekly list:

* Mandag: 820 kr
* Tirsdag: 640 kr
* Onsdag: 0 kr
* Torsdag: 1 210 kr
* Fredag: 750 kr

14. Driver Profile Tab

Title:
“DRIVER PROFIL”

Top:

* Amir
* Godkjent sjåfør
* Elite Transport AS / KJAPP Pilotflåte

Vehicle:

* Toyota Corolla · EV 12345 · 2025
* Taxi-løyve kontrollert

Documents:

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

Support/settings:

* Varsler
* Sikkerhet
* Personvern
* Support
* Vilkår og betingelser
* Logg ut

15. Driver Support AI

Title:
“KJAPP Driver Support”

Subtitle:
“Få hjelp med turer, dokumenter, betaling og app.”

AI chat example:

Driver:
“Kunden møter ikke opp.”

Support AI:
“Ventetid er startet. Du kan rapportere no-show etter 5 minutter.”

Action cards:

* Rapporter no-show
* Ring kunde
* Kontakt KJAPP support

Critical escalation:
Show:
“Saken er sendt til KJAPP support.”
“Sak #1043”
“Status: Venter på behandling”

16. Prototype Map

Create internal testing screen:

“KJAPP Driver Prototype Map”

Buttons:

* Driver Access
* Driver Onboarding
* Driver Home
* Online Map
* Aurora Driver Chat
* New Trip Request
* Hent kunde
* Melding
* Kunde varslet
* Tur pågår
* Tur fullført
* Turer
* Inntekt
* Driver Profil
* Driver Support AI

Every button must open the correct screen directly.
No login required for prototype testing.

Also add a small internal link:
“Prototype Map”
on Driver Access screen, clearly marked internal/demo only.

17. Technical layout rules

Every screen must:

* mobile viewport
* safe-area top and bottom
* no clipped top content
* no clipped bottom content
* real vertical scrolling on long screens
* bottom nav fixed where appropriate
* no horizontal overflow
* readable Norwegian text
* minimum 44px tap targets

18. Visual consistency

Do not use:

* placeholder text like “Phase 2”
* random brown/gold redesign
* unrelated taxi companies
* admin panel screens
* customer app screens

FINAL OUTPUT:
Deliver a clean, complete, clickable KJAPP Driver App prototype.
Everything must be reachable from Driver Access and Prototype Map.
No broken routes.
No errors when clicking driver login.
