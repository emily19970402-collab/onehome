-- One Home · 001 创始会员预登记（r102 / t011）
-- 在 Supabase → SQL Editor 贴上整段后按 Run。可以重复执行。

create extension if not exists pgcrypto;

create table if not exists public.preregistrations (
  id                uuid primary key default gen_random_uuid(),
  name              text not null check (char_length(name) between 2 and 120),
  reg_type          text not null check (reg_type in ('REN', 'REA', 'PEA')),
  reg_no            text not null unique,
  agency            text not null,
  agency_e_no       text,
  whatsapp          text not null,
  area              text not null check (area in ('kl', 'selangor', 'johor', 'penang', 'other')),
  locale            text not null default 'zh' check (locale in ('zh', 'en', 'ms')),
  ref_code          text,
  pdpa_consent_at   timestamptz not null,
  marketing_consent boolean not null default false,
  ip_hash           text,
  -- 核实状态：pending 待审 / verified 通过 / rejected 退回 / expired 过期（t004）
  status            text not null default 'pending' check (status in ('pending', 'verified', 'rejected', 'expired')),
  verified_at       timestamptz,
  verified_by       text,
  review_note       text,
  created_at        timestamptz not null default now()
);

create index if not exists preregistrations_ip_hash_created_idx
  on public.preregistrations (ip_hash, created_at desc);
create index if not exists preregistrations_status_idx
  on public.preregistrations (status);

-- 开 RLS，且不建任何公开 policy：公众（anon）不能读也不能写。
-- 网站只经服务端 API（service role）写入。
alter table public.preregistrations enable row level security;

-- 创始会员名额：只返回数字，不暴露任何个人资料。名额按核实通过计算。
create or replace function public.founding_slots_taken()
returns integer
language sql
stable
security definer
set search_path = public
as $$
  select count(*)::integer from public.preregistrations where status = 'verified';
$$;

revoke all on function public.founding_slots_taken() from public;
grant execute on function public.founding_slots_taken() to anon, authenticated, service_role;
