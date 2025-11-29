"use client"

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const mockPortfolioData = [
  { date: "Jan 1", value: 8900 },
  { date: "Jan 15", value: 9200 },
  { date: "Feb 1", value: 9800 },
  { date: "Feb 15", value: 9500 },
  { date: "Mar 1", value: 10200 },
  { date: "Mar 15", value: 10800 },
  { date: "Apr 1", value: 11200 },
  { date: "Apr 15", value: 11800 },
  { date: "May 1", value: 12100 },
  { date: "May 15", value: 12450 },
]

export function PortfolioChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={mockPortfolioData}>
        <defs>
          <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#71717a"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(30, 30, 46, 0.9)",
            border: "1px solid rgba(139, 92, 246, 0.2)",
            borderRadius: "8px",
          }}
          labelStyle={{ color: "#e4e4e7" }}
          formatter={(value: number) => [`$${value.toLocaleString()}`, "Portfolio Value"]}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#8b5cf6"
          strokeWidth={2}
          fill="url(#portfolioGradient)"
          fillOpacity={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
