"use client"

import { Button } from "@/components/ui/button"
import { Search, Wallet, Menu, LogOut, User, DollarSign } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { useWallet } from "@/lib/wallet-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatCurrency } from "@/lib/format"
import Link from "next/link"
import { NotificationsDropdown } from "@/components/notifications-dropdown"

export function Header() {
  const { address, isConnected, balance, connect, disconnect, isConnecting } = useWallet()

  return (
    <header className="sticky top-0 z-50 glass-strong border-b border-primary/20">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-primary/50 group-hover:shadow-primary/70 transition-all">
              P
            </div>
            <span className="font-bold text-xl hidden sm:block text-gradient">PulseMarket</span>
          </Link>

          <div className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search tweets, creators..."
                className="pl-10 glass border-primary/20 focus:border-primary/40 transition-colors"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:hidden hover:bg-primary/10">
              <Search className="w-5 h-5" />
            </Button>

            <NotificationsDropdown />

            {isConnected ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="gradient-primary hover:gradient-glow transition-all shadow-lg shadow-primary/30">
                    <Wallet className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">{address}</span>
                    <span className="sm:hidden">Wallet</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass-strong w-56 border-primary/20">
                  <DropdownMenuLabel className="text-foreground">My Wallet</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-primary/20" />
                  <DropdownMenuItem className="flex items-center justify-between hover:bg-primary/10">
                    <span className="text-muted-foreground">Balance</span>
                    <span className="font-semibold text-gradient">{formatCurrency(balance)}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center justify-between hover:bg-primary/10">
                    <span className="text-muted-foreground">Address</span>
                    <span className="font-mono text-xs">{address}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-primary/20" />
                  <DropdownMenuItem asChild>
                    <Link href="/portfolio" className="cursor-pointer hover:bg-primary/10">
                      <User className="w-4 h-4 mr-2" />
                      Portfolio
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/portfolio" className="cursor-pointer hover:bg-primary/10">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Transactions
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-primary/20" />
                  <DropdownMenuItem onClick={disconnect} className="text-red-400 cursor-pointer hover:bg-red-500/10">
                    <LogOut className="w-4 h-4 mr-2" />
                    Disconnect
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={connect}
                disabled={isConnecting}
                className="gradient-primary hover:gradient-glow transition-all shadow-lg shadow-primary/30"
              >
                <Wallet className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">{isConnecting ? "Connecting..." : "Connect Wallet"}</span>
                <span className="sm:hidden">{isConnecting ? "..." : "Connect"}</span>
              </Button>
            )}

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden hover:bg-primary/10">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="glass-strong border-primary/20">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link href="/" className="text-lg font-medium text-gradient hover:opacity-80 transition-opacity">
                    Marketplace
                  </Link>
                  <Link href="/leaderboards" className="text-lg font-medium hover:text-primary transition-colors">
                    Leaderboards
                  </Link>
                  <a href="#" className="text-lg font-medium hover:text-primary transition-colors">
                    Creators
                  </a>
                  <Link href="/portfolio" className="text-lg font-medium hover:text-primary transition-colors">
                    Portfolio
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 mt-4">
          <Link href="/" className="text-sm font-medium text-gradient">
            Marketplace
          </Link>
          <Link
            href="/leaderboards"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Leaderboards
          </Link>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Creators
          </a>
          <Link
            href="/portfolio"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Portfolio
          </Link>
        </nav>
      </div>
    </header>
  )
}
