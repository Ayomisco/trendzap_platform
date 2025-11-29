"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InvestorsLeaderboard } from "@/components/investors-leaderboard"
import { CreatorsLeaderboard } from "@/components/creators-leaderboard"
import { TweetsLeaderboard } from "@/components/tweets-leaderboard"

export function LeaderboardsTabs() {
  return (
    <Tabs defaultValue="investors" className="space-y-6">
      <TabsList className="glass">
        <TabsTrigger value="investors">Top Investors</TabsTrigger>
        <TabsTrigger value="creators">Top Creators</TabsTrigger>
        <TabsTrigger value="tweets">Top Tweets</TabsTrigger>
      </TabsList>

      <TabsContent value="investors">
        <InvestorsLeaderboard />
      </TabsContent>

      <TabsContent value="creators">
        <CreatorsLeaderboard />
      </TabsContent>

      <TabsContent value="tweets">
        <TweetsLeaderboard />
      </TabsContent>
    </Tabs>
  )
}
