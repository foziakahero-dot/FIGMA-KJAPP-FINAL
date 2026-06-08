import { createHashRouter, Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLocation } from "react-router";
import { DeviceFrame } from "./components/DeviceFrame";
import { useGo } from "./lib/router-nav";

import { Splash } from "./components/screens/Splash";
import { SignIn } from "./components/screens/SignIn";
import { Home } from "./components/screens/Home";
import { BookRide } from "./components/screens/BookRide";
import { AuroraChat } from "./components/screens/AuroraChat";
import { TrackDriver } from "./components/screens/TrackDriver";
import { RideComplete } from "./components/screens/RideComplete";
import { Profile } from "./components/screens/Profile";
import { DriverHome } from "./components/screens/DriverHome";
import { DriverRide } from "./components/screens/DriverRide";
import { DriverProfile } from "./components/screens/DriverProfile";
import { RideChat } from "./components/screens/RideChat";
import { VoiceMode } from "./components/screens/VoiceMode";
import { ARPickup } from "./components/screens/ARPickup";
import { DriverSignIn } from "./components/screens/DriverSignIn";
import { Settings } from "./components/screens/Settings";
import { Payment } from "./components/screens/Payment";
import { RideHistory } from "./components/screens/RideHistory";
import { SavedPlaces } from "./components/screens/SavedPlaces";
import { Support } from "./components/screens/Support";
import { KjappConnect } from "./components/screens/KjappConnect";
import { RekkAvgangen } from "./components/screens/RekkAvgangen";
import { DriverAccess } from "./components/screens/DriverAccess";
import { BecomeDriver } from "./components/screens/BecomeDriver";
import { PrototypeMap } from "./components/screens/PrototypeMap";
import { DriverTripRequest } from "./components/screens/DriverTripRequest";
import { DriverNavigate } from "./components/screens/DriverNavigate";
import { DriverTripActive } from "./components/screens/DriverTripActive";
import { DriverTripComplete } from "./components/screens/DriverTripComplete";
import { DriverTrips } from "./components/screens/DriverTrips";
import { DriverEarnings } from "./components/screens/DriverEarnings";
import { DriverAuroraChat } from "./components/screens/DriverAuroraChat";
import { DriverOnboarding } from "./components/screens/DriverOnboarding";
import { DriverArrived } from "./components/screens/DriverArrived";
import { DriverSupportChat } from "./components/screens/DriverSupportChat";
import { SupportInbox } from "./components/screens/SupportInbox";
import { DriverOnlineMap } from "./components/screens/DriverOnlineMap";
import { DriverPrototypeMap } from "./components/screens/DriverPrototypeMap";
import { DriverVehicleSelect } from "./components/screens/DriverVehicleSelect";
import { DriverNavAppSettings } from "./components/screens/DriverNavAppSettings";
import { DriverCommunicationSettings } from "./components/screens/DriverCommunicationSettings";
import { DriverAISettings } from "./components/screens/DriverAISettings";
import { DriverAIPolicy } from "./components/screens/DriverAIPolicy";
import { DriverLocationSettings } from "./components/screens/DriverLocationSettings";
import { DriverConsent } from "./components/screens/DriverConsent";
import { RoleSelect } from "./components/screens/RoleSelect";
import { ExportCenter } from "./components/screens/ExportCenter";
import { LoyvehaverRegister } from "./components/screens/LoyvehaverRegister";
import { FleetDashboard } from "./components/screens/FleetDashboard";
import { SuperAdminInbox } from "./components/screens/SuperAdminInbox";
import { PrivacyPolicy } from "./components/screens/PrivacyPolicy";
import { TermsOfService } from "./components/screens/TermsOfService";
import { DataExport } from "./components/screens/DataExport";
import { ConsentModal } from "./components/legal/ConsentModal";

/** Adapter: render a screen that takes `go` prop, injecting the router-backed shim. */
function Screen({ Component }: { Component: React.ComponentType<{ go: any }> }) {
  const go = useGo();
  return <Component go={go} />;
}

function SplashRoute() {
  const navigate = useNavigate();
  return <Splash onContinue={() => navigate("/signin", { replace: true })} />;
}

function RideChatCustomer() {
  const go = useGo();
  return <RideChat go={go} role="customer" />;
}
function RideChatDriver() {
  const go = useGo();
  return <RideChat go={go} role="driver" />;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // best-effort: the scrollable element is inside the screen — this handles window-level
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function RootLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const hideConsentOn = ["/", "/signin", "/role", "/driver/signin", "/driver/access"];
  const showConsent = !hideConsentOn.includes(pathname);
  return (
    <DeviceFrame>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0"
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
      {showConsent && (
        <ConsentModal
          navigateTo={(t) => navigate(t === "privacy" ? "/legal/privacy" : "/legal/terms")}
        />
      )}
    </DeviceFrame>
  );
}

export const router = createHashRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: SplashRoute },
      { path: "role", element: <Screen Component={RoleSelect} /> },
      { path: "signin", element: <Screen Component={SignIn} /> },
      { path: "home", element: <Screen Component={Home} /> },
      { path: "book", element: <Screen Component={BookRide} /> },
      { path: "aurora", element: <Screen Component={AuroraChat} /> },
      { path: "track", element: <Screen Component={TrackDriver} /> },
      { path: "complete", element: <Screen Component={RideComplete} /> },
      { path: "profile", element: <Screen Component={Profile} /> },
      { path: "voice", element: <Screen Component={VoiceMode} /> },
      { path: "ar-pickup", element: <Screen Component={ARPickup} /> },
      { path: "history", element: <Screen Component={RideHistory} /> },
      { path: "connect", element: <Screen Component={KjappConnect} /> },
      { path: "rekk-avgangen", element: <Screen Component={RekkAvgangen} /> },
      { path: "become-driver", element: <Screen Component={BecomeDriver} /> },
      { path: "_debug/map", element: <Screen Component={PrototypeMap} /> },
      { path: "export", element: <Screen Component={ExportCenter} /> },
      { path: "loyvehaver/registrer", element: <Screen Component={LoyvehaverRegister} /> },
      { path: "loyvehaver/flate", element: <Screen Component={FleetDashboard} /> },
      { path: "super-admin/inbox", element: <Screen Component={SuperAdminInbox} /> },

      { path: "ride/chat", Component: RideChatCustomer },
      { path: "driver/chat", Component: RideChatDriver },

      { path: "settings", element: <Screen Component={Settings} /> },
      { path: "settings/payment", element: <Screen Component={Payment} /> },
      { path: "settings/places", element: <Screen Component={SavedPlaces} /> },
      { path: "settings/support", element: <Screen Component={Support} /> },
      { path: "settings/data-export", element: <Screen Component={DataExport} /> },
      { path: "legal/privacy", element: <Screen Component={PrivacyPolicy} /> },
      { path: "legal/terms", element: <Screen Component={TermsOfService} /> },

      { path: "driver", element: <Screen Component={DriverHome} /> },
      { path: "driver/signin", element: <Screen Component={DriverSignIn} /> },
      { path: "driver/access", element: <Screen Component={DriverAccess} /> },
      { path: "driver/online", element: <Screen Component={DriverOnlineMap} /> },
      { path: "driver/ride", element: <Screen Component={DriverRide} /> },
      { path: "driver/profile", element: <Screen Component={DriverProfile} /> },
      { path: "driver/request", element: <Screen Component={DriverTripRequest} /> },
      { path: "driver/navigate", element: <Screen Component={DriverNavigate} /> },
      { path: "driver/active", element: <Screen Component={DriverTripActive} /> },
      { path: "driver/complete", element: <Screen Component={DriverTripComplete} /> },
      { path: "driver/trips", element: <Screen Component={DriverTrips} /> },
      { path: "driver/earnings", element: <Screen Component={DriverEarnings} /> },
      { path: "driver/aurora", element: <Screen Component={DriverAuroraChat} /> },
      { path: "driver/arrived", element: <Screen Component={DriverArrived} /> },
      { path: "driver/support", element: <Screen Component={DriverSupportChat} /> },
      { path: "driver/support/inbox", element: <Screen Component={SupportInbox} /> },
      { path: "driver/_debug/map", element: <Screen Component={DriverPrototypeMap} /> },

      { path: "driver/onboarding", element: <Screen Component={DriverOnboarding} /> },
      { path: "driver/onboarding/vehicle", element: <Screen Component={DriverVehicleSelect} /> },
      { path: "driver/onboarding/consent", element: <Screen Component={DriverConsent} /> },

      { path: "driver/settings/nav-app", element: <Screen Component={DriverNavAppSettings} /> },
      { path: "driver/settings/communication", element: <Screen Component={DriverCommunicationSettings} /> },
      { path: "driver/settings/ai", element: <Screen Component={DriverAISettings} /> },
      { path: "driver/settings/ai-policy", element: <Screen Component={DriverAIPolicy} /> },
      { path: "driver/settings/location", element: <Screen Component={DriverLocationSettings} /> },

      { path: "*", element: <Screen Component={Home} /> },
    ],
  },
]);
