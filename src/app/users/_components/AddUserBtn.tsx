"use client";

import { Button } from "@/components/ui/button";
import { Prisma } from "@prisma/client";
import { UserPlus } from "lucide-react";
import React, { useState } from "react";
import { AddUserModal } from "./AddUserModal";
import { toast } from "sonner";
import { addUserAction } from "../actions";

type UserType = Prisma.UserGetPayload<{
  select: {
    name: true;
    email: true;
    role: true;
  };
}>;

export default function AddUserBtn() {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  const handleAddUser = async (newUser: UserType) => {
    const toastId = toast.loading("Adding user...");
    const { name, email, role } = newUser;
    try {
      const response = await addUserAction(name, email, role);
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
      setIsAddUserModalOpen(false);
    }
  };
  return (
    <>
      <Button onClick={() => setIsAddUserModalOpen(true)}>
        <UserPlus className="mr-2 h-4 w-4" /> Add User
      </Button>
      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        onAddUser={handleAddUser}
      />
    </>
  );
}
