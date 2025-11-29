"use client"

import { useState } from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, DollarSign, PieChart, Activity, Wallet, ArrowDownToLine, ArrowUpFromLine } from "lucide-react"
import { formatCurrency, formatPercentage } from "@/lib/format"
import { PortfolioHoldings } from "@/components/portfolio-holdings"
import { PortfolioChart } from "@/components/portfolio-chart"
import { TransactionHistory } from "@/components/transaction-history"
import { useWallet } from "@/lib/wallet-context"
import { DepositModal } from "@/components/deposit-modal"
import { WithdrawalModal } from "@/components/withdrawal-modal"

export function PortfolioDashboard() {
  const { isConnected, connect, balance } = useWallet()
  const [showDepositModal, setShowDepositModal] = useState(false)
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false)

  // Mock portfolio data
  const portfolioStats = {
    totalValue: 12450.5,
    totalInvested: 8900,
    totalReturn: 3550.5,
    returnPercentage: 39.9,
    holdings: 8,
    transactions: 24,
  }

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="glass-strong p-12 text-center max-w-md">
          <div className="w-20 h-20 rounded-full gradient-primary mx-auto mb-6 flex items-center justify-center">
            <Wallet className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
          <p className="text-muted-foreground mb-6">
            Connect your wallet to view your portfolio, track your investments, and manage your holdings.
          </p>
          <Button onClick={connect} className="gradient-primary gradient-glow" size="lg">
            <Wallet className="w-4 h-4 mr-2" />
            Connect Wallet
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Portfolio</h1>
          <p className="text-muted-foreground">Track your investments and performance</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setShowDepositModal(true)} className="gradient-primary gradient-glow">
            <ArrowDownToLine className="w-4 h-4 mr-2" />
            Deposit
          </Button>
          <Button onClick={() => setShowWithdrawalModal(true)} variant="outline" className="glass">
            <ArrowUpFromLine className="w-4 h-4 mr-2" />
            Withdraw
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-strong p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total Value</p>
            <DollarSign className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold mb-1">{formatCurrency(portfolioStats.totalValue)}</p>
          <p className="text-xs text-muted-foreground">Wallet: {formatCurrency(balance)}</p>
        </Card>

        <Card className="glass-strong p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total Return</p>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-green-500 mb-1">{formatCurrency(portfolioStats.totalReturn)}</p>
          <p className="text-xs text-green-500">{formatPercentage(portfolioStats.returnPercentage)}</p>
        </Card>

        <Card className="glass-strong p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Holdings</p>
            <PieChart className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold mb-1">{portfolioStats.holdings}</p>
          <p className="text-xs text-muted-foreground">Active positions</p>
        </Card>

        <Card className="glass-strong p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Transactions</p>
            <Activity className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold mb-1">{portfolioStats.transactions}</p>
          <p className="text-xs text-muted-foreground">All time</p>
        </Card>
      </div>

      {/* Portfolio Chart */}
      <Card className="glass-strong p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-lg">Portfolio Performance</h3>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-xs">
              1W
            </Button>
            <Button variant="ghost" size="sm" className="text-xs">
              1M
            </Button>
            <Button variant="ghost" size="sm" className="text-xs bg-primary/10">
              3M
            </Button>
            <Button variant="ghost" size="sm" className="text-xs">
              1Y
            </Button>
            <Button variant="ghost" size="sm" className="text-xs">
              ALL
            </Button>
          </div>
        </div>
        <PortfolioChart />
      </Card>

      {/* Tabs for Holdings and Transactions */}
      <Tabs defaultValue="holdings" className="space-y-6">
        <TabsList className="glass">
          <TabsTrigger value="holdings">Holdings</TabsTrigger>
          <TabsTrigger value="transactions">Transaction History</TabsTrigger>
        </TabsList>

        <TabsContent value="holdings">
          <PortfolioHoldings />
        </TabsContent>

        <TabsContent value="transactions">
          <TransactionHistory />
        </TabsContent>
      </Tabs>

      {/* Deposit and Withdrawal Modals */}
      <DepositModal open={showDepositModal} onOpenChange={setShowDepositModal} />
      <WithdrawalModal open={showWithdrawalModal} onOpenChange={setShowWithdrawalModal} />
    </div>
  )
}
