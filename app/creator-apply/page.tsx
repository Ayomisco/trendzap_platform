import { Header } from "@/components/header"
import { CreatorApplicationForm } from "@/components/creator-application-form"
import { CheckCircle2, TrendingUp, DollarSign, Users } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function CreatorApplyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-4">Become a Verified Creator</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Join PulseMarket as a verified creator and monetize your content through tokenization. Early supporters
                invest in your tweets, and you earn as your content appreciates.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Creator Benefits</h2>

              <Card className="glass p-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <DollarSign className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Earn from Content Appreciation</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive a percentage of every trade as your tokenized tweets increase in value
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="glass p-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Build Your Community</h3>
                    <p className="text-sm text-muted-foreground">
                      Connect with supporters who believe in your content and want to see you succeed
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="glass p-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Analytics & Insights</h3>
                    <p className="text-sm text-muted-foreground">
                      Track your performance with detailed analytics on engagement and earnings
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="glass p-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Verified Badge</h3>
                    <p className="text-sm text-muted-foreground">
                      Stand out with a verified badge that builds trust with investors
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Requirements */}
            <div className="glass p-6 rounded-lg">
              <h3 className="font-semibold mb-3">Requirements</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span>Active Twitter account with at least 1,000 followers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span>Consistent content creation history</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span>Authentic engagement with your audience</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span>Compliance with platform guidelines</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Application Form */}
          <div>
            <CreatorApplicationForm />
          </div>
        </div>
      </main>
    </div>
  )
}
