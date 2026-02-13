# Non-Functional Requirements (NFR)

- **Availability:** 99.95% (annual)
- **Latency:** end-to-end < 3 seconds for 95th percentile synchronous flows
- **Throughput:** baseline 10,000 TPS with ability to scale
- **Data Durability:** All ledger writes are durable (Postgres with WAL and backups)
- **Security & Compliance:** PCI-DSS scope reduction via tokenization; TLS everywhere; regular pentests
- **Disaster Recovery:** RTO < 1 hour, RPO < 15 minutes for critical services
- **Scalability:** Horizontal scaling for stateless nodes, partitioned Kafka topics, DB read replicas
- **Observability:** Tracing (Jaeger), metrics (Prometheus), logs (ELK/Opensearch)
- **Operational:** Automated canary deploys, health probes, runbooks for incidents
