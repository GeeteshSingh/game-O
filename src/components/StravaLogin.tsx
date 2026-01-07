import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { useAuth } from '@/components/AuthProvider';

const StravaLogin = () => {
  const { signInWithStrava } = useAuth();

  const handleStravaLogin = () => {
    signInWithStrava();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Icons.strava className="h-6 w-6 text-orange-500" />
          Connect with Strava
        </CardTitle>
        <CardDescription>
          Link your Strava account to import your activities and track your sports performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleStravaLogin} className="w-full bg-orange-500 hover:bg-orange-600 text-white">
          <Icons.strava className="mr-2 h-4 w-4" />
          Connect Strava Account
        </Button>
      </CardContent>
    </Card>
  );
};

export default StravaLogin;