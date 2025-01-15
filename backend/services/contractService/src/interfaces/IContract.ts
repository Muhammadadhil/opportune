import { Document, ObjectId } from "mongoose";
import { IMilestone } from "./IOffer";
import { ContractStatus } from "../enums/ContractStatus";

export interface IContract extends Document {
    offerId: ObjectId;
    freelancerId: ObjectId;
    clientId: ObjectId;
    jobId: ObjectId;
    workTitle: string;
    workDescription: string;
    totalAmount: number;
    milestones: IMilestone[];
    status: ContractStatus;
    startDate: Date;
    endDate: Date;
    currentMilestoneIndex: number;
    clientNotes?: string;
    clientReviewed: boolean;
    freelancerReviewed: boolean;
}
