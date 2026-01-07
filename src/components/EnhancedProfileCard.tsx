"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  MapPin, 
  Trophy, 
  Edit3, 
  Camera, 
  User, 
  Mail, 
  Phone,
  Star
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock user data
const userData = {
  name: "Alex Johnson",
  avatar: "",
  coverImage: "",
  location: "New York, NY",
  email: "alex.johnson@example.com",
  phone: "+1 (555) 123-4567",
  memberSince: "2023",
  favoriteSports: ["Badminton", "Tennis", "Cricket"],
  gamesPlayed: 42,
  eventsAttended: 18,
  overallRating: 4.8,
  bio: "Passionate badminton player and tennis enthusiast. Love organizing weekend matches and meeting new players!",
  availability: {
    monday: ["18:00-20:00"],
    wednesday: ["17:00-19:00"],
    saturday: ["10:00-12:00", "15:00-17:00"]
  },
  achievements: [
    { id: 1, title: "First Game", date: "Jan 5, 2023" },
    { id: 2, title: "Social Butterfly", date: "Mar 12, 2023" },
    { id: 3, title: "Weekend Warrior", date: "Jun 20, 2023" }
  ]
};

const EnhancedProfileCard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(userData);
  const [name, setName] = useState(profileData.name);
  const [bio, setBio] = useState(profileData.bio);
  const [location, setLocation] = useState(profileData.location);
  const [email, setEmail] = useState(profileData.email);
  const [phone, setPhone] = useState(profileData.phone);

  const handleSave = () => {
    setProfileData({
      ...profileData,
      name,
      bio,
      location,
      email,
      phone
    });
    setIsEditing(false);
  };

  return (
    <Card className="w-full">
      <div className="relative">
        {profileData.coverImage ? (
          <img 
            src={profileData.coverImage} 
            alt="Cover" 
            className="w-full h-32 object-cover rounded-t-lg"
          />
        ) : (
          <div className="w-full h-32 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-t-lg" />
        )}
        <Button 
          size="icon" 
          variant="secondary" 
          className="absolute top-2 right-2"
          onClick={() => setIsEditing(true)}
        >
          <Edit3 className="h-4 w-4" />
        </Button>
      </div>
      
      <CardHeader className="relative -mt-16 pt-0">
        <div className="flex flex-col items-center">
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-white">
              <AvatarImage src={profileData.avatar} alt={profileData.name} />
              <AvatarFallback className="text-2xl">{profileData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button 
              size="icon" 
              variant="secondary" 
              className="absolute bottom-0 right-0 rounded-full h-8 w-8"
            >
              <Camera className="h-3 w-3" />
            </Button>
          </div>
          
          <CardTitle className="text-xl mt-2">{profileData.name}</CardTitle>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            {profileData.location}
          </div>
          <div className="flex items-center mt-1">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
            <span className="text-sm font-medium">{profileData.overallRating}</span>
            <span className="text-sm text-gray-500 ml-1">({profileData.gamesPlayed} games)</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className="text-gray-600 text-sm">{profileData.bio}</p>
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 bg-gray-50 rounded-lg">
            <div className="font-bold">{profileData.gamesPlayed}</div>
            <div className="text-xs text-gray-500">Games</div>
          </div>
          <div className="p-2 bg-gray-50 rounded-lg">
            <div className="font-bold">{profileData.eventsAttended}</div>
            <div className="text-xs text-gray-500">Events</div>
          </div>
          <div className="p-2 bg-gray-50 rounded-lg">
            <div className="font-bold">{profileData.overallRating}</div>
            <div className="text-xs text-gray-500">Rating</div>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Favorite Sports</h4>
          <div className="flex flex-wrap gap-2">
            {profileData.favoriteSports.map((sport, index) => (
              <Badge key={index} variant="secondary">
                {sport}
              </Badge>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Availability</h4>
          <div className="space-y-1">
            {Object.entries(profileData.availability).map(([day, slots]) => (
              <div key={day} className="flex justify-between text-sm">
                <span className="capitalize">{day}:</span>
                <span className="text-gray-600">{slots.join(", ")}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Contact Info</h4>
          <div className="space-y-1 text-sm">
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-gray-500" />
              <span>{profileData.email}</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-gray-500" />
              <span>{profileData.phone}</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex flex-col items-center">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profileData.avatar} alt={profileData.name} />
                <AvatarFallback className="text-xl">{profileData.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <Button variant="link" size="sm" className="mt-2">
                Change Photo
              </Button>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself..."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="skill">Primary Sport</Label>
              <Select defaultValue="Badminton">
                <SelectTrigger>
                  <SelectValue />
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
            
            <div className="flex space-x-2">
              <Button onClick={handleSave} className="flex-1">
                Save Changes
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default EnhancedProfileCard;