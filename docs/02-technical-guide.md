# TrendZap Technical Implementation & Production Guide

## 1. Current Frontend Snapshot

- Framework: Next.js 16 (App Router) forced to Webpack build for stability.
- Language: TypeScript (React 18). UI: TailwindCSS + Radix UI primitives + custom motion classes.
- Auth: Privy (`@privy-io/react-auth`) enabling hybrid wallet/email identity.
- Multi-Chain Wallet Layer: WalletConnect (EVM) + Solana Kit (Solana) + Reown AppKit for unified connectors.
- Styling Enhancers: Tailwind Merge, class-variance-authority for variants.
- Analytics: `@vercel/analytics` (basic page instrumentation).

## 2. MVP 1 Stack (Twitter + Virtual Money)

**Goal**: Ship fast, validate cheap, minimize infrastructure complexity.

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Frontend | Next.js 16 (App Router + Webpack) | Already built, SSR + API routes in one repo |
| Backend API | Next.js API routes (serverless) | Zero deployment overhead, auto-scales, free on Vercel |
| Database | Supabase (Postgres) | Generous free tier, built-in auth, real-time subscriptions |
| Auth | Privy (keep existing) + Supabase session sync | Privy handles wallet UX, Supabase stores user data |
| Social Data | Twitter API v2 (Essential, free) | Official API, 1,500 tweets/month (enough for 10 markets) |
| Scheduling | Vercel Cron (built-in) | Free, simple, runs every 5 minutes for resolution |
| Real-Time | Client polling (30s interval) | Simplest option, upgrade to WebSocket in MVP 2 |
| Deployment | Vercel (all-in-one) | One-click deploy, preview branches, $0/month |

**Why This Stack**:
- Can build and ship in 4-6 weeks.
- Runs on free tiers ($0-1/month).
- No DevOps complexity.
- Easy to upgrade later (Supabase → managed Postgres, API routes → dedicated backend).

## 3. MVP 1 Architecture (Simplified)

```
┌─────────────────────────────────────────────────────────────┐
│  Client (Next.js SSR + Client Components)                   │
│  - Market feed, create dialog, bet placement UI             │
│  - Privy auth + wallet connection                           │
│  - Polls /api/markets every 30s for updates                 │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ↓ (HTTP + fetch)
┌─────────────────────────────────────────────────────────────┐
│  Next.js API Routes (Serverless Functions)                  │
│  - /api/auth/session → verify Privy, sync user             │
│  - /api/markets/create → parse Twitter URL, fetch metrics  │
│  - /api/markets/list → query active markets                │
│  - /api/bets/place → record bet, update pools              │
│  - /api/cron/resolve → check Twitter, settle markets       │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ↓ (SQL queries)
┌─────────────────────────────────────────────────────────────┐
│  Supabase (Postgres)                                        │
│  Tables: users, markets, bets, resolutions                  │
│  - Row-level security enabled                               │
│  - Automatic backups                                        │
└─────────────────────────────────────────────────────────────┘
                  ↑
                  │ (REST API)
┌─────────────────────────────────────────────────────────────┐
│  Twitter API v2 (External)                                  │
│  - GET /2/tweets/:id → fetch likes, retweets               │
│  - Rate limit: 1,500 requests/month (free tier)            │
└─────────────────────────────────────────────────────────────┘
```

**Resolution Flow**:
1. Vercel Cron triggers `/api/cron/resolve` every 5 minutes.
2. Query markets where `state=ACTIVE` and `resolution_time < now()`.
3. For each market: fetch final Twitter metrics via API.
4. Determine winner: `final_value >= threshold` → OVER wins, else UNDER wins.
5. Calculate payouts: `(total_pool * user_stake / winning_pool) * 0.97`.
6. Update `users.virtual_balance` for all winners.
7. Mark market as `SETTLED`.

## 5. Performance & Scaling Strategies
- SSR & Streaming: Use Next.js React Server Components for market list; incremental static regeneration for slower-changing pages (leaderboard hourly).
- Edge Caching: Cache anonymous GET /markets with short TTL (30–60s) at CDN; bypass for logged-in with personalization.
- Real-Time Delta Updates: Send minimal diff payloads (only changed pool balances & time remaining) instead of full market objects.
- Write Path Isolation: Bet placement requests separated from analytics by using outbox pattern (persist event → async processors consume).
- Hot Metrics: Maintain in-memory Redis hash for currentValue & pool totals; fall back to Postgres on cache miss.
- Backpressure: Rate-limit market creation per user/time window; queue ingestion tasks; enforce circuit breakers on external API failures.

## 6. Reliability & Observability
- Tracing: Instrument GraphQL resolvers + job processors with OpenTelemetry spans.
- Metrics: Track bet_latency_ms, oracle_fetch_duration, resolution_success_ratio, payout_settlement_duration.
- Logging: Structured JSON, route to ELK / Loki; redact PII.
- Alerting: SLO-based alerts (e.g., resolution latency p95 > threshold) + anomaly detection (unexpected metric surge).

## 7. Security & Compliance
- Input Sanitization: URL validation & domain allowlist.
- Auth: Privy session tokens; optional wallet signature challenge for high-value bets.
- Smart Contracts: Upgradable via proxy only until decentralized governance; timelock for upgrades.
- Oracle Trust: Multi-source sampling + weighted median; dispute window with manual override (Phase 2).
- Rate Limiting: Per-IP & per-user for creation, bets, fetch endpoints.
- Vaulted Secrets: API keys for platform scraping.
- Compliance Considerations: Maintain geofencing if necessary for restricted jurisdictions (modular IP check middleware).

## 8. Smart Contract Layer (Conceptual)
EVM & Solana parity design (abstracted):
Contracts:
- MarketFactory: deploys Market instances; registers metadata hash (off-chain JSON/IPFS).
- Market: stores threshold, metric type, resolution time, pools (overPool, underPool), state, feeBps.
- Escrow (implicit within Market): holds USDC stakes; tracks user stakes mapping.
- FeeCollector: accumulates platform fees; withdraw function (timelocked).
- OracleAdapter: authorized account (Controller) submits final metric; emits Finalized(metric, success).
Key Events:
- MarketCreated(id, creator, metricType, threshold, resolutionTime)
- BetPlaced(id, user, position, amount)
- MarketFinalized(id, success, finalMetric)
- PayoutDistributed(id, user, amount)
Integrity:
- Reentrancy guards on payout.
- Off-chain signature gating for oracle calls.
- Failsafe Cancel path if oracle stale beyond grace period.

## 9. Data Model (Suggested Tables)
users(id, handle, email, join_date, rank_cache)
wallets(id, user_id, chain, address, primary BOOLEAN)
markets(id, creator_id, platform, source_url, metric_type, threshold, resolution_at, state, fee_bps)
bets(id, market_id, user_id, position ENUM('OVER','UNDER'), amount_usdc, created_at, tx_hash, settled BOOLEAN)
market_metrics(id, market_id, snapshot_at, current_value)
resolutions(id, market_id, finalized_at, final_value, success BOOLEAN)
leaderboard_stats(user_id, profit_total, win_rate, total_bets, updated_at)
badges(user_id, badge_key, earned_at)

Indexes: markets(platform, resolution_at), bets(market_id), leaderboard_stats(profit_total DESC), market_metrics(market_id, snapshot_at DESC).

## 10. API Surfaces (Representative GraphQL Schema Fragments)
```graphql
type Market { id: ID! platform: String! metricType: String! threshold: Int! currentValue: Int! resolutionAt: DateTime! state: MarketState! overPool: Int! underPool: Int! }

type Bet { id: ID! marketId: ID! userId: ID! position: Position! amount: Int! createdAt: DateTime! }

type Query { markets(limit: Int, platform: String, state: MarketState): [Market!]! market(id: ID!): Market leaderboard(limit: Int): [LeaderboardEntry!]! }

type Mutation { createMarket(input: CreateMarketInput!): Market placeBet(marketId: ID!, position: Position!, amount: Int!): Bet }
```
Subscriptions for: marketUpdated(id), newBet(marketId), marketFinalized(id).

## 11. Build & Deployment Pipeline
Steps:
1. Lint & Type Check (tsc --noEmit).
2. Unit Tests (frontend components + backend services).
3. Contract Testing (Hardhat/Foundry + static analysis: Slither / MythX).
4. Integration Tests (Docker Compose: Postgres + Redis + API service).
5. Build Artifacts: Frontend (Vercel), Backend (Container image, pushed to registry), Contracts (ABI JSON published).
6. Deploy Sequence: Contracts (if changed) → Backend API → Ingestion workers → Frontend.
7. Post-Deploy Smoke Tests: health endpoints, sample market create & bet simulation.

## 12. Production Hardening Checklist
- [ ] Rate limiting & WAF configured.
- [ ] Secrets rotated & least privilege IAM.
- [ ] Downtime playbook & runbooks documented.
- [ ] Canary deploy for backend service.
- [ ] Synthetic monitoring (login, create market, place bet, resolution simulation).
- [ ] Backup strategy (daily Postgres, incremental snapshots; retention >= 30d).
- [ ] Load test scenario (1000 concurrent bet placements, p95 < 250ms).

## 13. Real-Time Strategy
- Initial: WebSocket channel per market + global feed. Redis Pub/Sub fanout.
- Scale: Shard by market_id hash; optionally migrate to NATS or Kafka for higher throughput.
- Frontend: React query client + custom hook merges incremental updates into RSC data boundary.

## 14. Caching Strategy
Layered:
- CDN: Cache market list (short TTL) + static assets.
- Redis: Current market metrics & pool balances.
- DB: Authoritative historical snapshots & settlement records.
Cache Invalidation: On BetPlaced → update Redis & publish event; scheduled refresh of CDN keys for list pages.

## 15. Testing Strategy
- Unit: Business logic (payout calc, fee deduction, pool ratios).
- Property Tests: Fuzz payout distribution vs pool states.
- Oracle Simulation: Mock metric curves (linear, exponential, viral spike) validate threshold resolution correctness.
- Contract Invariants: No orphan funds; total stakes = sum(user stakes + fees).
- Load: Stress bet endpoint & subscription throughput.

## 16. Future Enhancements
- ML-Time Series: Predict engagement velocity, auto suggest threshold/resolution windows.
- Multi-outcome & categorical markets ("Top 3 trending tags tomorrow").
- Tokenized market shares (continuous order book / AMM hybrid).
- Decentralized oracle network participation / staking.

## 17. Assumptions
Current repo is frontend-only; backend & contracts specification here are forward-looking. Adjust as real implementation diverges.

---
This guide pairs with Architecture & Schema for deeper structural specifics.
