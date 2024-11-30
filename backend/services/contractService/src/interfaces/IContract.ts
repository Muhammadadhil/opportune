import { Document, ObjectId } from "mongoose";
import { IMilestone } from "./IOffer";

export interface IContract extends Document{
    offerId: ObjectId;
    freelancerId: ObjectId;
    clientId: ObjectId;
    jobId: ObjectId;
    workTitle: string;
    workDescription: string;
    totalAmount: number;
    milestones: IMilestone[];
    status: string;
    startDate: Date;
    endDate:Date;
    clientNotes?: string;
}
