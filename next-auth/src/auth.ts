import NextAuth, { CredentialsSignin } from "next-auth";
import googleProvider from "next-auth/providers/google";
import credentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import credentials from "next-auth/providers/credentials";
import { User } from "./models/userSchema";
import { connectionToDb } from "./lib/utils";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    googleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    credentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string;
        const password = credentials.password as string;
        if (!email || !password) {
          throw new CredentialsSignin("please provide both email and password");
        }
        await connectionToDb();

        const user = await User.findOne({ email }).select("+password");
        if (!user) throw new CredentialsSignin("Invalid email or password");
        const isMatch = await compare(password, user.password);
        if (!isMatch) throw new CredentialsSignin("Invalid email or password");
        else return user;
      },
    }),
  ],
  pages:{
    signIn:"/login",
  },
});
