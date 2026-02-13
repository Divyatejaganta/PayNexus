# PayNexus — API Specification

Common headers:
- `Authorization: Bearer <token>`
- `Idempotency-Key: <uuid-or-random-string>`

Base URL: `https://api.paynexus.example`

## POST /payments/qr-pay
Request JSON:
```json
{
  "merchant_id": "uuid",
  "amount": 1000,
  "currency": "USD",
  "qr_payload": "...",
  "metadata": {"order_id":"123"}
}
```

Response 202 (accepted):
```json
{
  "transaction_id": "uuid",
  "status": "PENDING",
  "message": "Payment initiated"
}
```

Errors:
- 400 Bad Request: invalid input
- 401 Unauthorized
- 409 Conflict: idempotency duplicate (returns original transaction)

## POST /payments/card
Request JSON:
```json
{
  "merchant_id":"uuid",
  "amount": 2000,
  "currency":"USD",
  "card": {"pan":"****","expiry":"MM/YY","cvv":"***"},
  "billing": {"name":"..."},
  "metadata": {"order_id":"abc"}
}
```

Response 200 (sync) or 202 (async):
```json
{
  "transaction_id":"uuid",
  "status":"COMPLETED",
  "gateway_reference":"ref123"
}
```

Errors:
- 402 Payment Required / 422 Payment Failed
- 429 Rate limited

## GET /transactions/{id}
Response 200:
```json
{
  "transaction_id":"uuid",
  "merchant_id":"uuid",
  "amount":1000,
  "currency":"USD",
  "status":"COMPLETED",
  "ledger_entries": [ ... ],
  "created_at":"2026-01-01T12:00:00Z"
}
```

## POST /refund
Request JSON:
```json
{
  "transaction_id":"uuid",
  "amount":500,
  "reason":"customer_request"
}
```

Response 202:
```json
{
  "refund_id":"uuid",
  "status":"PENDING"
}
```

Errors:
- 400 Refund amount exceeds captured amount
- 409 Duplicate refund idempotency

## GET /merchant/settlements
Query params: `merchant_id`, `start_date`, `end_date`, `status`
Response 200:
```json
{
  "settlements": [ {"id":"uuid","amount":100000, "status":"SETTLED"} ]
}
```

---
Idempotency behavior:
- All POST endpoints must accept `Idempotency-Key`. If key exists, return previous result (HTTP 200/202/409 pattern with stored payload). Use Redis as primary idempotency store.
