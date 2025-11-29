"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { formatCurrency } from "@/lib/format"
import { TrendingUp, TrendingDown, Info, Wallet } from "lucide-react"
import { useWallet } from "@/lib/wallet-context"
import { useToast } from "@/hooks/use-toast"

interface TradingPanelProps {
  tweet: {
    price: number
    availableSupply: number
  }
}

export function TradingPanel({ tweet }: TradingPanelProps) {
  const [buyAmount, setBuyAmount] = useState(10)
  const [sellAmount, setSellAmount] = useState(10)
  const [slippage, setSlippage] = useState(1)
  const { isConnected, connect, balance } = useWallet()
  const { toast } = useToast()

  const buyTotal = buyAmount * tweet.price
  const sellTotal = sellAmount * tweet.price

  const handleBuy = async () => {
    if (!isConnected) {
      await connect()
      return
    }

    if (balance < buyTotal * 1.025) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough funds to complete this purchase.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Purchase Successful!",
      description: `You bought ${buyAmount} shares for ${formatCurrency(buyTotal * 1.025)}`,
    })
  }

  const handleSell = async () => {
    if (!isConnected) {
      await connect()
      return
    }

    toast({
      title: "Sale Successful!",
      description: `You sold ${sellAmount} shares for ${formatCurrency(sellTotal * 0.975)}`,
    })
  }

  return (
    <Card className="glass-strong p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg">Trade</h3>
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <Info className="w-4 h-4" />
        </Button>
      </div>

      <Tabs defaultValue="buy" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 glass">
          <TabsTrigger value="buy" className="data-[state=active]:bg-green-500/20">
            <TrendingUp className="w-4 h-4 mr-2" />
            Buy
          </TabsTrigger>
          <TabsTrigger value="sell" className="data-[state=active]:bg-red-500/20">
            <TrendingDown className="w-4 h-4 mr-2" />
            Sell
          </TabsTrigger>
        </TabsList>

        <TabsContent value="buy" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="buy-amount">Amount (shares)</Label>
            <Input
              id="buy-amount"
              type="number"
              value={buyAmount}
              onChange={(e) => setBuyAmount(Number(e.target.value))}
              className="glass bg-background/50"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Available: {tweet.availableSupply.toLocaleString()}</span>
              <button className="text-primary hover:underline" onClick={() => setBuyAmount(100)}>
                Max
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Quick Select</Label>
            <div className="grid grid-cols-4 gap-2">
              {[10, 25, 50, 100].map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  size="sm"
                  onClick={() => setBuyAmount(amount)}
                  className={`glass bg-transparent ${buyAmount === amount ? "border-primary" : ""}`}
                >
                  {amount}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Slippage Tolerance</Label>
              <span className="text-sm font-semibold">{slippage}%</span>
            </div>
            <Slider value={[slippage]} onValueChange={(v) => setSlippage(v[0])} max={5} step={0.5} className="py-2" />
          </div>

          <div className="space-y-2 pt-4 border-t border-border/50">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Price per share</span>
              <span className="font-semibold">{formatCurrency(tweet.price)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Platform fee (2.5%)</span>
              <span className="font-semibold">{formatCurrency(buyTotal * 0.025)}</span>
            </div>
            <div className="flex justify-between text-base font-bold pt-2 border-t border-border/50">
              <span>Total</span>
              <span>{formatCurrency(buyTotal * 1.025)}</span>
            </div>
          </div>

          <Button onClick={handleBuy} className="w-full gradient-primary gradient-glow" size="lg">
            {isConnected ? (
              `Buy ${buyAmount} Shares`
            ) : (
              <>
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet to Buy
              </>
            )}
          </Button>

          {!isConnected && (
            <p className="text-xs text-muted-foreground text-center">Connect your wallet to start trading</p>
          )}
          {isConnected && (
            <p className="text-xs text-muted-foreground text-center">Your balance: {formatCurrency(balance)}</p>
          )}
        </TabsContent>

        <TabsContent value="sell" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sell-amount">Amount (shares)</Label>
            <Input
              id="sell-amount"
              type="number"
              value={sellAmount}
              onChange={(e) => setSellAmount(Number(e.target.value))}
              className="glass bg-background/50"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Your balance: 0</span>
              <button className="text-primary hover:underline" onClick={() => setSellAmount(0)}>
                Max
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Quick Select</Label>
            <div className="grid grid-cols-4 gap-2">
              {[10, 25, 50, 100].map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  size="sm"
                  onClick={() => setSellAmount(amount)}
                  className={`glass bg-transparent ${sellAmount === amount ? "border-primary" : ""}`}
                >
                  {amount}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Slippage Tolerance</Label>
              <span className="text-sm font-semibold">{slippage}%</span>
            </div>
            <Slider value={[slippage]} onValueChange={(v) => setSlippage(v[0])} max={5} step={0.5} className="py-2" />
          </div>

          <div className="space-y-2 pt-4 border-t border-border/50">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Price per share</span>
              <span className="font-semibold">{formatCurrency(tweet.price)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Platform fee (2.5%)</span>
              <span className="font-semibold">{formatCurrency(sellTotal * 0.025)}</span>
            </div>
            <div className="flex justify-between text-base font-bold pt-2 border-t border-border/50">
              <span>You receive</span>
              <span>{formatCurrency(sellTotal * 0.975)}</span>
            </div>
          </div>

          <Button
            onClick={handleSell}
            variant="outline"
            className="w-full glass bg-red-500/10 border-red-500/20"
            size="lg"
          >
            {isConnected ? (
              `Sell ${sellAmount} Shares`
            ) : (
              <>
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet to Sell
              </>
            )}
          </Button>

          {!isConnected && (
            <p className="text-xs text-muted-foreground text-center">Connect your wallet to start trading</p>
          )}
          {isConnected && (
            <p className="text-xs text-muted-foreground text-center">You don't own any shares of this tweet yet</p>
          )}
        </TabsContent>
      </Tabs>
    </Card>
  )
}
