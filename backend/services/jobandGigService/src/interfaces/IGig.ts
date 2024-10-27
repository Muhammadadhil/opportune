import { Document, ObjectId } from "mongoose";

export interface IGig extends Document {
    freelancerId: ObjectId;
    title: string;
    description: string;
    price: string;
    category: string;
    subCategory: string;
    isActive:boolean;
    deliveryTime: Date;
    reviewsCount: number;
    averageRating: number;
    searchTags: string[];
}
