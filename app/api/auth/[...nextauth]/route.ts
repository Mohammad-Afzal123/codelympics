import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createClient } from "@supabase/supabase-js";

// ✅ Supabase client with service role key (server-side only)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    // Runs on sign-in attempt
    async signIn({ user }) {
      const { data, error } = await supabase
        .from("students")
        .select("student_uuid, college, email")
        .eq("email", user.email)
        .single();

      if (error || !data) {
        console.log("❌ User not found in students table:", user.email);
        return false; // deny login
      }

      console.log("✅ User allowed:", data.email);
      return true; // allow login
    },

    // Redirect after login
    async redirect({ baseUrl }) {
      return `${baseUrl}/dashboard`;
    },

    // Add Supabase info into JWT
    async jwt({ token, user }) {
      if (user?.email) {
        const { data } = await supabase
          .from("students")
          .select("student_uuid, college")
          .eq("email", user.email)
          .single();

        if (data) {
          token.student_uuid = data.student_uuid;
          token.college = data.college;
        }
      }
      return token;
    },

    // Expose custom JWT fields into session object
    async session({ session, token }) {
      if (token?.student_uuid) {
        session.user.student_uuid = token.student_uuid as string;
        session.user.college = token.college as string;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET, // required
});

export { handler as GET, handler as POST };
