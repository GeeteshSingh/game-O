"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Calendar, Trophy, Activity } from 'lucide-react';
import DashboardStats from '@/components/DashboardStats';
import EnhancedActivityFeed from '@/components/EnhancedActivityFeed';
import EnhancedGameSelector from '@/components/EnhancedGameSelector';
import EnhancedFriendsList from '@/components/EnhancedFriendsList';
import AdvancedGameScheduler from '@/components/AdvancedGameScheduler';
import EnhancedProfileCard from '@/components/EnhancedProfileCard';
import UpcomingGames from '@/components/UpcomingGames';
import SportStats from '@/components/SportStats';
import GameInviteModal from '@/components/GameInviteModal';

const EnhancedDashboard = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <DashboardStats />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold">Welcome back, Alex!</h2>
                  <p className="text-gray-600">Ready for your next game?</p>
                </div>
                <div className="flex space-x-2">
                  <GameInviteModal />
                  <Button variant="outline">Find Games</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <UpcomingGames />
          
          <EnhancedActivityFeed />
        </div>
        
        <div className="space-y-6">
          <EnhancedProfileCard />
          <SportStats />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Tabs defaultValue="calendar">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="calendar" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule
            </TabsTrigger>
            <TabsTrigger value="friends" className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Friends
            </TabsTrigger>
            <TabsTrigger value="games" className="flex items-center">
              <Trophy className="mr-2 h-4 w-4" />
              Select Games
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center">
              <Activity className="mr-2 h-4 w-4" />
              Activity
            </TabsTrigger>
          </TabsList>
          <TabsContent value="calendar">
            <AdvancedGameScheduler />
          </TabsContent>
          <TabsContent value="friends">
            <EnhancedFriendsList />
          </TabsContent>
          <TabsContent value="games">
            <EnhancedGameSelector />
          </TabsContent>
          <TabsContent value="activity">
            <EnhancedActivityFeed />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default EnhancedDashboard;