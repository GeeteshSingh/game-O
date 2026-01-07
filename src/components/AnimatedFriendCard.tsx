"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Friend {
  id: number;
  name: string;
  avatar: string;
  sport: string;
  rating: number;
}

const AnimatedFriendCard = ({ 
  friend, 
  onRate 
}: { 
  friend: Friend; 
  onRate: (friend: Friend) => void; 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ x: 5, transition: { duration: 0.2 } }}
      className="flex items-center justify-between p-3 border rounded-lg bg-white"
    >
      <div className="flex items-center">
        <Avatar className="h-12 w-12 mr-4">
          <AvatarImage src={friend.avatar} alt={friend.name} />
          <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{friend.name}</h3>
          <div className="flex items-center text-xs text-gray-500">
            <span>{friend.sport}</span>
            <span className="mx-2">•</span>
            <span>★ {friend.rating}</span>
          </div>
        </div>
      </div>
      <Button 
        size="sm" 
        variant="outline"
        onClick={() => onRate(friend)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Rate
      </Button>
    </motion.div>
  );
};

export default AnimatedFriendCard;