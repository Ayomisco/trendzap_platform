"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowUpFromLine, Wallet, AlertCircle } from "lucide-react"
import { useWallet } from "@/lib/wallet-context"
import { useToast } from "@/hooks/use-toast"
import { formatCurrency } from "@/lib/format"

interface WithdrawalModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WithdrawalModal({ open, onOpenChange }: WithdrawalModalProps) {
  const [amount, setAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { withdraw, balance } = useWallet()
  const { toast } = useToast()

  const quickPercentages = [25, 50, 75, 100]

  const handleWithdraw = async () => {
    const withdrawAmount = Number.parseFloat(amount)

    if (!withdrawAmount || withdrawAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid withdrawal amount",
        variant: "destructive",
      })
      return
    }

    if (withdrawAmount > balance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough funds to withdraw this amount",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Simulate withdrawal processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    withdraw(withdrawAmount)

    toast({
      title: "Withdrawal Successful",
      description: `${formatCurrency(withdrawAmount)} has been withdrawn from your wallet`,
    })

    setIsProcessing(false)
    setAmount("")
    onOpenChange(false)
  }

  const setPercentage = (percentage: number) => {
    const withdrawAmount = (balance * percentage) / 100
    setAmount(withdrawAmount.toFixed(2))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-strong border-primary/20 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
              <ArrowUpFromLine className="w-5 h-5 text-white" />
            </div>
            Withdraw Funds
          </DialogTitle>
          <DialogDescription>Withdraw funds from your wallet to your connected account</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Current Balance */}
          <div className="glass p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Available Balance</span>
              </div>
              <span className="font-bold">{formatCurrency(balance)}</span>
            </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="withdraw-amount">Withdrawal Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="withdraw-amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-7 glass"
                min="0"
                max={balance}
                step="0.01"
              />
            </div>
          </div>

          {/* Quick Percentage Buttons */}
          <div className="space-y-2">
            <Label>Quick Select</Label>
            <div className="grid grid-cols-4 gap-2">
              {quickPercentages.map((percentage) => (
                <Button
                  key={percentage}
                  variant="outline"
                  size="sm"
                  onClick={() => setPercentage(percentage)}
                  className="glass hover:bg-primary/10"
                >
                  {percentage}%
                </Button>
              ))}
            </div>
          </div>

          {/* Warning */}
          <div className="glass p-4 rounded-lg border border-yellow-500/20">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Withdrawal Notice</p>
                <p className="text-xs text-muted-foreground">
                  Withdrawals typically take 1-3 business days to process. A small processing fee may apply.
                </p>
              </div>
            </div>
          </div>

          {/* Withdraw Button */}
          <Button
            onClick={handleWithdraw}
            disabled={!amount || isProcessing || Number.parseFloat(amount) > balance}
            className="w-full gradient-primary gradient-glow"
            size="lg"
          >
            {isProcessing ? (
              "Processing..."
            ) : (
              <>
                <ArrowUpFromLine className="w-4 h-4 mr-2" />
                Withdraw {amount ? formatCurrency(Number.parseFloat(amount)) : "Funds"}
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Funds will be transferred to your connected payment method.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
