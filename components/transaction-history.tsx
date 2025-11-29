"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatCurrency } from "@/lib/format"
import { TrendingUp, TrendingDown, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const mockTransactions = [
  {
    id: "1",
    type: "buy",
    tweet: {
      content: "Just launched our new AI product and the response has been incredible!",
      author: {
        name: "Sarah Chen",
        avatar: "/diverse-woman-portrait.png",
      },
    },
    shares: 50,
    price: 2.0,
    total: 100,
    timestamp: "2 hours ago",
    status: "completed",
  },
  {
    id: "2",
    type: "sell",
    tweet: {
      content: "Market analysis: Why this bull run is different from 2021.",
      author: {
        name: "Crypto Maven",
        avatar: "/crypto-digital-landscape.png",
      },
    },
    shares: 30,
    price: 4.5,
    total: 135,
    timestamp: "1 day ago",
    status: "completed",
  },
  {
    id: "3",
    type: "buy",
    tweet: {
      content: "BREAKING: Major breakthrough in quantum computing announced.",
      author: {
        name: "Tech Insider",
        avatar: "/interconnected-tech.png",
      },
    },
    shares: 25,
    price: 5.2,
    total: 130,
    timestamp: "2 days ago",
    status: "completed",
  },
  {
    id: "4",
    type: "buy",
    tweet: {
      content: "My thoughts on the future of Web3 and why decentralization matters",
      author: {
        name: "Alex Rivera",
        avatar: "/man.jpg",
      },
    },
    shares: 100,
    price: 1.6,
    total: 160,
    timestamp: "3 days ago",
    status: "completed",
  },
  {
    id: "5",
    type: "sell",
    tweet: {
      content: "5 design principles that changed how I approach product design.",
      author: {
        name: "Sarah Chen",
        avatar: "/diverse-woman-portrait.png",
      },
    },
    shares: 40,
    price: 1.9,
    total: 76,
    timestamp: "5 days ago",
    status: "completed",
  },
]

export function TransactionHistory() {
  return (
    <Card className="glass-strong p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg">Transaction History</h3>
        <Button variant="ghost" size="sm">
          Export
        </Button>
      </div>

      <div className="space-y-3">
        {mockTransactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center gap-4 p-4 rounded-lg glass">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                transaction.type === "buy" ? "bg-green-500/20" : "bg-red-500/20"
              }`}
            >
              {transaction.type === "buy" ? (
                <TrendingUp className="w-5 h-5 text-green-500" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-500" />
              )}
            </div>

            <Avatar className="w-10 h-10">
              <AvatarImage
                src={transaction.tweet.author.avatar || "/placeholder.svg"}
                alt={transaction.tweet.author.name}
              />
              <AvatarFallback>{transaction.tweet.author.name[0]}</AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge
                  variant="secondary"
                  className={`h-5 px-2 text-xs ${
                    transaction.type === "buy" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                  }`}
                >
                  {transaction.type.toUpperCase()}
                </Badge>
                <p className="text-sm font-semibold">{transaction.shares} shares</p>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-1">{transaction.tweet.content}</p>
            </div>

            <div className="text-right shrink-0">
              <p className="font-bold">{formatCurrency(transaction.total)}</p>
              <p className="text-xs text-muted-foreground">{transaction.timestamp}</p>
            </div>

            <Button variant="ghost" size="icon" className="shrink-0">
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  )
}
