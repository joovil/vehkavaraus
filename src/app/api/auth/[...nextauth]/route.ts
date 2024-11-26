import { getUserByName } from "@/database/repositories/userRepository";
import { UserClient } from "@/types/user";
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
          userToCompare.password_hash
        );

        if (!loginSuccess) throw Error("Invalid credentials");

        const retUser: UserClient = {
          id: userToCompare.id,
          username: userToCompare.username,
          email: userToCompare.email,
          apartment: userToCompare.apartment,
          role: userToCompare.role,
        };

        return retUser;
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.user = user;
      }
      return token;
    },

    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },

    // async redirect({ url, baseUrl }) {
    // if (url.startsWith("/")) return `${baseUrl}${url}`;
    // return baseUrl;
    // },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
