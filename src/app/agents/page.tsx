import type { Metadata } from "next";

export const metadata: Metadata = { title: "Agents" };

export default function AgentsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">Find an agent</h1>
      <p className="mt-2 text-black/70">
        Agent directory and profiles will go here.
      </p>
    </div>
  );
}
