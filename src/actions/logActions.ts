"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface LogActionParams {
  action: "CREATE" | "UPDATE" | "DELETE";
  details: string;
}

export async function logAction(params: LogActionParams) {
  const { action, details } = params;

  try {
    await prisma.activityLog.create({
      data: {
        action,
        details,
      },
    });
    revalidatePath("/activity-logs");
    return {
      success: true,
      message: "Action logged successfully",
    };
  } catch (error) {
    console.error("Error logging action:", error);
    return {
      success: false,
      message: "An error occurred while logging the action",
    };
  }
}
