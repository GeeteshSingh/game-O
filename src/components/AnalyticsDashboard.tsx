"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { Calendar, Users, Trophy, Activity } from 'lucide-react';

// Mock data
const activityData = [
  { name: 'Jan', games: 4, hours: 12 },
  { name: 'Feb', games: 6, hours: 18 },
  { name: 'Mar', games: 8, hours: 24 },
  { name: 'Apr', games: 5, hours: 15 },
  { name: 'May', games: 7, hours: 21 },
  { name: 'Jun', games: 9, hours: 27 },
];

const sportData = [
  { name: 'Badminton', value: 42 },
  { name: 'Football', value: 28 },
  { name: 'Tennis', value: 18 },
  { name: 'Cricket', value: 12 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const monthlyData = [
  { month: 'Jan', count: 42 },
  { month: 'Feb', count: 38 },
  { month: 'Mar', count: 52 },
  { month: 'Apr', count: 48 },
  { month: 'May', count: 61 },
  { month: 'Jun', count: 55 },
];

const AnalyticsDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 mr-4">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Friends</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 mr-4">
                <Trophy className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Games Played</p>
                <p className="text-2xl font-bold">42</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 mr-4">
                <Calendar className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Events</p>
                <p className="text-2xl font-bold">18</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-orange-100 mr-4">
                <Activity className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Activity</p>
                <p className="text-2xl font-bold">128</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="games" fill="#3b82f6" name="Games" />
                  <Bar dataKey="hours" fill="#10b981" name="Hours" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Sport Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sportData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {sportData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Activity Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#8884d8" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;