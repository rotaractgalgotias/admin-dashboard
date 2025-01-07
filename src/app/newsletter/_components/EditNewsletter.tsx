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
import { useUserStore } from "@/stores/userStore";
import { toast } from "sonner";
import {  editNewsletter } from "../action";
import { logAction } from "@/actions/logActions";

interface NewsletterFormValues {
    title: string;
    totalPages: number;
    month: string;
}

export function EditNewsletterDialog({ children, newsletter }:
    {
        children: React.ReactNode;
        newsletter: { id: string; title: string; totalPages: number; month: string }
    }) {
    const router = useRouter();
    const { user } = useUserStore();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<NewsletterFormValues>({
        defaultValues: {
            title: newsletter.title,
            totalPages: newsletter.totalPages,
            month: newsletter.month,
        },
    });

    const onSubmit = async (data: NewsletterFormValues) => {
        if (user?.role !== "ADMIN")
          return toast.error("You are not authorized to perform this action");
    
        const toastId = toast.loading("Updating newsletter...");
    
        try {
          const response = await editNewsletter({ id: newsletter.id, ...data });
          if (response.success) {
            toast.success(response.message, { id: toastId });
    
            await logAction({
              action: "UPDATE",
              details: `Newsletter ${data.title} was updated by ${user?.name}`,
            });
          } else {
            throw new Error(response.message);
          }
        } catch (error) {
          console.error(error);
          toast.error((error as Error).message, { id: toastId });
        } finally {
          // close the dialog
          router.replace("/newsletter");
        }
      };

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Newsletter</DialogTitle>
                    <DialogDescription>
                    Update the details of the newsletter.
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
                        <Button type="submit">Update Newsletter</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
