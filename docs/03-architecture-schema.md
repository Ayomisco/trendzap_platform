# TrendZap Architecture & Schemas

## 1. MVP 1 System Architecture (Twitter + Virtual Money)

```
┌────────────────────────────────────────────────────────────────────┐
│                    Client (Next.js App Router)                     │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────────────┐   │
│  │ Market Feed │  │ Create Market│  │  Market Detail + Bet   │   │
│  │  (RSC SSR)  │  │   Dialog     │  │      Placement         │   │
│  └─────────────┘  └──────────────┘  └────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ Privy Auth (Wallet + Email) → Session Token                 │  │
│  └─────────────────────────────────────────────────────────────┘  │
└──────────────────────┬──────────────────────────────────────────────┘
                       │ (HTTP fetch every 30s + mutations)
                       ↓
┌────────────────────────────────────────────────────────────────────┐
│               Next.js API Routes (Vercel Serverless)               │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │ /api/auth/session       → Verify Privy, sync user to DB    │   │
│  │ /api/markets/create     → Parse Twitter URL, create market │   │
│  │ /api/markets/list       → Fetch active markets             │   │
│  │ /api/markets/[id]       → Get market details               │   │
│  │ /api/bets/place         → Validate & record bet            │   │
│  │ /api/user/balance       → Get virtual balance              │   │
│  │ /api/cron/resolve       → Resolution scheduler (every 5min)│   │
│  └────────────────────────────────────────────────────────────┘   │
└──────────────────────┬──────────────────────────────────────────────┘
                       │ (SQL via Supabase client)
                       ↓
┌────────────────────────────────────────────────────────────────────┐
│                      Supabase (Postgres)                           │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │  users: privy_id, email, virtual_balance                   │   │
│  │  markets: platform, content_url, threshold, pools, state   │   │
│  │  bets: market_id, user_id, position, amount, payout        │   │
│  │  resolutions: market_id, final_value, success              │   │
│  └────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────┘
                       ↑
                       │ (REST API - metric fetch)
┌────────────────────────────────────────────────────────────────────┐
│                   Twitter API v2 (External)                        │
│  GET /2/tweets/:id?tweet.fields=public_metrics                     │
│  Response: { like_count, retweet_count, reply_count }              │
│  Rate Limit: 1,500 tweets/month (Free Essential tier)              │
└────────────────────────────────────────────────────────────────────┘
```

**Key Design Decisions (MVP 1)**:
- **Monolith First**: API routes in same Next.js app (split later if needed).
- **No Real-Time Push**: Client polls every 30s (simple, works for MVP).
- **Supabase**: Free tier gives 500MB DB + automatic backups.
- **Vercel Cron**: Built-in scheduler, no external job queue needed.
- **Twitter API**: Free tier limits to ~10 concurrent active markets (sufficient for validation).

## 2. Frontend Component Architecture
- Pages (App Router): `/` (Feed), `/market/[id]`, `/leaderboard`, `/profile`, `/settings`.
- Shared UI primitives: `components/ui/*` (Radix composition wrappers).
- Feature Modules:
  - Market Creation: `create-market-dialog.tsx` (multi-step wizard).
  - Market Visualization: `market-card.tsx`, `market-detail-view.tsx`.
  - Social/Stats: `leaderboard.tsx`, `user-profile.tsx`.
  - Wallet/Auth: `wallet-button.tsx`, `providers/privy-provider.tsx`.
- Hooks: `use-toast`, `use-mobile` (UX utilities).

Data Fetch Strategy:
- Initial page SSR / RSC fetch markets.
- Hydration supplements with client state for bets & live pool updates.
- WebSocket subscription merges into local state store (suggestion: Zustand or React Query).

## 3. Backend Logical Modules
1. Auth Module: Verifies Privy session, links wallet addresses.
2. Market Module: CRUD, validation (threshold > current metric), schedule resolution job.
3. Bet Module: Funds lock (on-chain or ledger), pool recalculation, event emit.
4. Oracle Module: Adapter registry, fetch schedule, anomaly detection, finalization.
5. Settlement Module: Outcome evaluation, payout calculations, fee extraction.
6. Analytics Module: Profit/win rate aggregation, badge assignment logic.
7. Notification Module: Real-time push (WS) + later email/mobile.

## 4. State Machine (Market Lifecycle)
```
CREATED -> ACTIVE -> RESOLVING -> SETTLED
                      |             |
                      |         (Dispute window optional)
                      v             v
                   EXPIRED ----> DISPUTED (optional future)
```
Transitions:
- CREATED → ACTIVE (after initial bet + validation).
- ACTIVE → RESOLVING (at resolution_at timestamp triggers oracle fetch).
- RESOLVING → SETTLED (final metric available & consensus reached).
- ACTIVE/RESOLVING → EXPIRED (oracle failure beyond grace period) → optional refunds.

## 5. Data Schemas (SQL DDL Samples)
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  handle TEXT UNIQUE,
  email TEXT UNIQUE,
  join_date TIMESTAMPTZ DEFAULT now(),
  reputation_score INT DEFAULT 0
);

CREATE TABLE wallets (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  chain TEXT NOT NULL,
  address TEXT NOT NULL,
  primary_wallet BOOLEAN DEFAULT false
);

CREATE TABLE markets (
  id UUID PRIMARY KEY,
  creator_id UUID REFERENCES users(id),
  platform TEXT NOT NULL,
  source_url TEXT NOT NULL,
  metric_type TEXT NOT NULL, -- views, likes, etc.
  threshold BIGINT NOT NULL,
  resolution_at TIMESTAMPTZ NOT NULL,
  fee_bps INT NOT NULL DEFAULT 300, -- 3%
  state TEXT NOT NULL DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE bets (
  id UUID PRIMARY KEY,
  market_id UUID REFERENCES markets(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  position TEXT CHECK (position IN ('OVER','UNDER')),
  amount_usdc BIGINT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  settled BOOLEAN DEFAULT false,
  payout_usdc BIGINT,
  tx_hash TEXT
);

CREATE TABLE market_metrics (
  id UUID PRIMARY KEY,
  market_id UUID REFERENCES markets(id) ON DELETE CASCADE,
  snapshot_at TIMESTAMPTZ NOT NULL,
  current_value BIGINT NOT NULL
);

CREATE TABLE resolutions (
  id UUID PRIMARY KEY,
  market_id UUID REFERENCES markets(id) UNIQUE,
  finalized_at TIMESTAMPTZ NOT NULL,
  final_value BIGINT NOT NULL,
  success BOOLEAN NOT NULL
);

CREATE TABLE leaderboard_stats (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  profit_total BIGINT NOT NULL DEFAULT 0,
  win_rate NUMERIC(5,2) DEFAULT 0,
  total_bets INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE badges (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  badge_key TEXT NOT NULL,
  earned_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, badge_key)
);
```
Indexes (examples):
```sql
CREATE INDEX idx_markets_platform ON markets(platform);
CREATE INDEX idx_bets_market ON bets(market_id);
CREATE INDEX idx_metrics_market_time ON market_metrics(market_id, snapshot_at DESC);
```

## 6. Smart Contract Storage (EVM Example)
```solidity
struct MarketData {
  address creator;
  bytes32 platform;      // e.g. keccak256("tiktok")
  bytes32 metricType;    // views/likes/etc
  uint256 threshold;
  uint64  resolutionTime; // unix
  uint256 overPool;
  uint256 underPool;
  uint16  feeBps;         // max 1000 (10%)
  MarketState state;
}

mapping(uint256 => MarketData) public markets;
mapping(uint256 => mapping(address => Stake)) public stakes; // (marketId => user => position+amount)

enum MarketState { Active, Resolving, Settled, Expired }

event MarketCreated(uint256 id, address creator, bytes32 platform, bytes32 metricType, uint256 threshold, uint64 resolutionTime);
event BetPlaced(uint256 id, address user, bool over, uint256 amount);
event FinalMetric(uint256 id, uint256 finalValue, bool success);
event Payout(address indexed user, uint256 id, uint256 amount);
```
Escrow Logic:
- BetPlaced: transfer USDC from user → contract; update pool.
- Finalization: success = currentValue >= threshold.
- Payout: winners get (totalPool * userStake / winningPool) * (1 - feeBps/10_000).
- Fee: accumulate to `feeCollector` address.

## 7. Oracle Aggregation Flow
```
Scheduler -> FetchAdapters (TikTok, YouTube, X, Instagram)
         -> Normalize (map to { platform, content_id, metric_type, value, fetched_at })
         -> Consensus (median per metric_type if multiple sources)
         -> Store snapshot (market_metrics)
         -> Trigger finalization if resolution_at passed
```
Validation:
- Reject snapshots with deviation > X% from rolling average (potential manipulation).
- Retry exponential backoff on API failure.

## 8. Event Bus & Real-Time
Publish events on Redis channels:
- market.created.{id}
- market.bet.{id}
- market.metric.{id}
- market.finalized.{id}
Frontend subscribes via gateway WebSocket; transform to minimal JSON patches:
```json
{ "type":"pool_update", "marketId":"...", "overPool":12345, "underPool":67890 }
```

## 9. Caching Model
Redis Keys:
- `market:current:<id>` → { currentValue, overPool, underPool, state }
- `market:list:active` → sorted set score = resolution_at
- `user:profit:<id>` → profit_total (for quick leaderboard reads)
TTL: metrics ephemeral (keep last N snapshots), durable states persisted in Postgres.

## 10. Payout Calculation (Formula)
Let:
- T = overPool + underPool
- Wp = winningPool (overPool or underPool)
- s = userStake in winning side
- f = feeBps / 10_000
Payout = (T * s / Wp) * (1 - f)
PlatformFeeCollected = (T * s / Wp) * f aggregated across winners.

## 11. Badge Logic (Examples)
- whale: profit_total > threshold (e.g. > $10k).
- streak: consecutive settled wins >= N.
- sniper: win_rate >= 75% & total_bets >= 50.
- volume: total_bets >= 300.
- creator: markets_created >= 25.

## 12. Scaling Path
Phase 1: Single Postgres + Redis.
Phase 2: Read replicas + partition metrics table by date.
Phase 3: Move high-volume metrics to ClickHouse; keep transactional ledger in Postgres.
Phase 4: Multi-region: replicate read caches; latency-based routing for bet placement.

## 13. Failure Modes & Recovery
| Failure | Detection | Recovery |
|---------|-----------|----------|
| Oracle API down | fetch error rate spike | Fallback scraper, extend resolution window |
| Bet surge (spike) | queue depth metric | Auto scale API pods; shed low-priority analytics |
| Redis outage | connection refused | Switch to degraded mode (polling) + circuit breaker |
| Contract revert loop | high failed tx ratio | Pause market creation; flag investigation; fallback ledger (if hybrid) |

## 14. Frontend State Strategy
- Keep canonical market lists via server component fetch.
- Maintain client-side ephemeral state for current bet form, success banners, tooltips.
- WebSocket patch reconciler merges pool & metric changes without full refetch.

## 15. Open Extension Points
- Additional platforms: add adapter implementing `fetchMetric(contentUrl) -> { currentValue }`.
- Multi-outcome: extend contract with mapping(outcomeId => poolAmount).
- Governance: introduce token-weighted control of feeBps & oracle set.

---
This architecture & schema doc is a forward-looking blueprint built from current UI direction. Adjust as backend & contract implementations evolve.
