import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, MapPin, Briefcase, Mail } from 'lucide-react'

interface Event {
  name: string;
  date: string;
}

interface User {
  name: string;
  role: string;
  email: string;
  avatar: string;
  location: string;
  joinDate: string;
  eventsOrganized: number;
  hoursVolunteered: number;
  impactScore: number;
  upcomingEvents: Event[];
}

export default function UserProfile() {
  // In a real application, this data would be fetched from an API
  const user: User = {
    name: "Alice Johnson",
    role: "Editor",
    email: "alice.johnson@example.com",
    avatar: "/placeholder.svg?height=128&width=128",
    location: "New York, NY",
    joinDate: "January 2023",
    eventsOrganized: 15,
    hoursVolunteered: 120,
    impactScore: 85,
    upcomingEvents: [
      { name: "Community Clean-up", date: "2023-07-15" },
      { name: "Youth Mentorship Workshop", date: "2023-07-22" },
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary/5 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <Avatar className="h-32 w-32 border-4 border-background">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left space-y-2">
              <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
              <p className="text-lg text-muted-foreground">{user.role}</p>
              <Button className="mt-2">Contact Alice</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">User Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{user.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Briefcase className="h-4 w-4" />
                <span>{user.role}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <CalendarDays className="h-4 w-4" />
                <span>Joined {user.joinDate}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Upcoming Events</h2>
            <ul className="space-y-2">
              {user.upcomingEvents.map((event, index) => (
                <li key={index} className="flex justify-between items-center text-sm p-2 bg-primary/5 rounded-md">
                  <span className="text-foreground">{event.name}</span>
                  <span className="text-primary">{new Date(event.date).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Activity Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: "Events Organized", value: user.eventsOrganized },
              { title: "Hours Volunteered", value: user.hoursVolunteered },
              { title: "Impact Score", value: user.impactScore }
            ].map((item, index) => (
              <div key={index} className="bg-primary/5 p-6 rounded-lg text-center">
                <p className="text-lg font-medium text-foreground">{item.title}</p>
                <p className="text-3xl font-bold text-primary mt-2">{item.value}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}