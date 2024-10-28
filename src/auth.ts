import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        // Check if email and password are provided
        if (!email || !password)
          throw new Error("Email and password are required");

        // Check if user exists
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
          select: {
            name: true,
            email: true,
            password: true,
          },
        });

        if (!user) throw new Error("User not found");

        // Check if password is correct
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) throw new Error("Invalid password");

        // Return success response
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
  },
});
