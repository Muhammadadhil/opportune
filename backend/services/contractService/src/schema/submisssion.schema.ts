import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface ISubmission extends Document {
    freelancerId: ObjectId;
    clientId: ObjectId;
    message: string;
    attachment: string;
    contractId: ObjectId;
    milestoneId: ObjectId;
    isAccepted: boolean;
}

const SubmissionSchema: Schema = new Schema(
    {
        freelancerId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
        clientId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
        message: { type: String, required: true },
        attachment: { type: String },
        contractId: { type: Schema.Types.ObjectId, required: true, ref: "Contract" },
        milestoneId: { type: Schema.Types.ObjectId, required: true, ref: "Milestone" },
        isAccepted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const Submission = mongoose.model<ISubmission>("Submission", SubmissionSchema);
