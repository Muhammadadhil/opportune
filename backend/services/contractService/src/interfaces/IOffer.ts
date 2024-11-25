import {Document ,ObjectId} from 'mongoose';

export interface IMilestone {
    milestoneId: string;
    description: string;
    amount: number;
    deadline: Date;
    status: string; // e.g., 'Pending', 'Completed', 'Approved'
}

export interface IOffer extends Document {
    offerId: string;
    applicationId: ObjectId;
    jobId: ObjectId;
    freelancerId: ObjectId;
    clientId: ObjectId;
    milestones: IMilestone[];
    totalAmount: number;
    status: string; // e.g., 'Pending', 'Accepted', 'Rejected'
    createdAt: Date;
    updatedAt: Date;
}
