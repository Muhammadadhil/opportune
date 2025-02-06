import { IMilestone } from "./IMilestone";

interface User{
    _id: string;
    firstname: string;
    lastname: string;
    email: string;   
}

export interface IOffer {
    _id?: string;
    applicationId: string;
    jobId: string;
    freelancerId: string;
    clientId: User;
    workTitle: string;
    workDescription: string;
    totalAmount: number;
    milestones: IMilestone[];
    status?: string;
}
