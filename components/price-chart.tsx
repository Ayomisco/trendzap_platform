"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const mockChartData = [
  { time: "Mon", price: 2.0 },
  { time: "Tue", price: 2.1 },
  { time: "Wed", price: 1.95 },
  { time: "Thu", price: 2.3 },
  { time: "Fri", price: 2.2 },
  { time: "Sat", price: 2.45 },
  { time: "Sun", price: 2.5 },
]

export function PriceChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={mockChartData}>
        <XAxis dataKey="time" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#71717a"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(30, 30, 46, 0.9)",
            border: "1px solid rgba(139, 92, 246, 0.2)",
            borderRadius: "8px",
          }}
          labelStyle={{ color: "#e4e4e7" }}
        />
        <Line type="monotone" dataKey="price" stroke="#8b5cf6" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}
