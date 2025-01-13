import { ObjectId, Document } from "mongoose";
import IAccounts from "./IAccounts";

interface IFreelancerCV {
  cvKey: string;
  cvUrl?: string;
  uploadedAt: Date;
  fileType: string;
  fileName: string;
}

export default interface IFreelancer extends Document {
    userId: ObjectId | string;
    title: string;
    skills: string[];
    accounts: IAccounts;
    image: string;
    imageUrl?: string;
    prefferedJobs: string[];
    cvs: IFreelancerCV[];
}
