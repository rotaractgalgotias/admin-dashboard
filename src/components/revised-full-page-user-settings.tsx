'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface UserSettings {
  name: string;
  email: string;
  avatar: string;
  role: string;
  bio: string;
  location: string;
  notifications: {
    email: boolean;
    push: boolean;
  };
  theme: string;
}

export function RevisedFullPageUserSettings() {
  const [user, setUser] = useState<UserSettings>({
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    avatar: "/placeholder.svg?height=128&width=128",
    role: "Editor",
    bio: "Passionate about creating positive change through community engagement and storytelling.",
    location: "New York, NY",
    notifications: {
      email: true,
      push: false,
    },
    theme: "system",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUser(prevUser => ({ ...prevUser, [name]: value }))
  }

  const handleNotificationChange = (type: 'email' | 'push') => {
    setUser(prevUser => ({
      ...prevUser,
      notifications: {
        ...prevUser.notifications,
        [type]: !prevUser.notifications[type],
      },
    }))
  }

  const handleThemeChange = (theme: string) => {
    setUser(prevUser => ({ ...prevUser, theme }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the updated user data to your backend
    console.log('Updated user data:', user)
    // Show a success message to the user
    alert('Settings updated successfully!')
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-foreground">Account Settings</h1>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Profile Information</h2>
              <p className="text-muted-foreground">Update your profile details here.</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <Button variant="outline">Change Avatar</Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" value={user.name} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" name="bio" value={user.bio} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" value={user.location} onChange={handleInputChange} />
              </div>
            </div>
            <Button onClick={handleSubmit}>Save Changes</Button>
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Account Settings</h2>
              <p className="text-muted-foreground">Manage your account credentials and role.</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={user.email} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" name="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" name="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" name="confirmPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={user.role} onValueChange={(value) => setUser(prevUser => ({ ...prevUser, role: value }))}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Editor">Editor</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleSubmit}>Update Account</Button>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Notification Preferences</h2>
              <p className="text-muted-foreground">Manage how you receive notifications.</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <Switch
                  id="email-notifications"
                  checked={user.notifications.email}
                  onCheckedChange={() => handleNotificationChange('email')}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <Switch
                  id="push-notifications"
                  checked={user.notifications.push}
                  onCheckedChange={() => handleNotificationChange('push')}
                />
              </div>
            </div>
            <Button onClick={handleSubmit}>Save Preferences</Button>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Appearance Settings</h2>
              <p className="text-muted-foreground">Customize how the application looks for you.</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select value={user.theme} onValueChange={handleThemeChange}>
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Select a theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleSubmit}>Save Appearance</Button>
          </TabsContent>
        </Tabs>

        <Separator className="my-8" />

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">Danger Zone</h2>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              Deleting your account is permanent and cannot be undone. All your data will be erased.
            </AlertDescription>
          </Alert>
          <Button variant="destructive">Delete Account</Button>
        </div>
      </div>
    </div>
  )
}