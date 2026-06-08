import { LegalScreen, H, P, L } from "../legal/LegalScreen";
import type { Screen } from "../../App";

export function PrivacyPolicy({ go }: { go: (s: Screen) => void }) {
  return (
    <LegalScreen
      title="Personvernerklæring"
      subtitle="Versjon 2026-06-07 · NexoraHub AS"
      onBack={() => go("settings")}
    >
      <P>
        KJAPP er en taxi-tjeneste levert av <strong>NexoraHub AS</strong>{" "}
        (orgnr 914 827 442). Vi tar ditt personvern på alvor og behandler dine
        personopplysninger i henhold til personopplysningsloven og GDPR.
      </P>

      <H>1. Hvem er behandlingsansvarlig</H>
      <P>
        NexoraHub AS, med kontakt-epost{" "}
        <strong>personvern@kjapp.no</strong>, er behandlingsansvarlig for
        personopplysninger som behandles via KJAPP-appen.
      </P>

      <H>2. Hvilke data vi behandler</H>
      <L>
        <li>
          <strong>Kontoinformasjon</strong>: mobilnummer, navn, e-post, valgt
          språk
        </li>
        <li>
          <strong>Lokasjon</strong>: GPS-posisjon ved aktiv tur eller
          adresse-søk
        </li>
        <li>
          <strong>Tur-historikk</strong>: hentepunkt, leveringspunkt, tid, pris,
          MVA, sjåfør-ID
        </li>
        <li>
          <strong>Betalingsdata</strong>: kortinformasjon lagres hos Stripe/Vipps,
          vi mottar kun anonymisert token og siste 4 siffer
        </li>
        <li>
          <strong>Kommunikasjon</strong>: meldinger mellom kunde og sjåfør
          under aktiv tur
        </li>
        <li>
          <strong>Telemetri</strong>: krasj-rapporter, ytelsesdata for å bedre
          appen
        </li>
      </L>

      <H>3. Hvorfor vi behandler dataene</H>
      <L>
        <li>For å levere taxi-tjenesten (avtaleforpliktelse)</li>
        <li>For å oppfylle bokførings- og skatteforpliktelser (Bokføringsloven §10)</li>
        <li>For å forebygge svindel og misbruk (berettiget interesse)</li>
        <li>For å forbedre tjenesten (samtykke)</li>
      </L>

      <H>4. Lagringstid</H>
      <L>
        <li>Aktiv kontoinformasjon: så lenge du har konto</li>
        <li>Tur-historikk: 5 år anonymisert etter sletting (regnskapsplikt)</li>
        <li>GPS-spor fra sjåfører: 30 dager</li>
        <li>Meldinger: 90 dager</li>
        <li>Krasj-rapporter: 90 dager</li>
      </L>

      <H>5. Hvem vi deler data med (databehandlere)</H>
      <L>
        <li>
          <strong>Supabase</strong> (EU, Stockholm) — database og autentisering
        </li>
        <li>
          <strong>Stripe</strong> (Irland) — kortbetaling
        </li>
        <li>
          <strong>Vipps MobilePay AS</strong> (Norge) — mobilbetaling
        </li>
        <li>
          <strong>Google Maps Platform</strong> (Irland) — adresse-søk og ruting
        </li>
        <li>
          <strong>OpenAI</strong> (USA) — Aurora AI-assistent (kun det du
          eksplisitt skriver til assistenten)
        </li>
        <li>
          <strong>LinkMobility</strong> (Norge) — SMS-engangskoder
        </li>
      </L>
      <P>
        Vi har databehandleravtaler med alle leverandører. Overføring til USA
        (OpenAI) skjer under EUs Data Privacy Framework.
      </P>

      <H>6. Dine rettigheter</H>
      <L>
        <li>
          <strong>Innsyn</strong> — Last ned alle dine data fra Innstillinger →
          Personvern → "Last ned mine data"
        </li>
        <li>
          <strong>Sletting</strong> — Innstillinger → "Slett konto". Vi
          anonymiserer turhistorikk og hard-sletter betalingsdata umiddelbart.
          30-dagers angrefrist før permanent sletting.
        </li>
        <li>
          <strong>Korrigering</strong> — Endre navn/e-post i profil
        </li>
        <li>
          <strong>Klage</strong> — Du kan klage til{" "}
          <strong>Datatilsynet</strong> (datatilsynet.no)
        </li>
        <li>
          <strong>Trekke samtykke</strong> — Når som helst i Innstillinger
        </li>
      </L>

      <H>7. Sikkerhet</H>
      <P>
        All trafikk krypteres med TLS 1.3. Data hos Supabase lagres med
        AES-256-kryptering. Row Level Security gjør at sjåfører kun ser turer
        de er tildelt, og kunder kun ser egne data. Tjenestenøkler er aldri
        eksponert i appen.
      </P>

      <H>8. Endringer</H>
      <P>
        Vi varsler om endringer i denne erklæringen i appen og ber om nytt
        samtykke ved vesentlige endringer.
      </P>

      <H>9. Kontakt</H>
      <P>
        Spørsmål? Send e-post til <strong>personvern@kjapp.no</strong>.
      </P>
    </LegalScreen>
  );
}
