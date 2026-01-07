"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MadeWithDyad } from "@/components/made-with-dyad";
import StravaLogin from "@/components/StravaLogin";
import EnhancedActivityFeed from "@/components/EnhancedActivityFeed";
import EnhancedGameSelector from "@/components/EnhancedGameSelector";
import EnhancedFriendsList from "@/components/EnhancedFriendsList";
import EnhancedGameCalendar from "@/components/EnhancedGameCalendar";
import DashboardStats from "@/components/DashboardStats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, Trophy, Calendar, Users, Activity } from "lucide-react";

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <StravaLogin />
        </motion.div>
        <MadeWithDyad />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center py-6 mb-6"
        >
          <h1 className="text-3xl font-bold text-gray-900">SportConnect</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Disconnect Strava
          </Button>
        </motion.header>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <DashboardStats />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6"
        >
          <div className="lg:col-span-2">
            <EnhancedActivityFeed />
          </div>
          <div>
            <EnhancedGameSelector />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Tabs defaultValue="friends" className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="friends" className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                Friends
              </TabsTrigger>
              <TabsTrigger value="calendar" className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                Game Calendar
              </TabsTrigger>
            </TabsList>
            <TabsContent value="friends">
              <EnhancedFriendsList />
            </TabsContent>
            <TabsContent value="calendar">
              <EnhancedGameCalendar />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;