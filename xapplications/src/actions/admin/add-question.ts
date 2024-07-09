"use server"

import { DEPARTMENT } from "@/config/config";
import { authOptions } from "@/lib/auth";
import { ExtentedUser } from "@/lib/utils";
import Applications, { QuestionTypes } from "@/schemas/applications";
import { getServerSession } from "next-auth";
import { createConnection } from "../database-connection";

export const addQuestionAction = async (id: string, question: string, type: QuestionTypes, required: boolean) => {
    const session = await getServerSession(authOptions) as ExtentedUser
    if(!session || !session.user || session.user.id !== DEPARTMENT.OWNER) return null;

    await createConnection();

    const application = await Applications.findOne({ id });
    if(!application) return null;

    application.questions?.push({
        question,
        type,
        required,
        position: application.questions.length + 1
    });
    await application.save();

    return application.id;
}