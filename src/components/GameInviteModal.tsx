"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { CalendarIcon, Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';

const friends = [
  { id: 1, name: "Alex Johnson" },
  { id: 2, name: "Sam Wilson" },
  { id: 3, name: "Taylor Kim" },
  { id: 4, name: "Jordan Lee" },
  { id: 5, name: "Casey Smith" },
  { id: 6, name: "Riley Brown" }
];

const GameInviteModal = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("18:00");
  const [location, setLocation] = useState("");
  const [gameType, setGameType] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFriends, setSelectedFriends] = useState<number[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleFriend = (id: number) => {
    setSelectedFriends(prev => 
      prev.includes(id) 
        ? prev.filter(friendId => friendId !== id) 
        : [...prev, id]
    );
  };

  const sendInvites = () => {
    // In a real app, this would send invitations to friends
    console.log("Sending invites to:", selectedFriends);
    setIsOpen(false);
    // Reset form
    setSelectedFriends([]);
    setLocation("");
    setDescription("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Invite Friends</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Invite Friends to Game</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="game-type">Game Type</Label>
            <Select value={gameType} onValueChange={setGameType}>
              <SelectTrigger id="game-type">
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
              <div className="relative">
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="pl-10"
                />
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <Input
                id="location"
                placeholder="Where is the game?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10"
              />
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
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
          
          <div>
            <Label>Invite Friends</Label>
            <div className="mt-2 grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-2 border rounded-md">
              {friends.map((friend) => (
                <div 
                  key={friend.id} 
                  className={`flex items-center p-2 rounded cursor-pointer ${
                    selectedFriends.includes(friend.id) 
                      ? 'bg-blue-100 border border-blue-300' 
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => toggleFriend(friend.id)}
                >
                  <div className="h-2 w-2 rounded-full bg-gray-300 mr-2" />
                  <span className="text-sm">{friend.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <Button onClick={sendInvites} disabled={selectedFriends.length === 0 || !gameType}>
            Send Invites ({selectedFriends.length})
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GameInviteModal;