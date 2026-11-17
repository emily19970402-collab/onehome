import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { preRegisterSchema } from "@/lib/validation";
import { getServiceClient } from "@/lib/supabase";

export const runtime = "nodejs";

const MAX_PER_IP_PER_HOUR = 5;

function hashIp(ip: string): string {
  const salt = process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(-16) ?? "onehome";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const parsed = preRegisterSchema.safeParse(body);
  if (!parsed.success) {
    const fields = [...new Set(parsed.error.issues.map((i) => String(i.path[0])))];
    return NextResponse.json({ ok: false, error: "invalid", fields }, { status: 400 });
  }
  const data = parsed.data;

  // honeypot 有内容：假装成功，不写入
  if (data.website) return NextResponse.json({ ok: true });

  const supabase = getServiceClient();
  if (!supabase) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  const ipHash = hashIp(ip);

  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count, error: countError } = await supabase
    .from("preregistrations")
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", since);
  if (countError) {
    console.error("preregister count failed", countError.message);
    return NextResponse.json({ ok: false, error: "generic" }, { status: 500 });
  }
  if ((count ?? 0) >= MAX_PER_IP_PER_HOUR) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const { error } = await supabase.from("preregistrations").insert({
    name: data.name,
    reg_type: data.regType,
    reg_no: data.regNo,
    agency: data.agency,
    agency_e_no: data.agencyENo || null,
    whatsapp: data.whatsapp,
    area: data.area,
    locale: data.locale,
    ref_code: data.refCode || null,
    pdpa_consent_at: new Date().toISOString(),
    marketing_consent: data.marketingConsent,
    ip_hash: ipHash,
  });

  if (error) {
    if (error.code === "23505") return NextResponse.json({ ok: false, error: "duplicate" }, { status: 409 });
    console.error("preregister insert failed", error.message);
    return NextResponse.json({ ok: false, error: "generic" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
