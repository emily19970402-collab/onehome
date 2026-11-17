import Link from "next/link";
import { getDict, locales, type Locale } from "@/lib/i18n";

export function Header({ locale, path = "founding" }: { locale: Locale; path?: string }) {
  const t = getDict(locale);
  return (
    <header className="header">
      <div className="wrap header-inner">
        <Link href={`/${locale}/founding`} className="logo" aria-label="One Home">
          <span className="logo-mark" aria-hidden>1</span>
          <span>
            <strong>One Home</strong>
            <small>{t.nav.tagline}</small>
          </span>
        </Link>
        <nav className="lang" aria-label="Language">
          {locales.map((l) => (
            <Link key={l} href={`/${l}/${path}`} aria-current={l === locale ? "page" : undefined}>
              {getDict(l).langName}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
