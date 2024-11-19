import { ObjectId } from "mongoose";

// export interface IContractDetails{
//     budget:string;
//     endDate:string;
// }


export interface IApproval {
    applicationId: ObjectId;
    jobId: ObjectId;
    clientId: ObjectId;
    freelancerId: ObjectId;
    status: string;
    startDate: Date;
    endDate: Date;
    clientNotes?: string;
}