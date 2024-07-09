'use server'

import { DEPARTMENT } from "@/config/config";
import { authOptions } from "@/lib/auth";
import { ExtentedUser } from "@/lib/utils";
import Applications from "@/schemas/applications";
import { getServerSession } from "next-auth";
import { createConnection } from "../database-connection";

export const editApplicationAction = async (id: string, name: string, description: string, status: string, acceptedRole: string, notifyOnAccept: string, notifyOnDeny: string, neededRole?: string) => {
    const session = await getServerSession(authOptions) as ExtentedUser
    if(!session || !session.user || session.user.id !== DEPARTMENT.OWNER) return null;

    await createConnection();

    console.log(id);

    const application = await Applications.findOne({ id });
    if(!application) return null;

    console.log(`${name} ${description} ${status} ${acceptedRole} ${notifyOnAccept} ${notifyOnDeny} ${neededRole}`)

    application.name = name;
    application.description = description;
    application.status = status === "Open" ? true : false;
    application.acceptedRole = acceptedRole;
    application.notifyOnAccept = notifyOnAccept === "Yes" ? true : false;
    application.notifyOnDeny = notifyOnDeny === "Yes" ? true : false;
    application.neededRole = neededRole;

    await application.save();

    return application.id;
}