import { CreatorProfile } from "@/components/creator-profile"
import { Header } from "@/components/header"

export default function CreatorPage({ params }: { params: { handle: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <CreatorProfile handle={params.handle} />
      </main>
    </div>
  )
}
