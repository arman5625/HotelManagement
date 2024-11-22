import NextAuth from "next-auth";
import { authOptions } from "@/src/libs/auth"; // Adjust the import path based on your folder structure

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST};