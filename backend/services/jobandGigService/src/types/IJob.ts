import { Document, ObjectId } from "mongoose";

export interface IJob extends Document {
    clientId: ObjectId;
    jobTitle: string;
    description: string;
    category: string;
    subCategory: string;
    budget: number;
    skillsRequired: string[];
    isActive: boolean;
    searchTags: string[];
    applicants: ObjectId[];
    applicantsCount?: number;
    isApplied?: boolean;
}