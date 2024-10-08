import { Document,ObjectId } from "mongoose";

export default interface IClientDetail extends Document {
    userId: ObjectId;
    companyName?: string;
    companyDescription?: string;
    projectNeeds: [string];
    website?: string;
}