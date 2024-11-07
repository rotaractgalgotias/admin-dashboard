"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { deleteUserAction } from "../actions";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUserStore } from "@/stores/userStore";
import { logAction } from "@/actions/logActions";

export default function DeleteUserBtn({ email }: { email: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useUserStore();
  const handleDeleteUser = async ({ email }: { email: string }) => {
    setIsDeleting(true);
    // Implement delete user functionality here
    const toastId = toast.loading("Deleting user...");
    try {
      const response = await deleteUserAction(email);
      if (response.success) {
        toast.success(response.message, { id: toastId });
        await logAction({
          action: "DELETE",
          details: `User ${email} was deleted by ${user?.name}`,
        });
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message, { id: toastId });
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-destructive"
          disabled={user?.role !== "ADMIN"}
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the user {email}? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            variant="destructive"
            onClick={async () => {
              if (user?.role !== "ADMIN") return;
              await handleDeleteUser({
                email,
              });
            }}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={isDeleting}>
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
