'use server'

import { authOptions } from "@/lib/auth";
import { ExtentedUser } from "@/lib/utils";
import Applications, { IApplication } from "@/schemas/applications";
import { getServerSession } from "next-auth";
import { createConnection } from "../database-connection";

export const getReviewersAction = async (applicationId: string) => {
    const session = await getServerSession(authOptions) as ExtentedUser;
    if(!session) return null;

    await createConnection();

    const application = await Applications.findOne<IApplication>({ id: applicationId });
    if(!application) return null;

    return application.allowedReviewers;
}