You are now doing a strict technical layout correction for the KJAPP customer app prototype.

Do NOT redesign the app.
Do NOT change the premium dark holographic KJAPP identity.
Do NOT remove Reise, Aurora, Profil, KJAPP Connect, Vipps, Ruter/Entur, Spotify, Instagram, WhatsApp, Calendar, Wallet or bottom navigation.

The problem is not visual style.
The problem is that screens are not built as real scrollable mobile app screens.

CRITICAL RULE:
Every long screen must use a real scrollable content container.
Do not fake scrolling visually.
Do not clip content.
Do not hide content behind the bottom navigation.
Do not place content outside the phone viewport.

GLOBAL MOBILE LAYOUT RULES:

1. App frame
   Use a real mobile viewport:

* height: 100dvh / 100svh
* width: 100%
* max-width around 430px
* safe-area top and bottom support
* overflow hidden only on the outer app shell

2. Scrollable content
   For long screens:

* header stays at top
* bottom navigation stays fixed at bottom
* main content area must scroll between header and bottom nav
* use overflow-y: auto
* add bottom padding equal to bottom nav height + safe area + 24px
* no menu item should be hidden behind bottom nav

3. Remove artifacts
   Remove all grey vertical side handles, scroll rails, resize handles, preview handles and editor-looking artifacts.
   The app must look like a real phone screen, not a Figma editor frame.

FIX SCREEN 1: PROFIL

The Profil screen is still wrong.

Create this exact structure:

Top safe area
Header row:

* back button
* title: “PROFIL”
* settings button

Scrollable content:

1. Profile hero card

* Avatar
* “Mathilde”
* “KJAPP+”
* optional phone/email placeholder
  This card must be fully visible. It must not be clipped.

2. KJAPP Connect hero card
   Make it larger and more important, not a thin row.

Use:
Title: “KJAPP Connect”
Subtitle: “Musikk, kalender, deling og smarte reiser”
Status row: “Ruter/Entur · Spotify · Instagram · WhatsApp · Kalender”
Badge: “BETA”
Chevron on right

3. Menu cards:

* Mine turer
* Betaling
* Lagrede steder
* KJAPP+
* Inviter venner
* Support
* Innstillinger
* Bli sjåfør
* Logg ut

The full list must be scrollable.
“Logg ut” must be reachable and not hidden.

Fixed bottom nav:

* Reise
* Aurora
* Profil

FIX SCREEN 2: KJAPP CONNECT

Make KJAPP Connect a real scrollable screen.

Header:

* Back button
* title: “KJAPP CONNECT”

Intro text:
“Koble reisen din til musikk, kalender, kollektiv, deling og smarte varsler.”

Scrollable integration list:

1. Ruter / Entur — Rekk avgangen
   Status: “Kommer snart”
   Description: “KJAPP + T-bane, buss, trikk, tog og båt.”

2. WhatsApp / SMS — Del reisen
   Status: “Aktiv”
   Description: “Del live-tur, ETA og sjåførinfo trygt.”

3. Instagram — Beta Share
   Status: “Koble til”
   Description: “Inviter venner og få velkomstbonus.”

4. Spotify — Ride Vibe
   Status: “Koble til”
   Description: “Tilpass stemningen på reisen.”

5. Kalender — Aurora planlegger
   Status: “Koble til”
   Description: “Foreslå henting basert på avtaler.”

6. Wallet — KJAPP Beta Pass
   Status: “Kommer snart”
   Description: “Beta-kreditt, rabattkode og KJAPP+.”

7. Flyplass — Gardermoen Assist
   Status: “Kommer snart”
   Description: “Aurora følger flytid og anbefaler henting.”

8. Google / Apple Maps — Sjåførnavigasjon
   Status: “Aktiv”
   Description: “Ekstern navigasjon for sjåfører.”

9. Vipps / Betaling
   Status: “Aktiv”
   Description: “Rask og trygg betaling for Norge.”

10. Senior / Familie-modus
    Status: “Kommer snart”
    Description: “Enklere reiser, trygg deling og Aurora-hjelp.”

No title should be cut off badly.
If text is too long, use a clean second line, not ugly truncation.
The last card must be fully reachable by scrolling.

FIX SCREEN 3: AURORA

Keep the current Aurora design, but make content structurally correct.

Use:

* Fixed top header area
* Main scrollable content for orb and prompt cards
* Fixed bottom input above bottom nav
* Fixed bottom nav

Prompt cards must not clip horizontally.
Use a two-column grid or horizontal scroll chips.
Make sure all prompts are tappable.

Suggested prompts:

* Rekk neste T-bane
* Planlegg taxi til bussen
* Del reisen med familien
* Lag en chill Ride Vibe
* Bestill taxi til kalenderavtale
* Følg flytiden min
* Finn smarteste vei med KJAPP + kollektiv
* Hvordan er trafikken?
* Plan for helga

FIX SCREEN 4: BETALING

Create a full payment management screen opened from Profil → Betaling.

Title:
“Betaling”

Subtitle:
“Administrer betalingsmåter og kvitteringer.”

Primary recommended method card:
“Vipps”
“Anbefalt for Norge”
Status: “Aktiv / Koble til”

Payment method cards:

1. Vipps

* “Rask betaling med Vipps”
* Button: “Koble til Vipps”

2. Kort

* “Legg til betalingskort”
* Button: “Legg til kort”

3. Apple Pay

* “Tilgjengelig på iPhone”
* Status: “Koble til”

4. Google Pay

* “Tilgjengelig på Android”
* Status: “Koble til”

5. Standard betalingsmåte

* “Velg standard betaling for turer”

6. Kvitteringer

* “Se og last ned kvitteringer”

7. Bedrift / faktura

* “Kommer snart”

Important payment logic:
Do not create a fake custom card input form.
Do not show raw card number storage.
Use a secure provider handoff later, such as Stripe Payment Sheet or equivalent.
The app should only show saved/tokenized payment methods, masked card info, and safe “Legg til” actions.

Example saved card:
“Visa •••• 4242”
“Utløper 08/28”

Show CTA:
“Legg til betalingsmåte”

FIX SCREEN 5: INNSTILLINGER

Make sure Innstillinger is reachable from Profil.

Include sections:

* Konto
* App
* Språk: Norsk / English
* Tema: Auto / Lys / Mørk
* Dynamisk KJAPP-tema: Morgen / Dag / Kveld / Natt
* Varsler
* Sikkerhet
* Personvern
* Deling av posisjon
* Integrasjoner
* Juridisk

FINAL QA CHECK:

Check all screens:

* Profil
* KJAPP Connect
* Aurora
* Betaling
* Innstillinger
* Reise

For each screen verify:

1. Top content is not clipped.
2. Bottom content is not hidden behind bottom nav.
3. Long content scrolls.
4. Last item is reachable.
5. No grey side handles.
6. Bottom nav is fixed and safe-area correct.
7. Text is readable.
8. No horizontal overflow.
9. Works on iPhone SE, iPhone 14/15, Android 360x800 and Android 393x873.

FINAL OUTPUT:
Return the corrected KJAPP customer prototype.
Focus on real mobile layout and scroll behavior.
Do not add driver screens yet.
