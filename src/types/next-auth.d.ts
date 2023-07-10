import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: number | string;
      isAdmin: boolean;
    };
  }

  interface User {
    id: number | string;
    isAdmin: boolean;
    name: string;
    email: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number | string;
    isAdmin: boolean;
  }
}
