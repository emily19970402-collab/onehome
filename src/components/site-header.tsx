import Link from "next/link";
import { nav, site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="border-b border-black/10 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-brand">
          {site.name}
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-brand">
              {item.label}
            </Link>
          ))}
          <Link
            href="/register"
            className="rounded-md bg-brand px-4 py-2 font-medium text-white hover:opacity-90"
          >
            Join free
          </Link>
        </nav>
      </div>
    </header>
  );
}
