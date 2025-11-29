"use client"

import { Bell, TrendingUp, Users, DollarSign, Award, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useNotifications, type Notification } from "@/lib/notifications-context"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import { cn } from "@/lib/utils"

const iconMap = {
  price: TrendingUp,
  follow: Users,
  trade: DollarSign,
  milestone: Award,
  system: Bell,
}

function NotificationItem({ notification }: { notification: Notification }) {
  const { markAsRead, clearNotification } = useNotifications()
  const Icon = iconMap[notification.type]

  const handleClick = () => {
    if (!notification.read) {
      markAsRead(notification.id)
    }
  }

  const content = (
    <div
      className={cn(
        "flex gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer relative group",
        !notification.read && "bg-primary/5",
      )}
      onClick={handleClick}
    >
      <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", "bg-primary/10")}>
        <Icon className="w-5 h-5 text-primary" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="font-medium text-sm">{notification.title}</p>
          {!notification.read && <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1" />}
        </div>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{notification.message}</p>
        <p className="text-xs text-muted-foreground mt-2">
          {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
        </p>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 shrink-0"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          clearNotification(notification.id)
        }}
      >
        <X className="w-3 h-3" />
      </Button>
    </div>
  )

  if (notification.link) {
    return <Link href={notification.link}>{content}</Link>
  }

  return content
}

export function NotificationsDropdown() {
  const { notifications, unreadCount, markAllAsRead, clearAll } = useNotifications()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full text-xs flex items-center justify-center text-white font-medium">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass-strong w-[380px] p-0">
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <div>
            <h3 className="font-semibold">Notifications</h3>
            {unreadCount > 0 && <p className="text-xs text-muted-foreground">{unreadCount} unread</p>}
          </div>
          <div className="flex gap-1">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-8 text-xs">
                <Check className="w-3 h-3 mr-1" />
                Mark all read
              </Button>
            )}
            {notifications.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearAll} className="h-8 text-xs text-muted-foreground">
                Clear all
              </Button>
            )}
          </div>
        </div>

        <ScrollArea className="h-[400px]">
          {notifications.length > 0 ? (
            <div className="p-2">
              {notifications.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[400px] text-center p-6">
              <Bell className="w-12 h-12 text-muted-foreground/50 mb-3" />
              <p className="text-sm text-muted-foreground">No notifications yet</p>
              <p className="text-xs text-muted-foreground mt-1">
                We'll notify you about price changes, new content, and more
              </p>
            </div>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
