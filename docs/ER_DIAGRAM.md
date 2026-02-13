# ER Diagram

The ER diagram for PayNexus is available as a Mermaid `.mmd` file in `diagrams/er_diagram.mmd` and summarized below.

Entities include `User`, `Merchant`, `Transaction`, `LedgerEntry`, `Wallet`, `Settlement`, `BankAccount`, `FraudLog`, `Notification`.

Relationships:
- `Merchant` belongs to `User` (owner)
- `Transaction` -> `Merchant`
- `LedgerEntry` -> `Transaction`
- `Settlement` -> `Merchant`
- `BankAccount` -> `Merchant`
- `FraudLog` -> `Transaction`
- `Notification` -> `Transaction` / `Merchant`

See `/workspaces/PayNexus/diagrams/er_diagram.mmd` for the mermaid ER definition.
