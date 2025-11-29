import { TweetDetail } from "@/components/tweet-detail"
import { Header } from "@/components/header"

export default function TweetPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <TweetDetail tweetId={params.id} />
      </main>
    </div>
  )
}
