import mongoose,{Schema} from "mongoose";
import { IContract } from "../interfaces/IContract";
import { ApprovalStatus } from "../enums/ApprovalStatus";
import { IMilestone } from "../interfaces/IOffer";

const MilestoneSchema = new Schema<IMilestone>({
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    deadline: { type: Date, required: true },
    status: { type: String, enum: ["Pending", "Completed", "Approved"], default: "Pending" },
});

const contractSchema = new mongoose.Schema<IContract>(
    {
        offerId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        freelancerId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        clientId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        jobId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        workTitle: {
            type: String,
            required: true,
        },
        workDescription: {
            type: String,
            required: true,
        },
        totalAmount: {
            type: Number,
            required: true,
        },
        milestones: {
            type: [MilestoneSchema],
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: Object.values(ApprovalStatus),
            default: ApprovalStatus.ACTIVE,
        },
        startDate: {
            type: Date,
            // required: true,
        },
        endDate: {
            type: Date,
            // required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Contract = mongoose.model<IContract>("Contract", contractSchema);
export default Contract;
