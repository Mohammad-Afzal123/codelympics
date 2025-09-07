import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      /** Default fields */
      name?: string | null;
      email?: string | null;
      image?: string | null;

      /** Custom fields */
      student_uuid?: string;
      college?: string;
    };
  }

  interface User {
    student_uuid?: string;
    college?: string;
  }

  interface JWT {
    student_uuid?: string;
    college?: string;
  }
}
