"use server"

import { DEPARTMENT, DISCORD } from "@/config/config";
import { authOptions } from "@/lib/auth";
import { ExtentedUser } from "@/lib/utils";
import Applications from "@/schemas/applications";
import Submitted from "@/schemas/submitted";
import { REST } from "@discordjs/rest";
import { getServerSession } from "next-auth";
import { createConnection } from "../database-connection";
import { getReviewersAction } from "./get-reviewers";

export const acceptSubmittedAction = async (applicationId: string, submittedId: string, userId: string) => {
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
        rest.put(`/guilds/${DISCORD.GUILD_ID}/members/${userId}/roles/${application.acceptedRole}`, {})
    } catch(e) {
        return null;
    }

    submitted.status = "ACCEPTED";
    submitted.reviewerId = session.user.id;
    submitted.reviewedBy = session.user.name;

    await submitted.save();

    return true;
}