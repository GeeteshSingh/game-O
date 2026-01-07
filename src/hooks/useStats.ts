import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useStats = () => {
  return useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('User not authenticated');

      // Get friends count
      const { count: friendsCount } = await supabase
        .from('friends')
        .select('*', { count: 'exact', head: true })
        .or(`user_id.eq.${user.id},friend_id.eq.${user.id}`)
        .eq('status', 'accepted');

      // Get games played count
      const { count: gamesPlayedCount } = await supabase
        .from('game_participants')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      // Get upcoming games count
      const { count: upcomingGamesCount } = await supabase
        .from('game_participants')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .gte('games.date', new Date().toISOString().split('T')[0]);

      // Get activity count
      const { count: activityCount } = await supabase
        .from('activity_feed')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      return {
        friends: friendsCount || 0,
        gamesPlayed: gamesPlayedCount || 0,
        upcomingGames: upcomingGamesCount || 0,
        activity: activityCount || 0,
      };
    },
  });
};