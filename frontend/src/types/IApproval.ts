
export interface IApproval {
    applicationId: string;
    jobId: string;
    clientId: string;
    freelancerId: string;
    status?: string;
    startDate?: Date;
    endDate?: Date;
    clientNotes?: string;
}
