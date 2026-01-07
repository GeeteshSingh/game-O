"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EnhancedGameCalendar from '@/components/EnhancedGameCalendar';
import UpcomingGames from '@/components/UpcomingGames';

const CalendarPage = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardContent className="p-6">
            <div>
              <h1 className="text-2xl font-bold">Calendar</h1>
              <p className="text-gray-600">Manage your sports schedule</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <EnhancedGameCalendar />
        <UpcomingGames />
      </motion.div>
    </div>
  );
};

export default CalendarPage;