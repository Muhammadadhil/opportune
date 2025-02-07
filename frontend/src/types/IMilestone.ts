export enum MilestoneStatus {
    UNPAID = "unpaid", // Milestone awaiting payment
    ACTIVE = "active", // Milestone funded and ready to work
    COMPLETED = "completed", // Milestone work submitted and approved
    FAILED = "failed", // Milestone rejected or not completed
    SUBMITTED = "submitted",
}

export interface IMilestone {
    _id?: string;
    description: string;
    amount: number;
    deadline: string | number;
    status?: string;
    escrowId?: string;
    escrowStatus?: string;
}



// export interface IMilestone {
//     description: string;
//     amount:  number;
//     deadline: string | number;
//     // status?: string;
// }