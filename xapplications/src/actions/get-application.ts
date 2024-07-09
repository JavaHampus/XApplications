'use server'

import { authOptions } from "@/lib/auth";
import { ExtentedUser } from "@/lib/utils";
import Applications from "@/schemas/applications";
import { getServerSession } from "next-auth";
import { createConnection } from "./database-connection";

export const getApplicationAction = async (id: string) => {
    const session = await getServerSession(authOptions) as ExtentedUser;
    if(!session || !session.user || !session.user.id) return null;

    await createConnection();

    const application = await Applications.findOne({ id });
    if(!application) return null;

    const data = {
        id: application.id,
        name: application.name,
        description: application.description,
        status: application.status,
        notifyOnAccept: application.notifyOnAccept,
        notifyOnDeny: application.notifyOnDeny,
        questions: application.questions,
        neededRole: application.neededRole,
    }

    return data;
}