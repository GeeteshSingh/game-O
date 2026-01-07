"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MadeWithDyad } from "@/components/made-with-dyad";
import StravaLogin from "@/components/StravaLogin";

const Index = () => {
  const [stravaConnected, setStravaConnected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isConnected = localStorage.getItem('stravaConnected') === 'true';
    setStravaConnected(isConnected);
    
    if (isConnected) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('stravaConnected');
    setStravaConnected(false);
  };

  if (!stravaConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <StravaLogin />
        </motion.div>
        <MadeWithDyad />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center py-6 mb-6"
        >
          <h1 className="text-3xl font-bold text-gray-900">SportConnect</h1>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Disconnect Strava
          </button>
        </motion.header>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to SportConnect</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with friends, schedule games, and track your sports activities - all in one place.
          </p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        </motion.div>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;