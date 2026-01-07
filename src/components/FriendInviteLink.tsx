"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Share2, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FriendInviteLink = () => {
  const { toast } = useToast();
  const [inviteLink, setInviteLink] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateInviteLink = () => {
    setIsGenerating(true);
    
    // In a real app, this would call an API to generate a unique invite link
    // For demo purposes, we'll create a mock link
    setTimeout(() => {
      const mockUserId = 'user_' + Math.random().toString(36).substr(2, 9);
      const link = `${window.location.origin}/invite/${mockUserId}`;
      setInviteLink(link);
      setIsGenerating(false);
      
      toast({
        title: "Invite link generated",
        description: "Share this link with friends to invite them to SportConnect",
      });
    }, 500);
  };

  const copyToClipboard = () => {
    if (inviteLink) {
      navigator.clipboard.writeText(inviteLink);
      toast({
        title: "Link copied",
        description: "Invite link copied to clipboard",
      });
    }
  };

  const shareLink = async () => {
    if (inviteLink) {
      try {
        if (navigator.share) {
          await navigator.share({
            title: 'Join me on SportConnect',
            text: 'Connect with me on SportConnect to play sports together!',
            url: inviteLink,
          });
        } else {
          copyToClipboard();
        }
      } catch (error) {
        console.error('Error sharing:', error);
        copyToClipboard();
      }
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          Invite Friends
        </CardTitle>
        <CardDescription>
          Generate a link to invite friends to join SportConnect and connect with you
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!inviteLink ? (
          <Button 
            onClick={generateInviteLink} 
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? 'Generating Link...' : 'Generate Invite Link'}
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input 
                value={inviteLink} 
                readOnly 
                className="flex-1"
              />
              <Button 
                onClick={copyToClipboard}
                variant="outline"
                size="icon"
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button 
                onClick={shareLink}
                variant="outline"
                size="icon"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="text-sm text-gray-500">
              <p className="font-medium">How it works:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Share this link with friends</li>
                <li>When they join, they'll automatically connect with you</li>
                <li>You can start playing sports together right away</li>
              </ul>
            </div>
            
            <Button 
              onClick={() => setInviteLink('')}
              variant="outline"
              className="w-full"
            >
              Generate New Link
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FriendInviteLink;