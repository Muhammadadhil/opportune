import {Document ,ObjectId} from 'mongoose';

export interface IMilestone {
    milestoneId: string;
    description: string;
    amount: number;
    deadline: Date;
    status: string;
}

export interface IOffer extends Document {
    applicationId: ObjectId;
    jobId: ObjectId;
    freelancerId: ObjectId;
    clientId: ObjectId;
    workTitle: string;
    workDescription:string;
    totalAmount: number;
    milestones: IMilestone[];
    status: string;
}
