import { Document, ObjectId } from "mongoose";

export interface IGig extends Document {
    freelancer_id: ObjectId;
    title:string;
    description:string;
    price: string;
    category: string;
    subCategory:string;
    deliveryTime:Date;
    reviewsCount:number;
    averageRating:number;
    searchTags:string[];
    
}
