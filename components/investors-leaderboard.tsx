"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Trophy, Medal, Award } from "lucide-react"
import { formatCurrency, formatNumber } from "@/lib/format"

const mockInvestors = [
  {
    rank: 1,
    address: "0x742d...3f8a",
    name: "CryptoWhale",
    avatar: "/diverse-woman-portrait.png",
    totalValue: 245000,
    roi: 342.5,
    trades: 1243,
    winRate: 87.3,
  },
  {
    rank: 2,
    address: "0x8a3c...9d2b",
    name: "DiamondHands",
    avatar: "/man.jpg",
    totalValue: 198000,
    roi: 289.7,
    trades: 892,
    winRate: 82.1,
  },
  {
    rank: 3,
    address: "0x5f1e...4c7d",
    name: "MoonShot",
    avatar: "/interconnected-tech.png",
    totalValue: 167000,
    roi: 256.3,
    trades: 734,
    winRate: 79.8,
  },
  {
    rank: 4,
    address: "0x9b2a...6e5f",
    name: "AlphaSeeker",
    avatar: "/crypto-digital-landscape.png",
    totalValue: 142000,
    roi: 223.4,
    trades: 621,
    winRate: 76.5,
  },
  {
    rank: 5,
    address: "0x3d7c...8a1b",
    name: "BullMarket",
    avatar: "/diverse-woman-portrait.png",
    totalValue: 128000,
    roi: 198.2,
    trades: 567,
    winRate: 74.2,
  },
  {
    rank: 6,
    address: "0x6e4f...2c9d",
    name: "SmartMoney",
    avatar: "/man.jpg",
    totalValue: 115000,
    roi: 187.6,
    trades: 489,
    winRate: 71.8,
  },
  {
    rank: 7,
    address: "0x1a8b...5d3e",
    name: "TrendFollower",
    avatar: "/interconnected-tech.png",
    totalValue: 98000,
    roi: 165.4,
    trades: 423,
    winRate: 68.9,
  },
  {
    rank: 8,
    address: "0x4c2d...7f6a",
    name: "ValueHunter",
    avatar: "/crypto-digital-landscape.png",
    totalValue: 87000,
    roi: 152.3,
    trades: 378,
    winRate: 66.4,
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

export function InvestorsLeaderboard() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="glass p-4">
        <div className="grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground">
          <div className="col-span-1">Rank</div>
          <div className="col-span-4">Investor</div>
          <div className="col-span-2 text-right">Portfolio Value</div>
          <div className="col-span-2 text-right">ROI</div>
          <div className="col-span-2 text-right">Trades</div>
          <div className="col-span-1 text-right">Win Rate</div>
        </div>
      </Card>

      {/* Leaderboard Items */}
      {mockInvestors.map((investor) => (
        <Card key={investor.rank} className="glass p-4 hover:bg-accent/50 transition-colors cursor-pointer">
          <div className="grid grid-cols-12 gap-4 items-center">
            {/* Rank */}
            <div className="col-span-1 flex items-center justify-center">{getRankIcon(investor.rank)}</div>

            {/* Investor Info */}
            <div className="col-span-4 flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={investor.avatar || "/placeholder.svg"} />
                <AvatarFallback>{investor.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{investor.name}</p>
                <p className="text-sm text-muted-foreground font-mono">{investor.address}</p>
              </div>
            </div>

            {/* Portfolio Value */}
            <div className="col-span-2 text-right">
              <p className="font-semibold">{formatCurrency(investor.totalValue)}</p>
            </div>

            {/* ROI */}
            <div className="col-span-2 text-right">
              <Badge variant="secondary" className="glass bg-green-500/20 text-green-400 border-green-500/30">
                <TrendingUp className="w-3 h-3 mr-1" />+{investor.roi}%
              </Badge>
            </div>

            {/* Trades */}
            <div className="col-span-2 text-right">
              <p className="text-muted-foreground">{formatNumber(investor.trades)}</p>
            </div>

            {/* Win Rate */}
            <div className="col-span-1 text-right">
              <p className="font-semibold text-primary">{investor.winRate}%</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
