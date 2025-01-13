import mongoose,{Schema} from "mongoose";
import { IContract } from "../interfaces/IContract";
import { ContractStatus } from '../enums/ContractStatus';
import MilestoneSchema from "./milestone.schema";
import { EscrowStatus } from "../enums/EscrowStatus";

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
            enum: Object.values(ContractStatus),
            default: ContractStatus.PENDING,
        },
        currentMilestoneIndex: {
            type: Number,
            default: 0,
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
