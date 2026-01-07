"use client";

import React, { useState } from 'react';
import { Bell, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';

const notifications = [
  {
    id: 1,
    title: "New Game Invite",
    message: "Sam invited you to a Badminton game tomorrow at 6 PM",
    time: "2 hours ago",
    unread: true
  },
  {
    id: 2,
    title: "Game Reminder",
    message: "Your Football match is scheduled for today at 4 PM",
    time: "5 hours ago",
    unread: true
  },
  {
    id: 3,
    title: "Friend Request",
    message: "Taylor accepted your friend request",
    time: "1 day ago",
    unread: false
  },
  {
    id: 4,
    title: "New Achievement",
    message: "You've earned the 'Weekend Warrior' badge",
    time: "2 days ago",
    unread: false
  }
];

const NotificationBell = () => {
  const [unreadCount, setUnreadCount] = useState(2); // In a real app, this would be dynamic

  const markAsRead = (id: number) => {
    // In a real app, this would update the notification status
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setUnreadCount(0);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <h3 className="font-medium">Notifications</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            Mark all as read
          </Button>
        </div>
        <ScrollArea className="h-80">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <DropdownMenuItem 
                key={notification.id} 
                className={`flex flex-col items-start p-4 ${notification.unread ? 'bg-gray-50' : ''}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex w-full justify-between">
                  <h4 className="font-medium text-sm">{notification.title}</h4>
                  {notification.unread && (
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                <span className="text-xs text-gray-500 mt-2">{notification.time}</span>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="p-4 text-center text-sm text-gray-500">
              No notifications
            </div>
          )}
        </ScrollArea>
        <div className="p-2 border-t">
          <Button variant="ghost" className="w-full">
            View all notifications
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationBell;