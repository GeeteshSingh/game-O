"use client";

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { Plus, CalendarIcon, Clock, MapPin, Users } from 'lucide-react';
import LocationAutocomplete from '@/components/LocationAutocomplete';

// Mock data for available time slots
const timeSlots = [
  "08:00", "09:00", "10:00", "11:00", 
  "12:00", "13:00", "14:00", "15:00", 
  "16:00", "17:00", "18:00", "19:00", 
  "20:00", "21:00"
];

// Mock data for available courts/venues
const venues = [
  { id: 1, name: "Central Park Courts", available: true },
  { id: 2, name: "Downtown Stadium", available: false },
  { id: 3, name: "City Tennis Club", available: true },
  { id: 4, name: "Greenfield Grounds", available: true }
];

const AdvancedGameScheduler = () => {
  const [date, setDate] = useState(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [gameTitle, setGameTitle] = useState("");
  const [gameType, setGameType] = useState("");
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [description, setDescription] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedVenue, setSelectedVenue] = useState("");
  const [maxPlayers, setMaxPlayers] = useState(4);
  const [skillLevel, setSkillLevel] = useState("intermediate");

  const handleLocationSelect = (address: string, coords: { lat: number; lng: number }) => {
    setLocation(address);
    setCoordinates(coords);
  };

  const handleScheduleGame = () => {
    // In a real app, this would send the game details to the backend
    console.log("Scheduling game:", {
      title: gameTitle,
      type: gameType,
      date: format(date, 'yyyy-MM-dd'),
      time: selectedTime,
      location,
      coordinates,
      description,
      maxPlayers,
      skillLevel
    });
    
    setIsDialogOpen(false);
    // Reset form
    setGameTitle("");
    setGameType("");
    setLocation("");
    setDescription("");
    setSelectedTime("");
    setSelectedVenue("");
    setMaxPlayers(4);
    setSkillLevel("intermediate");
  };

  // Get available time slots for the selected date
  const getAvailableSlots = () => {
    // In a real app, this would check against existing games
    // For demo, we'll show all slots as available
    return timeSlots;
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Game Scheduler</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Schedule Game
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Schedule New Game</DialogTitle>
            </DialogHeader>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="title">Game Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Weekend Badminton Match"
                  value={gameTitle}
                  onChange={(e) => setGameTitle(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="type">Game Type</Label>
                <Select value={gameType} onValueChange={setGameType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select game type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Badminton">Badminton</SelectItem>
                    <SelectItem value="Football">Football</SelectItem>
                    <SelectItem value="Cricket">Cricket</SelectItem>
                    <SelectItem value="Tennis">Tennis</SelectItem>
                    <SelectItem value="Basketball">Basketball</SelectItem>
                    <SelectItem value="Volleyball">Volleyball</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <div className="relative">
                    <Input
                      id="date"
                      type="date"
                      value={format(date, 'yyyy-MM-dd')}
                      onChange={(e) => setDate(new Date(e.target.value))}
                      className="pl-10"
                    />
                    <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableSlots().map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <LocationAutocomplete 
                    onSelect={handleLocationSelect}
                    placeholder="Search for a location..."
                    defaultValue={location}
                  />
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="venue">Venue (Optional)</Label>
                <Select value={selectedVenue} onValueChange={setSelectedVenue}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select venue" />
                  </SelectTrigger>
                  <SelectContent>
                    {venues.map((venue) => (
                      <SelectItem 
                        key={venue.id} 
                        value={venue.name}
                        disabled={!venue.available}
                      >
                        <div className="flex items-center">
                          <span>{venue.name}</span>
                          {!venue.available && (
                            <span className="ml-2 text-xs text-gray-500">(Unavailable)</span>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="players">Max Players</Label>
                  <Select 
                    value={maxPlayers.toString()} 
                    onValueChange={(value) => setMaxPlayers(parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[2, 4, 6, 8, 10, 12, 14, 16].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} players
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="skill">Skill Level</Label>
                  <Select value={skillLevel} onValueChange={setSkillLevel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Add any additional details..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              
              <Button onClick={handleScheduleGame} disabled={!gameTitle || !gameType || !selectedTime || !location}>
                Schedule Game
              </Button>
            </motion.div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Calendar
            onChange={setDate}
            value={date}
            className="border-0 w-full"
            tileClassName={({ date, view }) => 
              view === 'month' && date.getDay() === 0 ? 'text-red-500' : ''
            }
          />
          <div className="mt-4 text-sm text-gray-500">
            <p>Selected date: {format(date, 'MMMM d, yyyy')}</p>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default AdvancedGameScheduler;