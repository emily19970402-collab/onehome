import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/lib/i18n";
import { getSlotsLeft } from "@/lib/slots";
import { Header } from "./Header";
import { PreRegisterForm } from "./PreRegisterForm";

export const revalidate = 60;

export default async function FoundingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDict(locale);
  const slotsLeft = await getSlotsLeft();

  return (
    <>
      <Header locale={locale} />
      <main>
        <section className="hero">
          <div className="wrap">
            <span className="badge">{t.hero.badge}</span>
            <h1>{t.hero.title}</h1>
            <p className="lead">{t.hero.subtitle}</p>
            <p className="price">{t.hero.price}</p>
            <p className="muted">{t.hero.priceNote}</p>
            {slotsLeft !== null && <p className="slots">{t.hero.slotsLeft(slotsLeft)}</p>}
            <a className="btn" href="#register">{t.hero.cta}</a>
          </div>
        </section>

        <section className="wrap section">
          <h2>{t.benefits.title}</h2>
          <div className="grid3">
            {t.benefits.items.map((b) => (
              <div className="card" key={b.title}>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="wrap section">
          <h2>{t.plans.title}</h2>
          <div className="plans">
            {t.plans.items.map((p) => (
              <div className={`card plan${p.highlight ? " plan-hl" : ""}`} key={p.name}>
                <h3>{p.name}</h3>
                <p className="plan-price">
                  {p.price} <span>{p.period}</span>
                </p>
                <p>{p.listings}</p>
                {p.extra && <p className="muted">{p.extra}</p>}
              </div>
            ))}
          </div>
          <p className="muted small">{t.plans.note}</p>
        </section>

        <section className="wrap section" id="register">
          <h2>{t.form.title}</h2>
          <p>{t.form.intro}</p>
          <PreRegisterForm locale={locale} t={t.form} />
        </section>

        <section className="wrap section" id="terms">
          <h2>{t.terms.title}</h2>
          <p className="muted small">{t.terms.draftNote}</p>
          <ol className="terms">
            {t.terms.items.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ol>
        </section>

        <section className="wrap section">
          <h2>{t.faq.title}</h2>
          {t.faq.items.map((f) => (
            <details className="faq" key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </section>
      </main>
      <footer className="footer">
        <div className="wrap">
          <a href="#terms">{t.footer.privacy}</a>
          <span>{t.footer.rights}</span>
        </div>
      </footer>
    </>
  );
}
