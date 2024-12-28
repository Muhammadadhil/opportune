import {Document ,ObjectId} from 'mongoose';

export interface IMilestone {
    _id: string;
    description: string;
    amount: number;
    deadline: Date;
    status: string;
    escrowStatus: string;
}

export interface IOffer extends Document {
    _id:ObjectId;
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
