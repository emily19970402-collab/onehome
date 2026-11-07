// Prices include SST. Source: project decisions (2026-11-07).
export type Plan = {
  id: "starter" | "growth" | "pro";
  name: string;
  priceRM: number;
  period: string;
  highlight?: boolean;
};

export const plans: Plan[] = [
  { id: "starter", name: "Starter", priceRM: 350, period: "per quarter" },
  { id: "growth", name: "Growth", priceRM: 580, period: "per 6 months" },
  { id: "pro", name: "Pro", priceRM: 1100, period: "per year", highlight: true },
];

export const founding = {
  seats: 500,
  priceRM: 699,
  lockYears: 2,
};

export const trialDays = 30;
