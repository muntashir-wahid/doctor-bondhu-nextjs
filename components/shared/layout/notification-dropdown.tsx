"use client";

import Link from "next/link";
import { Bell, Clock, CheckCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Notification {
  id: string;
  title: string;
  description?: string;
  time: string;
  isRead: boolean;
}

interface NotificationDropdownProps {
  notifications?: Notification[];
}

// Mock notification data
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New appointment scheduled",
    description: "Dr. Smith has a new appointment at 3:00 PM",
    time: "5 min ago",
    isRead: false,
  },
  {
    id: "2",
    title: "Patient record updated",
    description: "Medical records for John Doe have been updated",
    time: "1 hour ago",
    isRead: false,
  },
  {
    id: "3",
    title: "Reminder: Staff meeting",
    description: "Weekly staff meeting starts in 30 minutes",
    time: "2 hours ago",
    isRead: false,
  },
  {
    id: "4",
    title: "Payment received",
    description: "Payment of $150 received from Jane Smith",
    time: "3 hours ago",
    isRead: true,
  },
];

export function NotificationDropdown({
  notifications = mockNotifications,
}: NotificationDropdownProps) {
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-10 w-10"
          aria-label="Open notifications"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end" forceMount>
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="ml-auto">
              {unreadCount} new
            </Badge>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Bell className="h-12 w-12 text-muted-foreground/50 mb-2" />
            <p className="text-sm text-muted-foreground">No notifications</p>
          </div>
        ) : (
          <>
            <ScrollArea className="h-[300px]">
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="flex flex-col items-start p-3 cursor-pointer"
                >
                  <div className="flex items-start w-full gap-2">
                    {!notification.isRead && (
                      <div className="h-2 w-2 rounded-full bg-primary mt-1 shrink-0" />
                    )}
                    {notification.isRead && (
                      <CheckCircle className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                    )}
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {notification.title}
                      </p>
                      {notification.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {notification.description}
                        </p>
                      )}
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{notification.time}</span>
                      </div>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </ScrollArea>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href="/notifications"
                className="w-full text-center cursor-pointer justify-center"
              >
                View all notifications
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
