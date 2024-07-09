"use server"

import { DEPARTMENT } from "@/config/config";
import { authOptions } from "@/lib/auth";
import { ExtentedUser } from "@/lib/utils";
import Applications from "@/schemas/applications";
import Submitted from "@/schemas/submitted";
import { getServerSession } from "next-auth";
import { createConnection } from "../database-connection";
import { getReviewersAction } from "./get-reviewers";

export const denySubmittedAction = async (applicationId: string, submittedId: string, userId: string) => {
    const session = await getServerSession(authOptions) as ExtentedUser;
    const reviewers = await getReviewersAction(applicationId);
    if(!session || !session.user || session.user.id !== DEPARTMENT.OWNER || !reviewers || !reviewers.includes(session.user.id)) return null;

    await createConnection();

    const application = await Applications.findOne({ id: applicationId });
    if(!application) return null;
    
    const submitted = await Submitted.findOne({ applicationId, userId, submittedId });
    if(!submitted) return null;

    submitted.status = "DENIED";
    submitted.reviewerId = session.user.id;
    submitted.reviewedBy = session.user.name;

    await submitted.save();

    return true;
}