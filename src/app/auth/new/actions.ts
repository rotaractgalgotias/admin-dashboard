"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const resetUserPasswordAction = async (
  email: string,
  password: string
) => {
  try {
    // Validate input
    if (!email) throw new Error("Please provide an email");

    // Generate and hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user password
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword, firstTime: false },
    });

    return {
      success: true,
      message: "Password reset successfully!",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message:
        (error as Error).message ??
        "An error occurred while resetting the password",
    };
  } finally {
    await prisma.$disconnect();
  }
};
