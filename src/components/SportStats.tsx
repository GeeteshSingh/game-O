"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const sportData = [
  { name: 'Badminton', games: 12, time: 18 },
  { name: 'Football', games: 8, time: 16 },
  { name: 'Cricket', games: 6, time: 18 },
  { name: 'Tennis', games: 4, time: 4 },
  { name: 'Basketball', games: 2, time: 2 },
];

const SportStats = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Sport Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">Games Played by Sport</h3>
            <div className="space-y-3">
              {sportData.map((sport, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{sport.name}</span>
                    <span>{sport.games} games</span>
                  </div>
                  <Progress value={(sport.games / 12) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Time Spent (hours)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sportData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="time" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SportStats;