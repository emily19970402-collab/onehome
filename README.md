# One Home

A professional advertising website for property agents in Malaysia.

## Stack

- Next.js 16 (App Router, Cache Components, Partial Prefetching)
- React 19, TypeScript
- Tailwind CSS v4

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

## Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout: header, footer, metadata
│   ├── page.tsx          # Home
│   ├── listings/         # Property listings (placeholder)
│   ├── agents/           # Agent directory (placeholder)
│   ├── pricing/          # Plans and founding-member offer
│   ├── register/         # Founding-member pre-registration (form not wired yet)
│   └── not-found.tsx
├── components/           # Shared UI (site header/footer)
└── lib/                  # Site config and pricing data
```

Pricing lives in `src/lib/plans.ts` (prices include SST).
