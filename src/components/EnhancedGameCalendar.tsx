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
import { Plus, CalendarIcon } from 'lucide-react';

const EnhancedGameCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [gameTitle, setGameTitle] = useState("");
  const [gameType, setGameType] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");

  const handleScheduleGame = () => {
    // In a real app, this would send the game details to the backend
    console.log("Scheduling game:", {
      title: gameTitle,
      type: gameType,
      date: format(date, 'yyyy-MM-dd'),
      time,
      location,
      description
    });
    setIsDialogOpen(false);
    // Reset form
    setGameTitle("");
    setGameType("");
    setLocation("");
    setDescription("");
    setTime("");
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Game Calendar</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Schedule Game
            </Button>
          </DialogTrigger>
          <DialogContent>
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
                  <Input
                    id="time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Where is the game?"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
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
              <Button onClick={handleScheduleGame}>Schedule Game</Button>
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
        </motion.div>
        <div className="mt-4 text-sm text-gray-500">
          <p>Selected date: {format(date, 'MMMM d, yyyy')}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedGameCalendar;