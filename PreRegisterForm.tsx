"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Dict, Locale } from "@/lib/i18n";
import { REG_TYPES } from "@/lib/validation";

type Props = { locale: Locale; t: Dict["form"] };

export function PreRegisterForm({ locale, t }: Props) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [badFields, setBadFields] = useState<string[]>([]);
  const [ref, setRef] = useState("");

  // 邀请链接 ?ref=XXXX 自动带入邀请码
  useEffect(() => {
    setRef(new URLSearchParams(window.location.search).get("ref") ?? "");
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setBadFields([]);
    const f = new FormData(e.currentTarget);
    const payload = {
      name: f.get("name"),
      regType: f.get("regType"),
      regNo: f.get("regNo"),
      agency: f.get("agency"),
      agencyENo: f.get("agencyENo") ?? "",
      whatsapp: f.get("whatsapp"),
      area: f.get("area"),
      locale: f.get("language") ?? locale,
      refCode: f.get("refCode") ?? "",
      pdpaConsent: f.get("pdpa") === "on",
      marketingConsent: f.get("marketing") === "on",
      website: f.get("website") ?? "",
    };
    try {
      const res = await fetch("/api/preregister", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        router.push(`/${locale}/founding/thanks`);
        return;
      }
      setBadFields(Array.isArray(json.fields) ? json.fields : []);
      setError(t.errors[json.error as string] ?? t.errors.generic);
    } catch {
      setError(t.errors.generic);
    } finally {
      setSubmitting(false);
    }
  }

  const bad = (name: string) => (badFields.includes(name) ? "field bad" : "field");

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <label className={bad("name")}>
        <span>{t.name} *</span>
        <input name="name" required autoComplete="name" maxLength={120} />
      </label>

      <div className="row">
        <label className={bad("regType")}>
          <span>{t.regType} *</span>
          <select name="regType" required defaultValue="REN">
            {REG_TYPES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </label>
        <label className={bad("regNo")}>
          <span>{t.regNo} *</span>
          <input name="regNo" required maxLength={24} placeholder="REN 12345" />
          <small>{t.regNoHint}</small>
        </label>
      </div>

      <label className={bad("agency")}>
        <span>{t.agency} *</span>
        <input name="agency" required maxLength={160} autoComplete="organization" />
      </label>

      <label className={bad("agencyENo")}>
        <span>{t.agencyENo} <em>({t.optional})</em></span>
        <input name="agencyENo" maxLength={30} />
        <small>{t.agencyENoHint}</small>
      </label>

      <label className={bad("whatsapp")}>
        <span>{t.whatsapp} *</span>
        <input name="whatsapp" required inputMode="tel" autoComplete="tel" maxLength={20} placeholder="012-345 6789" />
        <small>{t.whatsappHint}</small>
      </label>

      <div className="row">
        <label className={bad("area")}>
          <span>{t.area} *</span>
          <select name="area" required defaultValue="">
            <option value="" disabled>—</option>
            {t.areas.map((a) => (
              <option key={a.value} value={a.value}>{a.label}</option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>{t.language}</span>
          <select name="language" defaultValue={locale}>
            <option value="zh">中文</option>
            <option value="en">English</option>
            <option value="ms">Bahasa Melayu</option>
          </select>
        </label>
      </div>

      <label className={bad("refCode")}>
        <span>{t.refCode} <em>({t.optional})</em></span>
        <input name="refCode" maxLength={32} value={ref} onChange={(e) => setRef(e.target.value)} />
      </label>

      {/* honeypot：真人看不到 */}
      <div className="hp" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className={`check ${badFields.includes("pdpaConsent") ? "bad" : ""}`}>
        <input type="checkbox" name="pdpa" required />
        <span>{t.pdpa} *</span>
      </label>
      <label className="check">
        <input type="checkbox" name="marketing" />
        <span>{t.marketing}</span>
      </label>

      {error && <p className="error" role="alert">{error}</p>}

      <button className="btn" type="submit" disabled={submitting}>
        {submitting ? t.submitting : t.submit}
      </button>
    </form>
  );
}
