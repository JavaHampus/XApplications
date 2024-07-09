'use server'

import { DEPARTMENT, DISCORD } from "@/config/config";
import { authOptions } from "@/lib/auth";
import { ExtentedUser } from "@/lib/utils";
import Applications from "@/schemas/applications";
import Submitted, { ISubmitted } from "@/schemas/submitted";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import { getServerSession } from "next-auth";
import { createConnection } from "../database-connection";
import { getReviewersAction } from "./get-reviewers";

export const getTopReviewerAction = async (applicationId: string) => {
    const session = await getServerSession(authOptions) as ExtentedUser;
    const reviewers = await getReviewersAction(applicationId);
    if(!session || !session.user || session.user.id !== DEPARTMENT.OWNER || !reviewers || !reviewers.includes(session.user.id)) return null;

    await createConnection();

    const application = await Applications.findOne({ id: applicationId });
    if(!application) return null;

    const submittedApplications = await Submitted.find({ applicationId });

    const topReviewer = submittedApplications.reduce((acc: any, curr: ISubmitted) => {
        if(curr.reviewerId === "NONE") return acc;

        if(!acc[curr.reviewerId]) {
            acc[curr.reviewerId] = 1;
        } else {
            acc[curr.reviewerId]++;
        }
        return acc;
    }, {});

    if(Object.keys(topReviewer).length === 0) return false;

    const rest = new REST({ version: '10' }).setToken(DISCORD.TOKEN);

    const user = await rest.get(Routes.guildMember(DISCORD.GUILD_ID, Object.keys(topReviewer).reduce((a: any, b: any) => topReviewer[a] > topReviewer[b] ? a : b))).catch((e) => {
        return false;
    });

    return {
        name: (user as any).user.username,
        id: (user as any).user.id,
        reviews: topReviewer[(user as any).user.id],
        globalName: (user as any).user.global_name,
        nick: (user as any).user.nick,
    }
};  