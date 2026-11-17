import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict, isLocale, locales } from "@/lib/i18n";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDict(locale);
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: { languages: { "zh-Hans": "/zh/founding", en: "/en/founding", ms: "/ms/founding" } },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDict(locale);
  return (
    <html lang={t.htmlLang}>
      <body>{children}</body>
    </html>
  );
}
