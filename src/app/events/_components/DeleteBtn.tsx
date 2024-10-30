"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { toast } from "sonner";
// import { deleteUserAction } from "../actions";
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
import { deleteEventAction } from "../actions";
import { logAction } from "@/actions/logActions";
import { useUserStore } from "@/stores/userStore";

export default function DeleteEventBtn({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useUserStore();
  const handleDeleteUser = async ({ id }: { id: string }) => {
    setIsDeleting(true);
    // Implement delete user functionality here
    const toastId = toast.loading("Deleting event...");
    try {
      const response = await deleteEventAction(id);
      if (response.success) {
        toast.success(response.message, { id: toastId });
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message, { id: toastId });
    } finally {
      setIsDeleting(false);
      await logAction({
        action: "DELETE",
        details: `Event ${name} was deleted by ${user?.name}`,
      });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} className="w-full" variant={"destructive"}>
          Delete Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Event</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the event{" "}
            <b className="text-primary">{name}</b>? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            variant="destructive"
            onClick={async () => {
              await handleDeleteUser({
                id,
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
