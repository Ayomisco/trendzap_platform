"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, CheckCircle2 } from "lucide-react"
import { formatCurrency } from "@/lib/format"
import Link from "next/link"

const topPerformers = [
  {
    id: "2",
    content: "BREAKING: Major breakthrough in quantum computing announced...",
    author: {
      name: "Tech Insider",
      handle: "@techinsider",
      avatar: "/interconnected-tech.png",
      verified: true,
    },
    price: 8.2,
    change: 156.3,
    volume: 34200,
    marketCap: 10186,
  },
  {
    id: "4",
    content: "Market analysis: Why this bull run is different from 2021...",
    author: {
      name: "Crypto Maven",
      handle: "@cryptomaven",
      avatar: "/crypto-digital-landscape.png",
      verified: true,
    },
    price: 4.7,
    change: 67.8,
    volume: 18900,
    marketCap: 3708,
  },
  {
    id: "1",
    content: "Just launched our new AI product and the response has been incredible...",
    author: {
      name: "Sarah Chen",
      handle: "@sarahchen",
      avatar: "/diverse-woman-portrait.png",
      verified: true,
    },
    price: 2.5,
    change: 24.5,
    volume: 8400,
    marketCap: 855,
  },
]

export function TopPerformersTable() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Top Performing Tweets (24h)</h2>
      {topPerformers.map((tweet, index) => (
        <Link key={tweet.id} href={`/tweet/${tweet.id}`}>
          <Card className="glass p-6 hover:bg-accent/50 transition-colors cursor-pointer">
            <div className="flex gap-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold shrink-0">
                {index + 1}
              </div>

              <div className="flex-1 space-y-3">
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

                <p className="text-foreground line-clamp-1">{tweet.content}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Price</p>
                    <p className="font-semibold">{formatCurrency(tweet.price)}</p>
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
                    <p className="text-xs text-muted-foreground mb-1">Market Cap</p>
                    <p className="font-semibold">{formatCurrency(tweet.marketCap)}</p>
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
