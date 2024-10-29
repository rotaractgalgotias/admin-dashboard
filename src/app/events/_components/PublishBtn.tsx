"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { toast } from "sonner";
import { publishAction } from "../actions";

export default function PublishBtn() {
  const [loading, setLoading] = React.useState(false);
  const handlePublish = async () => {
    setLoading(true);
    const toastId = toast.loading("Publishing...");

    try {
      const res = await publishAction();
      if (!res.success) {
        throw new Error(res.message);
      }
      toast.success("Published successfully", { id: toastId });
    } catch (error) {
      toast.error("Failed to publish", { id: toastId });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      onClick={handlePublish}
      variant={"secondary"}
      disabled={loading}
      className="bg-green-700"
    >
      Publish
    </Button>
  );
}
