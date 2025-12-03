# TrendZap Product Requirements Document (PRD)

## 1. One Liner

Predict the viral future of any social content in seconds and compete for yield by betting on performance thresholds.

## 2. Vision

TrendZap turns real-time social media engagement signals (views, likes, shares, comments) into liquid, decentralized prediction markets. Anyone can paste a link (TikTok, YouTube, X, Instagram), instantly spawn a market, seed liquidity with an initial bet, and let crowd sentiment and on-chain incentives price the probability of exceeding a chosen metric threshold within a resolution window.

## 3. Problem & Opportunity

Social virality is fast, opaque, and fleeting. Creators, traders, and culture watchers lack a structured way to express conviction about short‑term performance ("Will this TikTok break 1M views in 24h?"). TrendZap captures this latent attention by:

- Converting social metrics into time-bound on-chain markets.
- Providing transparent odds via pooled liquidity distribution (Over vs Under).
- Rewarding predictive accuracy and early discovery.

## 4. Target Users / Personas

1. Early Trend Hunters – spot breakout content; create markets early.
2. Quant / Data Traders – exploit statistical distributions of engagement curves.
3. Creators / Media Analysts – benchmark projected performance & sentiment.
4. Casual Participants – fun, gamified speculation on viral dynamics.
5. Liquidity Providers – seek fee + edge yields by stabilizing pools.

## 5. Core Value Propositions

- Instant Market Creation (under 10 seconds from URL paste).
- Cross-Platform Coverage (TikTok, YouTube, X, Instagram; extensible).
- Transparent Odds (pool ratio visualizations & dynamic implied probability).
- Multi-Chain Wallet Support (EVM + Solana, future modular expansion).
- Reputation & Leaderboards (profit, win rate, badges for specialization).
- Neutral Resolution (oracle aggregation, anti-manipulation safeguards).

## 6. Scope (MVP Phasing)

### MVP 1: Twitter-Only, Virtual Money (4-6 weeks)

**Goal**: Validate core prediction behavior with real social data, zero financial risk.

- Twitter URL ingestion + real-time metric fetch (Twitter API v2).
- Manual metric/threshold selection (likes, retweets only).
- Over/Under two-sided pool with proportional virtual payout.
- Virtual USDC balance (1000 starting, no real money).
- Automated resolution via cron (every 5 minutes).
- User profile with bet history and virtual P&L.
- **NOT Included**: Real money, smart contracts, TikTok, real-time WebSocket.

### MVP 2: TikTok + Real USDC On-Chain (8-10 weeks)

**Goal**: Expand to viral-heavy platform, introduce real money via Base smart contracts.

- Add TikTok support (scraper API or proxy).
- Deploy escrow smart contracts on Base mainnet.
- Real USDC deposits, bets, and payouts.
- Oracle-driven on-chain resolution.
- Platform filter (Twitter vs TikTok markets).

### MVP 3: Multi-Chain + Advanced Features (12+ weeks)

**Goal**: Scale infrastructure, add social virality mechanics.

- Multi-chain support (Arbitrum, Optimism).
- Multi-outcome markets (tiered thresholds).
- Real-time WebSocket updates.
- Social sharing + referral rewards.
- Advanced leaderboard with badges and streaks.
- Creator fee sharing (0.5% to market creator).
- Decentralized oracle governance.

## 7. Key Features (Detailed)

1. Market Creation Dialog
   - Step Flow: URL → Auto Preview → Details → Initial Bet.
   - Inputs: Platform (detected), Metric, Threshold, Resolution Time (1h–7d).
   - Output: New market entity + seeded pool (user's initial position).
2. Market Listing / Cards
   - Shows current metric, threshold, time remaining, pool split, bets count.
   - Hover animations & gradient branding per platform.
3. Market Detail View
   - Live metric tracking & progress bar toward threshold.
   - Pool distribution (Over vs Under amounts & percentages).
   - Bet placement widget: quick amounts + payout preview (fee-adjusted).
   - Tabs: Activity (live trades), Chart (historical curve), Info (metadata).
4. Betting Engine (Conceptual)
   - Accept USDC stakes, assign to Over or Under sub-pools.
   - Real-time recalculation of implied probability = pool_side / total.
   - Payout post resolution: winners receive (total_pool * (stake / winning_pool)) * (1 - fee).
5. Leaderboard
   - Rankings by cumulative realized profit, win rate, volume, specialization badges.
   - Podium layout (top 3) + extended list.
6. User Profile
   - Avatar, badges, rank, join date, quick actions (Create Market / Settings).
7. Authentication / Access
   - Privy hybrid auth (email + wallet linking). Guest browsing allowed.
8. Wallet & Chain Support
   - Solana Kit + WalletConnect/AppKit unify EVM & Solana access.
9. Fees & Incentives
   - Base platform fee (configurable, 3% in UI examples) on winning payouts.
   - Future: referral / creator fee share, early creator reward multipliers.
10. Anti-Manipulation & Integrity (Future)
    - Oracle redundancy: multiple scrapers + dispute window.
    - Detection of anomalous metric spikes (spam pump filtering).

## 8. User Stories (Representative)

- As a trend hunter, I paste a TikTok link and create a market in <10s.
- As a bettor, I want to see clear Over/Under pool ratios before staking.
- As a winner, I receive USDC automatically after resolution.
- As a creator, I view my market’s progress vs threshold.
- As a participant, I track my ranking & badges on the leaderboard.

## 9. Flows

1. Onboarding: Visit site → Browse markets → Connect wallet (optional) → Place bet.
2. Create Market: Paste URL → Preview metrics → Configure threshold/time → Seed bet → Market listed.
3. Bet Placement: Choose position → Enter amount → Preview payout → Confirm → Pool updates.
4. Resolution: Scheduled job/oracle fetch metrics → Determine success (metric >= threshold) → Trigger payout distribution & record profit → Update leaderboard.

## 10. Success Metrics (MVP 1)

- **Activation**: 100+ users create accounts in first month.
- **Engagement**: 50+ markets created (avg 2 per active user).
- **Retention**: 30% of users return to place 2nd bet.
- **Liquidity**: Average pool size > 100 virtual USDC.
- **Resolution**: 95%+ markets resolve correctly (no Twitter API failures).
- **Time to Market**: < 10s from URL paste to market created.

## 11. Assumptions / Constraints

- External platform APIs may be rate-limited or incomplete (need scraping + caching layer).
- Market lifecycle is short (hours–days) → low archival retrieval frequency.
- Regulatory constraints around prediction markets vary by jurisdiction (future compliance module).

## 12. Risks & Mitigations


| Risk                    | Mitigation                                                 |
| ----------------------- | ---------------------------------------------------------- |
| API Changes / Breakage  | Abstract ingestion via adapter pattern + fallback scraping |
| Metric Manipulation     | Multi-source consensus + anomaly scoring                   |
| Liquidity Fragmentation | Incentivize early LPs; add volume-based badges             |
| Oracle Latency          | Use staggered fetch + interim snapshot caching             |
| UX Complexity           | Maintain 3-step market creation & minimal bet friction     |

## 13. Out of Scope (MVP)

- Multi-outcome markets.
- Governance token & staking economics.
- Cross-market hedging or portfolio margining.

## 14. Open Questions

- Should thresholds auto-suggest from engagement velocity models?
- Introduce dynamic odds via bonding curve vs. proportional pool? (Phase 2)
- Arbitration / dispute window length?

---



### **🎯 My Recommendation: MVP 1 (Twitter + Virtual Money)**

**Why This Path**:

1. **Fast**: 4-6 weeks to ship working product
2. **Cheap**: \$0-1/month (free tiers)
3. **Real Data**: Twitter API gives credibility
4. **Zero Risk**: Virtual money = no gambling laws
5. **Validates Core**: Do users actually create & bet on markets?

**Tech Stack (Simple)**:

* **Frontend**: Keep your existing Next.js + Privy (already perfect)
* **Backend**: Next.js API routes (no separate server needed)
* **Database**: Supabase free tier (Postgres + backups)
* **Social Data**: Twitter API v2 free tier (1,500 tweets/month)
* **Scheduling**: Vercel Cron (built-in, resolves markets every 5 min)
* **Deployment**: Vercel (one-click, free)

**What Users Get**:

* Paste Twitter URL → auto-fetches current likes/retweets
* Set threshold (e.g., "will this tweet hit 10K likes in 24h?")
* Place virtual USDC bet (everyone starts with 1000 free)
* Markets auto-resolve via Twitter API polling
* Winners get virtual profit
* Track P&L on profile

**What You DON'T Build (Yet)**:

* ❌ Real money (virtual balance is enough to validate)
* ❌ Smart contracts (adds 4-6 weeks + \$5K audit)
* ❌ TikTok (no free API, adds complexity)
* ❌ Real-time WebSocket (client polling is fine)

---

### **🔄 After MVP 1 Proves Demand**

**MVP 2** (8-10 weeks): Add TikTok + real USDC via Base smart contracts
**MVP 3** (12+ weeks): Multi-chain, social features, advanced leaderboards

---

### **📊 MVP 1 Database Schema (Ready to Use)**

I included complete SQL schemas in `00-mvp-roadmap-analysis.md`:

* `users` (Privy ID, email, virtual balance)
* [markets](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html) (platform, URL, threshold, pools, state)
* [bets](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html) (position, amount, payout)
* `resolutions` (final value, winner determination)

All ready to copy into Supabase.

---

### **💡 Key Insights**

1. **Your UI is production-ready** — just needs real data endpoints
2. **Twitter is the perfect MVP** — free API, reliable, fast updates
3. **Virtual money validates behavior** without legal/financial risk
4. **Can ship in 4-6 weeks** if you start building backend now
5. **Costs almost nothing** — entire stack runs on free tiers

This PRD is derived from current frontend scaffolding; backend & oracle layers are not yet implemented and are specified in follow-up technical and architecture documents.
