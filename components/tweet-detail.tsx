"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Repeat2, Eye, ArrowLeft, Share2, BarChart3 } from "lucide-react"
import { formatNumber, formatCurrency } from "@/lib/format"
import { PriceChart } from "@/components/price-chart"
import { TradingPanel } from "@/components/trading-panel"
import { HoldersList } from "@/components/holders-list"
import { ActivityFeed } from "@/components/activity-feed"
import Link from "next/link"

interface TweetDetailProps {
  tweetId: string
}

// Mock data - in real app this would come from API
const mockTweetData = {
  id: "1",
  author: {
    name: "Sarah Chen",
    handle: "@sarahchen",
    avatar: "/diverse-woman-portrait.png",
    verified: true,
    followers: 125000,
  },
  content:
    "Just launched our new AI product and the response has been incredible! 🚀 Thank you to everyone who believed in the vision. This is just the beginning of something amazing.",
  timestamp: "2h ago",
  metrics: {
    likes: 12400,
    retweets: 3200,
    views: 245000,
  },
  price: 2.5,
  change: 24.5,
  holders: 342,
  volume: 8400,
  marketCap: 855000,
  totalSupply: 10000,
  availableSupply: 6580,
}

export function TweetDetail({ tweetId }: TweetDetailProps) {
  const tweet = mockTweetData
  const isPositive = tweet.change > 0

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link href="/">
        <Button variant="ghost" className="glass bg-transparent">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Marketplace
        </Button>
      </Link>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content - Left Side */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tweet Card */}
          <Card className="glass-strong p-6 space-y-6">
            {/* Author */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-14 h-14 ring-2 ring-primary/20">
                  <AvatarImage src={tweet.author.avatar || "/placeholder.svg"} alt={tweet.author.name} />
                  <AvatarFallback>{tweet.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-bold text-lg">{tweet.author.name}</h2>
                    {tweet.author.verified && (
                      <Badge variant="secondary" className="h-5 px-2">
                        ✓
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{tweet.author.handle}</p>
                  <p className="text-xs text-muted-foreground">{formatNumber(tweet.author.followers)} followers</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="glass bg-transparent">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <p className="text-base leading-relaxed">{tweet.content}</p>
              <p className="text-sm text-muted-foreground">{tweet.timestamp}</p>
            </div>

            {/* Engagement Metrics */}
            <div className="flex items-center gap-6 pt-4 border-t border-border/50">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Heart className="w-5 h-5" />
                <span className="font-semibold">{formatNumber(tweet.metrics.likes)}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Repeat2 className="w-5 h-5" />
                <span className="font-semibold">{formatNumber(tweet.metrics.retweets)}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Eye className="w-5 h-5" />
                <span className="font-semibold">{formatNumber(tweet.metrics.views)}</span>
              </div>
            </div>
          </Card>

          {/* Price Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card className="glass p-4">
              <p className="text-xs text-muted-foreground mb-1">Current Price</p>
              <p className="text-xl font-bold">{formatCurrency(tweet.price)}</p>
            </Card>
            <Card className="glass p-4">
              <p className="text-xs text-muted-foreground mb-1">24h Change</p>
              <p className={`text-xl font-bold ${isPositive ? "text-green-500" : "text-red-500"}`}>
                {isPositive ? "+" : ""}
                {tweet.change.toFixed(2)}%
              </p>
            </Card>
            <Card className="glass p-4">
              <p className="text-xs text-muted-foreground mb-1">Market Cap</p>
              <p className="text-xl font-bold">{formatCurrency(tweet.marketCap)}</p>
            </Card>
            <Card className="glass p-4">
              <p className="text-xs text-muted-foreground mb-1">24h Volume</p>
              <p className="text-xl font-bold">{formatCurrency(tweet.volume)}</p>
            </Card>
          </div>

          {/* Price Chart */}
          <Card className="glass-strong p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Price Chart
              </h3>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="text-xs">
                  1H
                </Button>
                <Button variant="ghost" size="sm" className="text-xs">
                  24H
                </Button>
                <Button variant="ghost" size="sm" className="text-xs bg-primary/10">
                  7D
                </Button>
                <Button variant="ghost" size="sm" className="text-xs">
                  30D
                </Button>
              </div>
            </div>
            <PriceChart />
          </Card>

          {/* Tabs for Additional Info */}
          <Tabs defaultValue="activity" className="space-y-4">
            <TabsList className="glass w-full justify-start">
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="holders">Holders</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>

            <TabsContent value="activity">
              <ActivityFeed />
            </TabsContent>

            <TabsContent value="holders">
              <HoldersList />
            </TabsContent>

            <TabsContent value="about">
              <Card className="glass-strong p-6 space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">About this Tweet</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This tweet has been tokenized on PulseMarket, allowing supporters to invest in its viral potential.
                    Early investors earn returns as the tweet gains traction and value appreciates.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Total Supply</p>
                    <p className="font-semibold">{formatNumber(tweet.totalSupply)} shares</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Available</p>
                    <p className="font-semibold">{formatNumber(tweet.availableSupply)} shares</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Creator Royalty</p>
                    <p className="font-semibold">5%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Platform Fee</p>
                    <p className="font-semibold">2.5%</p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Trading Panel - Right Side */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <TradingPanel tweet={tweet} />
          </div>
        </div>
      </div>
    </div>
  )
}
