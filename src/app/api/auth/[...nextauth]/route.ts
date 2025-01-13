import { getUserByName } from "@/database/repositories/userRepository";
import { UserClient } from "@/types";
import bcryptjs from "bcryptjs";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, _req) {
        console.log("auth");
        if (!credentials) {
          return null;
        }
        const { username, password } = credentials;

        const userToCompare = await getUserByName(username);

        const loginSuccess = await bcryptjs.compare(
          password,
          userToCompare.passwordHash,
        );

        if (!loginSuccess) throw Error("Invalid credentials");

        const retUser: UserClient = {
          username: userToCompare.username,
          email: userToCompare.email,
          apartment: userToCompare.apartment,
          role: userToCompare.role,
        };

        return { ...retUser, id: userToCompare.id };
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token, session, trigger }) {
      if (user) {
        token.user = user;
      }

      if (trigger === "update" && session.role) {
        token.user.role = session.role;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
