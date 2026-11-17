export const locales = ["zh", "en", "ms"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const FOUNDING_TOTAL = 500;

type Plan = { name: string; price: string; period: string; listings: string; extra: string; highlight?: boolean };

export type Dict = {
  langName: string;
  htmlLang: string;
  meta: { title: string; description: string };
  nav: { tagline: string };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    price: string;
    priceNote: string;
    slotsLeft: (n: number) => string;
    cta: string;
  };
  benefits: { title: string; items: { title: string; text: string }[] };
  plans: { title: string; note: string; items: Plan[] };
  form: {
    title: string;
    intro: string;
    name: string;
    regType: string;
    regNo: string;
    regNoHint: string;
    agency: string;
    agencyENo: string;
    agencyENoHint: string;
    whatsapp: string;
    whatsappHint: string;
    area: string;
    areas: { value: string; label: string }[];
    language: string;
    refCode: string;
    optional: string;
    pdpa: string;
    marketing: string;
    submit: string;
    submitting: string;
    errors: Record<string, string>;
  };
  terms: { title: string; draftNote: string; items: string[] };
  faq: { title: string; items: { q: string; a: string }[] };
  thanks: { title: string; text: string; share: string; shareMessage: string; back: string };
  footer: { privacy: string; rights: string };
};

const areasZh = [
  { value: "kl", label: "吉隆坡" },
  { value: "selangor", label: "雪兰莪" },
  { value: "johor", label: "柔佛" },
  { value: "penang", label: "槟城" },
  { value: "other", label: "其他" },
];
const areasEn = [
  { value: "kl", label: "Kuala Lumpur" },
  { value: "selangor", label: "Selangor" },
  { value: "johor", label: "Johor" },
  { value: "penang", label: "Penang" },
  { value: "other", label: "Other" },
];
const areasMs = [
  { value: "kl", label: "Kuala Lumpur" },
  { value: "selangor", label: "Selangor" },
  { value: "johor", label: "Johor" },
  { value: "penang", label: "Pulau Pinang" },
  { value: "other", label: "Lain-lain" },
];

const zh: Dict = {
  langName: "中文",
  htmlLang: "zh-Hans",
  meta: {
    title: "One Home 创始会员免费预登记｜只给注册中介的房产网站",
    description: "One Home 只接受已注册 REN / REA / PEA 刊登。前 500 位创始会员 Pro 一年 RM699（含 SST），锁价 2 年。现在免费预登记。",
  },
  nav: { tagline: "只给注册中介的房产网站" },
  hero: {
    badge: "创始会员 · 前 500 位",
    title: "只给注册中介的房产网站",
    subtitle: "写一次自动生成中英马三语，房源整期不过期，买家一键 WhatsApp 找你。",
    price: "Pro 一年 RM699",
    priceNote: "含 SST · 锁价 2 年 · 现在登记不用付钱",
    slotsLeft: (n) => `剩余 ${n} / 500 个创始会员名额`,
    cta: "免费预登记",
  },
  benefits: {
    title: "为什么选 One Home",
    items: [
      { title: "LPPEH 核实徽章", text: "只有核实过的 REN / REA / PEA 能刊登，买家更放心找你。" },
      { title: "一次写，三种语言", text: "用一种语言写房源，自动生成中文、英文、马来文版本。" },
      { title: "不过期 + WhatsApp 直达", text: "房源在配套期内一直在线，买家一键 WhatsApp 联系你。" },
    ],
  },
  plans: {
    title: "上线后的配套",
    note: "全部含 SST，均有 30 天免费试用，不需要信用卡。",
    items: [
      { name: "Starter", price: "RM350", period: "/ 季", listings: "80 条房源", extra: "" },
      { name: "Growth", price: "RM580", period: "/ 半年", listings: "150 条房源", extra: "" },
      { name: "Pro", price: "RM1,100", period: "/ 年", listings: "300 条房源", extra: "每天自动重刊" },
      { name: "创始会员 Pro", price: "RM699", period: "/ 年", listings: "300 条房源", extra: "前 500 位 · 锁价 2 年", highlight: true },
    ],
  },
  form: {
    title: "免费预登记",
    intro: "登记不收任何费用。网站上线时，你可以优先以 RM699/年 购买创始会员 Pro。",
    name: "姓名（与 LPPEH 登记一致）",
    regType: "注册类型",
    regNo: "注册号码",
    regNoHint: "例如 REN 12345，我们会在 LPPEH 网站人工核对",
    agency: "所属公司",
    agencyENo: "公司 E 号",
    agencyENoHint: "例如 E (1) 1234",
    whatsapp: "WhatsApp 号码",
    whatsappHint: "例如 012-345 6789",
    area: "主要地区",
    areas: areasZh,
    language: "偏好语言",
    refCode: "邀请码",
    optional: "选填",
    pdpa: "我同意 One Home 收集我的姓名、注册号码、公司、WhatsApp 和地区，用于核实资格及上线通知，可随时撤回。",
    marketing: "我愿意收到 One Home 的优惠与上线消息。",
    submit: "提交预登记",
    submitting: "提交中…",
    errors: {
      generic: "提交失败，请稍后再试。",
      duplicate: "这个注册号码已经登记过了。",
      rate_limited: "提交次数太多，请一小时后再试。",
      invalid: "请检查标红的栏位。",
      not_configured: "系统还在设置中，请稍后再试。",
    },
  },
  terms: {
    title: "预登记条款",
    draftNote: "草稿，正式上线前由律师审阅。",
    items: [
      "登记免费，不收订金，不代表购买或任何承诺。",
      "只限 LPPEH 注册的 REN / REA / PEA；名额以核实通过的先后计算。",
      "网站上线时，登记者可优先以 RM699/年（含 SST）购买 Pro，锁价 2 年；创始会员共 500 名，额满即止；优先购买期 14 天，过期名额释放。",
      "One Home 可调整上线日期，会以 WhatsApp 或电邮通知。",
      "一个注册号码只能登记一次。",
    ],
  },
  faq: {
    title: "常见问题",
    items: [
      { q: "现在要付钱吗？", a: "不用。预登记完全免费，也不收订金。上线时你再决定要不要购买。" },
      { q: "什么时候上线？", a: "上线日期确定后，我们会用 WhatsApp 通知已登记的中介。" },
      { q: "怎么核实我的资格？", a: "我们会在 LPPEH 网站核对你的注册号码、姓名、所属公司和有效期，四项都符合才通过。" },
      { q: "500 个名额怎么算？", a: "按核实通过的先后计算。额满后不再提供创始会员价。" },
      { q: "RM699 包括什么？", a: "Pro 配套一年：300 条房源、每天自动重刊、三语房源、WhatsApp 询问和房源数据报告，价格锁定 2 年，含 SST。" },
      { q: "我的资料会怎样使用？", a: "只用于核实资格和上线通知，不会卖给第三方。你可以随时要求删除。" },
    ],
  },
  thanks: {
    title: "登记成功！",
    text: "我们会在 LPPEH 核实你的资料，网站上线时用 WhatsApp 通知你优先购买。",
    share: "分享给同事",
    shareMessage: "One Home 是只给注册中介的新房产网站，前 500 位可免费预登记，上线时优先以 RM699/年（含 SST）买 Pro，锁价 2 年。登记：",
    back: "返回",
  },
  footer: { privacy: "预登记条款与隐私（草稿）", rights: "© 2026 One Home" },
};

const en: Dict = {
  langName: "English",
  htmlLang: "en",
  meta: {
    title: "One Home Founding Member Pre-registration | Listings by registered agents only",
    description: "One Home accepts listings from registered REN / REA / PEA only. First 500 Founding Members get Pro for RM699/year (SST incl.), locked for 2 years. Pre-register free.",
  },
  nav: { tagline: "Listings by registered agents only" },
  hero: {
    badge: "Founding Member · First 500",
    title: "The property site for registered agents only",
    subtitle: "Write once in English, Chinese and Malay. Listings that don't expire. Buyers WhatsApp you directly.",
    price: "Pro for RM699/year",
    priceNote: "SST incl. · Price locked 2 years · Nothing to pay now",
    slotsLeft: (n) => `${n} of 500 Founding Member spots left`,
    cta: "Pre-register free",
  },
  benefits: {
    title: "Why One Home",
    items: [
      { title: "LPPEH verified badge", text: "Only verified REN / REA / PEA can list, so buyers trust who they're calling." },
      { title: "Write once, three languages", text: "Write in one language; we create the Chinese, English and Malay versions." },
      { title: "No expiry + direct WhatsApp", text: "Listings stay live for your whole plan, and buyers reach you in one tap." },
    ],
  },
  plans: {
    title: "Plans at launch",
    note: "All prices include SST. Every plan has a 30-day free trial, no credit card needed.",
    items: [
      { name: "Starter", price: "RM350", period: "/ quarter", listings: "80 listings", extra: "" },
      { name: "Growth", price: "RM580", period: "/ 6 months", listings: "150 listings", extra: "" },
      { name: "Pro", price: "RM1,100", period: "/ year", listings: "300 listings", extra: "Daily auto-repost" },
      { name: "Founding Pro", price: "RM699", period: "/ year", listings: "300 listings", extra: "First 500 · locked 2 years", highlight: true },
    ],
  },
  form: {
    title: "Pre-register free",
    intro: "There's no charge to register. At launch you get first access to Founding Member Pro at RM699/year.",
    name: "Full name (as registered with LPPEH)",
    regType: "Registration type",
    regNo: "Registration number",
    regNoHint: "e.g. REN 12345 – we check it manually on the LPPEH website",
    agency: "Agency / firm",
    agencyENo: "Firm E number",
    agencyENoHint: "e.g. E (1) 1234",
    whatsapp: "WhatsApp number",
    whatsappHint: "e.g. 012-345 6789",
    area: "Main area",
    areas: areasEn,
    language: "Preferred language",
    refCode: "Referral code",
    optional: "optional",
    pdpa: "I agree One Home may use my name, registration no., firm, WhatsApp and area to verify my eligibility and notify me at launch. I can withdraw anytime.",
    marketing: "Send me One Home offers and launch news.",
    submit: "Submit pre-registration",
    submitting: "Submitting…",
    errors: {
      generic: "Something went wrong. Please try again later.",
      duplicate: "This registration number has already pre-registered.",
      rate_limited: "Too many attempts. Please try again in an hour.",
      invalid: "Please check the highlighted fields.",
      not_configured: "We're still setting things up. Please try again later.",
    },
  },
  terms: {
    title: "Pre-registration terms",
    draftNote: "Draft – to be reviewed by a lawyer before launch.",
    items: [
      "Pre-registration is free, with no deposit and no obligation to buy.",
      "Registered REN / REA / PEA only. Spots are allocated in order of successful verification.",
      "At launch you get first access to Pro at RM699/year (SST incl.), price locked 2 years, limited to 500 Founding Members in total. Priority window: 14 days, after which unused spots are released.",
      "One Home may change the launch date and will notify you by WhatsApp or email.",
      "One registration per REN / REA / PEA number.",
    ],
  },
  faq: {
    title: "FAQ",
    items: [
      { q: "Do I pay anything now?", a: "No. Pre-registration is free with no deposit. You decide whether to buy at launch." },
      { q: "When do you launch?", a: "Once the launch date is set, we'll WhatsApp everyone who pre-registered." },
      { q: "How do you verify me?", a: "We check your registration number, name, firm and validity on the LPPEH website. All four must match." },
      { q: "How are the 500 spots counted?", a: "In order of successful verification. Once they're gone, the Founding price closes." },
      { q: "What does RM699 include?", a: "One year of Pro: 300 listings, daily auto-repost, three-language listings, WhatsApp enquiries and listing reports. Price locked for 2 years, SST included." },
      { q: "How is my data used?", a: "Only to verify your eligibility and notify you at launch. We never sell it, and you can ask us to delete it anytime." },
    ],
  },
  thanks: {
    title: "You're on the list!",
    text: "We'll verify your details with LPPEH and WhatsApp you when you can buy at launch.",
    share: "Share with a colleague",
    shareMessage: "One Home is a new listing site for registered agents only. The first 500 can pre-register free and get first access to Pro at RM699/year (SST incl.), locked for 2 years: ",
    back: "Back",
  },
  footer: { privacy: "Pre-registration terms & privacy (draft)", rights: "© 2026 One Home" },
};

const ms: Dict = {
  langName: "BM",
  htmlLang: "ms",
  meta: {
    title: "Pendaftaran Awal Ahli Pengasas One Home | Laman hartanah untuk ejen berdaftar",
    description: "One Home hanya menerima iklan daripada REN / REA / PEA berdaftar. 500 Ahli Pengasas pertama mendapat Pro pada RM699/tahun (termasuk SST), harga dikunci 2 tahun. Daftar awal secara percuma.",
  },
  nav: { tagline: "Laman hartanah untuk ejen berdaftar sahaja" },
  hero: {
    badge: "Ahli Pengasas · 500 pertama",
    title: "Laman hartanah untuk ejen berdaftar sahaja",
    subtitle: "Tulis sekali dalam BM, Inggeris dan Cina. Iklan tidak luput. Pembeli WhatsApp anda terus.",
    price: "Pro RM699/tahun",
    priceNote: "Termasuk SST · Harga dikunci 2 tahun · Tiada bayaran sekarang",
    slotsLeft: (n) => `Tinggal ${n} daripada 500 tempat Ahli Pengasas`,
    cta: "Daftar awal percuma",
  },
  benefits: {
    title: "Kenapa One Home",
    items: [
      { title: "Lencana disahkan LPPEH", text: "Hanya REN / REA / PEA yang disahkan boleh mengiklan, jadi pembeli lebih yakin menghubungi anda." },
      { title: "Tulis sekali, tiga bahasa", text: "Tulis dalam satu bahasa; versi BM, Inggeris dan Cina dijana untuk anda." },
      { title: "Tidak luput + WhatsApp terus", text: "Iklan kekal sepanjang pakej anda, dan pembeli boleh hubungi anda dengan satu klik." },
    ],
  },
  plans: {
    title: "Pakej semasa pelancaran",
    note: "Semua harga termasuk SST. Setiap pakej ada percubaan percuma 30 hari, tanpa kad kredit.",
    items: [
      { name: "Starter", price: "RM350", period: "/ suku tahun", listings: "80 iklan", extra: "" },
      { name: "Growth", price: "RM580", period: "/ 6 bulan", listings: "150 iklan", extra: "" },
      { name: "Pro", price: "RM1,100", period: "/ tahun", listings: "300 iklan", extra: "Iklan semula automatik setiap hari" },
      { name: "Pro Pengasas", price: "RM699", period: "/ tahun", listings: "300 iklan", extra: "500 pertama · dikunci 2 tahun", highlight: true },
    ],
  },
  form: {
    title: "Daftar awal percuma",
    intro: "Pendaftaran tidak dikenakan sebarang bayaran. Semasa pelancaran, anda berpeluang membeli Pro Pengasas pada RM699/tahun.",
    name: "Nama penuh (seperti didaftarkan dengan LPPEH)",
    regType: "Jenis pendaftaran",
    regNo: "Nombor pendaftaran",
    regNoHint: "cth. REN 12345 – kami semak secara manual di laman LPPEH",
    agency: "Firma",
    agencyENo: "Nombor E firma",
    agencyENoHint: "cth. E (1) 1234",
    whatsapp: "Nombor WhatsApp",
    whatsappHint: "cth. 012-345 6789",
    area: "Kawasan utama",
    areas: areasMs,
    language: "Bahasa pilihan",
    refCode: "Kod rujukan",
    optional: "pilihan",
    pdpa: "Saya bersetuju One Home menggunakan nama, nombor pendaftaran, firma, WhatsApp dan kawasan saya untuk pengesahan dan makluman pelancaran. Saya boleh menarik balik persetujuan pada bila-bila masa.",
    marketing: "Hantar tawaran dan berita pelancaran One Home kepada saya.",
    submit: "Hantar pendaftaran",
    submitting: "Menghantar…",
    errors: {
      generic: "Ralat berlaku. Sila cuba lagi kemudian.",
      duplicate: "Nombor pendaftaran ini sudah didaftarkan.",
      rate_limited: "Terlalu banyak cubaan. Sila cuba lagi selepas sejam.",
      invalid: "Sila semak ruangan yang ditanda.",
      not_configured: "Sistem sedang disediakan. Sila cuba lagi kemudian.",
    },
  },
  terms: {
    title: "Terma pendaftaran awal",
    draftNote: "Draf – akan disemak oleh peguam sebelum pelancaran.",
    items: [
      "Pendaftaran awal adalah percuma, tanpa deposit dan tanpa kewajipan membeli.",
      "Hanya untuk REN / REA / PEA berdaftar. Tempat diberi mengikut urutan pengesahan.",
      "Semasa pelancaran, anda berpeluang membeli Pro pada RM699/tahun (termasuk SST), harga dikunci 2 tahun, terhad kepada 500 Ahli Pengasas. Tempoh keutamaan: 14 hari, selepas itu tempat dilepaskan.",
      "One Home boleh menukar tarikh pelancaran dan akan memaklumkan melalui WhatsApp atau e-mel.",
      "Satu pendaftaran bagi setiap nombor REN / REA / PEA.",
    ],
  },
  faq: {
    title: "Soalan lazim",
    items: [
      { q: "Perlu bayar sekarang?", a: "Tidak. Pendaftaran awal percuma tanpa deposit. Anda buat keputusan semasa pelancaran." },
      { q: "Bila pelancaran?", a: "Setelah tarikh ditetapkan, kami akan WhatsApp semua yang telah mendaftar." },
      { q: "Bagaimana pengesahan dibuat?", a: "Kami semak nombor pendaftaran, nama, firma dan tempoh sah di laman LPPEH. Keempat-empatnya mesti sepadan." },
      { q: "Bagaimana 500 tempat dikira?", a: "Mengikut urutan pengesahan. Apabila penuh, harga Pengasas ditutup." },
      { q: "Apa yang termasuk dalam RM699?", a: "Pro selama setahun: 300 iklan, iklan semula automatik setiap hari, iklan tiga bahasa, pertanyaan WhatsApp dan laporan iklan. Harga dikunci 2 tahun, termasuk SST." },
      { q: "Bagaimana data saya digunakan?", a: "Hanya untuk pengesahan dan makluman pelancaran. Kami tidak menjualnya, dan anda boleh minta ia dipadam bila-bila masa." },
    ],
  },
  thanks: {
    title: "Pendaftaran berjaya!",
    text: "Kami akan mengesahkan butiran anda dengan LPPEH dan WhatsApp anda apabila pembelian dibuka.",
    share: "Kongsi dengan rakan sekerja",
    shareMessage: "One Home ialah laman hartanah baharu untuk ejen berdaftar sahaja. 500 pertama boleh daftar awal percuma dan dapat Pro pada RM699/tahun (termasuk SST), dikunci 2 tahun: ",
    back: "Kembali",
  },
  footer: { privacy: "Terma pendaftaran awal & privasi (draf)", rights: "© 2026 One Home" },
};

const dicts: Record<Locale, Dict> = { zh, en, ms };

export function getDict(locale: Locale): Dict {
  return dicts[locale];
}
