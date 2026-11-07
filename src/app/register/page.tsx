import type { Metadata } from "next";
import { founding } from "@/lib/plans";

export const metadata: Metadata = { title: "Founding member pre-registration" };

const fields = [
  { name: "name", label: "Full name", type: "text" },
  { name: "phone", label: "Phone (WhatsApp)", type: "tel" },
  { name: "email", label: "Email", type: "email" },
  { name: "ren", label: "REN / REA number", type: "text" },
  { name: "agency", label: "Agency", type: "text" },
];

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <h1 className="text-3xl font-bold">Become a founding member</h1>
      <p className="mt-2 text-black/70">
        Free pre-registration. The first {founding.seats} agents lock in Pro at
        RM{founding.priceRM}/year for {founding.lockYears} years.
      </p>

      {/* TODO: connect to a server action + database */}
      <form className="mt-8 space-y-4 rounded-lg border border-black/10 bg-white p-6">
        {fields.map((f) => (
          <label key={f.name} className="block">
            <span className="text-sm font-medium">{f.label}</span>
            <input
              name={f.name}
              type={f.type}
              required
              className="mt-1 w-full rounded-md border border-black/15 px-3 py-2"
            />
          </label>
        ))}
        <button
          type="submit"
          disabled
          className="w-full rounded-md bg-brand px-4 py-2 font-medium text-white opacity-60"
        >
          Coming soon
        </button>
      </form>
    </div>
  );
}
