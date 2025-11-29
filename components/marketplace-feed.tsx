"use client"

import { useState } from "react"
import { TweetCard } from "@/components/tweet-card"
import { Button } from "@/components/ui/button"
import { SearchFilters, type FilterState } from "@/components/search-filters"

const mockTweets = [
  {
    id: "1",
    author: {
      name: "Sarah Chen",
      handle: "@sarahchen",
      avatar: "/diverse-woman-portrait.png",
      verified: true,
    },
    content:
      "Just launched our new AI product and the response has been incredible! 🚀 Thank you to everyone who believed in the vision.",
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
  },
  {
    id: "2",
    author: {
      name: "Tech Insider",
      handle: "@techinsider",
      avatar: "/interconnected-tech.png",
      verified: true,
    },
    content: "BREAKING: Major breakthrough in quantum computing announced. This changes everything.",
    timestamp: "4h ago",
    metrics: {
      likes: 45600,
      retweets: 12300,
      views: 892000,
    },
    price: 8.2,
    change: 156.3,
    holders: 1243,
    volume: 34200,
  },
  {
    id: "3",
    author: {
      name: "Alex Rivera",
      handle: "@alexrivera",
      avatar: "/man.jpg",
      verified: false,
    },
    content: "My thoughts on the future of Web3 and why decentralization matters more than ever 🧵",
    timestamp: "6h ago",
    metrics: {
      likes: 8900,
      retweets: 2100,
      views: 156000,
    },
    price: 1.8,
    change: 12.4,
    holders: 234,
    volume: 4200,
  },
  {
    id: "4",
    author: {
      name: "Crypto Maven",
      handle: "@cryptomaven",
      avatar: "/crypto-digital-landscape.png",
      verified: true,
    },
    content: "Market analysis: Why this bull run is different from 2021. Data-driven insights 📊",
    timestamp: "8h ago",
    metrics: {
      likes: 23400,
      retweets: 5600,
      views: 445000,
    },
    price: 4.7,
    change: 67.8,
    holders: 789,
    volume: 18900,
  },
]

export function MarketplaceFeed() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<FilterState>({
    category: "all",
    priceRange: [0, 100],
    minHolders: 0,
    verified: false,
    sortBy: "trending",
  })

  const filteredTweets = mockTweets
    .filter((tweet) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          tweet.content.toLowerCase().includes(query) ||
          tweet.author.name.toLowerCase().includes(query) ||
          tweet.author.handle.toLowerCase().includes(query)
        )
      }
      return true
    })
    .filter((tweet) => {
      // Price range filter
      if (tweet.price < filters.priceRange[0] || tweet.price > filters.priceRange[1]) {
        return false
      }
      // Min holders filter
      if (tweet.holders < filters.minHolders) {
        return false
      }
      // Verified filter
      if (filters.verified && !tweet.author.verified) {
        return false
      }
      return true
    })
    .sort((a, b) => {
      // Sort logic
      switch (filters.sortBy) {
        case "new":
          return 0 // Would sort by timestamp in real app
        case "price-high":
          return b.price - a.price
        case "price-low":
          return a.price - b.price
        case "volume":
          return b.volume - a.volume
        case "gainers":
          return b.change - a.change
        default:
          return 0 // trending
      }
    })

  return (
    <div className="space-y-6">
      <SearchFilters onSearch={setSearchQuery} onFilterChange={setFilters} />

      {/* Feed */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredTweets.length > 0 ? (
          filteredTweets.map((tweet) => <TweetCard key={tweet.id} tweet={tweet} />)
        ) : (
          <div className="col-span-2 text-center py-12 glass rounded-lg">
            <p className="text-muted-foreground">No tweets found matching your filters</p>
          </div>
        )}
      </div>

      {/* Load More */}
      {filteredTweets.length > 0 && (
        <div className="flex justify-center pt-4">
          <Button variant="outline" className="glass bg-transparent">
            Load More Tweets
          </Button>
        </div>
      )}
    </div>
  )
}
