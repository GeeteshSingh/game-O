"use client";

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search friends, games, or activities..."
          className="pl-10 pr-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5"
            onClick={handleClear}
          >
            <X className="h-4 w-4 text-gray-400" />
          </Button>
        )}
      </div>
      
      {isFocused && searchQuery && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-10">
          <div className="p-2 text-sm text-gray-500">
            Search results for "{searchQuery}"
          </div>
          <div className="divide-y">
            <div className="p-3 hover:bg-gray-50 cursor-pointer">
              <div className="font-medium">Alex Johnson</div>
              <div className="text-sm text-gray-500">Friend</div>
            </div>
            <div className="p-3 hover:bg-gray-50 cursor-pointer">
              <div className="font-medium">Badminton Tournament</div>
              <div className="text-sm text-gray-500">Event</div>
            </div>
            <div className="p-3 hover:bg-gray-50 cursor-pointer">
              <div className="font-medium">Football Match</div>
              <div className="text-sm text-gray-500">Activity</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;