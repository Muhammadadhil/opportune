
export interface IMilestone {
    // milestoneId: string;
    description: string;
    amount: string;
    deadline: string;
    // status?: string;
}

export interface IOffer{
    applicationId: string;
    jobId: string;
    freelancerId: string;
    clientId: string;
    milestones: IMilestone[];
    totalAmount: number;
    // status: string;
}
