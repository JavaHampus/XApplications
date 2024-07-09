'use server'

import { DEPARTMENT } from "@/config/config";
import { authOptions } from "@/lib/auth";
import { ExtentedUser } from "@/lib/utils";
import Applications from "@/schemas/applications";
import Submitted from "@/schemas/submitted";
import { getServerSession } from "next-auth";
import { createConnection } from "../database-connection";
import { getReviewersAction } from "./get-reviewers";

export const searchApplicationAction = async (applicationId: string, query: string) => {
    const session = await getServerSession(authOptions) as ExtentedUser;
    const reviewers = await getReviewersAction(applicationId);
    if(!session || !session.user || session.user.id !== DEPARTMENT.OWNER || !reviewers || !reviewers.includes(session.user.id)) return null;

    await createConnection();

    const application = await Applications.findOne({ id: applicationId });
    if(!application) return null;

    // Find a submitted application with either userId or submittedId matching the query
    const submittedApplications = await Submitted.find({ applicationId, $or: [{ userId: query }, { submittedId: query }] }).lean();
    if(!application) return null;

    return submittedApplications;
}