import { Document, ObjectId } from "mongoose";

export interface IContract extends Document{
    applicationId: ObjectId;
    jobId: ObjectId;
    clientId: ObjectId;
    freelancerId: ObjectId;
    status: string;
    startDate: Date;
    endDate:Date;
    clientNotes?: string;
}
