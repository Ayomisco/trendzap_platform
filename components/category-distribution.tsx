"use client"

import { Pie, PieChart, Cell, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "Technology", value: 35, color: "hsl(var(--chart-1))" },
  { name: "Crypto & Web3", value: 28, color: "hsl(var(--chart-2))" },
  { name: "Business", value: 18, color: "hsl(var(--chart-3))" },
  { name: "Entertainment", value: 12, color: "hsl(var(--chart-4))" },
  { name: "Sports", value: 7, color: "hsl(var(--chart-5))" },
]

export function CategoryDistribution() {
  return (
    <ChartContainer
      config={{
        value: {
          label: "Percentage",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <ChartTooltip content={<ChartTooltipContent formatter={(value) => `${value}%`} />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
