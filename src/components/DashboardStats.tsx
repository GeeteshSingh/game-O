"use client";

import React from 'react';
import { Users, Calendar, Trophy, Activity } from 'lucide-react';
import StatsCard from '@/components/StatsCard';

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <StatsCard 
        title="Friends" 
        value="24" 
        icon={<Users className="h-6 w-6 text-white" />} 
        color="bg-blue-500" 
      />
      <StatsCard 
        title="Games Played" 
        value="42" 
        icon={<Trophy className="h-6 w-6 text-white" />} 
        color="bg-green-500" 
      />
      <StatsCard 
        title="Events" 
        value="18" 
        icon={<Calendar className="h-6 w-6 text-white" />} 
        color="bg-purple-500" 
      />
      <StatsCard 
        title="Activity" 
        value="128" 
        icon={<Activity className="h-6 w-6 text-white" />} 
        color="bg-orange-500" 
      />
    </div>
  );
};

export default DashboardStats;