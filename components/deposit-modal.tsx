"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowDownToLine, Wallet, CreditCard } from "lucide-react"
import { useWallet } from "@/lib/wallet-context"
import { useToast } from "@/hooks/use-toast"
import { formatCurrency } from "@/lib/format"

interface DepositModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DepositModal({ open, onOpenChange }: DepositModalProps) {
  const [amount, setAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { deposit, balance } = useWallet()
  const { toast } = useToast()

  const quickAmounts = [100, 500, 1000, 5000]

  const handleDeposit = async () => {
    const depositAmount = Number.parseFloat(amount)

    if (!depositAmount || depositAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid deposit amount",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Simulate deposit processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    deposit(depositAmount)

    toast({
      title: "Deposit Successful",
      description: `${formatCurrency(depositAmount)} has been added to your wallet`,
    })

    setIsProcessing(false)
    setAmount("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-strong border-primary/20 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
              <ArrowDownToLine className="w-5 h-5 text-white" />
            </div>
            Deposit Funds
          </DialogTitle>
          <DialogDescription>Add funds to your wallet to start trading tokenized tweets</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Current Balance */}
          <div className="glass p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Current Balance</span>
              </div>
              <span className="font-bold">{formatCurrency(balance)}</span>
            </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="deposit-amount">Deposit Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="deposit-amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-7 glass"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          {/* Quick Amount Buttons */}
          <div className="space-y-2">
            <Label>Quick Select</Label>
            <div className="grid grid-cols-4 gap-2">
              {quickAmounts.map((quickAmount) => (
                <Button
                  key={quickAmount}
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(quickAmount.toString())}
                  className="glass hover:bg-primary/10"
                >
                  ${quickAmount}
                </Button>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div className="glass p-4 rounded-lg space-y-3">
            <Label>Payment Method</Label>
            <div className="flex items-center gap-3 p-3 glass-strong rounded-lg border border-primary/20">
              <CreditCard className="w-5 h-5 text-primary" />
              <div className="flex-1">
                <p className="font-medium text-sm">Credit/Debit Card</p>
                <p className="text-xs text-muted-foreground">Instant deposit</p>
              </div>
            </div>
          </div>

          {/* Deposit Button */}
          <Button
            onClick={handleDeposit}
            disabled={!amount || isProcessing}
            className="w-full gradient-primary gradient-glow"
            size="lg"
          >
            {isProcessing ? (
              "Processing..."
            ) : (
              <>
                <ArrowDownToLine className="w-4 h-4 mr-2" />
                Deposit {amount ? formatCurrency(Number.parseFloat(amount)) : "Funds"}
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Deposits are processed instantly. Funds will be available immediately.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
