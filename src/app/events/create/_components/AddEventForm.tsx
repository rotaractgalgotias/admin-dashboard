"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function AddEventForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [eventDate, setEventDate] = useState<Date>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    // TODO: Implement event creation logic here
    // This is where you'd typically make an API call to create the event

    setTimeout(() => {
      setIsLoading(false);
      router.push("/events"); // Redirect to events list after creation
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Add Event</h2>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => router.back()}>
            Discard Changes
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Add Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Event Title</Label>
            <Input id="title" placeholder="Enter event title" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter event description"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content (MDX)</Label>
            <Textarea
              id="content"
              placeholder="Enter event content in MDX format"
              required
              className="min-h-[200px]"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Event Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !eventDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {eventDate ? format(eventDate, "PPP") : "Select event date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={eventDate}
                  onSelect={setEventDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="Enter event location" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="numberOfVolunteers">Number of Volunteers</Label>
            <Input
              id="numberOfVolunteers"
              type="number"
              placeholder="Enter number of volunteers"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="peopleImpacted">People Impacted</Label>
            <Input
              id="peopleImpacted"
              type="number"
              placeholder="Enter number of people impacted"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration (hours)</Label>
            <Input
              id="duration"
              type="number"
              placeholder="Enter event duration in hours"
            />
          </div>

          <div className="space-y-2">
            <Label>Event Media (Main IMG)</Label>
            <Input
              id="media"
              type="string"
              placeholder="Enter event media URL"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
