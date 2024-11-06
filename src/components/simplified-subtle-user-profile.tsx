'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CalendarDays, MapPin, Briefcase, Mail } from 'lucide-react'

export function SimplifiedSubtleUserProfile() {
  // In a real application, this data would be fetched from an API
  const user = {
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
    <div className="container mx-auto p-6 max-w-2xl">
      <Card className="w-full bg-background/50 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
            <Avatar className="h-24 w-24 border-2 border-background">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left space-y-1">
              <CardTitle className="text-2xl font-semibold text-foreground/90">{user.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{user.role}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
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

          <div className="space-y-2">
            <h3 className="text-lg font-medium text-foreground/80">Upcoming Events</h3>
            <ul className="space-y-2">
              {user.upcomingEvents.map((event, index) => (
                <li key={index} className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">{event.name}</span>
                  <span className="text-primary">{new Date(event.date).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-border/50">
            <h3 className="text-lg font-medium text-foreground/80 mb-4">Activity Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: "Events Organized", value: user.eventsOrganized },
                { title: "Hours Volunteered", value: user.hoursVolunteered },
                { title: "Impact Score", value: user.impactScore }
              ].map((item, index) => (
                <div key={index} className="bg-background/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-muted-foreground">{item.title}</p>
                  <p className="text-2xl font-semibold text-foreground/90 mt-1">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Button className="w-full sm:w-auto">Contact Alice</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}