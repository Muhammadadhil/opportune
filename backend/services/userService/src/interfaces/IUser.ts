import { Document, ObjectId } from "mongoose";

export default interface IUser extends Document {
    _id: ObjectId;
    firstname: string;
    lastname: string;
    email: string;
    country?: string;
    password?: string;
    role: string;
    isOAuthUser?: boolean;
    isBlocked?: boolean;
    averageRating?: number;
    reviewCount?: number;
    walletAmount?: number;
    walletHistory?: Array<{
        amount: number;
        description: string;
        paymentId: ObjectId;
        date: Date;
    }>;
}

