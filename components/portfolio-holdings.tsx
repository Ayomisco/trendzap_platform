"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatCurrency, formatPercentage } from "@/lib/format"
import { TrendingUp, TrendingDown, ExternalLink } from "lucide-react"
import Link from "next/link"

const mockHoldings = [
  {
    id: "1",
    tweet: {
      id: "1",
      content: "Just launched our new AI product and the response has been incredible!",
      author: {
        name: "Sarah Chen",
        handle: "@sarahchen",
        avatar: "/diverse-woman-portrait.png",
      },
    },
    shares: 50,
    avgBuyPrice: 2.0,
    currentPrice: 2.5,
    totalValue: 125,
    totalInvested: 100,
    return: 25,
    returnPercentage: 25,
  },
  {
    id: "2",
    tweet: {
      id: "2",
      content: "BREAKING: Major breakthrough in quantum computing announced.",
      author: {
        name: "Tech Insider",
        handle: "@techinsider",
        avatar: "/interconnected-tech.png",
      },
    },
    shares: 25,
    avgBuyPrice: 5.2,
    currentPrice: 8.2,
    totalValue: 205,
    totalInvested: 130,
    return: 75,
    returnPercentage: 57.7,
  },
  {
    id: "3",
    tweet: {
      id: "3",
      content: "My thoughts on the future of Web3 and why decentralization matters",
      author: {
        name: "Alex Rivera",
        handle: "@alexrivera",
        avatar: "/man.jpg",
      },
    },
    shares: 100,
    avgBuyPrice: 1.6,
    currentPrice: 1.8,
    totalValue: 180,
    totalInvested: 160,
    return: 20,
    returnPercentage: 12.5,
  },
]

export function PortfolioHoldings() {
  return (
    <Card className="glass-strong p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg">Your Holdings</h3>
        <p className="text-sm text-muted-foreground">{mockHoldings.length} positions</p>
      </div>

      <div className="space-y-4">
        {mockHoldings.map((holding) => {
          const isPositive = holding.return > 0

          return (
            <div key={holding.id} className="p-4 rounded-lg glass space-y-4">
              {/* Tweet Info */}
              <div className="flex items-start gap-3">
                <Avatar className="w-10 h-10 ring-2 ring-primary/20">
                  <AvatarImage
                    src={holding.tweet.author.avatar || "/placeholder.svg"}
                    alt={holding.tweet.author.name}
                  />
                  <AvatarFallback>{holding.tweet.author.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-sm">{holding.tweet.author.name}</p>
                    <Badge variant="secondary" className="h-4 px-1 text-xs">
                      ✓
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{holding.tweet.author.handle}</p>
                  <p className="text-sm line-clamp-2">{holding.tweet.content}</p>
                </div>
                <Link href={`/tweet/${holding.tweet.id}`}>
                  <Button variant="ghost" size="icon" className="shrink-0">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </Link>
              </div>

              {/* Holdings Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-4 border-t border-border/50">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Shares</p>
                  <p className="font-bold">{holding.shares}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Avg Buy Price</p>
                  <p className="font-bold">{formatCurrency(holding.avgBuyPrice)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Current Price</p>
                  <p className="font-bold">{formatCurrency(holding.currentPrice)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Total Value</p>
                  <p className="font-bold">{formatCurrency(holding.totalValue)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Return</p>
                  <div className="flex items-center gap-1">
                    {isPositive ? (
                      <TrendingUp className="w-3 h-3 text-green-500" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-red-500" />
                    )}
                    <p className={`font-bold ${isPositive ? "text-green-500" : "text-red-500"}`}>
                      {formatPercentage(holding.returnPercentage)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Link href={`/tweet/${holding.tweet.id}`} className="flex-1">
                  <Button variant="outline" className="w-full glass bg-transparent">
                    View Details
                  </Button>
                </Link>
                <Button variant="outline" className="flex-1 glass bg-red-500/10 border-red-500/20">
                  Sell
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
