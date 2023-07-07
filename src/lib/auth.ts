import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


import { compare } from "bcryptjs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      
      // @ts-ignore
      session.user.isAdmin = token.isAdmin;
      // @ts-ignore
      session.user.id = token.id;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // @ts-ignore
        token.isAdmin = user.isAdmin;
        token.id = user.id;
      }
      return token;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      //@ts-ignore
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.users.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !(await compare(credentials.password, user.password))) {
          return null;
        }

        return user
      },
    }),
  ],
};
