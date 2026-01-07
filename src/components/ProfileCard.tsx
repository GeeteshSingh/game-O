"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Trophy } from 'lucide-react';

const ProfileCard = () => {
  // In a real app, this would come from user data
  const user = {
    name: "Alex Johnson",
    avatar: "",
    location: "New York, NY",
    memberSince: "2023",
    favoriteSports: ["Badminton", "Tennis", "Cricket"],
    gamesPlayed: 42,
    eventsAttended: 18
  };

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <Avatar className="h-20 w-20 mx-auto mb-4">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <CardTitle className="text-xl">{user.name}</CardTitle>
        <div className="flex items-center justify-center text-sm text-gray-500 mt-1">
          <MapPin className="h-4 w-4 mr-1" />
          {user.location}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Member since</span>
            <span className="font-medium">{user.memberSince}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Games Played</span>
            <span className="font-medium">{user.gamesPlayed}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Events Attended</span>
            <span className="font-medium">{user.eventsAttended}</span>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Favorite Sports</h4>
            <div className="flex flex-wrap gap-2">
              {user.favoriteSports.map((sport, index) => (
                <Badge key={index} variant="secondary">
                  {sport}
                </Badge>
              ))}
            </div>
          </div>
          
          <Button className="w-full" variant="outline">
            Edit Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;