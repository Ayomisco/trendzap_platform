import { Header } from "@/components/header"
import { ReferralDashboard } from "@/components/referral-dashboard"

export default function ReferralsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <ReferralDashboard />
      </main>
    </div>
  )
}
