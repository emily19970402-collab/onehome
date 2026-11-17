import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/** 只在服务端使用 service role；绝不能传到浏览器。 */
export function getServiceClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  try {
    const u = new URL(url.trim());
    if (u.protocol !== "https:" && u.protocol !== "http:") return null;
  } catch {
    console.error("NEXT_PUBLIC_SUPABASE_URL 格式不对，应为 https://xxxx.supabase.co");
    return null;
  }
  return createClient(url.trim(), key, { auth: { persistSession: false, autoRefreshToken: false } });
}
