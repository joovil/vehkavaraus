import { getUserByName } from "@/lib/database/repositories/userRepository";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import { UserClient } from "@/types/types";

const handler = NextAuth({
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
        console.log("\x1b[45m## authorize ##\x1b[0m");
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
          apartment: userToCompare.apartment,
          role: userToCompare.role,
        };

        return retUser;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      console.log(token);

      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
      }
      console.log(session);

      return session;
    },
  },
});

export { handler as GET, handler as POST };
