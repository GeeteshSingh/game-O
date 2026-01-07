"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Users, 
  Star,
  X
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';

// Mock search results
const mockResults = [
  {
    id: 1,
    type: "friend",
    name: "Alex Johnson",
    avatar: "",
    sport: "Badminton",
    rating: 4.8,
    location: "Central Park",
    distance: "1.2 km"
  },
  {
    id: 2,
    type: "game",
    name: "Weekend Badminton Match",
    sport: "Badminton",
    date: "2026-01-12",
    time: "18:00",
    location: "Central Park Courts",
    participants: 4,
    maxParticipants: 6
  },
  {
    id: 3,
    type: "venue",
    name: "Central Park Courts",
    sport: "Badminton, Tennis",
    rating: 4.7,
    location: "Central Park",
    distance: "1.2 km"
  },
  {
    id: 4,
    type: "friend",
    name: "Sam Wilson",
    avatar: "",
    sport: "Football",
    rating: 4.9,
    location: "Downtown",
    distance: "3.5 km"
  }
];

const AdvancedSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    friends: true,
    games: true,
    venues: true,
    sports: [] as string[],
    minRating: 0,
    maxDistance: 10
  });
  const [showFilters, setShowFilters] = useState(false);

  const sports = ["Badminton", "Football", "Cricket", "Tennis", "Basketball", "Volleyball"];

  const toggleSportFilter = (sport: string) => {
    setFilters(prev => ({
      ...prev,
      sports: prev.sports.includes(sport)
        ? prev.sports.filter(s => s !== sport)
        : [...prev.sports, sport]
    }));
  };

  const filteredResults = mockResults.filter(item => {
    // Filter by type
    if (item.type === "friend" && !filters.friends) return false;
    if (item.type === "game" && !filters.games) return false;
    if (item.type === "venue" && !filters.venues) return false;
    
    // Filter by search query
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    // Filter by sports
    if (filters.sports.length > 0) {
      if (item.type === "friend" || item.type === "venue") {
        const itemSports = item.sport.split(", ").map(s => s.trim());
        if (!filters.sports.some(sport => itemSports.includes(sport))) return false;
      } else if (item.type === "game") {
        if (!filters.sports.includes(item.sport)) return false;
      }
    }
    
    // Filter by rating
    if (item.type !== "game" && "rating" in item && item.rating < filters.minRating) return false;
    
    return true;
  });

  const clearFilters = () => {
    setFilters({
      friends: true,
      games: true,
      venues: true,
      sports: [],
      minRating: 0,
      maxDistance: 10
    });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search friends, games, venues..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
          
          {showFilters && (
            <div className="mt-4 pt-4 border-t">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Result Types</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox 
                        id="friends" 
                        checked={filters.friends}
                        onCheckedChange={(checked) => 
                          setFilters(prev => ({ ...prev, friends: !!checked }))
                        }
                      />
                      <label htmlFor="friends" className="ml-2 text-sm">Friends</label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox 
                        id="games" 
                        checked={filters.games}
                        onCheckedChange={(checked) => 
                          setFilters(prev => ({ ...prev, games: !!checked }))
                        }
                      />
                      <label htmlFor="games" className="ml-2 text-sm">Games</label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox 
                        id="venues" 
                        checked={filters.venues}
                        onCheckedChange={(checked) => 
                          setFilters(prev => ({ ...prev, venues: !!checked }))
                        }
                      />
                      <label htmlFor="venues" className="ml-2 text-sm">Venues</label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Sports</h4>
                  <div className="flex flex-wrap gap-2">
                    {sports.map(sport => (
                      <Badge
                        key={sport}
                        variant={filters.sports.includes(sport) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleSportFilter(sport)}
                      >
                        {sport}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Rating</h4>
                  <div className="flex items-center">
                    <Slider
                      defaultValue={[filters.minRating]}
                      max={5}
                      step={0.5}
                      className="w-32"
                      onValueChange={([value]) => 
                        setFilters(prev => ({ ...prev, minRating: value }))
                      }
                    />
                    <span className="ml-2 text-sm">{filters.minRating}+</span>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-4"
                    onClick={clearFilters}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear All Filters
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Search Results</CardTitle>
          <span className="text-sm text-gray-500">{filteredResults.length} results</span>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px]">
            <div className="space-y-4">
              {filteredResults.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  {item.type === "friend" && (
                    <>
                      <div className="relative">
                        <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="font-medium">{item.name.charAt(0)}</span>
                        </div>
                        <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <span>{item.sport}</span>
                          <span className="mx-2">•</span>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                            <span>{item.rating}</span>
                          </div>
                          <span className="mx-2">•</span>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{item.distance}</span>
                          </div>
                        </div>
                      </div>
                      <Button size="sm">Connect</Button>
                    </>
                  )}
                  
                  {item.type === "game" && (
                    <>
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-xl">🏸</span>
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <span>{item.sport}</span>
                          <span className="mx-2">•</span>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{item.date} at {item.time}</span>
                          </div>
                          <span className="mx-2">•</span>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            <span>{item.participants}/{item.maxParticipants}</span>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{item.location}</span>
                        </div>
                      </div>
                      <Button size="sm">Join</Button>
                    </>
                  )}
                  
                  {item.type === "venue" && (
                    <>
                      <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <span>{item.sport}</span>
                          <span className="mx-2">•</span>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                            <span>{item.rating}</span>
                          </div>
                          <span className="mx-2">•</span>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{item.distance}</span>
                          </div>
                        </div>
                      </div>
                      <Button size="sm">View</Button>
                    </>
                  )}
                </div>
              ))}
              
              {filteredResults.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No results found. Try adjusting your search or filters.</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedSearch;