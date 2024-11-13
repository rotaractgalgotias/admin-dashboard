"use client";

import { Button } from "@/components/ui/button";
import { Prisma } from "@prisma/client";
import { EditIcon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { addUserAction } from "../actions";
import { useUserStore } from "@/stores/userStore";
import { logAction } from "@/actions/logActions";
import { EditUserModal } from "./EditUserModal";

type UserType = Prisma.UserGetPayload<{
  select: {
    name: true;
    email: true;
    role: true;
    id: true;
  };
}>;

export default function EditUserBtn({ userData }: { userData: UserType }) {
  const { user } = useUserStore();
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);

  const handleEditUser = async (newUser: UserType) => {
    if (user?.role !== "ADMIN")
      return toast.error("You are not authorized to perform this action");
    const toastId = toast.loading("Updating user...");
    const { name, email, role } = newUser;
    try {
      const response = await addUserAction(name, email, role);
      if (response.success) {
        toast.success(response.message, { id: toastId });
        // copy password to clipboard
        navigator.clipboard.writeText(response.password ?? "");
        // notify user
        toast.info("Password copied to clipboard");

        await logAction({
          action: "UPDATE",
          details: `User ${newUser.name} was updated by ${user?.name}`,
        });
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message, { id: toastId });
    } finally {
      setIsEditUserModalOpen(false);
    }
  };

  if (user?.role !== "ADMIN") return null;

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsEditUserModalOpen(true)}
        className="mr-2"
      >
        <EditIcon className="h-4 w-4" />
        <span className="sr-only">Edit</span>
      </Button>
      <EditUserModal
        isOpen={isEditUserModalOpen}
        onClose={() => setIsEditUserModalOpen(false)}
        onEditUser={handleEditUser}
        userData={userData}
      />
    </>
  );
}
