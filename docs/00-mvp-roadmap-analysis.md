# TrendZap MVP Roadmap & Gap Analysis

## Executive Summary
**Current State**: Beautiful UI/UX prototype with complete frontend components, auth system (Privy), and wallet integration. **Zero backend or data persistence**.

**Critical Gap**: No API layer, no database, no smart contracts, no real social media data ingestion. Everything is hardcoded mock data.

**Recommendation**: Build a **phased MVP approach** focusing on Twitter + TikTok with serverless backend to validate core hypothesis fast and cheap.

---

## 🔴 What's MISSING (Critical Gaps)

### 1. Backend Infrastructure (100% Missing)
- ❌ No API routes (`/app/api/*` is empty)
- ❌ No database (Postgres/Supabase/Firebase)
- ❌ No data models or schemas
- ❌ No authentication session management (Privy tokens not verified server-side)
- ❌ No real-time WebSocket/SSE for live updates

### 2. Data Ingestion Layer (100% Missing)
- ❌ No social media API integration (Twitter API, TikTok scraping)
- ❌ No metric tracking system (views, likes polling)
- ❌ No URL parser/validator
- ❌ No content metadata extraction

### 3. Market Logic & State Machine (100% Missing)
- ❌ No market creation flow (just UI mockup)
- ❌ No bet placement logic
- ❌ No pool calculations (just frontend math)
- ❌ No market resolution automation
- ❌ No winner payout distribution

### 4. Payment & Settlement (100% Missing)
- ❌ No USDC integration (wallet shows $0.00 hardcoded)
- ❌ No smart contracts (EVM or abstract account)
- ❌ No escrow/custody system
- ❌ No deposit/withdrawal flows
- ❌ No fee collection mechanism

### 5. User Management (Partial)
- ✅ Auth UI works (Privy)
- ❌ No user profiles in database
- ❌ No bet history persistence
- ❌ No profit/loss tracking
- ❌ No leaderboard calculations (just mock data)

### 6. Content Safety & Validation (100% Missing)
- ❌ No URL validation against supported platforms
- ❌ No duplicate market detection
- ❌ No content moderation
- ❌ No spam prevention

---

## 🎯 Proposed MVP Phasing (SIMPLE FIRST)

### **MVP 1: Twitter-Only, Off-Chain Simulation (4-6 weeks)**
**Goal**: Validate user behavior with real Twitter data, fake money.

#### What to Build:
1. **Backend (Next.js API Routes + Supabase)**
   - `/api/markets/create` - Parse Twitter URL, fetch current metrics via Twitter API v2
   - `/api/markets/list` - Return active markets from DB
   - `/api/bets/place` - Record bet (no real money, just virtual balance)
   - `/api/markets/resolve` - Cron job checks Twitter API, determines winner, updates DB

2. **Database Schema (Supabase/Postgres)**
   ```sql
   users: id, privy_id, email, virtual_balance (default 1000 USDC)
   markets: id, creator_id, tweet_url, tweet_id, metric_type, threshold, current_value, resolution_time, state
   bets: id, market_id, user_id, position, amount, created_at
   resolutions: id, market_id, final_value, success, resolved_at
   ```

3. **Twitter Integration**
   - Use Twitter API v2 (Free tier: 1,500 tweets/month)
   - Parse tweet URLs → extract tweet_id
   - Fetch metrics: `public_metrics.like_count`, `public_metrics.retweet_count`
   - Poll every 5 minutes for active markets (use Vercel Cron)

4. **Market Flow**
   - User pastes Twitter URL → API validates → Fetch current likes/retweets
   - Auto-suggest threshold (e.g., current_likes * 2)
   - User sets resolution time (1h, 6h, 24h only)
   - Initial bet from virtual balance creates market
   - Others can bet Over/Under (proportional pool model)

5. **Resolution**
   - Vercel Cron every 5 min: check markets past resolution_time
   - Fetch final Twitter metrics
   - Determine winner (over/under)
   - Calculate payouts: `(total_pool * user_stake / winning_pool) * 0.97`
   - Update user virtual_balance
   - Mark market as SETTLED

6. **What NOT to Build Yet**
   - ❌ Real USDC (use virtual balance)
   - ❌ Smart contracts
   - ❌ TikTok (API access extremely limited)
   - ❌ Real-time WebSocket (poll every 30s client-side)
   - ❌ Leaderboard (just show user's own P&L)

#### Tech Stack (Simple):
- **Frontend**: Keep existing Next.js 16 + Privy
- **Backend**: Next.js API routes (serverless)
- **Database**: Supabase (free tier, Postgres + Auth + Storage)
- **Twitter API**: Twitter API v2 Essential tier (free, 1,500 tweets/month)
- **Cron**: Vercel Cron (built-in, free)
- **Deployment**: Vercel (frontend + API routes)

#### Why This Works:
- Validates core behavior: do users create markets? do they bet?
- Real Twitter data = real credibility
- Virtual money = zero financial/legal risk
- Fast to build (no blockchain complexity)
- Cheap (mostly free tier services)

---

### **MVP 2: TikTok + Real USDC (On-Chain) (8-10 weeks after MVP 1)**
**Goal**: Add TikTok (bigger viral potential), introduce real money via smart contracts.

#### What to Add:
1. **TikTok Data (Scraping + Proxy)**
   - TikTok has NO public API for free metrics
   - Options:
     - **Recommended**: Use third-party API (RapidAPI TikTok scrapers ~$50/mo)
     - Alternative: Build headless browser scraper (Puppeteer) - fragile, rate-limited
   - Parse TikTok URLs → video_id
   - Fetch views, likes, comments, shares

2. **Smart Contracts (Base Mainnet)**
   - Deploy simple escrow contract:
     - `createMarket(threshold, resolutionTime)` - locks initial bet
     - `placeBet(marketId, position)` - locks USDC
     - `resolveMarket(marketId, finalValue)` - oracle bot calls this
     - `claimWinnings(marketId)` - winners withdraw
   - Use USDC contract on Base (low fees)
   - Oracle = backend wallet (centralized for MVP, decentralize later)

3. **Payment Flow**
   - User deposits USDC to smart contract
   - Bets lock USDC in escrow
   - Resolution triggers on-chain payout
   - Winners claim via transaction

4. **Platform Expansion**
   - Support both Twitter + TikTok markets
   - Filter by platform in UI (already built)
   - Separate scraping logic per platform

#### Why Wait for MVP 2:
- TikTok scraping is fragile (no official API)
- Smart contracts add complexity + audit needs
- Need MVP 1 data to validate demand

---

### **MVP 3: Multi-Chain + Advanced Features (12+ weeks)**
**Goal**: Scale, optimize, add social features.

#### What to Add:
- **Chains**: Add Arbitrum, Optimism
- **Features**:
  - Multi-outcome markets (tiered thresholds)
  - Social sharing (auto-generate share images)
  - Real-time WebSocket for live pool updates
  - Advanced leaderboard (badges, streaks)
  - Referral rewards
  - Creator fees (market creator gets 0.5% of pool)
- **Infrastructure**:
  - Move to dedicated backend (NestJS/Express)
  - Use Redis for caching
  - ClickHouse for analytics
  - Decentralized oracle (Chainlink or custom staking)

---

## 🛠️ MVP 1 Implementation Plan (Twitter + Virtual Money)

### Week 1-2: Backend Foundation
- [ ] Set up Supabase project
- [ ] Create database schema (users, markets, bets, resolutions)
- [ ] Build `/api/auth/session` - verify Privy token, sync user to DB
- [ ] Build `/api/user/balance` - get virtual balance

### Week 3: Market Creation
- [ ] Build `/api/markets/create`
  - Parse Twitter URL (regex: `twitter.com/.*/status/(\d+)`)
  - Call Twitter API v2 to fetch tweet + metrics
  - Validate threshold > current_value
  - Create market record
  - Place initial bet (deduct from virtual balance)
- [ ] Update `CreateMarketDialog` to call real API
- [ ] Handle loading states + errors

### Week 4: Market Listing & Betting
- [ ] Build `/api/markets/list` - fetch active markets with current metrics
- [ ] Build `/api/bets/place` - validate balance, create bet, update pools
- [ ] Update `MarketFeed` to fetch real data
- [ ] Update `MarketDetailView` to fetch + place real bets
- [ ] Add optimistic UI updates

### Week 5: Resolution System
- [ ] Build `/api/cron/resolve-markets` (Vercel Cron every 5 min)
  - Query markets where state=ACTIVE and resolution_time < now
  - Fetch final Twitter metrics
  - Determine success (final_value >= threshold)
  - Calculate payouts for each bet
  - Update user balances
  - Mark market as SETTLED
- [ ] Build `/api/markets/[id]/status` - check if user won/lost
- [ ] Add resolution notification in UI

### Week 6: Polish & Testing
- [ ] Add user profile page (real bet history)
- [ ] Add basic P&L calculations
- [ ] Error handling + validation
- [ ] Rate limiting (prevent spam)
- [ ] Test with 10-20 beta users
- [ ] Monitor Twitter API quota

---

## 🔑 Critical Decisions & Trade-offs

### 1. Real Money vs Virtual Money (MVP 1)
**Recommendation**: Virtual money first.
- **Why**: Faster, no legal/compliance risk, validate core loop
- **When Real Money**: After 100+ users complete 500+ markets (proof of demand)

### 2. Twitter API Limits
**Free Tier**: 1,500 tweet reads/month
- At 5-min polling, each active market = ~8,640 reads/month
- **Solution**: MVP 1 limit = 10 concurrent active markets max
- **Upgrade**: If needed, Essential+ tier = $100/mo for 10K/month

### 3. TikTok Data Access
**No Free API** - Must choose:
- **Option A (Recommended)**: RapidAPI TikTok scraper (~$50/mo, 10K requests)
- **Option B**: Self-hosted scraper (Puppeteer + proxies, fragile, $30-100/mo)
- **Option C**: Skip TikTok until MVP 2 (Twitter validation first)

### 4. Smart Contracts or Custodial
**MVP 1**: Custodial (just database records)
**MVP 2**: Smart contracts (Base mainnet, low fees)
- **Why Wait**: Contract audits cost $5-15K, complexity adds 4-6 weeks
- **Legal**: Even off-chain betting may need compliance review (gambling laws vary)

### 5. Real-Time Updates
**MVP 1**: Client-side polling every 30s (simple)
**MVP 2**: WebSocket or Server-Sent Events (better UX)

---

## 📊 MVP 1 Success Metrics
- **Activation**: 100+ users create Privy accounts
- **Engagement**: 50+ markets created in first month
- **Retention**: 30% of users return to bet on 2nd market
- **Liquidity**: Avg pool size > $100 virtual USDC
- **Resolution**: 95%+ markets resolve correctly (no Twitter API failures)

---

## 💰 Cost Estimates (MVP 1)

| Service | Cost | Notes |
|---------|------|-------|
| Vercel (hosting) | Free | Hobby tier, 100GB bandwidth |
| Supabase (DB) | Free | 500MB database, 2GB bandwidth |
| Twitter API v2 | Free | 1,500 tweets/month (10 markets max) |
| Domain | $12/yr | trendzap.io |
| **Total Monthly** | **~$1** | Can run for months on free tiers |

**MVP 2 Add-Ons**:
- TikTok scraper API: $50/mo
- Smart contract audit: $5,000 one-time
- Base gas fees: ~$50/mo (minimal)

---

## 🚨 Risks & Mitigations

### Risk 1: Twitter API Rate Limits
- **Mitigation**: Cache metrics, reduce polling frequency, limit concurrent markets

### Risk 2: Market Manipulation (Bot Farms)
- **Mitigation**: Start with invite-only, add Privy email verification, rate-limit market creation

### Risk 3: Legal (Gambling Regulations)
- **Mitigation**: MVP 1 uses virtual money (not gambling). Consult lawyer before real money.

### Risk 4: TikTok Scraping Breaks
- **Mitigation**: Use paid API service with SLA, have fallback resolution logic

### Risk 5: No Users
- **Mitigation**: Launch on Twitter/CT crypto communities, offer early adopter perks

---

## 📝 Next Steps (Action Items)

### Immediate (This Week):
1. **Decision**: Approve MVP 1 approach (Twitter + virtual money)?
2. **Setup**: Create Supabase project, get Twitter API keys
3. **Design Review**: Finalize database schema (see below)

### After Approval:
1. Build backend (Weeks 1-2)
2. Wire up frontend to real APIs (Weeks 3-4)
3. Add resolution cron (Week 5)
4. Beta test (Week 6)

---

## 🗂️ Proposed Database Schema (MVP 1)

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  privy_id TEXT UNIQUE NOT NULL,
  email TEXT,
  wallet_address TEXT,
  virtual_balance BIGINT DEFAULT 1000000000, -- 1000 USDC (6 decimals)
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Markets table
CREATE TABLE markets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES users(id),
  platform TEXT NOT NULL, -- 'twitter', 'tiktok'
  content_url TEXT NOT NULL,
  content_id TEXT NOT NULL, -- tweet_id or video_id
  metric_type TEXT NOT NULL, -- 'likes', 'retweets', 'views'
  threshold BIGINT NOT NULL,
  current_value BIGINT,
  resolution_time TIMESTAMPTZ NOT NULL,
  state TEXT DEFAULT 'ACTIVE', -- ACTIVE, RESOLVING, SETTLED, CANCELLED
  over_pool BIGINT DEFAULT 0,
  under_pool BIGINT DEFAULT 0,
  fee_bps INT DEFAULT 300, -- 3%
  created_at TIMESTAMPTZ DEFAULT now(),
  resolved_at TIMESTAMPTZ,
  final_value BIGINT
);

-- Bets table
CREATE TABLE bets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  market_id UUID REFERENCES markets(id),
  user_id UUID REFERENCES users(id),
  position TEXT NOT NULL, -- 'OVER', 'UNDER'
  amount BIGINT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  settled BOOLEAN DEFAULT false,
  payout BIGINT
);

-- Indexes
CREATE INDEX idx_markets_state ON markets(state, resolution_time);
CREATE INDEX idx_bets_market ON bets(market_id);
CREATE INDEX idx_bets_user ON bets(user_id);
```

---

## 🎨 UI/UX Flows That Work (Already Built)
✅ Beautiful landing page with market feed
✅ Create market dialog (3-step wizard)
✅ Market detail view with betting interface
✅ Wallet connection (Privy)
✅ Leaderboard page
✅ User profile

**Just Need**: Wire to real APIs instead of mock data.

---

## 🔄 What to Edit in Existing Docs

### Update `01-product-prd.md`:
- Add MVP 1/2/3 phasing
- Clarify Twitter-only start
- Remove multi-chain complexity from MVP scope
- Add virtual money → real money transition

### Update `02-technical-guide.md`:
- Replace "recommended backend" with MVP 1 concrete stack
- Add Twitter API integration guide
- Add Supabase setup instructions
- Simplify smart contract section (move to MVP 2)

### Update `03-architecture-schema.md`:
- Show MVP 1 simplified architecture (Next.js + Supabase)
- Add Twitter ingestion flow diagram
- Update database schema to match MVP 1
- Add resolution cron job flow

---

## ✅ Conclusion

**Current State**: UI prototype with no backend.

**Recommended Path**:
1. **MVP 1 (4-6 weeks)**: Twitter + virtual money → validate demand
2. **MVP 2 (8-10 weeks)**: Add TikTok + real USDC on Base → monetize
3. **MVP 3 (12+ weeks)**: Scale + advanced features

**Key Philosophy**: Ship fast, validate cheap, add complexity only when proven.

**First Decision Needed**: Approve MVP 1 scope? Then we build.
