"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy } from 'lucide-react';

interface AchievementCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
  dateEarned?: string;
}

const AchievementCard = ({
  title,
  description,
  icon,
  earned,
  dateEarned
}: AchievementCardProps) => {
  return (
    <Card className={`w-full ${earned ? 'border-yellow-300' : 'opacity-70'}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg flex items-center">
            {icon}
            <span className="ml-2">{title}</span>
          </CardTitle>
          {earned && (
            <Badge variant="default" className="bg-yellow-100 text-yellow-800">
              Earned
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        {earned && dateEarned && (
          <p className="text-xs text-gray-500">Earned on {dateEarned}</p>
        )}
        {!earned && (
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AchievementCard;