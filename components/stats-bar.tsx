"use client"

import { TrendingUp, Users, DollarSign, Activity } from "lucide-react"

export function StatsBar() {
  const stats = [
    { label: "Total Volume", value: "$2.4M", icon: DollarSign, change: "+12.5%" },
    { label: "Active Traders", value: "8,432", icon: Users, change: "+8.2%" },
    { label: "Tweets Listed", value: "1,234", icon: Activity, change: "+24.1%" },
    { label: "Top Gain", value: "+342%", icon: TrendingUp, change: "24h" },
  ]

  return (
    <div className="border-b border-primary/10 glass">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-xl p-4 hover:glass-strong transition-all group cursor-pointer border border-primary/10 hover:border-primary/30"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center shadow-lg shadow-primary/30 group-hover:shadow-primary/50 transition-all">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground truncate mb-1">{stat.label}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-bold text-foreground">{stat.value}</p>
                    <span className="text-xs font-semibold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
