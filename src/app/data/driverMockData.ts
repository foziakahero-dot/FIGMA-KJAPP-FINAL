export const driverProfile = {
  name: "Jonas Berg",
  firstName: "Jonas",
  initial: "J",
  rating: 4.99,
  trips: 3812,
  car: "Mercedes EQS · EK 41209",
  level: "Diamant-sjåfør",
  kjøreseddel: { id: "KS-92841", validUntil: "2027-04-12", status: "Gyldig" },
  orgnr: "924 015 832",
};

export const todayStats = {
  earnings: 2840,
  goal: 3500,
  trips: 11,
  hours: 6.2,
  acceptanceRate: 96,
  rating: 4.99,
  drivingTime: 4.5, // sammenhengende kjøretid (timer) — Yrkestransportloven 4.5t maks før pause
  mva: 568,         // 25 % av netto
  netto: 2272,
};

export const earningsHourly = [
  { h: "08", kr: 220 },
  { h: "09", kr: 380 },
  { h: "10", kr: 290 },
  { h: "11", kr: 410 },
  { h: "12", kr: 520 },
  { h: "13", kr: 470 },
  { h: "14", kr: 550 },
];

export const driverAuroraTips = [
  {
    type: "hotspot",
    title: "Hot zone om 8 min",
    body: "Aker Brygge — fredagslunsj er i gang. 14 aktive forespørsler nå, kun 6 sjåfører i nærheten.",
    cta: "Naviger dit",
  },
  {
    type: "break",
    title: "Pause om 25 min?",
    body: "Du har kjørt 2t 15min sammenhengende. Sognsvann-rundkjøringen har gratis lading + kafé.",
    cta: "Planlegg pause",
  },
  {
    type: "earn",
    title: "Bonus aktivert",
    body: "Tjen 250 kr ekstra hvis du fullfører 3 turer før 18:00. Du er på god vei.",
    cta: "Vis detaljer",
  },
];

export const driverSelf = { x: 195, y: 245 }; // sjåførens egen posisjon på Oslo-kartet

// Sjåføren er invitert av en flåteeier — kan aldri registrere seg selv
export const fleet = {
  name: "Oslo Taxi Sentralen AS",
  orgnr: "924 015 832",
  invitedBy: "Lars Hagen",
  invitedAt: "2025-11-08",
  contactPhone: "+47 22 38 80 90",
  cars: [
    { id: "car-1", model: "Mercedes EQS", plate: "EK 41209", year: 2025, color: "Midnattsblå", tier: "Premium", active: true, status: "Tilgjengelig" },
    { id: "car-2", model: "Tesla Model Y", plate: "EL 88421", year: 2024, color: "Grafittgrå", tier: "Eco", active: false, status: "Tilgjengelig" },
    { id: "car-3", model: "Volkswagen ID. Buzz", plate: "EK 22107", year: 2024, color: "Hvit/blå", tier: "XL", active: false, status: "På verksted" },
    { id: "car-4", model: "BMW i7", plate: "EK 90021", year: 2025, color: "Sort", tier: "Premium", active: false, status: "Brukes av annen sjåfør" },
  ],
};

export const hotZones = [
  { id: "hz1", x: 245, y: 215, intensity: "Høy", demand: 14, label: "Aker Brygge" },
  { id: "hz2", x: 125, y: 175, intensity: "Middels", demand: 7, label: "Grünerløkka" },
  { id: "hz3", x: 290, y: 105, intensity: "Lav", demand: 3, label: "Tøyen" },
];

export const incomingRide = {
  pickup: "Thorvald Meyers gate 41, Grünerløkka",
  destination: "Maaemo, Schweigaards gate 15",
  distance: "4.2 km",
  duration: "12 min",
  fare: 219,
  surge: 1.0,
  passenger: { name: "Mathilde", rating: 4.97 },
  countdown: 12,
};
