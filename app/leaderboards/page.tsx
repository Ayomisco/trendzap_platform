import { Header } from "@/components/header"
import { LeaderboardsTabs } from "@/components/leaderboards-tabs"

export default function LeaderboardsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">Leaderboards</h1>
            <p className="text-muted-foreground">Top performers in the PulseMarket ecosystem</p>
          </div>
          <LeaderboardsTabs />
        </div>
      </main>
    </div>
  )
}
