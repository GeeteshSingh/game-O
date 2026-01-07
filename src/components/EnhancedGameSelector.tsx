"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AnimatedGameCard from '@/components/AnimatedGameCard';

const games = [
  { id: 1, name: "Badminton", icon: "🏸", color: "bg-blue-100 text-blue-800" },
  { id: 2, name: "Football", icon: "⚽", color: "bg-green-100 text-green-800" },
  { id: 3, name: "Cricket", icon: "🏏", color: "bg-yellow-100 text-yellow-800" },
  { id: 4, name: "Tennis", icon: "🎾", color: "bg-purple-100 text-purple-800" },
  { id: 5, name: "Basketball", icon: "🏀", color: "bg-orange-100 text-orange-800" },
  { id: 6, name: "Volleyball", icon: "🏐", color: "bg-pink-100 text-pink-800" }
];

const EnhancedGameSelector = () => {
  const [selectedGames, setSelectedGames] = useState<number[]>([]);

  const toggleGame = (id: number) => {
    setSelectedGames(prev => 
      prev.includes(id) 
        ? prev.filter(gameId => gameId !== id) 
        : [...prev, id]
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Select Games</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {games.map((game) => (
            <AnimatedGameCard
              key={game.id}
              game={game}
              isSelected={selectedGames.includes(game.id)}
              onClick={() => toggleGame(game.id)}
            />
          ))}
        </div>
        <div className="mt-6">
          <h3 className="text-sm font-medium mb-2">Selected Games:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedGames.length > 0 ? (
              selectedGames.map(id => {
                const game = games.find(g => g.id === id);
                return game ? (
                  <Badge 
                    key={id} 
                    className={`${game.color} flex items-center gap-1 px-3 py-1 text-sm`}
                  >
                    <span className="text-lg">{game.icon}</span>
                    {game.name}
                  </Badge>
                ) : null;
              })
            ) : (
              <p className="text-sm text-gray-500">No games selected</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedGameSelector;