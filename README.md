# PayNexus (Demo)

This repository contains a demo scaffold for PayNexus — a unified payment aggregator MVP.

Quick start (dev container / Codespaces):

1. Install dependencies

```bash
pnpm install # or npm install
```

2. Generate Prisma client and run migrations (SQLite used)

```bash
npx prisma generate
npx prisma db push
```

3. Seed the database

```bash
pnpm run seed # or npm run seed
```

4. Run dev server

```bash
pnpm dev
```

Portals:
- Customer App: /app
- Merchant Portal: /merchant
- Admin Dashboard: /admin

Notes:
- Database: SQLite (file: prisma/dev.db)
- This is a demo scaffold. Authentication and production concerns are intentionally minimal.
# PayNexus