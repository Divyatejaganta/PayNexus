# PayNexus — Payment Aggregator Design Repository

Overview
- PayNexus is a production-ready system design for a payment aggregator: QR & Card processing, ledger-first durability, fraud detection, and settlement pipelines.

Architecture Diagram
- See `diagrams/architecture.mmd`

Features
- Unified APIs for QR & card payments
- Ledger-first transaction model
- Event-driven workers and settlement
- Fraud detection pipeline and notifications

How to read this repo
- Design docs: `docs/HLD.md`, `docs/LLD.md`, `docs/NFR.md`, `docs/API_SPEC.md`, `docs/DEPLOYMENT.md`
- Diagrams: `diagrams/*.mmd` (Mermaid)

How to Run (local preview)
1. Install a markdown preview that supports mermaid
2. Open `README.md` and the `diagrams/*.mmd` files

Future Enhancements
- Add sequence GIFs and rendered HTML
- Provide OpenAPI YAML and mock servers
- Add IaC manifests (Helm / Terraform)
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