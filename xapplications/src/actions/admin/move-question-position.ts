'use server'

import { DEPARTMENT } from "@/config/config";
import { authOptions } from "@/lib/auth";
import { ExtentedUser } from "@/lib/utils";
import Applications from "@/schemas/applications";
import { getServerSession } from "next-auth";
import { createConnection } from "../database-connection";

type PositionPath = "UP" | "DOWN";

export const moveQuestionPositionAction = async (applicationId: string, currentPosition: number, newPosition: number, path: PositionPath) => {
    const session = await getServerSession(authOptions) as ExtentedUser;
    if(!session || !session.user || session.user.id !== DEPARTMENT.OWNER) return null;

    await createConnection();

    const application = await Applications.findOne({ id: applicationId });
    if(!application) return null;

    const questionsLength = application.questions.length;
    if(path === "UP" && newPosition <= 0) return null;
    console.log(questionsLength, newPosition, currentPosition)
    if(path === "DOWN" && newPosition > questionsLength) return null;

    const question = await application.questions.find((q: { position: number; }) => q.position === newPosition);
    const currentQuestion = await application.questions.find((q: { position: number; }) => q.position === currentPosition);

    if(path === "UP") {
        question.position += 1;
        currentQuestion.position -= 1;
        
        await application.save();
    } else {
        question.position -= 1;
        currentQuestion.position += 1;
        
        await application.save();
    }

    return application.id;
};