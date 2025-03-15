"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/userStore";
import { toast } from "sonner";
import { deleteNewsletter } from "../action";
import { logAction } from "@/actions/logActions";

export function DeleteNewsletterDialog({ 
    children, 
    newsletter 
}: {
    children: React.ReactNode;
    newsletter: { id: string; title: string; }
}) {
    const router = useRouter();
    const { user } = useUserStore();

    const handleDelete = async () => {
        if (user?.role !== "ADMIN")
            return toast.error("You are not authorized to perform this action");

        const toastId = toast.loading("Deleting newsletter...");

        try {
            const response = await deleteNewsletter(newsletter.id);
            if (response.success) {
                toast.success(response.message, { id: toastId });

                await logAction({
                    action: "DELETE",
                    details: `Newsletter ${newsletter.title} was deleted by ${user?.name}`,
                });
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            console.error(error);
            toast.error((error as Error).message, { id: toastId });
        } finally {
            // Refresh the page
            router.replace("/newsletter");
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Newsletter</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this newsletter? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex justify-end space-x-2 pt-4">
                    <DialogTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogTrigger>
                    <Button variant="destructive" onClick={handleDelete}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
} 