"use server";

import { prisma } from "@/lib/prisma";

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
