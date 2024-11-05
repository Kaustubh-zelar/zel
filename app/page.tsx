'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BellRing, Calendar, GraduationCap, CheckSquare } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// Define types
type Theme = {
  primary: string;
  secondary: string;
  background: string;
  text: string;
};

type Icon = {
  id: number; // Removed 'src' property
};

type CardColors = {
  announcements: string;
  birthdays: string;
  trainings: string;
  tasks: string;
  poll: string;
  news: string;
};

const defaultColors: CardColors = {
  announcements: '#22d3ee',
  birthdays: '#1f2937',
  trainings: '#a855f7',
  tasks: '#ec4899',
  poll: '#34d399',
  news: '#fb923c',
};

export default function Dashboard() {
  const [theme, setTheme] = useState<Theme>({
    primary: '#9333ea',
    secondary: '#3b82f6',
    background: '#f3f4f6',
    text: '#1f2937',
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [icons, setIcons] = useState<Icon[]>([]); // Initialize with empty array
  const [uploadedImage, setUploadedImage] = useState<string>(''); // For uploaded image
  const [cardColors, setCardColors] = useState<CardColors>(defaultColors);

  useEffect(() => {
    // Load theme, icons, and colors from localStorage on component mount
    const savedTheme = localStorage.getItem('theme');
    const savedIcons = localStorage.getItem('selectedImages'); // Updated to match key from admin
    const savedColors = localStorage.getItem('cardColors');

    if (savedTheme) {
      setTheme(JSON.parse(savedTheme));
    }
    if (savedIcons) {
      setIcons(JSON.parse(savedIcons).map((_: any, index: number) => ({ id: index + 1 }))); // Set ids for icons
    } else {
      // If no icons are saved, set default icons
      const defaultIcons = [1, 2, 3, 4];
      setIcons(defaultIcons.map(id => ({ id }))); // Retrieve default icon ids
      localStorage.setItem('selectedImages', JSON.stringify(defaultIcons));
    }

    if (savedColors) {
      try {
        const parsedColors = JSON.parse(savedColors);
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

    // Load uploaded image from localStorage
    const savedImage = localStorage.getItem('selectedImage');
    if (savedImage) {
      setUploadedImage(savedImage);
    }

    // Check system preference for dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }

    // Handle storage change for colors and icons
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cardColors' && e.newValue) {
        try {
          const newColors = JSON.parse(e.newValue);
          setCardColors(newColors);
        } catch (error) {
          console.error('Error parsing color settings:', error);
        }
      }
      if (e.key === 'selectedImages' && e.newValue) {
        try {
          const newIcons = JSON.parse(e.newValue);
          setIcons(newIcons.map((_: any, index: number) => ({ id: index + 1 }))); // Convert to { id } format
        } catch (error) {
          console.error('Error parsing icon settings:', error);
        }
      }
      if (e.key === 'selectedImage' && e.newValue) {
        setUploadedImage(e.newValue); // Update uploaded image
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    setTheme((prevTheme) => ({
      ...prevTheme,
      background: isDarkMode ? '#f3f4f6' : '#1f2937',
      text: isDarkMode ? '#1f2937' : '#f3f4f6',
    }));
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      {/* Header */}
      <header className={`p-4 flex ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-purple-600 text-white'}`}>
        <div className="container mx-auto">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold">BlockyAdmin</h1>

            <ul className="flex space-x-4">
              <Button onClick={toggleDarkMode} className="flex">
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </Button>
              {uploadedImage ? (
                <li>

                  <img src={uploadedImage} alt="Uploaded Icon" className="w-12 h-12" />

                </li>
              ) : (
                icons.map((icon) => (
                  <li key={icon.id}>
                    {/* {icon.src ? <img src={icon.src} alt={`Icon ${icon.id}`} className="w-12 h-12" /> : null} */}
                  </li>
                ))
              )}
            </ul>
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              <li>Intranet</li>
              <li>Human Resources</li>
              <li>Learning/Management</li>
              <li>Projects/Clients</li>
              <li>Administration</li>
              <li>Edit</li>
            </ul>
          </nav>
        </div>
      </header>
      {/* Secondary Navigation */}
      <nav className="bg-blue-500 text-white p-2 overflow-x-auto">
        <div className="container mx-auto">
          <ul className="flex space-x-4 whitespace-nowrap">
            <li>New</li>
            <li>Page details</li>
            <li>Analytics</li>
          </ul>
        </div>
      </nav>
      <main className="container mx-auto p-4">

        <div className="grid grid-cols-[3fr_1fr] gap-4">
          <Card className="p-2 bg-black mb-4 border-0">
            <Carousel>
              <CarouselContent>
                <CarouselItem>
                  <div className="bg-blue-400 rounded-lg p-6 mb-6">
                    <h2 className="text-white text-xl mb-4">Vision & Mission</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <h3 className="font-bold mb-2">Our Vision</h3>
                          <p>Vision content goes here...</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <h3 className="font-bold mb-2">Our Mission</h3>
                          <p>Mission content goes here...</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <p className="text-white p-4">NEXT ITEM</p>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="ml-12" />
              <CarouselNext className="mr-12" />
            </Carousel>
          </Card>
          <div className="grid grid-rows-1 gap-4">
            <ul></ul>
          </div>
        </div>
        {/* Four Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 height-50rem border-0">
          <Card className="text-white border" style={{ backgroundColor: cardColors.announcements }}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BellRing className="mr-2" />
                Announcements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>June - 2023</p>
              <ul className="m-2 flex-col">
                <li className="opacity-50 p-1"><Card className="color-white-400 p-3">Welcome to Blockyadmin Intranet Portal!</Card></li>
                <li className="opacity-50 p-1"><Card className="color-white-400 p-3">Bring Id card as part of security at Zelarsoft</Card></li>
                <li className="opacity-50 p-1"><Card className="color-white-400 p-3">Testing Intranet portal</Card></li>
              </ul>
            </CardContent>
          </Card>

          <Card className="text-white  border-0" style={{ backgroundColor: cardColors.birthdays }}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2" />
                Birthdays
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Next Birthday...</p>
            </CardContent>
          </Card>

          <Card className="text-white  border-0" style={{ backgroundColor: cardColors.trainings }}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <GraduationCap className="mr-2" />
                Trainings
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Training content */}
            </CardContent>
          </Card>

          <Card className="text-white  border-0" style={{ backgroundColor: cardColors.tasks }}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckSquare className="mr-2" />
                Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Intranet Portal Theme</p>
              <p>Tasks Title</p>
            </CardContent>
          </Card>
        </div>


        {/* Bottom Two Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="text-white  border-0" style={{ backgroundColor: cardColors.poll }}>
            <CardHeader>
              <CardTitle>Opinion Poll</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Who's the CEO of Zelarsoft?</p>
              <div className="space-y-2 mt-2 flex flex-col flex-start">
                <Button className="bg-opacity-20 hover:bg-opacity-30 bg-white">VenkatMaganti</Button>
                <Button className="bg-opacity-20 hover:bg-opacity-30 bg-white">eGlass</Button>
                <Button className="bg-opacity-20 hover:bg-opacity-30 bg-white">VenkatPotluri</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="text-white border-0" style={{ backgroundColor: cardColors.news }}>
            <CardHeader>
              <CardTitle>News</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Another great news! Zela will be engaging solar buffers in their organization</p>
              <p className="mt-2">Zelarx, Avant Group, Bhavi Anish sign agreement to merge operations in 12 weeks</p>
              <Button className="mt-4 bg-white text-orange-400">View All</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}