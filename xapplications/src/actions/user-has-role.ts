'use server'

import { DISCORD } from "@/config/config";
import { authOptions } from "@/lib/auth";
import { ExtentedUser } from "@/lib/utils";
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import { getServerSession } from "next-auth";

export const userHasRoleAction = async (userId: string, expectedRole: string) => {
    const session = await getServerSession(authOptions) as ExtentedUser;
    if(!session || !session.user || !session.user.id) return null;

    if(session.user.id !== userId) return null;

    const rest = new REST({ version: '10' }).setToken(DISCORD.TOKEN);

    const guildId = DISCORD.GUILD_ID;

    try {
        const res: any = await rest.get(Routes.guildMember(guildId, userId));
        return res.roles.includes(expectedRole);
    } catch (e) {
        console.error(e);
        return false;
    }
};