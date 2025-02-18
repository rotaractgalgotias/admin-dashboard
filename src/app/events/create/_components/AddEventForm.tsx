"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createEvent } from "../actions";
import { toast } from "sonner";
import { logAction } from "@/actions/logActions";
import { useUserStore } from "@/stores/userStore";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";

const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().min(1, "Content is required"),
  date: z.date({
    required_error: "Event date is required",
  }),
  location: z.string().min(1, "Location is required"),
  numberOfVolunteers: z.number().min(0).optional(),
  peopleImpacted: z.number().min(0).optional(),
  duration: z.number().min(0).optional(),
  coverImage: z.string().url("Invalid URL"),
  featured: z.boolean(),
});

type EventFormValues = z.infer<typeof eventSchema>;

export function AddEventForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const user = useUserStore((state) => state.user);

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      location: "",
      coverImage: "",
      featured: false,
    },
  });

  const onSubmit = async (data: EventFormValues) => {
    setIsLoading(true);
    const toastId = toast.loading("Creating event...");

    const response = await createEvent(data);

    if (response.success) {
      toast.success(response.message, { id: toastId });
      await logAction({
        action: "CREATE",
        details: `Event ${data.title} was created by ${user?.name}`,
      });
      router.push("/events"); // Redirect to events list after creation
    } else {
      toast.error(response.message, { id: toastId });
    }
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Add Event</h2>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.back()}
            >
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
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter event title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter event description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content (Plain Text)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter event content in Plain Text format"
                      className="min-h-[200px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Featured Event</FormLabel>
                    <FormDescription>
                      Mark this event as featured to highlight it on the main
                      and sponsor page.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Event Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value
                            ? format(field.value, "PPP")
                            : "Select event date"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter event location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numberOfVolunteers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Volunteers</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter number of volunteers"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="peopleImpacted"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>People Impacted</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter number of people impacted"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration (hours)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter event duration in hours"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coverImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Media (Main IMG)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter event media URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full bg-accent p-6 rounded-lg">
              <div className="w-full relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={
                    form.watch("coverImage") === ""
                      ? "/placeholder.jpg"
                      : form.watch("coverImage")
                  }
                  fill
                  alt={form.watch("title")}
                  className="rounded-lg object-contain"
                />
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Note: The event media will be displayed as the main image for
                the event.
              </p>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
