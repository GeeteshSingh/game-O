"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const activityIcons = {
  Badminton: "🏸",
  Football: "⚽",
  Cricket: "🏏",
  Tennis: "🎾",
  Basketball: "🏀",
  Volleyball: "🏐"
};

interface Activity {
  id: number;
  user: { name: string; avatar: string };
  activity: string;
  date: string;
  duration: string;
  location: string;
  participants: number;
  rating: number;
}

const AnimatedActivityCard = ({ activity }: { activity: Activity }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="flex items-center p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
    >
      <Avatar className="h-12 w-12 mr-4">
        <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
        <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold truncate">{activity.user.name}</h3>
          <Badge variant="secondary" className="flex items-center">
            <span className="mr-1">★</span>
            {activity.rating}
          </Badge>
        </div>
        <div className="flex items-center mt-1">
          <span className="text-xl mr-2">{activityIcons[activity.activity as keyof typeof activityIcons] || "⚽"}</span>
          <p className="text-sm font-medium text-gray-700 truncate">{activity.activity}</p>
        </div>
        <div className="flex flex-wrap items-center mt-2 text-xs text-gray-500">
          <span>{activity.date}</span>
          <span className="mx-2">•</span>
          <span>{activity.duration}</span>
          <span className="mx-2">•</span>
          <span>{activity.participants} players</span>
          <span className="mx-2">•</span>
          <span className="truncate">{activity.location}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default AnimatedActivityCard;