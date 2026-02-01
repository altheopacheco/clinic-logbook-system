import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "./lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Example@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password || 
            typeof credentials.email !== "string" || 
            typeof credentials.password !== "string") {
          return null;
        }

        // 1. Fetch user from your database here
        // const user = await db.user.findUnique({ where: { email: credentials.email } });
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        console.log(user);

        if (!user || !user.password) return null;
        

        // 2. Check if password matches
        // const isValid = await bcrypt.compare(user.password, credentials.password as string);
        const isValid = credentials.password == user.password;

        if (!isValid) return null;

        return { id: user.id.toString(), email: user.email };
      },
    }),
  ],
  // Use JWT strategy for Credentials provider
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login", // Custom login page
  },
});