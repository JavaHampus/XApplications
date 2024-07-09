"use server"

import { DEPARTMENT } from "@/config/config";
import { authOptions } from "@/lib/auth";
import { ExtentedUser } from "@/lib/utils";
import Applications from "@/schemas/applications";
import Submitted, { ISubmitted } from "@/schemas/submitted";
import { getServerSession } from "next-auth";
import { createConnection } from "../database-connection";
import { getReviewersAction } from "./get-reviewers";

export const getApplicationStatsAction = async (applicationId: string) => {
    const session = await getServerSession(authOptions) as ExtentedUser;
    const reviewers = await getReviewersAction(applicationId);
    if(!session || !session.user || session.user.id !== DEPARTMENT.OWNER || !reviewers || !reviewers.includes(session.user.id)) return null;

    await createConnection();

    const application = await Applications.findOne({ id: applicationId });
    if(!application) return null;

    const submittedApplications = await Submitted.find({ applicationId });

    const stats = {
        total: submittedApplications.length,
        reviewing: submittedApplications.filter((a: ISubmitted) => a.status === "REVIEWING").length,
        accepted: submittedApplications.filter((a: ISubmitted) => a.status === "ACCEPTED").length,
        rejected: submittedApplications.filter((a: ISubmitted) => a.status === "DENIED").length,
    }

    return stats;
};  