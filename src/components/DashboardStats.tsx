import React from 'react';
import { Users, Calendar, Trophy, Activity } from 'lucide-react';
import StatsCard from '@/components/StatsCard';
import { useStats } from '@/hooks/useStats';

const DashboardStats = () => {
  const { data: stats, isLoading } = useStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <StatsCard 
        title="Friends" 
        value={stats?.friends || 0} 
        icon={<Users className="h-6 w-6 text-white" />} 
        color="bg-blue-500" 
      />
      <StatsCard 
        title="Games Played" 
        value={stats?.gamesPlayed || 0} 
        icon={<Trophy className="h-6 w-6 text-white" />} 
        color="bg-green-500" 
      />
      <StatsCard 
        title="Events" 
        value={stats?.upcomingGames || 0} 
        icon={<Calendar className="h-6 w-6 text-white" />} 
        color="bg-purple-500" 
      />
      <StatsCard 
        title="Activity" 
        value={stats?.activity || 0} 
        icon={<Activity className="h-6 w-6 text-white" />} 
        color="bg-orange-500" 
      />
    </div>
  );
};

export default DashboardStats;