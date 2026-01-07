"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { Filter } from 'lucide-react';

const FilterDropdown = () => {
  const [filters, setFilters] = useState({
    badminton: true,
    football: true,
    cricket: false,
    tennis: true,
    basketball: false,
    volleyball: false
  });

  const toggleFilter = (filter: keyof typeof filters) => {
    setFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };

  const clearAll = () => {
    setFilters({
      badminton: false,
      football: false,
      cricket: false,
      tennis: false,
      basketball: false,
      volleyball: false
    });
  };

  const selectAll = () => {
    setFilters({
      badminton: true,
      football: true,
      cricket: true,
      tennis: true,
      basketball: true,
      volleyball: true
    });
  };

  const activeFilters = Object.values(filters).filter(Boolean).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="relative">
          <Filter className="mr-2 h-4 w-4" />
          Filters
          {activeFilters > 0 && (
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center">
              {activeFilters}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>Filter by Sport</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <div className="p-2">
          <div className="flex items-center justify-between mb-2">
            <Button variant="ghost" size="sm" onClick={selectAll}>
              Select All
            </Button>
            <Button variant="ghost" size="sm" onClick={clearAll}>
              Clear All
            </Button>
          </div>
          
          <div className="space-y-2">
            {Object.entries(filters).map(([sport, isChecked]) => (
              <div key={sport} className="flex items-center">
                <Checkbox
                  id={sport}
                  checked={isChecked}
                  onCheckedChange={() => toggleFilter(sport as keyof typeof filters)}
                />
                <label
                  htmlFor={sport}
                  className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                >
                  {sport}
                </label>
              </div>
            ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;