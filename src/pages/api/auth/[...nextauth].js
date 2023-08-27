import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      authorize(credentials, req) {
        const { email, password } = credentials;

        if (email !== process.env.EMAIL || password !== process.env.PASSWORD) {
          throw new Error("invalid credentials");
        }

        // if everything is fine
        return {
          name: "Morsheda Fariha",
          email: process.env.EMAIL,
          password: process.env.PASSWORD,
          role: "admin",
        };
      },
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/admin/login",
  },
  secret: process.env.SECRET,
};

export default NextAuth(authOptions);
