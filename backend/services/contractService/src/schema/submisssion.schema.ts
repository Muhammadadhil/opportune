import mongoose, { Schema, Document } from "mongoose";

export interface ISubmission extends Document {
    freelancerId: mongoose.Types.ObjectId;
    clientId: mongoose.Types.ObjectId;
    message: string;
    attachment: string;
    contractId: mongoose.Types.ObjectId;
    milestoneId: mongoose.Types.ObjectId;
    isAccepted: boolean;
}

const SubmissionSchema: Schema = new Schema(
    {
        freelancerId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
        clientId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
        message: { type: String, required: true },
        attachment: { type: String, required: true },
        contractId: { type: mongoose.Types.ObjectId, required: true, ref: "Contract" },
        milestoneId: { type: mongoose.Types.ObjectId, required: true, ref: "Milestone" },
        isAccepted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const Submission = mongoose.model<ISubmission>("Submission", SubmissionSchema);
