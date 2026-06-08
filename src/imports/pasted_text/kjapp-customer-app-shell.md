You are now turning the current KJAPP customer home screen into a complete connected customer app shell.

Do NOT redesign the visual identity.
Do NOT remove the current premium dark map style.
Do NOT remove Aurora.
Do NOT remove the live car map.
Do NOT make it generic.

CURRENT ISSUE:
The current screen only shows the Reise/Aurora home state. The rest of the customer app functions are missing, including Profil, Innstillinger, payment, ride history, saved places, support, language/theme settings and account management.

Your task:
Create a complete premium customer app structure for KJAPP with connected screens and navigation.

GLOBAL APP STRUCTURE:

Use a persistent bottom navigation with exactly these 3 tabs:

1. Reise
2. Aurora
3. Profil

The bottom nav must always be visible on normal screens.
It must sit inside the safe area.
It must not be hidden behind the bottom sheet.
It must not disappear when the Aurora panel is collapsed or medium.
Only in special full-screen flows like payment confirmation or active trip can it temporarily be hidden.

FIX CURRENT HOME SCREEN FIRST:

1. Restore persistent bottom navigation
Add bottom nav at the bottom with:
- Reise
- Aurora
- Profil

The active tab should be clearly highlighted with KJAPP cyan/blue glow.
The nav should use premium glassmorphism.
It must be tappable and readable.
Do not use “Skjul” as a tab.

2. Bottom sheet must not cover nav
The Reise/Aurora bottom sheet should sit above the bottom nav.
Use 3 states:
- Collapsed: compact “Hvor skal du?” bar above bottom nav
- Medium: search, quick places, Aurora card, suggested trips
- Full: detailed booking assistant flow

3. Fix clipping
The top status area must not be clipped by the notch.
The bottom nav must not be clipped by the home indicator.
Use iPhone safe-area and Android safe-area.

CUSTOMER APP SCREENS TO CREATE:

A. Reise screen / Home map
This is the current map screen.
Keep:
- Oslo dark map
- live nearby car markers
- top user chip
- KJAPP Oslo chip
- “4 biler i nærheten / Raskeste 2 min”
- Aurora search / booking bottom sheet
- bottom nav

Main functions:
- Search destination
- See nearby cars
- Suggested pickup time
- Quick destinations
- AI suggestions
- Start booking flow

B. Aurora screen
Create a dedicated Aurora assistant screen.

Purpose:
The user can talk to KJAPP AI.

Content:
- Large Aurora orb/avatar
- Greeting: “Hei Mathilde, hvor skal du i dag?”
- Voice input button
- Text input field
- Suggested prompts:
  “Bestill taxi hjem”
  “Når bør jeg dra til flyplassen?”
  “Finn raskeste vei til møte”
  “Planlegg reisen min”
- Recent AI suggestions
- Option to connect calendar/travel preferences later

Style:
Premium dark, holographic cyan/violet.
This screen should feel like the AI core of KJAPP, not a normal chat app.

C. Profil screen
Create a premium profile dashboard.

Top:
- Avatar
- Name: Mathilde
- KJAPP+ badge
- Phone/email placeholder
- Rating or trust status if suitable

Profile menu cards:
1. Mine turer
2. Betaling
3. Lagrede steder
4. KJAPP+
5. Inviter venner
6. Support
7. Innstillinger
8. Bli sjåfør / Sjåfør-login

Use premium glass cards with icons.
Keep the layout clean and mobile-first.

D. Innstillinger screen
Create a settings screen under Profil.

Sections:

1. Konto
- Navn
- Telefon
- E-post
- Slett konto

2. App
- Språk: Norsk / English
- Tema: Auto / Lys / Mørk
- Dynamisk KJAPP-tema: Morgen / Dag / Kveld / Natt
- Varsler: På / Av

3. Sikkerhet
- BankID-verifisering
- Personvern
- Deling av posisjon
- Nødkontakt

4. Reise
- Favoritt hentested
- Lagrede steder
- Standard betaling
- Kvitteringer

5. Juridisk
- Vilkår
- Personvern
- Lisenser

E. Betaling screen
Create a payment screen.

Payment methods:
- Vipps
- Apple Pay
- Google Pay
- Kort
- Faktura/bedrift later

Show Vipps as recommended in Norway.
Add “Legg til betalingsmåte”.
Keep it clean and trustworthy.

F. Mine turer screen
Create ride history.

Tabs:
- Kommende
- Tidligere

Ride cards:
- Destination
- Date/time
- Price
- Driver/car info
- Receipt button

Example rides:
- Maaemo, Schweigaards gate
- Gardermoen
- Operaen

G. Lagrede steder screen
Create saved places.

Cards:
- Hjem
- Jobb
- Treningssenter
- Legg til nytt sted

H. Support screen
Create customer support screen.

Options:
- Chat med support
- Ring KJAPP
- Ofte stilte spørsmål
- Rapporter problem med tur
- Hjelp med betaling
- Sikkerhet

I. Booking confirmation flow
Create a simple booking confirmation state from the Reise screen.

When user chooses destination:
Show:
- Pickup
- Destination
- Estimated arrival
- Estimated price
- Car type
- Payment method
- Confirm button: “Bekreft tur”

Use text:
“Bekreft tur”
“Estimert pris”
“Raskeste bil”
“Betaling med Vipps”

J. Active trip screen
Create active trip screen.

Show:
- Driver approaching
- ETA
- Driver name
- Car model/reg placeholder
- Call/message buttons
- Share trip
- Cancel trip
- Map remains visible

IMPORTANT PRODUCT LOGIC:
KJAPP is not just a taxi clone.
Aurora should assist the customer with:
- booking
- timing
- travel suggestions
- senior-friendly guidance
- calendar-based reminders later
- simple voice-first experience

STYLE REQUIREMENTS:
- Premium dark KJAPP Design 5
- Holographic cyan/blue/violet
- Glassmorphism cards
- Norwegian-first UI
- No emojis
- No childish icons
- No generic Uber clone layout
- Make every screen feel connected to the same design system

MOBILE REQUIREMENTS:
- iPhone 14/15 safe-area
- iPhone SE support
- Android 360x800 support
- 100dvh / 100svh
- No clipping
- No hidden nav
- No horizontal overflow
- Minimum 44px tap targets
- Bottom nav always visible where appropriate

COMPONENTS TO CREATE:
- AppShell
- BottomNavigation
- MapHomeScreen
- AuroraAssistantScreen
- ProfileScreen
- SettingsScreen
- PaymentScreen
- RideHistoryScreen
- SavedPlacesScreen
- SupportScreen
- BookingConfirmationSheet
- ActiveTripScreen
- GlassCard
- KJAPPTopChip
- AuroraOrb
- VehicleMarker
- PrimaryCTA
- SecondaryButton

FINAL OUTPUT:
Deliver a connected customer app prototype with these screens:
1. Reise / Home map
2. Aurora assistant
3. Profil
4. Innstillinger
5. Betaling
6. Mine turer
7. Lagrede steder
8. Support
9. Booking confirmation
10. Active trip

Make the navigation clickable between Reise, Aurora and Profil.
From Profil, menu items should open the relevant screens.
Do not only make one screen.
Do not hide the rest of the functions.
Do not remove the current map concept.
Make this feel like a premium Norwegian AI taxi app ready for beta testing.