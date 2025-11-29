"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface Notification {
  id: string
  type: "price" | "follow" | "trade" | "milestone" | "system"
  title: string
  message: string
  timestamp: Date
  read: boolean
  link?: string
  icon?: string
}

interface NotificationsContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearNotification: (id: string) => void
  clearAll: () => void
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined)

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  // Load notifications from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("pulsemarket_notifications")
    if (stored) {
      const parsed = JSON.parse(stored)
      setNotifications(
        parsed.map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp),
        })),
      )
    }

    // Simulate some initial notifications
    const hasInitial = localStorage.getItem("pulsemarket_notifications_initialized")
    if (!hasInitial) {
      const initial: Notification[] = [
        {
          id: "1",
          type: "price",
          title: "Price Alert",
          message: "Sarah Chen's tweet increased by 15% in the last hour",
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          read: false,
          link: "/tweet/1",
        },
        {
          id: "2",
          type: "trade",
          title: "Trade Executed",
          message: "Successfully purchased 10 shares of Tech Insider's tweet",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
          read: false,
          link: "/portfolio",
        },
        {
          id: "3",
          type: "follow",
          title: "New Content",
          message: "Crypto Maven posted a new tweet you might be interested in",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
          read: false,
          link: "/tweet/4",
        },
      ]
      setNotifications(initial)
      localStorage.setItem("pulsemarket_notifications", JSON.stringify(initial))
      localStorage.setItem("pulsemarket_notifications_initialized", "true")
    }
  }, [])

  // Save to localStorage whenever notifications change
  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem("pulsemarket_notifications", JSON.stringify(notifications))
    }
  }, [notifications])

  const unreadCount = notifications.filter((n) => !n.read).length

  const addNotification = (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    }
    setNotifications((prev) => [newNotification, ...prev])
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const clearNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
    localStorage.removeItem("pulsemarket_notifications")
  }

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotification,
        clearAll,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationsContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationsProvider")
  }
  return context
}
