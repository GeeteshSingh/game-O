"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import AnimatedActivityCard from '@/components/AnimatedActivityCard';

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
  },
  {
    id: 5,
    user: { name: "Casey Smith", avatar: "" },
    activity: "Basketball",
    date: "2026-01-01",
    duration: "1h 30m",
    location: "Community Center",
    participants: 6,
    rating: 4.5
  }
];

const EnhancedActivityFeed = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px]">
          <div className="space-y-4">
            {activities.map((activity) => (
              <AnimatedActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default EnhancedActivityFeed;