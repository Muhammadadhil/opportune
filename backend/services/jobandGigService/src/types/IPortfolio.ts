import { ObjectId, Document } from "mongoose";
export interface IPortfolio extends Document{
    _id: ObjectId;
    freelancerId: string;
    title: string;
    description: string;
    link:string;
    skills: string[];
    images: string[];
    imageUrls?: string[]; // For storing signed URLs
    createdAt?: Date;
    updatedAt?: Date;
}
