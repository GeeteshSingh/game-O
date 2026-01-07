"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import AchievementCard from '@/components/AchievementCard';
import { Trophy, Calendar, Users, Activity } from 'lucide-react';

const achievements = [
  {
    id: 1,
    title: "First Game",
    description: "Play your first game",
    icon: <Trophy className="h-5 w-5 text-yellow-500" />,
    earned: true,
    dateEarned: "Jan 5, 2026"
  },
  {
    id: 2,
    title: "Social Butterfly",
    description: "Add 10 friends",
    icon: <Users className="h-5 w-5 text-blue-500" />,
    earned: true,
    dateEarned: "Dec 28, 2025"
  },
  {
    id: 3,
    title: "Weekend Warrior",
    description: "Play 5 games in a weekend",
    icon: <Calendar className="h-5 w-5 text-green-500" />,
    earned: false
  },
  {
    id: 4,
    title: "Activity Master",
    description: "Log 50 activities",
    icon: <Activity className="h-5 w-5 text-purple-500" />,
    earned: false
  }
];

const AchievementsList = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                title={achievement.title}
                description={achievement.description}
                icon={achievement.icon}
                earned={achievement.earned}
                dateEarned={achievement.dateEarned}
              />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AchievementsList;