"use server";

import { prisma } from "@/lib/prisma";
import axios from "axios";
import { revalidatePath } from "next/cache";

export const publishAction = async () => {
  const URL = `${process.env.DEPLOY_HOOK}?buildCache=false`;

  try {
    await axios.post(URL);
    return { success: true, message: "Published successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to publish" };
  }
};

export const deleteEventAction = async (eventId: string) => {
  try {
    await prisma.event.delete({
      where: { id: eventId },
    });
    revalidatePath("/events");
    return { success: true, message: "Event deleted successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to delete event" };
  }
};
