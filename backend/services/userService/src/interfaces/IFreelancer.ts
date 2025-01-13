import { ObjectId, Document } from "mongoose";
import IAccounts from "./IAccounts";

export default interface IFreelancer extends Document {
    userId: ObjectId | string;
    title: string;
    skills: string[];
    accounts: IAccounts;
    image: string;
    imageUrl?: string;
    prefferedJobs: string[];
}
