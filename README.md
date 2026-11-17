# One Home

只给马来西亚注册中介（REN / REA / PEA）刊登的房产网站。

## 现在有什么
- `/zh|en|ms/founding`：创始会员免费预登记页（r102 / t011）
- `/api/preregister`：登记表单接口（服务端校验 → 写入 Supabase）
- `supabase/migrations/001_preregistrations.sql`：预登记表 + RLS + 名额计数函数

技术：Next.js 15（App Router）+ Supabase，部署在 Vercel（项目 one-home2/onehome）。

## 上线前要做（老板）
1. Supabase → SQL Editor：按编号顺序执行 `supabase/migrations/` 里的 `.sql` 文件。
2. Vercel → Settings → Environment Variables 已填好：
   `NEXT_PUBLIC_SUPABASE_URL`、`NEXT_PUBLIC_SUPABASE_ANON_KEY`、`SUPABASE_SERVICE_ROLE_KEY`。

数据库还没设置时，页面照常显示，但提交表单会提示“系统还在设置中”。

## 本地开发
```bash
cp .env.example .env.local   # 填入自己的值
npm install
npm run dev
```

## 待确认
- 优先购买期 14 天、条款文字：草稿，待律师审阅（r402）
- 品牌颜色与标志：按 t015 初稿，待老板确认
