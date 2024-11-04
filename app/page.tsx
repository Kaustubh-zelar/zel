'use client'

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { BellRing, Calendar, GraduationCap, CheckSquare, Sun, Moon } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

// Define types
type Theme = {
  primary: string
  secondary: string
  background: string
  text: string
}

type Icon = {
  id: number
  src: string
}

type CardColors = {
  announcements: string
  birthdays: string
  trainings: string
  tasks: string
  poll: string
  news: string
}

const defaultColors: CardColors = {
  announcements: '#22d3ee', // cyan-400
  birthdays: '#1f2937',     // gray-800
  trainings: '#a855f7',     // purple-500
  tasks: '#ec4899',         // pink-500
  poll: '#34d399',          // emerald-400
  news: '#fb923c'           // orange-400
};

export default function Dashboard() {
  const [theme, setTheme] = useState<Theme>({
    primary: '#9333ea',
    secondary: '#3b82f6',
    background: '#f3f4f6',
    text: '#1f2937',
  })
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [icons, setIcons] = useState<Icon[]>([])
  const [cardColors, setCardColors] = useState<CardColors>(defaultColors)

  useEffect(() => {
    // Load theme and icons from localStorage on component mount
    const savedTheme = localStorage.getItem('theme')
    const savedIcons = localStorage.getItem('icons')
    const savedColors = localStorage.getItem('cardColors')
    
    if (savedTheme) {
      setTheme(JSON.parse(savedTheme))
    }
    if (savedIcons) {
      setIcons(JSON.parse(savedIcons))
    }
    if (savedColors) {
      try {
        const parsedColors = JSON.parse(savedColors)
        const isValid = Object.keys(defaultColors).every(
          key => typeof parsedColors[key] === 'string'
        )
        if (isValid) {
          setCardColors(parsedColors)
        }
      } catch (e) {
        console.error('Error loading saved colors:', e)
      }
    }

    // Check system preference for dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true)
    }

    // Add event listener for color changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cardColors' && e.newValue) {
        try {
          const newColors = JSON.parse(e.newValue)
          setCardColors(newColors)
        } catch (error) {
          console.error('Error parsing color settings:', error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (!isDarkMode) {
      setTheme({
        primary: '#9333ea',
        secondary: '#3b82f6',
        background: '#1f2937',
        text: '#f3f4f6',
      })
    } else {
      setTheme({
        primary: '#9333ea',
        secondary: '#3b82f6',
        background: '#f3f4f6',
        text: '#1f2937',
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
    {/* Header */}
    <header className="bg-purple-600 text-white p-4 flex">
      <div className="container mx-auto">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Zelar</h1>
          <ul className="flex space-x-4">
            <li>icon</li>
            <li>icon</li>
            <li>icon</li>
            <li>icon</li>
          </ul>
           </div>
          {/* <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu />
          </button> */}
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              <li>Zelarsoft Intranet</li>
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
      <div className="grid  grid-cols-[3fr_1fr] gap-4">
      <Card className="p-2 bg-black">
        <Carousel className="">
          <CarouselContent >
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
            <CarouselItem className=" color-white  ">
              <p className="text-white p-4">NEXT ITEM</p>
              </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="ml-12 "/>
            <CarouselNext  className="mr-12" />
          </Carousel>
          </Card>
      <div className=" grid  grid-rows-1 gap-4"><ul>
          <li>icon</li>
          <li>icon</li>
          <li>icon</li>
          <li>icon</li>
          <li>icon</li> 
        </ul></div>
        </div>
        {/* Four Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 height-50rem">
          <Card className="text-white" style={{ backgroundColor: cardColors.announcements }}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BellRing className="mr-2" />
                Announcements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>June - 2023</p>
              <ul className="m-2 flex-col">
                <li className="opacity-50 p-1"><Card className="color-white-400 p-3">Welcome to Zelarsoft Intranet Portal!</Card></li>
                <li className="opacity-50 p-1"><Card className="color-white-400 p-3">Bring Id card as part of security at Zelarsoft</Card></li>
                <li className="opacity-50 p-1"><Card className="color-white-400 p-3">Testing Intranet portal</Card></li>
              </ul>
            </CardContent>
          </Card>

          <Card className="text-white" style={{ backgroundColor: cardColors.birthdays }}>
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

          <Card className="text-white" style={{ backgroundColor: cardColors.trainings }}>
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

          <Card className="text-white" style={{ backgroundColor: cardColors.tasks }}>
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
          <Card className="text-white" style={{ backgroundColor: cardColors.poll}}>
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

          <Card className="text-white" style={{ backgroundColor: cardColors.news }}>
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