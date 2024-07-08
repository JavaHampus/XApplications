"use server"

import { DEPARTMENT } from "@/config/config";
import { authOptions } from "@/lib/auth";
import { ExtentedUser } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { createConnection } from "./database-connection";
import Applications from "@/schemas/applications";

export const getAllApplicationsAction = async () => {
    const session = await getServerSession(authOptions) as ExtentedUser;
    if(!session || !session.user || session.user.id !== DEPARTMENT.OWNER) return null;

    await createConnection();

    const applications = await Applications.find();

    return applications;
}