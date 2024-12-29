export interface ISubmission {
    freelancerId: string;
    clientId: string;
    contractId: string;
    milestoneId: string;
    message: string;
    attachment: string;
    isAccepted?: boolean;
}
