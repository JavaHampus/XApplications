import { authOptions } from "@/lib/auth";
import NextAuth, { Account, NextAuthOptions, getServerSession } from "next-auth"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }