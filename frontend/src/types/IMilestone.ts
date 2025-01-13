export interface IMilestone {
    _id: string;
    description: string;
    amount: number;
    deadline: Date;
    status: string;
    escrowId?: string;
    escrowStatus?: string;
}
