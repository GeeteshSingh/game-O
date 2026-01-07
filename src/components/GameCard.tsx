"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { format } from 'date-fns';

interface GameCardProps {
  title: string;
  sport: string;
  date: Date;
  time: string;
  location: string;
  participants: number;
  maxParticipants: number;
  confirmed: boolean;
  onJoin: () => void;
  onViewDetails: () => void;
}

const GameCard = ({
  title,
  sport,
  date,
  time,
  location,
  participants,
  maxParticipants,
  confirmed,
  onJoin,
  onViewDetails
}: GameCardProps) => {
  const sportIcons: Record<string, string> = {
    Badminton: "🏸",
    Football: "⚽",
    Cricket: "🏏",
    Tennis: "🎾",
    Basketball: "🏀",
    Volleyball: "🏐"
  };

  return (
    <Card className="w-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge 
            variant={confirmed ? "default" : "secondary"} 
            className={confirmed ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
          >
            {confirmed ? 'Confirmed' : 'Pending'}
          </Badge>
        </div>
        <div className="flex items-center mt-1">
          <span className="text-2xl mr-2">{sportIcons[sport] || "⚽"}</span>
          <span className="text-sm font-medium text-gray-600">{sport}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="h-4 w-4 mr-2" />
          {format(date, 'MMM d, yyyy')}
        </div>
        
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-2" />
          {time}
        </div>
        
        <div className="flex items-center text-sm text-gray-500">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="truncate">{location}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500">
          <Users className="h-4 w-4 mr-2" />
          {participants}/{maxParticipants} players
        </div>
        
        <div className="flex space-x-2 pt-2">
          <Button 
            size="sm" 
            className="flex-1"
            onClick={onJoin}
            disabled={participants >= maxParticipants}
          >
            {participants >= maxParticipants ? 'Full' : 'Join'}
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={onViewDetails}
          >
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameCard;