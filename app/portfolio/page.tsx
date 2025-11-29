import { PortfolioDashboard } from "@/components/portfolio-dashboard"
import { Header } from "@/components/header"

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <PortfolioDashboard />
      </main>
    </div>
  )
}
