"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"
import { formatCurrency } from "@/lib/format"

const mockActivity = [
  {
    id: "1",
    type: "buy",
    user: { name: "Alex M.", avatar: "/placeholder.svg?height=40&width=40" },
    amount: 50,
    price: 2.52,
    timestamp: "2 min ago",
  },
  {
    id: "2",
    type: "sell",
    user: { name: "Jordan K.", avatar: "/placeholder.svg?height=40&width=40" },
    amount: 25,
    price: 2.48,
    timestamp: "5 min ago",
  },
  {
    id: "3",
    type: "buy",
    user: { name: "Sam R.", avatar: "/placeholder.svg?height=40&width=40" },
    amount: 100,
    price: 2.45,
    timestamp: "12 min ago",
  },
  {
    id: "4",
    type: "buy",
    user: { name: "Taylor P.", avatar: "/placeholder.svg?height=40&width=40" },
    amount: 75,
    price: 2.42,
    timestamp: "18 min ago",
  },
  {
    id: "5",
    type: "sell",
    user: { name: "Morgan L.", avatar: "/placeholder.svg?height=40&width=40" },
    amount: 30,
    price: 2.38,
    timestamp: "25 min ago",
  },
]

export function ActivityFeed() {
  return (
    <Card className="glass-strong p-6">
      <h4 className="font-semibold mb-4">Recent Activity</h4>
      <div className="space-y-3">
        {mockActivity.map((activity) => (
          <div key={activity.id} className="flex items-center justify-between gap-4 p-3 rounded-lg glass">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Avatar className="w-8 h-8">
                <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                <AvatarFallback>{activity.user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium truncate">{activity.user.name}</p>
                  <Badge
                    variant="secondary"
                    className={`h-5 px-2 text-xs ${
                      activity.type === "buy" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                    }`}
                  >
                    {activity.type === "buy" ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {activity.type}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-semibold">{activity.amount} shares</p>
              <p className="text-xs text-muted-foreground">{formatCurrency(activity.price)}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
