import type React from "react"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { WalletProvider } from "@/lib/wallet-context"
import { NotificationsProvider } from "@/lib/notifications-context"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const metadata = {
  title: "PulseMarket - Trade Viral Tweets",
  description: "Invest in viral content and support creators through tokenized tweets",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable} antialiased`}>
      <body className="font-sans">
        <WalletProvider>
          <NotificationsProvider>
            {children}
            <Toaster />
          </NotificationsProvider>
        </WalletProvider>
      </body>
    </html>
  )
}
