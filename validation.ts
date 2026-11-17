import { z } from "zod";

export const REG_TYPES = ["REN", "REA", "PEA"] as const;
export const AREAS = ["kl", "selangor", "johor", "penang", "other"] as const;

/** 统一成 "REN 12345" 这类格式；真实性由人工在 LPPEH 网站核对。 */
export function normalizeRegNo(type: string, raw: string): string {
  const cleaned = raw.toUpperCase().replace(/\s+/g, " ").trim();
  const withoutPrefix = cleaned.replace(new RegExp(`^${type}\\s*`), "");
  return `${type} ${withoutPrefix}`.trim();
}

/** 马来西亚手机号码转成 +60 格式：012-345 6789 → +60123456789 */
export function normalizeWhatsapp(raw: string): string | null {
  const digits = raw.replace(/[^\d+]/g, "");
  const m = digits.match(/^(?:\+?60|0)(1\d{8,9})$/);
  return m ? `+60${m[1]}` : null;
}

export const preRegisterSchema = z
  .object({
    name: z.string().trim().min(2).max(120),
    regType: z.enum(REG_TYPES),
    regNo: z
      .string()
      .trim()
      .min(3)
      .max(24)
      .regex(/^[A-Za-z0-9 ()\-\/.]+$/),
    agency: z.string().trim().min(2).max(160),
    agencyENo: z
      .string()
      .trim()
      .max(30)
      .regex(/^[A-Za-z0-9 ()\-\/.]*$/)
      .optional()
      .default(""),
    whatsapp: z.string().trim().min(9).max(20),
    area: z.enum(AREAS),
    locale: z.enum(["zh", "en", "ms"]),
    refCode: z.string().trim().max(32).optional().default(""),
    pdpaConsent: z.literal(true),
    marketingConsent: z.boolean().optional().default(false),
    // honeypot：真人看不到这个栏位，有填就是机器人
    website: z.string().optional().default(""),
  })
  .transform((v, ctx) => {
    const whatsapp = normalizeWhatsapp(v.whatsapp);
    if (!whatsapp) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["whatsapp"], message: "invalid_whatsapp" });
      return z.NEVER;
    }
    return { ...v, whatsapp, regNo: normalizeRegNo(v.regType, v.regNo) };
  });

export type PreRegisterInput = z.input<typeof preRegisterSchema>;
