"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

const activities = [
  {
    id: 1,
    user: { name: "Alex Johnson", avatar: "" },
    activity: "Badminton",
    date: "2026-01-05",
    duration: "1h 30m",
    location: "Central Park Courts",
    participants: 4,
    rating: 4.8
  },
  {
    id: 2,
    user: { name: "Sam Wilson", avatar: "" },
    activity: "Football",
    date: "2026-01-04",
    duration: "2h",
    location: "Downtown Stadium",
    participants: 11,
    rating: 4.9
  },
  {
    id: 3,
    user: { name: "Taylor Kim", avatar: "" },
    activity: "Cricket",
    date: "2026-01-03",
    duration: "3h",
    location: "Greenfield Grounds",
    participants: 14,
    rating: 4.7
  },
  {
    id: 4,
    user: { name: "Jordan Lee", avatar: "" },
    activity: "Tennis",
    date: "2026-01-02",
    duration: "1h",
    location: "City Tennis Club",
    participants: 2,
    rating: 4.6
  }
];

const activityIcons = {
  Badminton: "🏸",
  Football: "⚽",
  Cricket: "🏏",
  Tennis: "🎾",
  Basketball: "🏀",
  Volleyball: "🏐"
};

const ActivityFeed = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                  <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium truncate">{activity.user.name}</h3>
                    <Badge variant="secondary">{activity.rating} ★</Badge>
                  </div>
                  <div className="flex items-center mt-1">
                    <span className="text-lg mr-2">{activityIcons[activity.activity as keyof typeof activityIcons] || "⚽"}</span>
                    <p className="text-sm text-gray-600 truncate">{activity.activity}</p>
                  </div>
                  <div className="flex items-center mt-1 text-xs text-gray-500">
                    <span>{activity.date} • {activity.duration}</span>
                    <span className="mx-2">•</span>
                    <span>{activity.participants} players</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;