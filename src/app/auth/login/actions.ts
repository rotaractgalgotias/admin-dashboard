/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

/**
 * Logs in a user by verifying their email and password.
 *
 * @param {Object} params - The login parameters.
 * @param {string} params.email - The email of the user.
 * @param {string} params.password - The password of the user.
 */
export const loginAction = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    // Check if email and password are provided
    if (!email || !password) throw new Error("Email and password are required");

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });

    if (!user) throw new Error("User not found");

    // Check if password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) throw new Error("Invalid password");

    // Return success response
    return {
      success: true,
      message: "Logged in successfully",
    };
  } catch (error) {
    console.error("Error:", error);
    // Return error response
    return {
      success: false,
      message: (error as any).message ?? "Something went wrong",
    };
  }
};
