'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { BellRing, Calendar, GraduationCap, CheckSquare } from 'lucide-react';

// Define types for better type safety
type CardColors = {
  announcements: string;
  birthdays: string;
  trainings: string;
  tasks: string;
  poll: string;
  news: string;
};

const defaultColors: CardColors = {
  announcements: '#22d3ee', // cyan-400
  birthdays: '#1f2937',     // gray-800
  trainings: '#a855f7',     // purple-500
  tasks: '#ec4899',         // pink-500
  poll: '#34d399',          // emerald-400
  news: '#fb923c'           // orange-400
};

const AdminColorSettings = () => {
  const [cardColors, setCardColors] = useState<CardColors>(defaultColors);

  useEffect(() => {
    // Load saved colors from localStorage
    const savedColors = localStorage.getItem('cardColors');
    if (savedColors) {
      try {
        const parsedColors = JSON.parse(savedColors);
        // Validate that all required colors exist
        const isValid = Object.keys(defaultColors).every(
          key => typeof parsedColors[key] === 'string'
        );
        if (isValid) {
          setCardColors(parsedColors);
        }
      } catch (e) {
        console.error('Error loading saved colors:', e);
      }
    }
  }, []);

  const handleColorChange = (cardKey: keyof CardColors, color: string) => {
    setCardColors(prev => {
      const newColors = { ...prev, [cardKey]: color };
      localStorage.setItem('cardColors', JSON.stringify(newColors));
      return newColors;
    });
  };

  const resetColors = () => {
    setCardColors(defaultColors);
    localStorage.setItem('cardColors', JSON.stringify(defaultColors));
  };

  const ColorCard = ({ 
    title, 
    colorKey, 
    icon: Icon 
  }: { 
    title: string; 
    colorKey: keyof CardColors; 
    icon?: React.ComponentType<{ className: string }> 
  }) => (
    <Card className="p-4">
      <div className="mb-4">
        <Label className="text-lg font-semibold flex items-center">
          {Icon && <Icon className="mr-2 h-5 w-5" />}
          {title}
        </Label>
        <div className="mt-2 flex items-center gap-4">
          <input
            type="color"
            value={cardColors[colorKey] || defaultColors[colorKey]}
            onChange={(e) => handleColorChange(colorKey, e.target.value)}
            className="w-20 h-10"
          />
          <Card 
            className="flex-1 h-20 flex items-center justify-center text-white"
            style={{ backgroundColor: cardColors[colorKey] || defaultColors[colorKey] }}
          >
            Preview
          </Card>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Card Color Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="flex justify-end">
                <Button 
                  onClick={resetColors}
                  variant="outline"
                  className="mb-4"
                >
                  Reset to Default Colors
                </Button>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ColorCard 
                  title="Announcements Card" 
                  colorKey="announcements" 
                  
                />
                <ColorCard 
                  title="Birthdays Card" 
                  colorKey="birthdays" 
                  
                />
                <ColorCard 
                  title="Trainings Card" 
                  colorKey="trainings" 
                  
                />
                <ColorCard 
                  title="Tasks Card" 
                  colorKey="tasks" 
                  
                />
                <ColorCard 
                  title="Opinion Poll Card" 
                  colorKey="poll" 
                />
                <ColorCard 
                  title="News Card" 
                  colorKey="news" 
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminColorSettings;