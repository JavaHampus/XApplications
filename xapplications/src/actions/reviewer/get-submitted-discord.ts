"use server"

import { DEPARTMENT, DISCORD } from "@/config/config";
import { authOptions } from "@/lib/auth";
import { ExtentedUser } from "@/lib/utils";
import Applications from "@/schemas/applications";
import Submitted from "@/schemas/submitted";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import { getServerSession } from "next-auth";
import { createConnection } from "../database-connection";
import { getReviewersAction } from "./get-reviewers";

export const getSubmittedDiscordAction = async (applicationId: string, submittedId: string, userId: string) => {
    const session = await getServerSession(authOptions) as ExtentedUser;
    const reviewers = await getReviewersAction(applicationId);
    if(!session || !session.user || session.user.id !== DEPARTMENT.OWNER || !reviewers || !reviewers.includes(session.user.id)) return null;

    await createConnection();
    
    const rest = new REST({ version: '10' }).setToken(DISCORD.TOKEN);
    const application = await Applications.findOne({ id: applicationId });
    if(!application) return null;

    const submitted = await Submitted.findOne({ applicationId, userId, submittedId });
    if(!submitted) return null;

    try {
        const user = await rest.get(Routes.guildMember(DISCORD.GUILD_ID, userId));
        return user;
    } catch(e) {
        return null;
    }
}