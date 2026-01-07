# SportConnect Production Setup Guide

## Overview
This guide details how to deploy SportConnect to a production environment with real authentication, database integration, and analytics.

## Prerequisites
1. Supabase account (for authentication and database)
2. Strava Developer Account (for OAuth integration)
3. Domain name (optional but recommended)
4. Hosting platform (Vercel, Netlify, or similar)

## 1. Supabase Setup

### Create Supabase Project
1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Create a new project
3. Note your Project URL and API keys (anon and service_role)

### Authentication Setup
Enable Email/Password authentication:
1. In Supabase Dashboard, go to Authentication → Settings
2. Enable "Email Confirmations" if desired
3. Configure redirect URLs for your domain

### Database Schema
Create the necessary tables in Supabase SQL Editor:

<dyad-execute-sql description="Create profiles table with RLS">
-- Create profiles table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Profiles are viewable by authenticated users"
  ON public.profiles FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id);
</dyad-execute-sql>

<dyad-execute-sql description="Create games table with RLS">
-- Create games table
CREATE TABLE public.games (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  sport TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  location TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  description TEXT,
  max_players INTEGER,
  skill_level TEXT,
  creator_id UUID REFERENCES auth.users NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Games are viewable by authenticated users"
  ON public.games FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "Users can create games"
  ON public.games FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Users can update their own games"
  ON public.games FOR UPDATE
  TO authenticated USING (auth.uid() = creator_id);

CREATE POLICY "Users can delete their own games"
  ON public.games FOR DELETE
  TO authenticated USING (auth.uid() = creator_id);
</dyad-execute-sql>

<dyad-execute-sql description="Create friends table with RLS">
-- Create friends table
CREATE TABLE public.friends (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  friend_id UUID REFERENCES auth.users NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, friend_id)
);

-- Enable RLS
ALTER TABLE public.friends ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their friendships"
  ON public.friends FOR SELECT
  TO authenticated USING (auth.uid() = user_id OR auth.uid() = friend_id);

CREATE POLICY "Users can create friend requests"
  ON public.friends FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their friendships"
  ON public.friends FOR UPDATE
  TO authenticated USING (auth.uid() = user_id OR auth.uid() = friend_id);

CREATE POLICY "Users can delete their friendships"
  ON public.friends FOR DELETE
  TO authenticated USING (auth.uid() = user_id OR auth.uid() = friend_id);
</dyad-execute-sql>

<dyad-execute-sql description="Create game_participants table with RLS">
-- Create game_participants table
CREATE TABLE public.game_participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  game_id UUID REFERENCES public.games NOT NULL,
  user_id UUID REFERENCES auth.users NOT NULL,
  status TEXT DEFAULT 'going',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(game_id, user_id)
);

-- Enable RLS
ALTER TABLE public.game_participants ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Participants are viewable by authenticated users"
  ON public.game_participants FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "Users can join games"
  ON public.game_participants FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their participation"
  ON public.game_participants FOR UPDATE
  TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can leave games"
  ON public.game_participants FOR DELETE
  TO authenticated USING (auth.uid() = user_id);
</dyad-execute-sql>

<dyad-execute-sql description="Create activity_feed table with RLS">
-- Create activity_feed table
CREATE TABLE public.activity_feed (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  activity_type TEXT NOT NULL,
  activity_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.activity_feed ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Activities are viewable by authenticated users"
  ON public.activity_feed FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "Users can create activities"
  ON public.activity_feed FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
</dyad-execute-sql>

## 2. Strava Integration

### Register Your Application
1. Go to [Strava API Settings](https://www.strav.com/settings/api)
2. Create a new application
3. Set the Authorization Callback Domain to your domain
4. Note your Client ID and Client Secret

### Environment Variables
Create a `.env.production` file with:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_STRAVA_CLIENT_ID=your_strava_client_id
VITE_STRAVA_REDIRECT_URI=your_domain/api/strava/callback
```

## 3. Supabase Client Configuration

<dyad-write path="src/integrations/supabase/client.ts" description="Creating Supabase client configuration">
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)