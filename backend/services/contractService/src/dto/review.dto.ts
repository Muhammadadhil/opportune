import { ObjectId } from "mongoose";

export interface ReviewDTO {
    contractId: ObjectId;
    rating: number;
    comment: string;
}


