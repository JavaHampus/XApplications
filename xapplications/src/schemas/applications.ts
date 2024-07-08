import mongoose, { Schema, model, models } from "mongoose";

export type QuestionTypes = "SHORT" | "LONG" | "SELECT" | "CHECKBOX"

export interface IQuestion {
    question: string;
    type: QuestionTypes;
    required: boolean;
    position: number;
}

export interface IApplication {
    name: string;
    id: string;
    description: string;
    status: boolean;
    allowedReviewers: string[];
    acceptedRole: string;
    notifyOnAccept: boolean;
    notifyOnDeny: boolean;
    neededRole?: string;
    questions?: IQuestion[];
}

const ApplicationSchema = new Schema<IApplication>({
    name: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    allowedReviewers: {
        type: [String],
        required: true,
    },
    acceptedRole: {
        type: String,
        required: true,
    },
    notifyOnAccept: {
        type: Boolean,
        required: true,
    },
    notifyOnDeny: {
        type: Boolean,
        required: true,
    },
    neededRole: {
        type: String,
    },
    questions: [
        {
            question: {
                type: String,
                required: true,
            },
            type: {
                type: String,
                required: true,
            },
            required: {
                type: Boolean,
                required: true,
            },
            position: {
                type: Number,
                required: true,
            }
        }
    ]
})

export default models?.Applications || model<IApplication>("Applications", ApplicationSchema);