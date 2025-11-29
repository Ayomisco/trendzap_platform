"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { date: "Jan 1", value: 8200000 },
  { date: "Jan 3", value: 8450000 },
  { date: "Jan 5", value: 8300000 },
  { date: "Jan 7", value: 8700000 },
  { date: "Jan 9", value: 9100000 },
  { date: "Jan 11", value: 8900000 },
  { date: "Jan 13", value: 9400000 },
  { date: "Jan 15", value: 9800000 },
  { date: "Jan 17", value: 9600000 },
  { date: "Jan 19", value: 10200000 },
  { date: "Jan 21", value: 10500000 },
  { date: "Jan 23", value: 10300000 },
  { date: "Jan 25", value: 10900000 },
  { date: "Jan 27", value: 11400000 },
  { date: "Jan 29", value: 11800000 },
  { date: "Jan 31", value: 12450000 },
]

export function MarketTrendsChart() {
  return (
    <ChartContainer
      config={{
        value: {
          label: "Market Cap",
          color: "hsl(var(--primary))",
        },
      }}
      className="h-[400px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
          />
          <ChartTooltip
            content={<ChartTooltipContent formatter={(value) => `$${(Number(value) / 1000000).toFixed(2)}M`} />}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="var(--color-value)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
