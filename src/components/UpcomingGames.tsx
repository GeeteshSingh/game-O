"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { format } from 'date-fns';

const upcomingGames = [
  {
    id: 1,
    title: "Weekend Badminton Match",
    gameType: "Badminton",
    date: new Date(2026, 0, 12),
    time: "18:00",
    location: "Central Park Courts",
    participants: 4,
    maxParticipants: 6,
    confirmed: true
  },
  {
    id: 2,
    title: "Football Tournament",
    gameType: "Football",
    date: new Date(2026, 0, 15),
    time: "16:00",
    location: "Downtown Stadium",
    participants: 8,
    maxParticipants: 11,
    confirmed: false
  },
  {
    id: 3,
    title: "Tennis Doubles",
    gameType: "Tennis",
    date: new Date(2026, 0, 18),
    time: "10:00",
    location: "City Tennis Club",
    participants: 2,
    maxParticipants: 4,
    confirmed: true
  }
];

const UpcomingGames = () => {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Upcoming Games</CardTitle>
        <Button variant="outline" size="sm">View All</Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {upcomingGames.map((game) => (
              <div key={game.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{game.title}</h3>
                    <p className="text-sm text-gray-600">{game.gameType}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    game.confirmed 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {game.confirmed ? 'Confirmed' : 'Pending'}
                  </span>
                </div>
                
                <div className="mt-3 space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    {format(game.date, 'MMM d, yyyy')}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-2" />
                    {game.time}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="truncate">{game.location}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-2" />
                    {game.participants}/{game.maxParticipants} players
                  </div>
                </div>
                
                <div className="mt-3 flex space-x-2">
                  <Button size="sm" className="flex-1">
                    Join
                  </Button>
                  <Button size="sm" variant="outline">
                    Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default UpcomingGames;