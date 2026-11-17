import "server-only";
import { FOUNDING_TOTAL } from "./i18n";
import { getServiceClient } from "./supabase";

/** 剩余创始会员名额；数据库还没设置好时返回 null（页面就不显示计数）。 */
export async function getSlotsLeft(): Promise<number | null> {
  const supabase = getServiceClient();
  if (!supabase) return null;
  const { data, error } = await supabase.rpc("founding_slots_taken");
  if (error || typeof data !== "number") return null;
  return Math.max(0, FOUNDING_TOTAL - data);
}
