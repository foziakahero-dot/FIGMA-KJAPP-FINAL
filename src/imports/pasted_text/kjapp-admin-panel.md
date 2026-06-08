You are now creating PHASE 3 of KJAPP: the KJAPP Admin Panel.

Do NOT change the customer mobile app.
Do NOT change the driver mobile app.
Do NOT create the fleet owner portal yet.
Do NOT connect real Supabase, Stripe, Vipps, AI or Maps yet.
This is a Figma/prototype admin panel design only.

KJAPP Admin Panel is an internal web dashboard used by KJAPP Admin to control the platform before and during pilot.

ADMIN PANEL PURPOSE:
KJAPP Admin must be able to review, approve and manage:

* løyvehavere / fleets
* vehicles
* drivers
* documents
* trips
* live status
* support cases
* AI escalations
* payments overview
* system settings

STYLE:
Use KJAPP premium dark identity:

* dark navy/black background
* cyan/blue/violet holographic accents
* glassmorphism cards
* professional SaaS dashboard style
* clean Norwegian UI
* serious, trustworthy and investor-ready
* not childish
* not generic taxi admin
* not brown/gold

LAYOUT:
Create a desktop-first web dashboard, 1440px wide.
Also make it responsive enough for tablet.
Use a left sidebar and main content area.

SIDEBAR NAVIGATION:
Use these menu items:

1. Oversikt
2. Løyvehavere
3. Sjåfører
4. Biler
5. Dokumenter
6. Turer
7. Live kart
8. Support
9. AI-saker
10. Betaling
11. Rapporter
12. Innstillinger

TOP BAR:
Show:

* KJAPP Admin
* Search
* Notifications
* Admin user: “Usman”
* Environment badge: “Pilot”

SCREEN 1: OVERSIKT / DASHBOARD

Create admin dashboard with key cards:

* Aktive sjåfører
* Ledige biler
* Turer i dag
* Omsetning i dag
* Ventende godkjenninger
* Åpne support-saker
* Kritiske AI-varsler

Add a live status panel:
“Pilotstatus Oslo”

* 5 biler aktive
* 2 sjåfører på nett
* 1 tur pågår
* 3 dokumenter utløper snart

Add quick actions:

* Godkjenn sjåfør
* Godkjenn bil
* Inviter løyvehaver
* Åpne support-sak

SCREEN 2: LØYVEHAVERE / FLEETS

Create list of fleet owners/løyvehavere.

Columns:

* Firma
* Org.nr
* Kontaktperson
* Antall biler
* Antall sjåfører
* Status
* Sist oppdatert
* Handling

Example:

* Elite Transport AS
* KJAPP Pilotflåte
* NexoraHub Testflåte

Statuses:

* Godkjent
* Venter
* Mangler dokumentasjon
* Avvist

Create løyvehaver detail panel:

* Firmainfo
* Kontaktperson
* Org.nr
* Biler
* Sjåfører
* Dokumenter
* Godkjenn / Avvis
* Send melding

SCREEN 3: SJÅFØRER

Create driver management screen.

Columns:

* Navn
* Telefon
* E-post
* Flåte
* Bil
* Status
* Dokumentstatus
* Online status
* Handling

Example drivers:

* Amir
* Mathias
* Sara

Statuses:

* Godkjent
* Venter på godkjenning
* Mangler dokumenter
* Suspendert

Driver detail panel:

* Personinfo
* Profilbilde
* Telefon
* E-post
* Flåte
* Valgt bil
* Dokumenter
* Turhistorikk
* Rating
* Godkjenn sjåfør
* Avvis
* Be om mer info
* Suspender

SCREEN 4: BILER

Create vehicle management screen.

Columns:

* Reg.nr
* Modell
* År
* Flåte
* Løyve
* Forsikring
* EU-kontroll
* Status
* Handling

Example vehicles:

* Toyota Corolla · EV 12345 · 2025
* Mercedes EQS · EK 41209 · 2025
* Tesla Model Y · EL 88421 · 2024

Vehicle detail panel:

* Reg.nr
* Modell
* Årsmodell
* Flåte
* Tilknyttede sjåfører
* Vognkort
* Forsikring
* Løyve
* EU-kontroll
* Godkjenn bil
* Avvis
* Be om dokument

SCREEN 5: DOKUMENTER

Create document review queue.

Sections:

* Sjåførdokumenter
* Bildokumenter
* Utløper snart
* Avvist / trenger ny opplasting

Document types:

* Førerkort
* Kjøreseddel
* Profilbilde
* Vognkort
* Forsikring
* Løyve
* EU-kontroll

Each document card:

* Owner
* Type
* Expiry date
* Status
* Preview placeholder
* Approve
* Reject
* Request new upload

SCREEN 6: TURER

Create trip management screen.

Columns:

* Tur-ID
* Kunde
* Sjåfør
* Bil
* Henting
* Destinasjon
* Status
* Pris
* Betaling
* Tidspunkt

Trip statuses:

* Requested
* Offered
* Accepted
* Driver arriving
* Arrived
* In progress
* Completed
* Cancelled
* Failed

Trip detail:

* Timeline
* Customer
* Driver
* Vehicle
* Pickup/destination
* Payment status
* Support cases
* AI messages related to trip

SCREEN 7: LIVE KART

Create admin live map screen.

Purpose:
KJAPP Admin can see pilot operations.

Show:

* Oslo dark map style
* available vehicles
* online drivers
* active trips
* demand zones
* status filter

Filters:

* Ledige biler
* På tur
* Offline
* Dokumentproblem
* Support case

Important:
Use car markers, not random dots.
Vehicle markers should show:

* small car icon
* ETA/status
* driver initials
* vehicle reg

SCREEN 8: SUPPORT

Create KJAPP Support Inbox.

Support case list:

* Case ID
* User type: Kunde / Sjåfør
* Category
* Priority
* Trip ID
* Status
* Created time

Categories:

* Turproblem
* Betaling
* Kvittering
* Mistet eiendel
* Kunde møter ikke opp
* Sikkerhet
* App-feil
* Dokumentproblem

Priorities:

* Lav
* Normal
* Høy
* Kritisk

Support case detail:

* AI summary
* Conversation
* Related trip
* Customer/driver info
* Suggested response
* Assign to admin
* Mark resolved
* Escalate

SCREEN 9: AI-SAKER

Create AI escalation screen.

Purpose:
Aurora Customer, Aurora Driver and Support AI can escalate issues to admin.

Show:

* AI-sak ID
* Source: Customer Aurora / Driver Aurora / Support AI
* Priority
* AI summary
* Required human action
* Status

Examples:

* Betaling feilet
* Kunde/sjåfør konflikt
* Sikkerhet
* Dokument utløper
* No-show dispute

Actions:

* Review
* Assign
* Send response
* Close case

SCREEN 10: BETALING

Create payment overview screen.

Do NOT build real payment integration yet.
This is admin overview only.

Show:

* Betalinger i dag
* Vipps
* Kort
* Apple Pay
* Google Pay
* Mislykkede betalinger
* Refusjoner
* Payout status

Table:

* Trip ID
* Customer
* Amount
* Provider
* Status
* Time
* Action

Statuses:

* Betalt
* Venter
* Feilet
* Refundert

Add note:
“Ekte Stripe/Vipps-integrasjon kommer i fase 5.”

SCREEN 11: RAPPORTER

Create reports screen.

Cards:

* Turer per dag
* Omsetning
* Aktive sjåfører
* Flåteytelse
* Support-saker
* Dokumentstatus

Export actions:

* Eksporter CSV
* Last ned PDF
* Send rapport

SCREEN 12: INNSTILLINGER

Create settings screen.

Sections:

* Adminbrukere
* Roller og tilgang
* Pilotområde
* Varsler
* Integrasjoner
* AI-regler
* GDPR / datalagring
* Systemlogg

Integration settings placeholders:

* Supabase
* Stripe
* Vipps
* Google Maps
* Entur/Ruter
* OpenAI/Aurora
* SMS/WhatsApp
* Instagram
* Spotify

IMPORTANT PRODUCT RULES:

1. Admin approval is required before:

* løyvehaver can operate
* driver can go online
* vehicle can be used
* documents are accepted

2. Driver must be connected to approved fleet.
3. Driver can only use vehicles under that fleet.
4. Customer map must only show available approved online vehicles.
5. Vehicles on active trips must not appear as available.
6. AI cannot approve drivers, vehicles, payments or refunds alone.
7. Critical AI/support cases must be escalated to human admin.

PROTOTYPE REQUIREMENTS:
Make sidebar navigation clickable.
Make table rows open detail panels.
Make approve/reject buttons visible.
Make Live Map use car markers, not random dots.
Make Support and AI escalation screens feel operational.

FINAL OUTPUT:
Create a complete KJAPP Admin Panel prototype with all screens above.
Do not create the fleet owner portal yet.
Do not connect real backend yet.
