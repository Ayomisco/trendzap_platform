"use client"

import { TweetCard } from "@/components/tweet-card"

const mockCreatorTweets = [
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
      name: "Sarah Chen",
      handle: "@sarahchen",
      avatar: "/diverse-woman-portrait.png",
      verified: true,
    },
    content: "5 design principles that changed how I approach product design. A thread 🧵",
    timestamp: "1d ago",
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
    id: "3",
    author: {
      name: "Sarah Chen",
      handle: "@sarahchen",
      avatar: "/diverse-woman-portrait.png",
      verified: true,
    },
    content:
      "The future of AI in creative tools is not about replacing designers, it's about amplifying their capabilities.",
    timestamp: "3d ago",
    metrics: {
      likes: 15600,
      retweets: 4200,
      views: 289000,
    },
    price: 3.2,
    change: 45.8,
    holders: 456,
    volume: 12800,
  },
]

interface CreatorTweetsProps {
  creatorHandle: string
}

export function CreatorTweets({ creatorHandle }: CreatorTweetsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {mockCreatorTweets.map((tweet) => (
        <TweetCard key={tweet.id} tweet={tweet} />
      ))}
    </div>
  )
}
