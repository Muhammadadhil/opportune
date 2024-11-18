
export interface IContractDetails{
    budget:string;
    endDate:string;
}

export interface IApproval {
    applicationId: string;
    jobId: string;
    clientId: string;
    freelancerId: string;
    approvalStatus: string;
    contractDetails: IContractDetails;
    clientNotes?:string
}