"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const mockHolders = [
  {
    id: "1",
    user: { name: "Sarah Chen", handle: "@sarahchen", avatar: "/diverse-woman-portrait.png", verified: true },
    shares: 2500,
    percentage: 25,
    value: 6250,
  },
  {
    id: "2",
    user: { name: "Alex Rivera", handle: "@alexrivera", avatar: "/man.jpg", verified: false },
    shares: 1200,
    percentage: 12,
    value: 3000,
  },
  {
    id: "3",
    user: { name: "Jordan Kim", handle: "@jordankim", avatar: "/placeholder.svg?height=40&width=40", verified: true },
    shares: 850,
    percentage: 8.5,
    value: 2125,
  },
  {
    id: "4",
    user: {
      name: "Taylor Morgan",
      handle: "@taylormorgan",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
    shares: 650,
    percentage: 6.5,
    value: 1625,
  },
  {
    id: "5",
    user: { name: "Sam Parker", handle: "@samparker", avatar: "/placeholder.svg?height=40&width=40", verified: false },
    shares: 420,
    percentage: 4.2,
    value: 1050,
  },
]

export function HoldersList() {
  return (
    <Card className="glass-strong p-6">
      <h4 className="font-semibold mb-4">Top Holders</h4>
      <div className="space-y-4">
        {mockHolders.map((holder, index) => (
          <div key={holder.id} className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className="text-sm font-bold text-muted-foreground w-6">#{index + 1}</span>
                <Avatar className="w-10 h-10">
                  <AvatarImage src={holder.user.avatar || "/placeholder.svg"} alt={holder.user.name} />
                  <AvatarFallback>{holder.user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium truncate">{holder.user.name}</p>
                    {holder.user.verified && (
                      <Badge variant="secondary" className="h-4 px-1 text-xs">
                        ✓
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{holder.user.handle}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-semibold">{holder.shares.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{holder.percentage}%</p>
              </div>
            </div>
            <Progress value={holder.percentage} className="h-1" />
          </div>
        ))}
      </div>
    </Card>
  )
}
