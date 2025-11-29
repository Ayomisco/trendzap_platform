import { MarketplaceFeed } from "@/components/marketplace-feed"
import { Header } from "@/components/header"
import { StatsBar } from "@/components/stats-bar"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <StatsBar />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <MarketplaceFeed />
      </main>
    </div>
  )
}
