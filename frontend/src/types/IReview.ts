import { IUser } from "./IUser";

export interface IReview {
    contractId: string;
    reviewerId: IUser; 
    revieweeId: string; 
    rating: number;       
    comment: string;
    type: "CLIENT_TO_FREELANCER" | "FREELANCER_TO_CLIENT";
    createdAt: Date;
    updatedAt: Date;
}