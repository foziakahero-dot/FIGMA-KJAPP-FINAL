import { ChevronRight, User, Zap } from "lucide-react";
import { SubScreen } from "../SubScreen";
import type { Screen } from "../../App";

type ScreenLink = {
  screen: Screen;
  label: string;
  category: "customer" | "driver";
};

const SCREENS: ScreenLink[] = [
  // Customer
  { screen: "signin", label: "Login / Welcome", category: "customer" },
  { screen: "home", label: "Reise Home", category: "customer" },
  { screen: "chat", label: "Aurora", category: "customer" },
  { screen: "profile", label: "Profil", category: "customer" },
  { screen: "connect", label: "KJAPP Connect", category: "customer" },
  { screen: "payment", label: "Betaling", category: "customer" },
  { screen: "settings", label: "Innstillinger", category: "customer" },
  { screen: "history", label: "Mine turer", category: "customer" },
  { screen: "places", label: "Lagrede steder", category: "customer" },
  { screen: "support", label: "Support AI (KJAPP Support)", category: "customer" },
  { screen: "support-inbox", label: "Support Inbox", category: "customer" },
  { screen: "rekk-avgangen", label: "Rekk avgangen", category: "customer" },
  { screen: "book", label: "Booking confirmation", category: "customer" },
  { screen: "track", label: "Customer Active Trip (Spor sjåfør)", category: "customer" },
  { screen: "complete", label: "Trip complete", category: "customer" },
  { screen: "voice", label: "Voice mode", category: "customer" },
  { screen: "ar-pickup", label: "AR Pickup", category: "customer" },
  { screen: "ride-chat", label: "Ride chat", category: "customer" },

  // Driver
  { screen: "driver-access", label: "Driver Access (Login / Invitasjon)", category: "driver" },
  { screen: "driver-onboarding", label: "Driver Onboarding (Ny sjåfør)", category: "driver" },
  { screen: "become-driver", label: "Bli KJAPP-sjåfør (Søk)", category: "driver" },
  { screen: "driver", label: "Driver Dashboard (Hjem)", category: "driver" },
  { screen: "driver-aurora-chat", label: "Aurora Driver AI Chat", category: "driver" },
  { screen: "driver-trip-request", label: "New Trip Request (Innkommende tur)", category: "driver" },
  { screen: "driver-navigate", label: "Navigate to Pickup (Hent kunde)", category: "driver" },
  { screen: "driver-arrived", label: "Arrived / Pickup (Fremme)", category: "driver" },
  { screen: "driver-trip-active", label: "Trip In Progress (Tur startet)", category: "driver" },
  { screen: "driver-trip-complete", label: "Trip Completed (Tur fullført)", category: "driver" },
  { screen: "driver-trips", label: "Turer (Aktiv / I dag / Tidligere)", category: "driver" },
  { screen: "driver-earnings", label: "Inntekt (Økonomi)", category: "driver" },
  { screen: "driver-profile", label: "Driver Profil (Amir)", category: "driver" },
  { screen: "driver-support", label: "Driver Support AI (Eskalering)", category: "driver" },
];

export function PrototypeMap({ go }: { go: (s: Screen) => void }) {
  const customerScreens = SCREENS.filter((s) => s.category === "customer");
  const driverScreens = SCREENS.filter((s) => s.category === "driver");

  return (
    <SubScreen title="Prototype Map" onBack={() => go("home")} background>
      <div className="space-y-4 pb-4">
        <div
          className="text-center text-white/65"
          style={{ fontSize: 12, lineHeight: 1.4 }}
        >
          Test/development screen for navigating to all prototype screens
        </div>

        {/* Customer screens */}
        <div>
          <div className="flex items-center gap-2 mb-2 px-1">
            <User className="w-4 h-4 text-[var(--aurora-cyan)]" />
            <span
              className="text-white/65 font-display uppercase"
              style={{ fontSize: 10, letterSpacing: "0.22em" }}
            >
              Customer Screens
            </span>
          </div>
          <div className="space-y-1">
            {customerScreens.map((s) => (
              <button
                key={s.screen}
                onClick={() => go(s.screen)}
                className="w-full glass-panel rounded-2xl px-3.5 py-2.5 flex items-center justify-between text-left active:scale-[0.99] transition"
              >
                <span className="text-white" style={{ fontSize: 13 }}>
                  {s.label}
                </span>
                <ChevronRight className="w-4 h-4 text-white/40" />
              </button>
            ))}
          </div>
        </div>

        {/* Driver screens */}
        <div>
          <div className="flex items-center gap-2 mb-2 px-1">
            <Zap className="w-4 h-4 text-[#ffb547]" />
            <span
              className="text-white/65 font-display uppercase"
              style={{ fontSize: 10, letterSpacing: "0.22em" }}
            >
              Driver Screens
            </span>
          </div>
          <div className="space-y-1">
            {driverScreens.map((s) => (
              <button
                key={s.screen}
                onClick={() => go(s.screen)}
                className="w-full glass-panel rounded-2xl px-3.5 py-2.5 flex items-center justify-between text-left active:scale-[0.99] transition"
              >
                <span className="text-white" style={{ fontSize: 13 }}>
                  {s.label}
                </span>
                <ChevronRight className="w-4 h-4 text-white/40" />
              </button>
            ))}
          </div>
        </div>

        <div
          className="mt-4 text-center text-white/45 font-mono"
          style={{ fontSize: 9, letterSpacing: "0.2em" }}
        >
          INTERNAL PROTOTYPE TESTING ONLY
        </div>
      </div>
    </SubScreen>
  );
}
