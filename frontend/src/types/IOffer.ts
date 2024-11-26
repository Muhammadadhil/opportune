
export interface IMilestone {
    // milestoneId: string;
    description: string;
    amount: string;
    deadline: string | number;
    // status?: string;
}

export interface IOffer{
    _id?:string;
    applicationId: string;
    jobId: string;
    freelancerId: string;
    clientId: string;
    milestones: IMilestone[];
    totalAmount: number;
    status?: string;
}
