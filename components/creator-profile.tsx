"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, TrendingUp, DollarSign, Twitter, ExternalLink, Share2 } from "lucide-react"
import { formatNumber, formatCurrency } from "@/lib/format"
import { CreatorTweets } from "@/components/creator-tweets"
import { CreatorStats } from "@/components/creator-stats"
import { CreatorEarnings } from "@/components/creator-earnings"

interface CreatorProfileProps {
  handle: string
}

// Mock creator data
const mockCreatorData = {
  name: "Sarah Chen",
  handle: "@sarahchen",
  avatar: "/diverse-woman-portrait.png",
  verified: true,
  bio: "AI Product Designer & Entrepreneur. Building the future of creative tools. Sharing insights on design, tech, and startups.",
  followers: 125000,
  following: 842,
  joinedDate: "March 2019",
  stats: {
    totalTweets: 12,
    totalVolume: 245000,
    totalHolders: 3420,
    avgReturn: 67.5,
  },
  earnings: {
    total: 48500,
    thisMonth: 12400,
    royalties: 2425,
  },
  website: "sarahchen.design",
  location: "San Francisco, CA",
}

export function CreatorProfile({ handle }: CreatorProfileProps) {
  const creator = mockCreatorData

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="glass-strong p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar & Basic Info */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Avatar className="w-32 h-32 ring-4 ring-primary/20">
              <AvatarImage src={creator.avatar || "/placeholder.svg"} alt={creator.name} />
              <AvatarFallback className="text-3xl">{creator.name[0]}</AvatarFallback>
            </Avatar>
            <Button className="w-full gradient-primary">
              <Users className="w-4 h-4 mr-2" />
              Follow
            </Button>
          </div>

          {/* Profile Details */}
          <div className="flex-1 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl md:text-3xl font-bold">{creator.name}</h1>
                  {creator.verified && (
                    <Badge variant="secondary" className="h-6 px-2">
                      ✓
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground mb-2">{creator.handle}</p>
                <p className="text-sm leading-relaxed max-w-2xl">{creator.bio}</p>
              </div>
              <Button variant="ghost" size="icon" className="glass bg-transparent shrink-0">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Users className="w-4 h-4" />
                <span className="font-semibold text-foreground">{formatNumber(creator.followers)}</span> followers
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <span className="font-semibold text-foreground">{formatNumber(creator.following)}</span> following
              </div>
              {creator.location && (
                <div className="flex items-center gap-1 text-muted-foreground">{creator.location}</div>
              )}
              {creator.website && (
                <a
                  href={`https://${creator.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-primary hover:underline"
                >
                  {creator.website}
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border/50">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Tokenized Tweets</p>
                <p className="text-xl font-bold">{creator.stats.totalTweets}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total Volume</p>
                <p className="text-xl font-bold">{formatCurrency(creator.stats.totalVolume)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total Holders</p>
                <p className="text-xl font-bold">{formatNumber(creator.stats.totalHolders)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Avg Return</p>
                <p className="text-xl font-bold text-green-500">+{creator.stats.avgReturn}%</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Earnings Overview */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="glass p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total Earnings</p>
            <DollarSign className="w-5 h-5 text-primary" />
          </div>
          <p className="text-2xl font-bold">{formatCurrency(creator.earnings.total)}</p>
          <p className="text-xs text-green-500 mt-1">All time</p>
        </Card>

        <Card className="glass p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">This Month</p>
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <p className="text-2xl font-bold">{formatCurrency(creator.earnings.thisMonth)}</p>
          <p className="text-xs text-green-500 mt-1">+24% from last month</p>
        </Card>

        <Card className="glass p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Royalties (5%)</p>
            <Twitter className="w-5 h-5 text-primary" />
          </div>
          <p className="text-2xl font-bold">{formatCurrency(creator.earnings.royalties)}</p>
          <p className="text-xs text-muted-foreground mt-1">From secondary sales</p>
        </Card>
      </div>

      {/* Tabs for Content */}
      <Tabs defaultValue="tweets" className="space-y-6">
        <TabsList className="glass">
          <TabsTrigger value="tweets">Tokenized Tweets</TabsTrigger>
          <TabsTrigger value="stats">Performance</TabsTrigger>
          <TabsTrigger value="earnings">Earnings History</TabsTrigger>
        </TabsList>

        <TabsContent value="tweets">
          <CreatorTweets creatorHandle={creator.handle} />
        </TabsContent>

        <TabsContent value="stats">
          <CreatorStats />
        </TabsContent>

        <TabsContent value="earnings">
          <CreatorEarnings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
