import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      image: string;
      email: string;
      id: string;
    };
  }
}
