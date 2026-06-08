Add proper AI chat experiences to KJAPP Customer and KJAPP Driver.

Do NOT redesign the app.
Do NOT remove existing screens.
Do NOT change the premium dark holographic KJAPP identity.
Do NOT make it look like a generic ChatGPT clone.
Keep it premium, Norwegian, simple and mobility-focused.

GOAL:
KJAPP must have real AI interaction, not only static suggestion cards.
Both customer and driver should be able to write or speak to Aurora and receive useful answers.

PART 1: CUSTOMER AURORA AI CHAT

Update the customer Aurora screen into a real AI assistant screen.

Screen title:
“AURORA”

Subtitle:
“Din AI-reiseassistent”

Top:

* Large Aurora orb/avatar
* Greeting:
  “Hei Mathilde. Hvor skal du i dag?”

Main chat area:
Show a short conversation example:

User:
“Jeg må rekke T-banen fra Majorstuen.”

Aurora:
“Jeg kan hjelpe deg. Neste avgang går 08:14. Jeg anbefaler KJAPP-henting 07:58 med 9 min buffer.”

Aurora action card:
“Rekk avgangen”
“Majorstuen T-bane · henting 07:58”
CTA:
“Planlegg tur”

Input area:

* Text input: “Skriv til Aurora…”
* Voice button: microphone icon
* Send button

Suggested prompts:

* “Bestill taxi hjem”
* “Rekk neste T-bane”
* “Planlegg taxi til bussen”
* “Hva koster tur til Gardermoen?”
* “Del reisen med familien”
* “Lag en chill Ride Vibe”
* “Bestill taxi til kalenderavtale”
* “Finn smarteste vei med KJAPP + kollektiv”

Important behavior:
Aurora can suggest trips, routes, times and actions.
Aurora must not confirm payment, book a taxi, cancel a trip or change destination without showing a clear confirmation step.

Confirmation example:
“Skal jeg bekrefte denne turen?”
CTA:
“Bekreft tur”

PART 2: CUSTOMER AI MINI CHAT ON REISE SCREEN

On Reise/Home screen, keep the search bar:
“Hvor skal du?”

Add small Aurora input behavior:

* If user taps the Aurora orb in the search bar, open Aurora chat sheet.
* The chat sheet should slide up above the map.
* It should allow text and voice input.
* It should keep the map visible behind it.

Example:
User writes:
“Jeg skal til Maaemo kl. 20.”

Aurora responds:
“Da anbefaler jeg henting 19:30. Skal jeg bestille Eco?”

CTA:
“Se turforslag”

PART 3: DRIVER AURORA COPILOT CHAT

Add Aurora Driver CoPilot to driver app.

This should NOT be a full social chat.
It should be a professional driver assistant.

Places:

* Driver Home
* Online Map state
* During active trip
* Driver Profile / documents

Add a compact AI card:
Title:
“Aurora Driver”

Subtitle:
“Din kjøreassistent”

Messages depending on state:

Offline:
“Gå på nett når du er klar. Jeg hjelper deg med turer, navigasjon og status.”

Online:
“Høy aktivitet nær Sentrum. Flytt deg mot Grünerløkka for kortere ventetid.”

New trip:
“Ny tur fra Mathilde. Henting er 2 min unna. Betaling med Vipps.”

Accepted trip:
“Neste steg: naviger til hentestedet. Jeg kan åpne valgt navigasjonsapp.”

During trip:
“Neste steg: kjør til Maaemo, Schweigaards gate. Åpne valgt navigasjon ved behov.”

Document alert:
“Forsikring utløper snart. Oppdater dokumentet før fristen.”

Driver input:
Add compact input:
“Skriv til Aurora Driver…”

Quick actions:

* “Åpne valgt navigasjon”
* “Hva er neste steg?”
* “Hvor bør jeg vente?”
* “Rapporter problem”
* “Dokumentstatus”
* “Kontakt support”

PART 4: DRIVER NAVIGATION AI LOGIC

Aurora Driver must support external navigation.

Driver settings:
“Foretrukket navigasjonsapp”
Options:

* Google Maps
* Apple Maps
* Waze

Accepted trip:
Aurora Driver says:
“Jeg kan åpne navigasjon til kunden.”

Button:
“Åpne i valgt navigasjon”

Secondary:

* Google Maps
* Apple Maps
* Waze

After pickup:
Aurora Driver says:
“Kunden er hentet. Jeg kan åpne navigasjon til destinasjonen.”

Button:
“Åpne navigasjon til destinasjon”

Important:
Do not build full turn-by-turn navigation inside KJAPP for MVP.
Use external navigation apps.

PART 5: AI DESIGN RULES

Aurora should feel:

* intelligent
* calm
* premium
* helpful
* not childish
* not overloaded

Use:

* holographic Aurora orb
* glass chat bubbles
* cyan/violet glow
* clean Norwegian text
* strong confirmation cards for real actions

Do NOT:

* make it look like a generic AI chatbot app
* add too many buttons
* let AI perform payment/booking/cancel actions without confirmation
* use emojis
* overload the screen

PART 6: TECHNICAL / PROTOTYPE BEHAVIOR

Make these interactions clickable in prototype:

* Aurora tab opens full customer AI chat
* Search Aurora orb opens mini chat sheet
* Suggested prompt opens example response
* “Planlegg tur” opens booking confirmation
* Driver Aurora card opens compact driver chat
* “Åpne valgt navigasjon” opens navigation choice / accepted trip state
* “Hva er neste steg?” shows next-step response

FINAL OUTPUT:
Return updated KJAPP Customer and Driver AI chat states:

1. Customer full Aurora AI Chat
2. Customer mini Aurora chat sheet on Reise screen
3. Driver Aurora CoPilot card
4. Driver compact AI chat
5. Driver navigation AI states

Keep all existing screens and flows.
Do not redesign the app.
