"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Paperclip, Smile, MoreVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data for conversations
const mockConversations = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "",
    lastMessage: "See you at the courts tomorrow!",
    timestamp: "10:30 AM",
    unread: 0,
    online: true
  },
  {
    id: 2,
    name: "Sam Wilson",
    avatar: "",
    lastMessage: "I've booked the court for Saturday",
    timestamp: "Yesterday",
    unread: 3,
    online: false
  },
  {
    id: 3,
    name: "Taylor Kim",
    avatar: "",
    lastMessage: "Great game yesterday!",
    timestamp: "2 days ago",
    unread: 0,
    online: false
  }
];

// Mock data for messages
const mockMessages = [
  {
    id: 1,
    conversationId: 1,
    sender: "Alex Johnson",
    content: "Hey, are we still on for badminton tomorrow?",
    timestamp: "10:25 AM",
    isOwn: false
  },
  {
    id: 2,
    conversationId: 1,
    sender: "You",
    content: "Yes, 6 PM at Central Park Courts",
    timestamp: "10:26 AM",
    isOwn: true
  },
  {
    id: 3,
    conversationId: 1,
    sender: "Alex Johnson",
    content: "Perfect! See you there",
    timestamp: "10:30 AM",
    isOwn: false
  }
];

const MessagingSystem = () => {
  const [conversations, setConversations] = useState(mockConversations);
  const [activeConversation, setActiveConversation] = useState(mockConversations[0]);
  const [messages, setMessages] = useState(mockMessages.filter(m => m.conversationId === 1));
  const [newMessage, setNewMessage] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSelectConversation = (conversation: typeof mockConversations[0]) => {
    setActiveConversation(conversation);
    setMessages(mockMessages.filter(m => m.conversationId === conversation.id));
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    
    const message = {
      id: messages.length + 1,
      conversationId: activeConversation.id,
      sender: "You",
      content: newMessage,
      timestamp: "Just now",
      isOwn: true
    };
    
    setMessages([...messages, message]);
    setNewMessage("");
    
    // Update conversation last message
    setConversations(prev => 
      prev.map(conv => 
        conv.id === activeConversation.id 
          ? { ...conv, lastMessage: newMessage, timestamp: "Just now" } 
          : conv
      )
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="w-full h-[600px] flex">
      {/* Conversations sidebar */}
      <div className="w-1/3 border-r">
        <CardHeader className="border-b">
          <CardTitle>Messages</CardTitle>
        </CardHeader>
        <ScrollArea className="h-[calc(100%-60px)]">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`flex items-center p-4 border-b cursor-pointer hover:bg-gray-50 ${
                activeConversation.id === conversation.id ? "bg-blue-50" : ""
              }`}
              onClick={() => handleSelectConversation(conversation)}
            >
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={conversation.avatar} alt={conversation.name} />
                  <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {conversation.online && (
                  <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <div className="flex justify-between">
                  <h3 className="font-medium truncate">{conversation.name}</h3>
                  <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                  {conversation.unread > 0 && (
                    <span className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {conversation.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        <CardHeader className="border-b flex flex-row items-center justify-between">
          <div className="flex items-center">
            <Avatar className="h-10 w-10">
              <AvatarImage src={activeConversation.avatar} alt={activeConversation.name} />
              <AvatarFallback>{activeConversation.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <h3 className="font-medium">{activeConversation.name}</h3>
              <p className="text-xs text-gray-500">
                {activeConversation.online ? "Online" : "Offline"}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </CardHeader>

        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.isOwn
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-gray-200 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    <p>{message.content}</p>
                    <div
                      className={`text-xs mt-1 ${
                        message.isOwn ? "text-blue-100" : "text-gray-500"
                      }`}
                    >
                      {message.timestamp}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </ScrollArea>

        <CardContent className="border-t p-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Smile className="h-5 w-5" />
            </Button>
            <Input
              placeholder="Type a message..."
              className="flex-1 mx-2"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <Button size="icon" onClick={handleSendMessage} disabled={!newMessage.trim()}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default MessagingSystem;