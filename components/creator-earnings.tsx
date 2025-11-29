"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/format"
import { TrendingUp, DollarSign } from "lucide-react"

const mockEarningsHistory = [
  {
    id: "1",
    date: "June 2024",
    amount: 12400,
    source: "Trading Fees",
    tweets: 3,
    change: 24,
  },
  {
    id: "2",
    date: "May 2024",
    amount: 9800,
    source: "Trading Fees",
    tweets: 2,
    change: 15,
  },
  {
    id: "3",
    date: "April 2024",
    amount: 8500,
    source: "Trading Fees",
    tweets: 2,
    change: -5,
  },
  {
    id: "4",
    date: "March 2024",
    amount: 8900,
    source: "Trading Fees",
    tweets: 3,
    change: 32,
  },
  {
    id: "5",
    date: "February 2024",
    amount: 6700,
    source: "Trading Fees",
    tweets: 2,
    change: 18,
  },
]

export function CreatorEarnings() {
  return (
    <div className="space-y-4">
      <Card className="glass-strong p-6">
        <h3 className="font-bold text-lg mb-6">Earnings History</h3>
        <div className="space-y-3">
          {mockEarningsHistory.map((earning) => (
            <div key={earning.id} className="flex items-center justify-between p-4 rounded-lg glass">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold">{earning.date}</p>
                    <Badge variant="secondary" className="h-5 px-2 text-xs">
                      {earning.tweets} tweets
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{earning.source}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">{formatCurrency(earning.amount)}</p>
                <div
                  className={`flex items-center gap-1 text-xs ${earning.change > 0 ? "text-green-500" : "text-red-500"}`}
                >
                  <TrendingUp className="w-3 h-3" />
                  {earning.change > 0 ? "+" : ""}
                  {earning.change}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="glass p-6">
          <p className="text-sm text-muted-foreground mb-2">Best Month</p>
          <p className="text-2xl font-bold">{formatCurrency(12400)}</p>
          <p className="text-xs text-muted-foreground mt-1">June 2024</p>
        </Card>

        <Card className="glass p-6">
          <p className="text-sm text-muted-foreground mb-2">Avg Monthly</p>
          <p className="text-2xl font-bold">{formatCurrency(9260)}</p>
          <p className="text-xs text-muted-foreground mt-1">Last 6 months</p>
        </Card>

        <Card className="glass p-6">
          <p className="text-sm text-muted-foreground mb-2">Growth Rate</p>
          <p className="text-2xl font-bold text-green-500">+18.8%</p>
          <p className="text-xs text-muted-foreground mt-1">Month over month</p>
        </Card>
      </div>
    </div>
  )
}
