"use server";
import { UserOnboardingEmailTemplate } from "@/email/User-Onboarding";
import { prisma } from "@/lib/prisma";
import { generatePassword } from "@/lib/utils";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { $Enums } from "@prisma/client";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Adds a new user to the database.
 *
 * @param {string} name - The name of the user.
 * @param {string} email - The email of the user.
 * @param {$Enums.Roles} role - The role of the user.
 */
export const addUserAction = async (
  name: string,
  email: string,
  role: $Enums.Roles
): Promise<{ success: boolean; message: string; password?: string }> => {
  try {
    // Validate input
    if (!name || !email || !role) throw new Error("Please fill all fields");

    // Check if user already exists
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) throw new Error("User already exists");

    // Generate and hash password
    const password = generatePassword();
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        role,
        password: hashedPassword,
      },
    });

    const { data, error } = await resend.emails.send({
      from: "Rotaract Galgotias <onboarding@admin.rotaractgalgotias.org>",
      to: [user.email],
      subject: "Welcome to Rotaract Galgotias Admin Panel!",
      react: UserOnboardingEmailTemplate({
        firstName: user.name,
        email: user.email,
        temporaryPassword: password,
      }),
    });

    if (error) {
      throw new Error("An error occurred while sending the email");
    }

    return {
      success: true,
      message: "User added successfully!",
      password,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message:
        (error as Error).message ?? "An error occurred while adding the user",
    };
  } finally {
    revalidatePath("/users");
    await prisma.$disconnect();
  }
};

/**
 * Deletes a user from the database.
 *
 * @param {string} email - The email of the user to delete.
 */
export const deleteUserAction = async (
  email: string
): Promise<{ success: boolean; message: string }> => {
  try {
    // Validate input
    if (!email) throw new Error("Please provide an email");

    // Check if user exists
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (!userExists) throw new Error("User does not exist");

    // Delete user
    await prisma.user.delete({ where: { email } });

    return {
      success: true,
      message: "User deleted successfully!",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message:
        (error as Error).message ?? "An error occurred while deleting the user",
    };
  } finally {
    revalidatePath("/users");
    await prisma.$disconnect();
  }
};
