"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { deleteUserAction } from "../actions";

export default function DeleteUserBtn({ email }: { email: string }) {
  const handleDeleteUser = async ({ email }: { email: string }) => {
    // Implement delete user functionality here
    const toastId = toast.loading("Deleting user...");
    try {
      const response = await deleteUserAction(email);
      if (response.success) {
        toast.success(response.message, { id: toastId });
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message, { id: toastId });
    } finally {
      toast.dismiss(toastId);
    }
  };
  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-destructive"
      onClick={async () =>
        await handleDeleteUser({
          email,
        })
      }
    >
      <Trash2 className="h-4 w-4" />
      <span className="sr-only">Delete</span>
    </Button>
  );
}
