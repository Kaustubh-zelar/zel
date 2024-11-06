'use client';

import { useState, useEffect } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BellRing, Calendar, GraduationCap, CheckSquare } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// Define types
// type Theme = {
//   primary: string;
//   secondary: string;
//   background: string;
//   text: string;
// };

type Icon = {
  id: number;
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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [icons, setIcons] = useState<Icon[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string>('');
  const [cardColors, setCardColors] = useState<CardColors>(defaultColors);

  // Toggle dark/light mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('isDarkMode', JSON.stringify(newMode));
  };

  useEffect(() => {
    // Retrieve saved theme from localStorage
    const savedTheme = localStorage.getItem('isDarkMode');
    if (savedTheme) {
      setIsDarkMode(JSON.parse(savedTheme));
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }

    // Listen for system theme changes
    const themeChangeHandler = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', themeChangeHandler);

    return () => mediaQuery.removeEventListener('change', themeChangeHandler);
  }, []);

  useEffect(() => {
    const savedIcons = localStorage.getItem('selectedImages');
    const savedColors = localStorage.getItem('cardColors');

    if (savedIcons) {
      setIcons(JSON.parse(savedIcons).map((_: unknown, index: number) => ({ id: index + 1 })));
    } else {
      const defaultIcons = [1, 2, 3, 4];
      setIcons(defaultIcons.map(id => ({ id })));
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

    const savedImage = localStorage.getItem('selectedImage');
    if (savedImage) {
      setUploadedImage(savedImage);
    }
  }, []);
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      {/* Header */}
      <header className={`p-4 flex ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-purple-600 text-white'}`}>
        <div className="container mx-auto">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold">BlockyAdmin</h1>

            <ul className="flex space-x-4">
              <button
                onClick={toggleDarkMode}
                className=" px-4 radius-md bg-black dark:bg-white-500 "
              >
                {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              </button>
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
                <li className="opacity-50 p-1"><Card className="color-white-400 p-3">Welcome to BlockyIntranet Portal!</Card></li>
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
              <p>Vote for your favorite team</p>
              <div className="space-y-2 mt-2 flex flex-col flex-start">
                <Button className="bg-opacity-20 hover:bg-opacity-30 bg-white">Manchester</Button>
                <Button className="bg-opacity-20 hover:bg-opacity-30 bg-white">Liverpool</Button>
                <Button className="bg-opacity-20 hover:bg-opacity-30 bg-white">Chelsea</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="text-white border-0" style={{ backgroundColor: cardColors.news }}>
            <CardHeader>
              <CardTitle>News</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, qui.</p>
              <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, rerum!</p>
              <Button className="mt-4 bg-white text-orange-400">View All</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}