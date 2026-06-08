export const user = {
  name: "Mathilde",
  initial: "M",
  member: "Kjapp+",
  rating: 4.97,
  trips: 142,
  savedPlaces: [
    { id: "home", label: "Hjem", address: "Thorvald Meyers gate 41, Grünerløkka", icon: "home" },
    { id: "work", label: "Jobb", address: "Aker Brygge 12, 0250 Oslo", icon: "briefcase" },
    { id: "gym", label: "SATS Majorstuen", address: "Kirkeveien 64B", icon: "dumbbell" },
  ],
};

export const suggestions = [
  { id: "1", place: "Gardermoen", note: "SK4421 kl. 19:40 — dra 17:05", time: "17:05", co2: 9.4 },
  { id: "2", place: "Maaemo, Schweigaards gate", note: "Bordet ditt kl. 20:00", time: "19:30", co2: 0.6 },
  { id: "3", place: "Operaen", note: "I kalenderen din i kveld", time: "18:15", co2: 0.9 },
  { id: "4", place: "Grünerløkka", note: "Vanlig fredagsrute", time: "—", co2: 0.4 },
];

export const carOptions = [
  { id: "eco", name: "Kjapp Eco", desc: "El-bil · 0 g CO₂", eta: "3 min", price: 189, icon: "zap", co2: 0 },
  { id: "std", name: "Kjapp Standard", desc: "1–4 personer", eta: "2 min", price: 219, icon: "car", co2: 0.6 },
  { id: "prem", name: "Kjapp Premium", desc: "Mercedes EQS · stille", eta: "5 min", price: 389, icon: "gem", co2: 0 },
  { id: "xl", name: "Kjapp XL", desc: "Plass til 6 · bagasje", eta: "7 min", price: 329, icon: "truck", co2: 0.9 },
];

export const driver = {
  name: "Jonas Berg",
  rating: 4.99,
  trips: 3812,
  car: "Mercedes EQS",
  plate: "EK 41209",
  color: "Midnattsblå",
  eta: 3,
};

export const auroraIntro = [
  "Hei Mathilde.",
  "Du har bord på Maaemo kl. 20:00.",
  "Skal jeg hente deg 19:30?",
];

export const auroraQuickReplies = [
  "Rekk neste T-bane",
  "Planlegg taxi til bussen",
  "Del reisen med familien",
  "Lag en chill Ride Vibe",
  "Bestill taxi til kalenderavtale",
  "Følg flytiden min",
  "Finn smarteste vei med KJAPP + kollektiv",
  "Hvordan er trafikken?",
  "Plan for helga",
];

export const auroraResponses: Record<string, string> = {
  vits: "Hvorfor søkte T-banen jobb som komiker? Den hadde alltid gode linjer.",
  nyheter: "Tre korte fra Oslo: ny gangbro i Bjørvika neste måned, Vigeland-utstillingen forlenges til august, og 18 °C og klart i kveld. Fint vær på Sørenga.",
  restaurant: "Hrímnir Ramen på Løkka — 12 min unna, ledig bord 19:15. Eller Smalhans, plass kl 20 om du vil sitte stille.",
  trafikk: "E18 vestover går greit. Litt kø på Ring 3 ved Sinsen — jeg tar deg via Trondheimsveien. Sparer 6 minutter.",
  helg: "Lørdag: bryllup hos Sofie kl 14, retur 23:30 er booket. Søndag: tur til Sognsvann, 22 °C og sol. Skal jeg holde av brunsj 11?",
  ruter: "T-banelinje 5 går fra Carl Berner om 4 min — Kjapp henter deg på Stortinget 17:42. Du kommer fram likt og sparer 84 kr.",
};

export const availableCars = [
  { id: "c1", x: 150, y: 200, eta: 2, tier: "Standard", plate: "EK 41209" },
  { id: "c2", x: 240, y: 260, eta: 4, tier: "Eco", plate: "EL 88421" },
  { id: "c3", x: 95, y: 290, eta: 5, tier: "Standard", plate: "EK 22107" },
  { id: "c4", x: 295, y: 175, eta: 6, tier: "Premium", plate: "EK 90021" },
];

export const rideHistory = [
  { id: "r1", from: "Hjem", to: "Aker Brygge", date: "I går", price: 219 },
  { id: "r2", from: "Tøyen T", to: "Gardermoen", date: "Mandag", price: 689 },
  { id: "r3", from: "Operaen", to: "Hjem", date: "Lørdag", price: 245 },
];
