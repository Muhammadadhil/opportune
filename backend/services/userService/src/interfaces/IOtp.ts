import { ObjectId } from "mongoose";

export interface IOtp {
    userId?: ObjectId;
    email: string;
    otp: string;
    createdAt?: Date;
}

