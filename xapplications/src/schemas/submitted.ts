import mongoose, { Schema, model, models } from "mongoose";

export type ApplicationStatus = "REVIEWING" | "ACCEPTED" | "DENIED"

export interface ISubmitted {
    userId: string;
    applicationId: string;
    submittedId: string;
    status: ApplicationStatus;
    reviewerId: string;
    reviewedBy: string;
    answers: {
        question: string;
        answer: string;
    }[];
    createdAt: Date;
}

const SubmittedSchema = new Schema<ISubmitted>({   
    userId: {
        type: String,
        required: true,
    },
    applicationId: {
        type: String,
        required: true,
    },
    submittedId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    reviewerId: {
        type: String,
        required: true
    },
    reviewedBy: {
        type: String,
        required: true,
    },
    answers: {
        type: [{ question: String, answer: String }],
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
})

export default models?.Submitted || model<ISubmitted>("Submitted", SubmittedSchema);