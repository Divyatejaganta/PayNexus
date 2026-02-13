# Sequence Diagrams

Diagrams are stored in the `diagrams/` folder as Mermaid `.mmd` files. Key flows included:

- `qr_sequence.mmd` — QR Payment Flow
- `card_sequence.mmd` — Credit Card Payment Flow
- `settlement_sequence.mmd` — Settlement Flow
- `refund_sequence.mmd` — Refund Flow
- `failure_sequence.mmd` — Failure Handling Flow

Each diagram includes idempotency checks, ledger write before gateway call, fraud check, and async notification steps.

See diagrams in `/workspaces/PayNexus/diagrams`.
