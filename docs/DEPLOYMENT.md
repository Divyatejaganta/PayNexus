# Deployment Architecture

## Infra Components
- Kubernetes cluster (multiple zones)
- Managed PostgreSQL (primary + read replicas + WAL streaming)
- Kafka cluster (3+ brokers) with topic replication
- Redis Cluster (master-replica or cluster mode)
- Object Store for receipts (S3)

## Autoscaling & HA
- Use HPA for CPU/RAM based scaling of Orchestrator and workers
- PodDisruptionBudget and Pod anti-affinity for high availability

## Backup & DR
- Regular DB backups to object store
- Kafka mirror or backup for critical topics
- RTO target: < 1 hour, RPO target: < 15 minutes (configurable)

## Security
- Private VPC for infra, public LB for API Gateway
- mTLS between services, RBAC in Kubernetes
- Secrets in Vault or Kubernetes secrets with KMS

## Monitoring
- Prometheus for metrics, Grafana dashboards
- Alerts for latency, error rates, consumer lags

Diagram: see `/workspaces/PayNexus/diagrams/architecture.mmd`.
