import { DISCORD } from "@/config/config";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import NextAuth, { Account, NextAuthOptions, getServerSession } from "next-auth"
import DiscordProvider from "next-auth/providers/discord"

export const authOptions: NextAuthOptions = {
    providers: [
      DiscordProvider({
        clientId: DISCORD.CLIENT_ID,
        clientSecret: DISCORD.CLIENT_SECRET,
        authorization: { params: { scope: 'identify guilds email' } },
      }),
    ],
    callbacks: {
      async session({session, token, user}) {
        if (token) {
          if (token?.picture?.includes("discord")) {
            if(session.user) {
              (session.user as any).id = token.sub;
              (session.user as any).name = token.name;
            }
          }
        }
        return session;
      },
    }
  }