import mongoose ,{ Document} from "mongoose";
import { TransactionType } from "../enums/TransactionType";

export interface IAdminTransaction extends Document {
    amount: number;
    type: TransactionType;
    escrowId: mongoose.Types.ObjectId;
    freelancerId: mongoose.Types.ObjectId;
    clientId: mongoose.Types.ObjectId;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}
