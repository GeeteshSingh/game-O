"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';

const friends = [
  { id: 1, name: "Alex Johnson", avatar: "", sport: "Badminton", rating: 4.8 },
  { id: 2, name: "Sam Wilson", avatar: "", sport: "Football", rating: 4.9 },
  { id: 3, name: "Taylor Kim", avatar: "", sport: "Cricket", rating: 4.7 },
  { id: 4, name: "Jordan Lee", avatar: "", sport: "Tennis", rating: 4.6 },
  { id: 5, name: "Casey Smith", avatar: "", sport: "Basketball", rating: 4.5 },
  { id: 6, name: "Riley Brown", avatar: "", sport: "Volleyball", rating: 4.4 }
];

const FriendsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<typeof friends[0] | null>(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

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
        <CardTitle>Friends</CardTitle>
        <div className="pt-2">
          <Input
            placeholder="Search friends..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-3">
            {filteredFriends.map((friend) => (
              <div key={friend.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={friend.avatar} alt={friend.name} />
                    <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{friend.name}</h3>
                    <div className="flex items-center text-xs text-gray-500">
                      <span>{friend.sport}</span>
                      <span className="mx-2">•</span>
                      <span>{friend.rating} ★</span>
                    </div>
                  </div>
                </div>
                <Button size="sm" onClick={() => handleRateFriend(friend)}>
                  Rate
                </Button>
              </div>
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

export default FriendsList;