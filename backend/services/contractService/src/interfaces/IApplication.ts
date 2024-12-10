import { Document, ObjectId } from "mongoose";

export interface IApplication extends Document {
    freelancerId: ObjectId;
    clientId: Object;
    jobId: ObjectId;
    status?: String;
    freelancerNotes?: string;
    freelancerPrice?: number;
}
