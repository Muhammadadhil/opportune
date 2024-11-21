import mongoose,{Schema} from "mongoose";
import { IContract } from "../interfaces/IContract";
import { ApprovalStatus } from "../enums/ApprovalStatus";

const contractSchema = new mongoose.Schema<IContract>(
    {
        applicationId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        jobId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        clientId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        freelancerId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        startDate: {
            type: Date,
            // required: true,
        },
        endDate: {
            type: Date,
            // required: true,
        },
        status: {
            type: String,
            required: true,
            enum: Object.values(ApprovalStatus),
            default: ApprovalStatus.ACTIVE,
        },
        clientNotes: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Contract = mongoose.model<IContract>("Contract", contractSchema);
export default Contract;
