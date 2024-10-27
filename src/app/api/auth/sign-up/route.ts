/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, password } = body;

  // check if email and password are provided
  if (!name || !email || !password) {
    return {
      status: 400,
      body: { message: "Email and password are required" },
    };
  }
  // Check if user exists
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    return NextResponse.json(
      {
        success: false,
        message: "User already exists with this email",
      },
      { status: 400 }
    );
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: "ADMIN",
    },
  });
  return NextResponse.json(
    { success: true, message: "User created successfully" },
    { status: 201 }
  );
}
