'use server'

import { DEPARTMENT } from "@/config/config";
import { authOptions } from "@/lib/auth";
import { ExtentedUser } from "@/lib/utils";
import Applications from "@/schemas/applications";
import { getServerSession } from "next-auth";
import { createConnection } from "../database-connection";

export const deleteQuestionAction = async (applicationId: string, position: number) => {
    const session = await getServerSession(authOptions) as ExtentedUser;
    if(!session || !session.user || session.user.id !== DEPARTMENT.OWNER) return null;

    await createConnection();

    const application = await Applications.findOne({ id: applicationId });
    if(!application) return null;

    const question = await application.questions.find((q: { position: number; }) => q.position === position);
    if(!question) return null;

    application.questions = application.questions.filter((q: { position: number; }) => q.position !== position);
    application.questions.forEach((q: { position: number; }) => {
        if(q.position > position) q.position -= 1;
    });

    await application.save();   

    return application.id;
}