"use server";

import { prisma } from "@/lib/prisma";

export const getUserDataAction = async (email: string) => {
  try {
    // Validate input
    if (!email) throw new Error("Please provide an email");

    // Get user data
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        firstTime: true,
        dummy: true,
      },
    });

    return user;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};
