import Link from "next/link";
import { founding, trialDays } from "@/lib/plans";

export default function HomePage() {
  return (
    <>
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Get your listings seen across Malaysia
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-black/70">
            One Home gives property agents a professional page, listings that
            buyers can find, and simple pricing. Try it free for {trialDays} days.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/register"
              className="rounded-md bg-brand px-6 py-3 font-medium text-white hover:opacity-90"
            >
              Pre-register as a founding member
            </Link>
            <Link
              href="/listings"
              className="rounded-md border border-black/15 px-6 py-3 font-medium hover:bg-black/5"
            >
              Browse listings
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:grid-cols-3">
        {[
          ["Agent profile", "A professional page with your REN number, areas and contact."],
          ["Listings", "Post sale and rental listings with photos and details."],
          ["Founding offer", `First ${founding.seats} agents: Pro for RM${founding.priceRM}/year, locked for ${founding.lockYears} years.`],
        ].map(([title, body]) => (
          <div key={title} className="rounded-lg border border-black/10 bg-white p-6">
            <h2 className="font-semibold">{title}</h2>
            <p className="mt-2 text-sm text-black/70">{body}</p>
          </div>
        ))}
      </section>
    </>
  );
}
