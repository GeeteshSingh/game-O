"use client";

import React, { useState, useEffect } from 'react';
import { Bell, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

// Mock notification data - in a real app this would come from a WebSocket or API
const mockNotifications = [
  {
    id: 1,
    title: "New Game Invite",
    message: "Sam invited you to a Badminton game tomorrow at 6 PM",
    time: "2 hours ago",
    unread: true,
    type: "invite"
  },
  {
    id: 2,
    title: "Game Reminder",
    message: "Your Football match is scheduled for today at 4 PM",
    time: "5 hours ago",
    unread: true,
    type: "reminder"
  },
  {
    id: 3,
    title: "Friend Request",
    message: "Taylor accepted your friend request",
    time: "1 day ago",
    unread: false,
    type: "friend"
  },
  {
    id: 4,
    title: "New Achievement",
    message: "You've earned the 'Weekend Warrior' badge",
    time: "2 days ago",
    unread: false,
    type: "achievement"
  }
];

const RealTimeNotifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [unreadCount, setUnreadCount] = useState(2);
  const { toast } = useToast();

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // In a real app, this would come from a WebSocket connection
      // For demo purposes, we'll simulate a new notification every 30 seconds
      const shouldAddNotification = Math.random() > 0.7;
      
      if (shouldAddNotification) {
        const newNotification = {
          id: Date.now(),
          title: "New Game Invite",
          message: "Jordan invited you to a Tennis match this weekend",
          time: "Just now",
          unread: true,
          type: "invite"
        };
        
        setNotifications(prev => [newNotification, ...prev]);
        setUnreadCount(prev => prev + 1);
        
        // Show toast notification
        toast({
          title: "New Notification",
          description: "You have a new game invite!",
        });
      }
    }, 30000);
    
    return () => clearInterval(interval);
  }, [toast]);

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, unread: false } 
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, unread: false }))
    );
    setUnreadCount(0);
  };

  const clearNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    const notification = notifications.find(n => n.id === id);
    if (notification?.unread) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const acceptInvite = (id: number) => {
    markAsRead(id);
    toast({
      title: "Invite Accepted",
      description: "You've successfully joined the game!",
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "invite":
        return "✉️";
      case "reminder":
        return "⏰";
      case "friend":
        return "👥";
      case "achievement":
        return "🏆";
      default:
        return "🔔";
    }
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
              >
                <div className="flex w-full justify-between">
                  <div className="flex items-center">
                    <span className="mr-2">{getNotificationIcon(notification.type)}</span>
                    <h4 className="font-medium text-sm">{notification.title}</h4>
                  </div>
                  <div className="flex space-x-1">
                    {notification.unread && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-5 w-5"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <Check className="h-3 w-3" />
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-5 w-5"
                      onClick={() => clearNotification(notification.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                <div className="flex w-full justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">{notification.time}</span>
                  {notification.type === "invite" && notification.unread && (
                    <div className="flex space-x-1">
                      <Button 
                        size="sm" 
                        className="h-6 text-xs"
                        onClick={() => acceptInvite(notification.id)}
                      >
                        Accept
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-6 text-xs"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Decline
                      </Button>
                    </div>
                  )}
                </div>
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

export default RealTimeNotifications;