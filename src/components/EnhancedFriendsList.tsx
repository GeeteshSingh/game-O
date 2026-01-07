"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Star, UserPlus, Search } from 'lucide-react';
import AnimatedFriendCard from '@/components/AnimatedFriendCard';
import FriendInviteLink from '@/components/FriendInviteLink';

const friends = [
  { id: 1, name: "Alex Johnson", avatar: "", sport: "Badminton", rating: 4.8 },
  { id: 2, name: "Sam Wilson", avatar: "", sport: "Football", rating: 4.9 },
  { id: 3, name: "Taylor Kim", avatar: "", sport: "Cricket", rating: 4.7 },
  { id: 4, name: "Jordan Lee", avatar: "", sport: "Tennis", rating: 4.6 },
  { id: 5, name: "Casey Smith", avatar: "", sport: "Basketball", rating: 4.5 },
  { id: 6, name: "Riley Brown", avatar: "", sport: "Volleyball", rating: 4.4 }
];

const EnhancedFriendsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<typeof friends[0] | null>(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);

  const filteredFriends = friends.filter(friend => 
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRateFriend = (friend: typeof friends[0]) => {
    setSelectedFriend(friend);
    setIsRatingDialogOpen(true);
    setRating(0);
    setReview("");
  };

  const submitRating = () => {
    // In a real app, this would send the rating to the backend
    console.log(`Rated ${selectedFriend?.name} with ${rating} stars and review: ${review}`);
    setIsRatingDialogOpen(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Friends</CardTitle>
          <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <UserPlus className="h-4 w-4 mr-2" />
                Invite
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite Friends</DialogTitle>
              </DialogHeader>
              <FriendInviteLink />
            </DialogContent>
          </Dialog>
        </div>
        <div className="pt-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search friends..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[450px]">
          <div className="space-y-3">
            {filteredFriends.map((friend) => (
              <AnimatedFriendCard 
                key={friend.id} 
                friend={friend} 
                onRate={handleRateFriend} 
              />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      
      <Dialog open={isRatingDialogOpen} onOpenChange={setIsRatingDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rate {selectedFriend?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Rating</Label>
              <div className="flex mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-8 w-8 cursor-pointer ${
                      star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="review">Review</Label>
              <Textarea
                id="review"
                placeholder="Share your experience playing with this teammate..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="mt-2"
              />
            </div>
            <Button onClick={submitRating} disabled={rating === 0}>
              Submit Rating
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default EnhancedFriendsList;