Fix the KJAPP prototype navigation, driver access and screen scrolling.

Do NOT redesign the app.
Do NOT change the premium dark holographic KJAPP identity.
Do NOT remove existing customer screens, bottom navigation, Aurora, KJAPP Connect, Ruter/Entur, Vipps or Profile.
This is a product structure and prototype navigation fix.

CURRENT PROBLEMS:

1. Driver login is unclear.
2. The app asks for invitation code for driver, but there is no clear distinction between existing driver login and new driver onboarding.
3. It is unclear how to access and scroll to all screens in the prototype.
4. Some screens exist but are not reachable through clickable navigation.

FIX 1: Driver login structure

Create a clear Driver Access flow.

From the public login/welcome screen, the button:
“Sjåfør? Logg inn”

must open a new screen called:

“KJAPP Driver Access”

This screen must show two clear options:

A. Existing driver login
Title:
“Logg inn som sjåfør”

Description:
“For godkjente KJAPP-sjåfører.”

Fields/buttons:

* “Telefonnummer”
* “Send engangskode”
* “Logg inn med BankID” as future/secondary option

Important:
Existing approved drivers should not be forced to enter invitation code every time.

B. New driver onboarding
Title:
“Ny sjåfør?”

Description:
“Har du fått invitasjonskode fra KJAPP?”

Field:
“Invitasjonskode”

CTA:
“Fortsett”

Secondary:
“Jeg har ikke kode”
“Søk om å bli KJAPP-sjåfør”

Explanation text:
“Invitasjonskode brukes kun for beta-onboarding av godkjente sjåfører.”

After successful driver login or invitation code, open:
“KJAPP Driver Dashboard”

FIX 2: Customer Profile distinction

Inside customer Profil, the item:
“Bli sjåfør”

should NOT behave as normal driver login.

It should open:
“Bli KJAPP-sjåfør”

Content:

* “Søk om å kjøre med KJAPP”
* “Last opp dokumentasjon senere”
* “Løyve / kjøreseddel / bilinfo”
* “Har du invitasjonskode?”
* CTA: “Start søknad”
* Secondary: “Har allerede konto? Logg inn som sjåfør”

FIX 3: Create Driver Dashboard placeholder

Create the first driver dashboard screen, but do not build the full driver app yet.

Screen:
“KJAPP Driver”

Show:

* Status toggle: “På nett / Av nett”
* Today earnings: “0 kr i dag”
* Trips today: “0 turer”
* Rating placeholder
* Button: “Vent på tur”
* Button: “Åpne sjåførinnstillinger”

This is only a placeholder for Phase 2.

FIX 4: Prototype Screen Index / Test Menu

Create a hidden/testing screen called:

“KJAPP Prototype Map”

This screen is only for internal prototype testing.

It should list clickable links to every important screen:

Customer:

* Login / Welcome
* Reise Home
* Aurora
* Profil
* KJAPP Connect
* Betaling
* Innstillinger
* Mine turer
* Lagrede steder
* Support
* Rekk avgangen
* Booking confirmation
* Active trip
* Del reisen

Driver:

* Driver Access
* Bli KJAPP-sjåfør
* Driver Dashboard placeholder

Each item must open the correct screen.

Add a small developer/test shortcut button only in prototype mode:
“Prototype Map”
This can be hidden visually or placed discreetly in the corner for testing.

FIX 5: Clickable navigation

Make all relevant buttons clickable:

Public login:

* “Fortsett med Vipps” → Customer Reise Home
* “Utforsk uten konto” → Customer Reise Home guest mode
* “Sjåfør? Logg inn” → Driver Access

Bottom nav:

* Reise → Reise Home
* Aurora → Aurora
* Profil → Profil

Profil menu:

* KJAPP Connect → KJAPP Connect hub
* Mine turer → Mine turer
* Betaling → Betaling
* Lagrede steder → Lagrede steder
* Support → Support
* Innstillinger → Innstillinger
* Bli sjåfør → Bli KJAPP-sjåfør

Reise:

* Rekk avgangen → Rekk avgangen flow
* Destination selection → Booking confirmation
* Bekreft tur → Active trip
* Del reisen → Share trip panel

Driver:

* Existing driver login → Driver Dashboard
* Invitation code continue → Driver Dashboard placeholder
* “Søk om å bli KJAPP-sjåfør” → Bli KJAPP-sjåfør

FIX 6: Real scrolling rules

Every long screen must use real vertical scrolling.

For each long screen:

* Header fixed or clearly visible
* Bottom nav fixed where appropriate
* Main content scrolls vertically
* Last item must be reachable
* No content hidden behind bottom nav
* Add bottom padding equal to nav height + safe area + 24px

Apply this to:

* Profil
* KJAPP Connect
* Aurora
* Betaling
* Innstillinger
* Mine turer
* Support
* Driver Access if needed

Do not fake scroll with visual handles.
Remove all grey side handles, editor rails and preview artifacts.

FIX 7: Prototype scrolling behavior

For every frame that is taller than the mobile viewport:

* Enable vertical scrolling in prototype preview
* Keep width fixed to mobile frame
* Do not create horizontal scrolling
* No clipped top cards
* No clipped bottom content

FINAL OUTPUT:
Return the same KJAPP prototype with:

1. Clear driver login flow
2. Invitation code only for new/beta driver onboarding
3. Customer “Bli sjåfør” separated from driver login
4. Driver Dashboard placeholder
5. Prototype Map / Screen Index to access all screens
6. All screens reachable by clickable navigation
7. Real vertical scrolling on long screens
8. No grey side handles or visual scroll artifacts
