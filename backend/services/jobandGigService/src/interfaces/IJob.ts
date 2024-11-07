import { Document, ObjectId } from "mongoose";

export interface IJob extends Document {
    clientId: ObjectId;
    title: string;
    description: string;
    category: string;
    subCategory: string;
    budget: number;
    skillsRequired: string[];
    isActive: boolean;
    searchTags: string[];
}