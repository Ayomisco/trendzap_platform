"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, TrendingUp, Trophy, Medal, Award } from "lucide-react"
import { formatCurrency, formatNumber } from "@/lib/format"
import Link from "next/link"

const mockTweets = [
  {
    rank: 1,
    id: "2",
    content: "BREAKING: Major breakthrough in quantum computing announced. This changes everything.",
    author: {
      name: "Tech Insider",
      handle: "@techinsider",
      avatar: "/interconnected-tech.png",
      verified: true,
    },
    price: 8.2,
    change: 156.3,
    volume: 34200,
    holders: 1243,
  },
  {
    rank: 2,
    id: "4",
    content: "Market analysis: Why this bull run is different from 2021. Data-driven insights 📊",
    author: {
      name: "Crypto Maven",
      handle: "@cryptomaven",
      avatar: "/crypto-digital-landscape.png",
      verified: true,
    },
    price: 4.7,
    change: 67.8,
    volume: 18900,
    holders: 789,
  },
  {
    rank: 3,
    id: "1",
    content:
      "Just launched our new AI product and the response has been incredible! 🚀 Thank you to everyone who believed in the vision.",
    author: {
      name: "Sarah Chen",
      handle: "@sarahchen",
      avatar: "/diverse-woman-portrait.png",
      verified: true,
    },
    price: 2.5,
    change: 24.5,
    volume: 8400,
    holders: 342,
  },
  {
    rank: 4,
    id: "3",
    content: "My thoughts on the future of Web3 and why decentralization matters more than ever 🧵",
    author: {
      name: "Alex Rivera",
      handle: "@alexrivera",
      avatar: "/man.jpg",
      verified: false,
    },
    price: 1.8,
    change: 12.4,
    volume: 4200,
    holders: 234,
  },
]

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="w-5 h-5 text-yellow-500" />
    case 2:
      return <Medal className="w-5 h-5 text-gray-400" />
    case 3:
      return <Award className="w-5 h-5 text-amber-700" />
    default:
      return <span className="text-muted-foreground font-semibold">#{rank}</span>
  }
}

export function TweetsLeaderboard() {
  return (
    <div className="space-y-4">
      {mockTweets.map((tweet) => (
        <Link key={tweet.rank} href={`/tweet/${tweet.id}`}>
          <Card className="glass p-6 hover:bg-accent/50 transition-colors cursor-pointer">
            <div className="flex gap-4">
              {/* Rank */}
              <div className="flex items-start justify-center pt-1">{getRankIcon(tweet.rank)}</div>

              {/* Content */}
              <div className="flex-1 space-y-4">
                {/* Author */}
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={tweet.author.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{tweet.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">{tweet.author.name}</span>
                      {tweet.author.verified && <CheckCircle2 className="w-4 h-4 text-primary" />}
                    </div>
                    <span className="text-sm text-muted-foreground">{tweet.author.handle}</span>
                  </div>
                </div>

                {/* Tweet Content */}
                <p className="text-foreground leading-relaxed">{tweet.content}</p>

                {/* Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Price</p>
                    <p className="font-semibold text-lg">{formatCurrency(tweet.price)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">24h Change</p>
                    <Badge variant="secondary" className="glass bg-green-500/20 text-green-400 border-green-500/30">
                      <TrendingUp className="w-3 h-3 mr-1" />+{tweet.change}%
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Volume</p>
                    <p className="font-semibold">{formatCurrency(tweet.volume)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Holders</p>
                    <p className="font-semibold">{formatNumber(tweet.holders)}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}
