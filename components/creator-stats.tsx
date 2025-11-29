"use client"

import { Card } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Bar, BarChart } from "recharts"

const volumeData = [
  { month: "Jan", volume: 12000 },
  { month: "Feb", volume: 18000 },
  { month: "Mar", volume: 24000 },
  { month: "Apr", volume: 32000 },
  { month: "May", volume: 45000 },
  { month: "Jun", volume: 58000 },
]

const performanceData = [
  { tweet: "Tweet 1", return: 156 },
  { tweet: "Tweet 2", return: 89 },
  { tweet: "Tweet 3", return: 234 },
  { tweet: "Tweet 4", return: 67 },
  { tweet: "Tweet 5", return: 145 },
  { tweet: "Tweet 6", return: 198 },
]

export function CreatorStats() {
  return (
    <div className="space-y-6">
      <Card className="glass-strong p-6">
        <h3 className="font-bold text-lg mb-6">Trading Volume Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={volumeData}>
            <XAxis dataKey="month" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#71717a"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(30, 30, 46, 0.9)",
                border: "1px solid rgba(139, 92, 246, 0.2)",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#e4e4e7" }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, "Volume"]}
            />
            <Line type="monotone" dataKey="volume" stroke="#8b5cf6" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card className="glass-strong p-6">
        <h3 className="font-bold text-lg mb-6">Tweet Performance (ROI %)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={performanceData}>
            <XAxis dataKey="tweet" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#71717a"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(30, 30, 46, 0.9)",
                border: "1px solid rgba(139, 92, 246, 0.2)",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#e4e4e7" }}
              formatter={(value: number) => [`+${value}%`, "Return"]}
            />
            <Bar dataKey="return" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="glass p-6">
          <h4 className="font-semibold mb-4">Top Performing Tweet</h4>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              "Just launched our new AI product and the response has been incredible!"
            </p>
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-muted-foreground">ROI</span>
              <span className="text-lg font-bold text-green-500">+234%</span>
            </div>
          </div>
        </Card>

        <Card className="glass p-6">
          <h4 className="font-semibold mb-4">Average Hold Time</h4>
          <div className="space-y-2">
            <p className="text-3xl font-bold">12.5 days</p>
            <p className="text-xs text-muted-foreground">Investors typically hold shares for 12.5 days on average</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
