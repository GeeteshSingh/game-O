"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import GameCard from '@/components/GameCard';

const games = [
  {
    id: 1,
    title: "Weekend Badminton Match",
    sport: "Badminton",
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
    sport: "Football",
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
    sport: "Tennis",
    date: new Date(2026, 0, 18),
    time: "10:00",
    location: "City Tennis Club",
    participants: 2,
    maxParticipants: 4,
    confirmed: true
  },
  {
    id: 4,
    title: "Cricket Practice",
    sport: "Cricket",
    date: new Date(2026, 0, 20),
    time: "17:00",
    location: "Greenfield Grounds",
    participants: 6,
    maxParticipants: 12,
    confirmed: true
  }
];

const GameList = () => {
  const handleJoin = (id: number) => {
    console.log(`Joining game ${id}`);
    // In a real app, this would join the user to the game
  };

  const handleViewDetails = (id: number) => {
    console.log(`Viewing details for game ${id}`);
    // In a real app, this would navigate to the game details page
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Games</CardTitle>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">Filter</Button>
          <Button variant="outline" size="sm">Sort</Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px]">
          <div className="space-y-4">
            {games.map((game) => (
              <GameCard
                key={game.id}
                title={game.title}
                sport={game.sport}
                date={game.date}
                time={game.time}
                location={game.location}
                participants={game.participants}
                maxParticipants={game.maxParticipants}
                confirmed={game.confirmed}
                onJoin={() => handleJoin(game.id)}
                onViewDetails={() => handleViewDetails(game.id)}
              />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default GameList;