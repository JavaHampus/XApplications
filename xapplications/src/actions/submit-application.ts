'use server'

import { authOptions } from "@/lib/auth";
import { ExtentedUser } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { createConnection } from "./database-connection";
import Applications, { IQuestion } from "@/schemas/applications";
import Submitted, { ISubmitted } from "@/schemas/submitted";

export const submitApplicationAction = async (applicationId: string, answers: any) => {
    const session = await getServerSession(authOptions) as ExtentedUser;
    if(!session || !session.user || !session.user.id) return null;

    await createConnection();

    const application = await Applications.findOne({ id: applicationId });
    if(!application) return null;

    const alreadySubmitted = await Submitted.findOne({ applicationId, userId: session.user.id, status: "REVIEWING" });
    if(alreadySubmitted) return false;

    const applicationQuestions = application.questions;

    let convertedAnswers: { question: string, answer: string }[] = [];

    for(let i = 1; i < applicationQuestions.length + 1; i++) {
        const question = applicationQuestions.find((q: IQuestion) => q.position === i);
        if(question.required && !answers[i]) return false;

        convertedAnswers.push({
            question: question.question,
            answer: answers[i] || ""
        });
    }

    const randomId = Math.random().toString(36).substring(7);

    const createSubmitted = new Submitted<ISubmitted>({
        applicationId: applicationId,
        userId: session.user.id,
        submittedId: randomId,
        answers: convertedAnswers,
        status: "REVIEWING",
        reviewerId: "NONE",
        reviewedBy: "NONE",
        createdAt: new Date(),
    });

    await createSubmitted.save();

    return true;
};