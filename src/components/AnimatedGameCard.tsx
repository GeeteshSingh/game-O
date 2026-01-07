"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface Game {
  id: number;
  name: string;
  icon: string;
  color: string;
}

const AnimatedGameCard = ({ 
  game, 
  isSelected, 
  onClick 
}: { 
  game: Game; 
  isSelected: boolean; 
  onClick: () => void; 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        variant="outline"
        className={`flex flex-col items-center justify-center h-28 rounded-xl transition-all ${
          isSelected
            ? "border-2 border-primary bg-primary/10 shadow-md"
            : "bg-white hover:bg-gray-50"
        }`}
        onClick={onClick}
      >
        <span className="text-3xl mb-2">{game.icon}</span>
        <span className="text-sm font-medium">{game.name}</span>
      </Button>
    </motion.div>
  );
};

export default AnimatedGameCard;