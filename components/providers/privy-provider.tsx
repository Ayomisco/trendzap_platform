"use client"

import { PrivyProvider } from "@privy-io/react-auth"
import type { ReactNode } from "react"

interface PrivyClientProviderProps {
  children: ReactNode
}

export function PrivyClientProvider({ children }: PrivyClientProviderProps) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID

  if (!appId) {
    throw new Error("NEXT_PUBLIC_PRIVY_APP_ID environment variable is not set")
  }

  return (
    <PrivyProvider
      appId={appId}
      config={{
        // Display settings
        appearance: {
          theme: "dark",
          accentColor: "#00E5BE", // TrendZap primary cyan
          logo: "/trendzap-logo.svg",
          showWalletLoginFirst: false,
        },
        // Login methods
        loginMethods: ["email", "wallet", "google", "twitter"],
        // Embedded wallets for non-crypto users
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
        // External wallets to support
        externalWallets: {
          coinbaseWallet: {
            connectionOptions: "smartWalletOnly",
          },
        },
        // Removed: solanaRpcServers, solanaCluster, and Solana from supportedChains

        // Default chain (Base for USDC)
        defaultChain: {
          id: 8453,
          name: "Base",
          network: "base",
          nativeCurrency: {
            name: "Ethereum",
            symbol: "ETH",
            decimals: 18,
          },
          rpcUrls: {
            default: {
              http: ["https://mainnet.base.org"],
            },
            public: {
              http: ["https://mainnet.base.org"],
            },
          },
          blockExplorers: {
            default: {
              name: "BaseScan",
              url: "https://basescan.org",
            },
          },
        },
        // EVM chains only (Base and Arbitrum)
        supportedChains: [
          {
            id: 8453,
            name: "Base",
            network: "base",
            nativeCurrency: { name: "Ethereum", symbol: "ETH", decimals: 18 },
            rpcUrls: {
              default: { http: ["https://mainnet.base.org"] },
              public: { http: ["https://mainnet.base.org"] },
            },
            blockExplorers: {
              default: { name: "BaseScan", url: "https://basescan.org" },
            },
          },
          {
            id: 42161,
            name: "Arbitrum One",
            network: "arbitrum",
            nativeCurrency: { name: "Ethereum", symbol: "ETH", decimals: 18 },
            rpcUrls: {
              default: { http: ["https://arb1.arbitrum.io/rpc"] },
              public: { http: ["https://arb1.arbitrum.io/rpc"] },
            },
            blockExplorers: {
              default: { name: "Arbiscan", url: "https://arbiscan.io" },
            },
          },
        ],
      }}
    >
      {children}
    </PrivyProvider>
  )
}
