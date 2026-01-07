"use client";

import React, { useState } from 'react';
import { MadeWithDyad } from "@/components/made-with-dyad";
import StravaLogin from "@/components/StravaLogin";
import ActivityFeed from "@/components/ActivityFeed";
import GameSelector from "@/components/GameSelector";
import FriendsList from "@/components/FriendsList";
import GameCalendar from "@/components/GameCalendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const Index = () => {
  const [stravaConnected, setStravaConnected] = useState(
    localStorage.getItem('stravaConnected') === 'true'
  );

  const handleLogout = () => {
    localStorage.removeItem('stravaConnected');
    setStravaConnected(false);
  };

  if (!stravaConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md">
          <StravaLogin />
        </div>
        <MadeWithDyad />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center py-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900">SportConnect</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Disconnect Strava
          </Button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <ActivityFeed />
          </div>
          <div>
            <GameSelector />
          </div>
        </div>

        <Tabs defaultValue="friends" className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="friends">Friends</TabsTrigger>
            <TabsTrigger value="calendar">Game Calendar</TabsTrigger>
          </TabsList>
          <TabsContent value="friends">
            <FriendsList />
          </TabsContent>
          <TabsContent value="calendar">
            <GameCalendar />
          </TabsContent>
        </Tabs>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;