import type { Metadata } from "next";

export const metadata: Metadata = { title: "Listings" };

export default function ListingsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">Listings</h1>
      <p className="mt-2 text-black/70">
        Property search and listing cards will go here.
      </p>
    </div>
  );
}
