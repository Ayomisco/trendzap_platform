"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface WalletContextType {
  address: string | null
  isConnected: boolean
  balance: number
  connect: () => Promise<void>
  disconnect: () => void
  isConnecting: boolean
  deposit: (amount: number) => void
  withdraw: (amount: number) => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState(0)
  const [isConnecting, setIsConnecting] = useState(false)

  const isConnected = !!address

  // Check if wallet was previously connected
  useEffect(() => {
    const savedAddress = localStorage.getItem("walletAddress")
    const savedBalance = localStorage.getItem("walletBalance")
    if (savedAddress) {
      setAddress(savedAddress)
      setBalance(savedBalance ? Number.parseFloat(savedBalance) : Math.random() * 1000)
    }
  }, [])

  useEffect(() => {
    if (isConnected) {
      localStorage.setItem("walletBalance", balance.toString())
    }
  }, [balance, isConnected])

  const connect = async () => {
    setIsConnecting(true)
    try {
      // Simulate wallet connection delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, this would use Web3 provider like MetaMask
      // For demo purposes, generate a mock address
      const mockAddress = `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`
      const mockBalance = Math.random() * 1000

      setAddress(mockAddress)
      setBalance(mockBalance)
      localStorage.setItem("walletAddress", mockAddress)
      localStorage.setItem("walletBalance", mockBalance.toString())
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnect = () => {
    setAddress(null)
    setBalance(0)
    localStorage.removeItem("walletAddress")
    localStorage.removeItem("walletBalance")
  }

  const deposit = (amount: number) => {
    setBalance((prev) => prev + amount)
  }

  const withdraw = (amount: number) => {
    setBalance((prev) => Math.max(0, prev - amount))
  }

  return (
    <WalletContext.Provider
      value={{ address, isConnected, balance, connect, disconnect, isConnecting, deposit, withdraw }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
