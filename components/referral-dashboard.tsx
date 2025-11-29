"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, Users, DollarSign, TrendingUp, Gift } from "lucide-react"
import { toast } from "sonner"
import { formatCurrency } from "@/lib/format"
import { Progress } from "@/components/ui/progress"

const mockReferralData = {
  referralCode: "PULSE-A7X9K2",
  totalReferrals: 12,
  activeReferrals: 8,
  totalEarnings: 450,
  pendingEarnings: 120,
  tier: "Silver",
  nextTierProgress: 66,
  referrals: [
    {
      id: "1",
      username: "CryptoTrader",
      joinedDate: "2024-01-15",
      status: "active",
      earnings: 85,
      trades: 23,
    },
    {
      id: "2",
      username: "InvestorPro",
      joinedDate: "2024-01-20",
      status: "active",
      earnings: 120,
      trades: 45,
    },
    {
      id: "3",
      username: "TweetHunter",
      joinedDate: "2024-02-01",
      status: "active",
      earnings: 65,
      trades: 18,
    },
    {
      id: "4",
      username: "MarketMaker",
      joinedDate: "2024-02-10",
      status: "inactive",
      earnings: 30,
      trades: 7,
    },
  ],
}

const tiers = [
  { name: "Bronze", referrals: 0, commission: 5, color: "text-amber-700" },
  { name: "Silver", referrals: 10, commission: 7.5, color: "text-gray-400" },
  { name: "Gold", referrals: 25, commission: 10, color: "text-yellow-500" },
  { name: "Platinum", referrals: 50, commission: 15, color: "text-purple-400" },
]

export function ReferralDashboard() {
  const [copied, setCopied] = useState(false)
  const referralLink = `https://pulsemarket.app/ref/${mockReferralData.referralCode}`

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    toast.success("Referral link copied to clipboard!")
    setTimeout(() => setCopied(false), 2000)
  }

  const currentTier = tiers.find((t) => t.name === mockReferralData.tier)
  const nextTier = tiers[tiers.findIndex((t) => t.name === mockReferralData.tier) + 1]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Referral Program</h1>
        <p className="text-muted-foreground">Invite friends and earn rewards on their trading activity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total Referrals</p>
            <Users className="w-4 h-4 text-primary" />
          </div>
          <p className="text-3xl font-bold">{mockReferralData.totalReferrals}</p>
          <p className="text-xs text-muted-foreground mt-1">{mockReferralData.activeReferrals} active</p>
        </Card>

        <Card className="glass p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total Earnings</p>
            <DollarSign className="w-4 h-4 text-green-400" />
          </div>
          <p className="text-3xl font-bold text-green-400">{formatCurrency(mockReferralData.totalEarnings)}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {formatCurrency(mockReferralData.pendingEarnings)} pending
          </p>
        </Card>

        <Card className="glass p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Current Tier</p>
            <TrendingUp className="w-4 h-4 text-primary" />
          </div>
          <p className={`text-3xl font-bold ${currentTier?.color}`}>{mockReferralData.tier}</p>
          <p className="text-xs text-muted-foreground mt-1">{currentTier?.commission}% commission</p>
        </Card>

        <Card className="glass p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Next Tier</p>
            <Gift className="w-4 h-4 text-primary" />
          </div>
          <p className={`text-3xl font-bold ${nextTier?.color}`}>{nextTier?.name || "Max"}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {nextTier ? `${nextTier.referrals - mockReferralData.totalReferrals} more referrals` : "Achieved!"}
          </p>
        </Card>
      </div>

      {/* Referral Link */}
      <Card className="glass p-6">
        <h2 className="text-xl font-semibold mb-4">Your Referral Link</h2>
        <div className="flex gap-2">
          <Input value={referralLink} readOnly className="glass bg-card/50 border-white/10 font-mono text-sm" />
          <Button onClick={handleCopy} className="gradient-primary shrink-0">
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-3">
          Share this link with friends. You'll earn {currentTier?.commission}% commission on their trading fees!
        </p>
      </Card>

      {/* Tier Progress */}
      {nextTier && (
        <Card className="glass p-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold">Progress to {nextTier.name}</h2>
            <Badge variant="secondary" className="glass">
              {mockReferralData.totalReferrals} / {nextTier.referrals} referrals
            </Badge>
          </div>
          <Progress value={mockReferralData.nextTierProgress} className="h-3" />
          <p className="text-sm text-muted-foreground mt-3">
            Unlock {nextTier.commission}% commission rate by referring{" "}
            {nextTier.referrals - mockReferralData.totalReferrals} more users
          </p>
        </Card>
      )}

      {/* Tier Benefits */}
      <Card className="glass p-6">
        <h2 className="text-xl font-semibold mb-4">Tier Benefits</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`p-4 rounded-lg border ${
                tier.name === mockReferralData.tier ? "border-primary bg-primary/5" : "border-white/10"
              }`}
            >
              <h3 className={`font-semibold text-lg mb-1 ${tier.color}`}>{tier.name}</h3>
              <p className="text-2xl font-bold mb-2">{tier.commission}%</p>
              <p className="text-xs text-muted-foreground">{tier.referrals}+ referrals required</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Referral List */}
      <Card className="glass p-6">
        <h2 className="text-xl font-semibold mb-4">Your Referrals</h2>
        <div className="space-y-3">
          {mockReferralData.referrals.map((referral) => (
            <div key={referral.id} className="flex items-center justify-between p-4 rounded-lg glass">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold">{referral.username}</p>
                  <Badge
                    variant="secondary"
                    className={
                      referral.status === "active"
                        ? "glass bg-green-500/20 text-green-400 border-green-500/30"
                        : "glass"
                    }
                  >
                    {referral.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">Joined {referral.joinedDate}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-400">{formatCurrency(referral.earnings)}</p>
                <p className="text-sm text-muted-foreground">{referral.trades} trades</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* How It Works */}
      <Card className="glass p-6">
        <h2 className="text-xl font-semibold mb-4">How It Works</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              1
            </div>
            <h3 className="font-semibold">Share Your Link</h3>
            <p className="text-sm text-muted-foreground">
              Copy your unique referral link and share it with friends on social media or directly
            </p>
          </div>
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              2
            </div>
            <h3 className="font-semibold">Friends Sign Up</h3>
            <p className="text-sm text-muted-foreground">
              When someone signs up using your link, they become your referral and you both get benefits
            </p>
          </div>
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              3
            </div>
            <h3 className="font-semibold">Earn Rewards</h3>
            <p className="text-sm text-muted-foreground">
              Earn commission on their trading fees automatically. The more they trade, the more you earn
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
