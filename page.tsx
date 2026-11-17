import Link from "next/link";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { getDict, isLocale } from "@/lib/i18n";
import { Header } from "../Header";

export const dynamic = "force-dynamic";

export default async function ThanksPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDict(locale);
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "";
  const url = host ? `https://${host}/${locale}/founding` : "";
  const share = `https://wa.me/?text=${encodeURIComponent(t.thanks.shareMessage + url)}`;

  return (
    <>
      <Header locale={locale} path="founding/thanks" />
      <main className="wrap section center">
        <h1>{t.thanks.title}</h1>
        <p className="lead">{t.thanks.text}</p>
        <a className="btn btn-wa" href={share} target="_blank" rel="noopener noreferrer">
          {t.thanks.share}
        </a>
        <p>
          <Link href={`/${locale}/founding`}>{t.thanks.back}</Link>
        </p>
      </main>
    </>
  );
}
