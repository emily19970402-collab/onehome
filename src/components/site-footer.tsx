import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-black/10 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-black/60">
        © {site.name}. {site.tagline}.
      </div>
    </footer>
  );
}
