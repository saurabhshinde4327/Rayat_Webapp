import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import pool from "@/lib/db";
import bcrypt from "bcrypt"; // ✅ Import bcrypt for password hashing

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const [rows] = await pool.query(
            "SELECT id, school_id, email, password FROM users WHERE email = ?",
            [credentials.email]
          );

          if (rows.length === 0) {
            throw new Error("User not found");
          }

          const user = rows[0];

          // ✅ Verify hashed password
          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) {
            throw new Error("Incorrect password");
          }

          return {
            id: user.id,
            school_id: user.school_id, // ✅ Attach school_id to session
            email: user.email,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.school_id = token.school_id; // ✅ Ensure school_id is in session
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.school_id = user.school_id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
};

export default NextAuth(authOptions);
