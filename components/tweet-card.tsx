"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Repeat2, Eye, TrendingUp, Users, DollarSign } from "lucide-react"
import { formatNumber } from "@/lib/format"
import Link from "next/link"

interface TweetCardProps {
  tweet: {
    id: string
    author: {
      name: string
      handle: string
      avatar: string
      verified: boolean
    }
    content: string
    timestamp: string
    metrics: {
      likes: number
      retweets: number
      views: number
    }
    price: number
    change: number
    holders: number
    volume: number
  }
}

export function TweetCard({ tweet }: TweetCardProps) {
  const isPositive = tweet.change > 0

  return (
    <Link href={`/tweet/${tweet.id}`}>
      <Card className="glass hover:glass-strong transition-all duration-300 p-5 space-y-4 group cursor-pointer border border-primary/10 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/20">
        {/* Author */}
        <div className="flex items-start justify-between gap-3">
          <Link
            href={`/creator/${tweet.author.handle}`}
            className="flex items-center gap-3 flex-1 min-w-0"
            onClick={(e) => e.stopPropagation()}
          >
            <Avatar className="w-11 h-11 ring-2 ring-primary/40 group-hover:ring-primary/60 transition-all">
              <AvatarImage src={tweet.author.avatar || "/placeholder.svg"} alt={tweet.author.name} />
              <AvatarFallback className="gradient-primary text-white">{tweet.author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-sm truncate text-foreground">{tweet.author.name}</p>
                {tweet.author.verified && <Badge className="h-5 px-2 text-xs gradient-primary border-0">✓</Badge>}
              </div>
              <p className="text-xs text-muted-foreground truncate">{tweet.author.handle}</p>
            </div>
          </Link>
          <span className="text-xs text-muted-foreground shrink-0">{tweet.timestamp}</span>
        </div>

        {/* Content */}
        <p className="text-sm leading-relaxed line-clamp-3 text-foreground/90">{tweet.content}</p>

        <div className="flex items-center gap-5 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5 hover:text-pink-400 transition-colors cursor-pointer">
            <Heart className="w-4 h-4" />
            <span className="font-medium">{formatNumber(tweet.metrics.likes)}</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors cursor-pointer">
            <Repeat2 className="w-4 h-4" />
            <span className="font-medium">{formatNumber(tweet.metrics.retweets)}</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-purple-400 transition-colors cursor-pointer">
            <Eye className="w-4 h-4" />
            <span className="font-medium">{formatNumber(tweet.metrics.views)}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-primary/10 space-y-4">
          <div className="grid grid-cols-3 gap-4 text-xs">
            <div className="glass rounded-lg p-3 border border-primary/10">
              <p className="text-muted-foreground mb-1.5">Price</p>
              <p className="font-bold text-base flex items-center gap-1 text-foreground">
                <DollarSign className="w-4 h-4 text-primary" />
                {tweet.price.toFixed(2)}
              </p>
            </div>
            <div className="glass rounded-lg p-3 border border-primary/10">
              <p className="text-muted-foreground mb-1.5">24h Change</p>
              <p
                className={`font-bold text-base flex items-center gap-1 ${isPositive ? "text-green-400" : "text-red-400"}`}
              >
                <TrendingUp className="w-4 h-4" />
                {isPositive ? "+" : ""}
                {tweet.change.toFixed(1)}%
              </p>
            </div>
            <div className="glass rounded-lg p-3 border border-primary/10">
              <p className="text-muted-foreground mb-1.5">Holders</p>
              <p className="font-bold text-base flex items-center gap-1 text-foreground">
                <Users className="w-4 h-4 text-primary" />
                {formatNumber(tweet.holders)}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button className="flex-1 gradient-primary group-hover:gradient-glow transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50 font-semibold">
              Buy Shares
            </Button>
            <Button
              variant="outline"
              className="flex-1 glass bg-transparent border-primary/30 hover:border-primary/50 hover:bg-primary/5 font-semibold"
            >
              View Details
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  )
}
