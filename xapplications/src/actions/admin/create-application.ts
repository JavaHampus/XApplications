'use server'

import { DEPARTMENT } from "@/config/config";
import { authOptions } from "@/lib/auth";
import { ExtentedUser } from "@/lib/utils";
import Applications, { IApplication } from "@/schemas/applications";
import { getServerSession } from "next-auth";
import { createConnection } from "../database-connection";

export const createApplicationAction = async (name: string, description: string, status: string, acceptedRole: string, notifyOnAccept: string, notifyOnDeny: string, neededRole?: string) => {
    const session = await getServerSession(authOptions) as ExtentedUser
    if(!session || !session.user || session.user.id === DEPARTMENT.OWNER) return null;

    const id = Math.random().toString(36).substring(7);

    await createConnection();

    const newApplication = new Applications<IApplication>({
        name,
        id,
        description,
        status: status === "Open" ? true : false,
        allowedReviewers: [session.user.id as string],
        acceptedRole,
        notifyOnAccept: notifyOnAccept === "Yes" ? true : false,
        notifyOnDeny: notifyOnDeny === "Yes" ? true : false,
        neededRole
    });

    await newApplication.save();

    return newApplication.id;
}; 