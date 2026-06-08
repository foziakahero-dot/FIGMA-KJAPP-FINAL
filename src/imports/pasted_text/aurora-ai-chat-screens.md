STOP. Fix the AI experience only.

Do NOT redesign the app.
Do NOT change colors, branding, bottom navigation, maps, driver screens, customer screens or KJAPP identity.
Do NOT create new unrelated screens.

CURRENT PROBLEM:
Aurora still looks like static suggestion cards.
It is NOT implemented as a real AI chat experience.
KJAPP is supposed to be AI-first, so both customer and driver must have visible AI chat UI.

Your task:
Create proper Aurora AI chat screens and states.

IMPORTANT:
This is a Figma/prototype UI implementation.
Do not build real backend AI.
Do not pretend the AI is technically connected.
Create the correct AI chat interface, states and clickable prototype flows.

PART 1 — CUSTOMER AURORA FULL CHAT SCREEN

Replace the current customer Aurora screen with a real AI chat interface.

Screen title:
“AURORA”

Subtitle:
“Din AI-reiseassistent”

Top:

* Large Aurora orb/avatar
* Status: “På nett”
* Greeting: “Hei Mathilde. Hvor skal du i dag?”

Main chat area:
Show visible chat bubbles.

Example conversation:

User bubble:
“Jeg må rekke T-banen fra Majorstuen.”

Aurora bubble:
“Jeg hjelper deg. Neste avgang går 08:14. Jeg anbefaler KJAPP-henting 07:58 med 9 min buffer.”

Aurora action card:
Title: “Rekk avgangen”
Details:
“Majorstuen T-bane”
“KJAPP-henting 07:58”
“Buffer 9 min”
CTA: “Planlegg tur”

Second example:

User bubble:
“Hva koster tur til Gardermoen?”

Aurora bubble:
“Estimert pris er 699 kr. Vil du se raskeste bil eller planlegge senere henting?”

Action buttons:
“Raskeste bil”
“Planlegg senere”
“Se prisdetaljer”

Bottom input:

* Text input: “Skriv til Aurora…”
* Voice/microphone button
* Send button

Suggested prompt chips above input:

* Bestill taxi hjem
* Rekk neste T-bane
* Planlegg taxi til bussen
* Hva koster tur til Gardermoen?
* Del reisen med familien
* KJAPP + kollektiv

The screen must clearly look like a working AI chat, not just static cards.

PART 2 — CUSTOMER REISE MINI AI CHAT SHEET

On the Reise/Home map screen, when user taps the Aurora orb/search area, open a mini Aurora chat sheet above the map.

Sheet title:
“Aurora”

Show:
User:
“Jeg skal til Maaemo kl. 20.”

Aurora:
“Da anbefaler jeg henting 19:30. Skal jeg bestille Eco?”

Action card:
“Maaemo, Schweigaards gate”
“Henting 19:30”
“Estimert pris 249 kr”

CTA:
“Se turforslag”

Input:
“Skriv til Aurora…”

Keep map visible behind the sheet.

PART 3 — DRIVER AURORA COPILOT CHAT

Add a real compact AI assistant to KJAPP Driver.

Driver Home should include a visible card:

Title:
“Aurora Driver”

Subtitle:
“Din kjøreassistent”

Message:
“Jeg hjelper deg med turer, navigasjon, etterspørsel og dokumentstatus.”

Button:
“Åpne Aurora Driver”

When opened, show compact driver AI chat.

Screen/sheet title:
“Aurora Driver”

Example messages:

Driver:
“Hvor bør jeg vente?”

Aurora Driver:
“Høy aktivitet nær Sentrum. Flytt deg mot Grünerløkka for kortere ventetid.”

Driver:
“Hva er neste steg?”

Aurora Driver:
“Neste steg er å åpne navigasjon til hentestedet.”

Action button:
“Åpne valgt navigasjon”

Driver:
“Dokumentstatus?”

Aurora Driver:
“Forsikring utløper snart. Oppdater dokumentet før fristen.”

Bottom input:
“Skriv til Aurora Driver…”

Quick actions:

* Hvor bør jeg vente?
* Hva er neste steg?
* Åpne valgt navigasjon
* Dokumentstatus
* Rapporter problem
* Kontakt support

PART 4 — DRIVER TRIP AI STATES

During accepted trip, add Aurora Driver state:

Title:
“Aurora Driver”

Message:
“Neste steg: hent Mathilde på Thorvald Meyers gate 41.”

Action:
“Åpne valgt navigasjon”

After pickup:
Message:
“Kunden er hentet. Åpne navigasjon til Maaemo, Schweigaards gate.”

Action:
“Åpne navigasjon til destinasjon”

PART 5 — AI SAFETY / CONFIRMATION RULE

Aurora can suggest actions, but must not complete important actions without confirmation.

For booking:
Aurora must show:
“Skal jeg bekrefte denne turen?”

CTA:
“Bekreft tur”

For cancel:
Aurora must show:
“Vil du avbestille turen?”

CTA:
“Ja, avbestill”

PART 6 — PROTOTYPE CLICKING

Make these clickable:

* Customer bottom nav “Aurora” opens full Aurora chat.
* Reise search/Aurora orb opens mini chat sheet.
* Suggested prompt “Rekk neste T-bane” shows the T-bane answer and action card.
* “Planlegg tur” opens booking confirmation.
* Driver Aurora card opens Driver AI chat.
* Driver quick action “Hva er neste steg?” shows next-step response.
* “Åpne valgt navigasjon” opens navigation choice/state.

PART 7 — VISUAL RULES

Keep:

* premium dark KJAPP style
* cyan/blue/violet glow
* glassmorphism
* Aurora orb
* Norwegian UI
* clean mobility-focused AI

Do NOT:

* make it look like generic ChatGPT
* only show suggestion cards
* hide the input field
* remove message bubbles
* overload with buttons
* use emojis
* create fake backend screens

FINAL OUTPUT:
Return updated AI screens only:

1. Customer full Aurora AI Chat
2. Customer Reise mini AI chat sheet
3. Driver Aurora CoPilot card
4. Driver compact AI chat
5. Driver trip AI states

The result must clearly show that KJAPP has a real AI chat experience in the prototype.
