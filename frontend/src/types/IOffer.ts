
export interface IMilestone {
    description: string;
    amount:  number;
    deadline: string | number;
    // status?: string;
}

export interface IOffer{
    _id?:string;
    applicationId: string;
    jobId: string;
    freelancerId: string;
    clientId: string;
    workTitle: string;
    workDescription:string;
    totalAmount: number;
    milestones: IMilestone[];
    status?: string;
}
