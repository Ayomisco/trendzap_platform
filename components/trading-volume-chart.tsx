"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { day: "Mon", volume: 2840000 },
  { day: "Tue", volume: 3120000 },
  { day: "Wed", volume: 2950000 },
  { day: "Thu", volume: 3380000 },
  { day: "Fri", volume: 3650000 },
  { day: "Sat", volume: 2720000 },
  { day: "Sun", volume: 3240000 },
]

export function TradingVolumeChart() {
  return (
    <ChartContainer
      config={{
        volume: {
          label: "Volume",
          color: "hsl(var(--primary))",
        },
      }}
      className="h-[400px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
          />
          <ChartTooltip
            content={<ChartTooltipContent formatter={(value) => `$${(Number(value) / 1000000).toFixed(2)}M`} />}
          />
          <Bar dataKey="volume" fill="var(--color-volume)" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
