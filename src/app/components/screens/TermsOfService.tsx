import { LegalScreen, H, P, L } from "../legal/LegalScreen";
import type { Screen } from "../../App";

export function TermsOfService({ go }: { go: (s: Screen) => void }) {
  return (
    <LegalScreen
      title="Bruksvilkår"
      subtitle="Versjon 2026-06-07 · NexoraHub AS"
      onBack={() => go("settings")}
    >
      <P>
        Disse vilkårene gjelder bruk av KJAPP-appen levert av NexoraHub AS
        (orgnr 914 827 442).
      </P>

      <H>1. Tjenesten</H>
      <P>
        KJAPP formidler taxi-turer mellom kunder og uavhengige løyvehavere.
        NexoraHub er ikke selv transportør, men plattform for bestilling og
        betaling.
      </P>

      <H>2. Brukerkonto</H>
      <L>
        <li>Du må være minst 16 år for å opprette konto</li>
        <li>Du er ansvarlig for kontoinformasjon og sikker innlogging</li>
        <li>Falsk informasjon kan føre til stenging av konto</li>
      </L>

      <H>3. Bestilling og betaling</H>
      <L>
        <li>
          Pris vises før bestilling og inkluderer 12% MVA (persontransport)
        </li>
        <li>
          Endelig pris kan justeres ved bom, ventetid eller endret rute
        </li>
        <li>Betaling trekkes etter fullført tur via Vipps eller kort</li>
        <li>Kvittering sendes til registrert e-post og er tilgjengelig i appen</li>
      </L>

      <H>4. Avbestilling</H>
      <L>
        <li>Gratis å avbestille før sjåfør har akseptert</li>
        <li>
          Etter aksept: avbestillingsgebyr 50 kr hvis sjåfør er mer enn 2
          minutter unna, ellers 75 kr
        </li>
        <li>"No-show" (kunden møter ikke opp): 100 kr</li>
      </L>

      <H>5. Sjåførens og kundens plikter</H>
      <L>
        <li>Vis respekt og følg norsk lov</li>
        <li>Ikke alkohol- eller rusmisbruk i bilen</li>
        <li>Skader på bil eller eiendom belastes kunden</li>
        <li>
          Sjåfør kan avbryte tur ved truende oppførsel — slike turer faktureres
          ikke
        </li>
      </L>

      <H>6. Tildeling av sjåfør</H>
      <P>
        KJAPP matcher kunder med nærmeste tilgjengelige sjåfør med riktig
        bil-type. Du har ikke garantert ankomst innen estimert tid; ETA er
        veiledende.
      </P>

      <H>7. Klager</H>
      <P>
        Klager sendes via Innstillinger → Support, eller til{" "}
        <strong>support@kjapp.no</strong>. Klage på pris må fremsettes innen 14
        dager.
      </P>

      <H>8. Ansvarsbegrensning</H>
      <P>
        NexoraHub er ikke ansvarlig for skader, forsinkelser eller tap som
        følge av sjåførens utførelse av turen. Slikt ansvar ligger hos
        løyvehaver / sjåfør i henhold til norsk yrkestransportlov og
        forsikring.
      </P>

      <H>9. Endringer</H>
      <P>
        Vi kan endre vilkårene. Endringer varsles i appen og krever nytt
        samtykke ved vesentlige endringer.
      </P>

      <H>10. Lov og verneting</H>
      <P>
        Norsk lov gjelder. Tvister behandles av Oslo tingrett, med mindre
        ufravikelig norsk forbrukerlovgivning bestemmer annet.
      </P>

      <H>11. Kontakt</H>
      <P>
        NexoraHub AS · post@kjapp.no
      </P>
    </LegalScreen>
  );
}
