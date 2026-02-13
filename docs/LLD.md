# PayNexus — Low Level Design (LLD)

## 1. Detailed Service Responsibilities

- API Gateway
  - Validate auth, rate-limit, enforce `Idempotency-Key` header
  - JWT verification, TLS termination
  - Forward to Payment Orchestrator

- Payment Orchestrator
  - Central coordinator for payment flows
  - Enforces idempotency checks (Redis lookup)
  - Writes preliminary `LedgerEntry` (PENDING) before calling gateway
  - Calls Fraud Engine synchronously for high-risk scoring
  - Emits events to Kafka topics: `payments.events`, `settlements.events`

- Ledger Service
  - Transactional writes in PostgreSQL
  - Exposes WAL-based changefeed to Kafka for consumers
  - Ensures ACID semantics for ledger entries

- QR Service
  - Generates signed QR payloads (short-lived)
  - Validates scanned QR and returns merchant/payment metadata

- Fraud Engine
  - Rule engine (matchlists, velocity, ML score)
  - Returns `ALLOW`, `CHALLENGE`, or `BLOCK`

- Settlement Engine
  - Aggregates ledger entries into settlement batches
  - Initiates bank transfers via adapter
  - Reconciliation and retry for failed settlements

- Notification Service
  - Reliable delivery of webhooks, emails, push
  - Persists delivery attempts and retries using exponential backoff

## 2. Database schema definitions (Postgres)

Example tables (DDL excerpts):

-- users
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- merchants
CREATE TABLE merchants (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  owner_user_id UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- transactions
CREATE TABLE transactions (
  id UUID PRIMARY KEY,
  merchant_id UUID REFERENCES merchants(id),
  amount BIGINT NOT NULL,
  currency CHAR(3) NOT NULL,
  status TEXT NOT NULL,
  gateway_response JSONB,
  idempotency_key TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
CREATE INDEX ON transactions(idempotency_key);

-- ledger_entries
CREATE TABLE ledger_entries (
  id BIGSERIAL PRIMARY KEY,
  transaction_id UUID REFERENCES transactions(id),
  account_id UUID NOT NULL,
  delta BIGINT NOT NULL,
  balance_after BIGINT,
  type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- settlements
CREATE TABLE settlements (
  id UUID PRIMARY KEY,
  merchant_id UUID REFERENCES merchants(id),
  amount BIGINT,
  status TEXT,
  processed_at TIMESTAMP WITH TIME ZONE
);

-- idempotency (Redis + fallback in Postgres)
-- store key -> transaction id with TTL

## 3. API contracts
See docs/API_SPEC.md for full endpoint contracts. Include `Idempotency-Key` header with all POST flows.

## 4. Transaction Flow Logic (implementation-ready)
1. Gateway receives POST /payments (with `Idempotency-Key`)
2. Gateway forwards request to Orchestrator
3. Orchestrator checks Redis for idempotency key
   - If found, return stored response
4. Orchestrator inserts a `transactions` row with status=PENDING inside DB tx
5. Orchestrator writes a corresponding `ledger_entries` row (PENDING debit)
6. Orchestrator calls Fraud Engine synchronously
   - If `BLOCK`, update transaction and ledger to FAILED
7. Orchestrator calls Payment Gateway adapter
8. On success, Orchestrator updates transaction status=COMPLETED and finalizes ledger
9. Emit `payments.events` event (Kafka)
10. Notification Service consumes event and delivers webhook asynchronously

## 5. Idempotency strategy
- Primary store: Redis with `Idempotency-Key -> transaction_id`. TTL e.g., 24h
- Secondary: transactions.idempotency_key unique index to prevent duplicates
- On POST: check Redis; if missing, create DB row inside tx; store key in Redis after DB commit

## 6. Retry logic & failure handling
- Synchronous gateway calls: circuit breaker + limited retries (3) with jittered backoff
- Async retries handled by worker with exponential backoff and DLQ

## 7. Circuit breaker logic
- Use token bucket for rate-limiting per-gateway
- Circuit breaker states: CLOSED -> OPEN (on N consecutive errors) -> HALF-OPEN -> CLOSED
- Use short-circuit responses for OPEN state and schedule background health probes

## 8. Cache usage strategy
- Redis: idempotency, rate limits, session/cache, ephemeral merchant configs
- CDN/object store for static receipts
- Use TTLs appropriate to data criticality (idempotency 24h, merchant config 5m)

## 9. Event-driven architecture design
- Kafka topics:
  - `payments.events` (transaction completed/failed)
  - `ledger.changes` (ledger mutations)
  - `settlements.events` (settlement lifecycle)
  - `fraud.alerts` (high-risk/skipped transactions)
- Consumers: Notification workers, Reconciliation workers, Analytics

## 10. Data retention policy
- Transactions & ledger: keep full records for 7 years (compliance)
- Index pruning & partitioning by date to support retention
- PII redaction lifecycle to limit exposure
