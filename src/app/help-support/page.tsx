'use client';

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AlertCircle, Mail, MessageCircle, Phone } from 'lucide-react'

export default function HelpAndSupportPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const faqs = [
    { 
      question: "How do I change my password?", 
      answer: "To change your password, go to the Account Settings page, scroll to the 'Change Password' section, enter your current password, then your new password twice to confirm. Click 'Update Password' to save your changes." 
    },
    { 
      question: "How can I update my notification preferences?", 
      answer: "You can update your notification preferences in the Settings page under the 'Notifications' tab. There, you can toggle email and push notifications on or off according to your preferences." 
    },
    { 
      question: "What should I do if I forget my password?", 
      answer: "If you forget your password, click on the 'Forgot Password' link on the login page. Enter your email address, and we'll send you instructions to reset your password." 
    },
    { 
      question: "How do I delete my account?", 
      answer: "To delete your account, go to the Account Settings page and scroll to the bottom to find the 'Delete Account' button in the Danger Zone section. Please note that this action is irreversible." 
    },
  ]

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-8">
        <h1 className="text-4xl font-bold text-foreground">Help and Support</h1>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">How can we help you today?</h2>
          <Input 
            type="search" 
            placeholder="Search for help..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>

        <Tabs defaultValue="faq" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="contact">Contact Us</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="space-y-6">
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            {filteredFaqs.length === 0 && (
              <p className="text-muted-foreground">No matching FAQs found. Please try a different search term or contact support.</p>
            )}
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="mr-2" />
                    Email Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>support@example.com</p>
                  <p className="text-sm text-muted-foreground mt-2">We typically respond within 24 hours.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="mr-2" />
                    Phone Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>+1 (555) 123-4567</p>
                  <p className="text-sm text-muted-foreground mt-2">Available Mon-Fri, 9am-5pm EST</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageCircle className="mr-2" />
                    Live Chat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button>Start Chat</Button>
                  <p className="text-sm text-muted-foreground mt-2">Chat with our support team in real-time.</p>
                </CardContent>
              </Card>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Send us a message</h3>
              <form className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="How can we help you?" />
                </div>
                <Button type="submit">Send Message</Button>
              </form>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>User Guide</CardTitle>
                  <CardDescription>Comprehensive guide to using our platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">Download PDF</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Video Tutorials</CardTitle>
                  <CardDescription>Step-by-step video guides for common tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">Watch Videos</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>API Documentation</CardTitle>
                  <CardDescription>Technical documentation for developers</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">View Docs</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-12 p-6 bg-primary/5 rounded-lg">
          <div className="flex items-start space-x-4">
            <AlertCircle className="text-primary mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-foreground">Need more help?</h3>
              <p className="text-muted-foreground mt-1">
                If you couldn{"'"}t find what you were looking for, please don{"'"}t hesitate to contact our support team.
                We{"'"}re here to help!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}