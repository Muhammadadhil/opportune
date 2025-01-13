export interface ISubmission {
    _id?: string;
    freelancerId: string;
    clientId: string;
    contractId: string;
    milestoneId: string;
    message: string;
    attachment: string;
    attachmentAccessurl?: string;
    isAccepted?: boolean;
    createdAt?: Date;
}
