"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle2, Trophy, Medal, Award } from "lucide-react"
import { formatCurrency, formatNumber } from "@/lib/format"
import Link from "next/link"

const mockCreators = [
  {
    rank: 1,
    handle: "@sarahchen",
    name: "Sarah Chen",
    avatar: "/diverse-woman-portrait.png",
    verified: true,
    totalEarnings: 89000,
    tweets: 23,
    avgPrice: 3.87,
    totalHolders: 2341,
  },
  {
    rank: 2,
    handle: "@techinsider",
    name: "Tech Insider",
    avatar: "/interconnected-tech.png",
    verified: true,
    totalEarnings: 76000,
    tweets: 18,
    avgPrice: 4.22,
    totalHolders: 1987,
  },
  {
    rank: 3,
    handle: "@cryptomaven",
    name: "Crypto Maven",
    avatar: "/crypto-digital-landscape.png",
    verified: true,
    totalEarnings: 64000,
    tweets: 31,
    avgPrice: 2.06,
    totalHolders: 1654,
  },
  {
    rank: 4,
    handle: "@alexrivera",
    name: "Alex Rivera",
    avatar: "/man.jpg",
    verified: false,
    totalEarnings: 52000,
    tweets: 27,
    avgPrice: 1.93,
    totalHolders: 1432,
  },
  {
    rank: 5,
    handle: "@marketguru",
    name: "Market Guru",
    avatar: "/diverse-woman-portrait.png",
    verified: true,
    totalEarnings: 48000,
    tweets: 19,
    avgPrice: 2.53,
    totalHolders: 1289,
  },
  {
    rank: 6,
    handle: "@aiexpert",
    name: "AI Expert",
    avatar: "/interconnected-tech.png",
    verified: true,
    totalEarnings: 43000,
    tweets: 15,
    avgPrice: 2.87,
    totalHolders: 1156,
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

export function CreatorsLeaderboard() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="glass p-4">
        <div className="grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground">
          <div className="col-span-1">Rank</div>
          <div className="col-span-4">Creator</div>
          <div className="col-span-2 text-right">Total Earnings</div>
          <div className="col-span-2 text-right">Tweets</div>
          <div className="col-span-2 text-right">Avg Price</div>
          <div className="col-span-1 text-right">Holders</div>
        </div>
      </Card>

      {/* Leaderboard Items */}
      {mockCreators.map((creator) => (
        <Link key={creator.rank} href={`/creator/${creator.handle.slice(1)}`}>
          <Card className="glass p-4 hover:bg-accent/50 transition-colors cursor-pointer">
            <div className="grid grid-cols-12 gap-4 items-center">
              {/* Rank */}
              <div className="col-span-1 flex items-center justify-center">{getRankIcon(creator.rank)}</div>

              {/* Creator Info */}
              <div className="col-span-4 flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={creator.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{creator.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-1">
                    <p className="font-semibold">{creator.name}</p>
                    {creator.verified && <CheckCircle2 className="w-4 h-4 text-primary" />}
                  </div>
                  <p className="text-sm text-muted-foreground">{creator.handle}</p>
                </div>
              </div>

              {/* Total Earnings */}
              <div className="col-span-2 text-right">
                <p className="font-semibold text-green-400">{formatCurrency(creator.totalEarnings)}</p>
              </div>

              {/* Tweets */}
              <div className="col-span-2 text-right">
                <p className="text-muted-foreground">{creator.tweets}</p>
              </div>

              {/* Avg Price */}
              <div className="col-span-2 text-right">
                <p className="font-semibold">{formatCurrency(creator.avgPrice)}</p>
              </div>

              {/* Holders */}
              <div className="col-span-1 text-right">
                <p className="text-muted-foreground">{formatNumber(creator.totalHolders)}</p>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}
