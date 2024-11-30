import {IMilestone} from "@/types/IMilestone";
export interface IContract {
    _id: string;
    offerId: string;
    freelancerId: string;
    clientId: string;
    jobId: string;
    workTitle: string;
    workDescription: string;
    totalAmount: number;
    milestones: IMilestone[];
    status: string;
    startDate: Date;
    endDate: Date;
    clientNotes?: string;
}
