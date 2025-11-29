"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarketTrendsChart } from "@/components/market-trends-chart"
import { TopPerformersTable } from "@/components/top-performers-table"
import { CategoryDistribution } from "@/components/category-distribution"
import { TradingVolumeChart } from "@/components/trading-volume-chart"
import { TrendingUp, TrendingDown, Activity, DollarSign } from "lucide-react"
import { formatCurrency, formatNumber } from "@/lib/format"

const marketStats = {
  totalMarketCap: 12450000,
  marketCapChange: 8.4,
  totalVolume24h: 3240000,
  volumeChange: -2.3,
  activeTweets: 1243,
  tweetsChange: 12.7,
  activeTraders: 8934,
  tradersChange: 5.2,
}

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Market Analytics</h1>
        <p className="text-muted-foreground">Comprehensive insights into PulseMarket trends and performance</p>
      </div>

      {/* Market Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total Market Cap</p>
            <DollarSign className="w-4 h-4 text-primary" />
          </div>
          <p className="text-3xl font-bold">{formatCurrency(marketStats.totalMarketCap)}</p>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="w-3 h-3 text-green-400" />
            <span className="text-xs text-green-400">+{marketStats.marketCapChange}%</span>
            <span className="text-xs text-muted-foreground">24h</span>
          </div>
        </Card>

        <Card className="glass p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">24h Volume</p>
            <Activity className="w-4 h-4 text-primary" />
          </div>
          <p className="text-3xl font-bold">{formatCurrency(marketStats.totalVolume24h)}</p>
          <div className="flex items-center gap-1 mt-2">
            <TrendingDown className="w-3 h-3 text-red-400" />
            <span className="text-xs text-red-400">{marketStats.volumeChange}%</span>
            <span className="text-xs text-muted-foreground">24h</span>
          </div>
        </Card>

        <Card className="glass p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Active Tweets</p>
            <Activity className="w-4 h-4 text-primary" />
          </div>
          <p className="text-3xl font-bold">{formatNumber(marketStats.activeTweets)}</p>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="w-3 h-3 text-green-400" />
            <span className="text-xs text-green-400">+{marketStats.tweetsChange}%</span>
            <span className="text-xs text-muted-foreground">7d</span>
          </div>
        </Card>

        <Card className="glass p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Active Traders</p>
            <Activity className="w-4 h-4 text-primary" />
          </div>
          <p className="text-3xl font-bold">{formatNumber(marketStats.activeTraders)}</p>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="w-3 h-3 text-green-400" />
            <span className="text-xs text-green-400">+{marketStats.tradersChange}%</span>
            <span className="text-xs text-muted-foreground">7d</span>
          </div>
        </Card>
      </div>

      {/* Main Analytics */}
      <Tabs defaultValue="trends" className="space-y-6">
        <TabsList className="glass">
          <TabsTrigger value="trends">Market Trends</TabsTrigger>
          <TabsTrigger value="volume">Trading Volume</TabsTrigger>
          <TabsTrigger value="performers">Top Performers</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6">
          <Card className="glass p-6">
            <h2 className="text-xl font-semibold mb-4">Market Cap Trends (30 Days)</h2>
            <MarketTrendsChart />
          </Card>
        </TabsContent>

        <TabsContent value="volume" className="space-y-6">
          <Card className="glass p-6">
            <h2 className="text-xl font-semibold mb-4">Trading Volume (7 Days)</h2>
            <TradingVolumeChart />
          </Card>
        </TabsContent>

        <TabsContent value="performers" className="space-y-6">
          <TopPerformersTable />
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="glass p-6">
              <h2 className="text-xl font-semibold mb-4">Category Distribution</h2>
              <CategoryDistribution />
            </Card>
            <Card className="glass p-6">
              <h2 className="text-xl font-semibold mb-4">Category Performance</h2>
              <div className="space-y-4">
                {[
                  { name: "Technology", volume: 1240000, change: 12.4, tweets: 342 },
                  { name: "Crypto & Web3", volume: 980000, change: 8.7, tweets: 289 },
                  { name: "Business", volume: 760000, change: -3.2, tweets: 234 },
                  { name: "Entertainment", volume: 540000, change: 15.6, tweets: 198 },
                  { name: "Sports", volume: 420000, change: 5.3, tweets: 156 },
                ].map((category) => (
                  <div key={category.name} className="flex items-center justify-between p-4 rounded-lg glass">
                    <div>
                      <p className="font-semibold">{category.name}</p>
                      <p className="text-sm text-muted-foreground">{category.tweets} tweets</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(category.volume)}</p>
                      <div className="flex items-center gap-1 justify-end">
                        {category.change > 0 ? (
                          <>
                            <TrendingUp className="w-3 h-3 text-green-400" />
                            <span className="text-xs text-green-400">+{category.change}%</span>
                          </>
                        ) : (
                          <>
                            <TrendingDown className="w-3 h-3 text-red-400" />
                            <span className="text-xs text-red-400">{category.change}%</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
