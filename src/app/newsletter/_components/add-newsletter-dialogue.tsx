"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface NewsletterFormValues {
  title: string;
  totalPages: number;
  month: string;
}

export function AddNewsletterDialog({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewsletterFormValues>();

  const onSubmit = (data: NewsletterFormValues) => {
    console.log(data);
    // Simulate API request or handle the form data
    router.refresh();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Newsletter</DialogTitle>
          <DialogDescription>
            Add a new newsletter to your collection.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              placeholder="Title of the newsletter"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="totalPages" className="text-sm font-medium">
              Total Pages
            </label>
            <Input
              id="totalPages"
              type="number"
              placeholder="10"
              {...register("totalPages", {
                required: "Total pages are required",
                valueAsNumber: true,
                min: { value: 1, message: "Minimum 1 page is required" },
              })}
            />
            {errors.totalPages && (
              <p className="text-red-500 text-sm">{errors.totalPages.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="month" className="text-sm font-medium">
              Month
            </label>
            <Input
              id="month"
              placeholder="jan-apr"
              {...register("month", { required: "Month is required" })}
            />
            {errors.month && (
              <p className="text-red-500 text-sm">{errors.month.message}</p>
            )}
          </div>
          <div className="flex justify-end">
            <Button type="submit">Create Newsletter</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
