// Norway taxi pricing helpers
// 12% persontransport-MVA included in price; KJAPP keeps 10% platform fee from net.

export type Tier = "Eco" | "Standard" | "Premium" | "XL";

export const MVA_PERCENT = 12;
export const PLATFORM_FEE_PERCENT = 10;

export function calcFare(opts: {
  baseNok: number;
  perKmNok: number;
  perMinNok: number;
  distanceKm: number;
  durationMin: number;
  surge?: number;
  nightMultiplier?: number;
  weekendMultiplier?: number;
  isNight?: boolean;
  isWeekend?: boolean;
}): number {
  const base = opts.baseNok;
  const dist = opts.perKmNok * opts.distanceKm;
  const time = opts.perMinNok * opts.durationMin;
  let total = base + dist + time;
  if (opts.isNight && opts.nightMultiplier) total *= opts.nightMultiplier;
  if (opts.isWeekend && opts.weekendMultiplier) total *= opts.weekendMultiplier;
  if (opts.surge) total *= opts.surge;
  return Math.round(total * 100) / 100;
}

export function breakdownNok(totalInclMva: number) {
  const net = totalInclMva / (1 + MVA_PERCENT / 100);
  const mva = totalInclMva - net;
  const platformFee = net * (PLATFORM_FEE_PERCENT / 100);
  const driverPayout = net - platformFee;
  return {
    total_incl_mva: round2(totalInclMva),
    net: round2(net),
    mva: round2(mva),
    platform_fee: round2(platformFee),
    driver_payout: round2(driverPayout),
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
