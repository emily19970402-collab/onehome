import type { Metadata } from "next";
import Link from "next/link";
import { founding, plans, trialDays } from "@/lib/plans";

export const metadata: Metadata = { title: "Pricing" };

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">Pricing</h1>
      <p className="mt-2 text-black/70">
        All prices include SST. Every plan starts with a {trialDays}-day free trial.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-lg border bg-white p-6 ${
              plan.highlight ? "border-brand ring-2 ring-brand" : "border-black/10"
            }`}
          >
            <h2 className="text-lg font-semibold">{plan.name}</h2>
            <p className="mt-4 text-3xl font-bold">
              RM{plan.priceRM.toLocaleString("en-MY")}
            </p>
            <p className="text-sm text-black/60">{plan.period}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-lg bg-brand/10 p-6">
        <h2 className="font-semibold">Founding member offer</h2>
        <p className="mt-1 text-sm">
          The first {founding.seats} agents get Pro for RM{founding.priceRM} per
          year, price locked for {founding.lockYears} years.
        </p>
        <Link href="/register" className="mt-4 inline-block font-medium text-brand underline">
          Pre-register now
        </Link>
      </div>
    </div>
  );
}
