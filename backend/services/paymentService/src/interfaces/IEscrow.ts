import { ObjectId, Document } from "mongoose";
import { EscrowStatus } from "../enums/EscrowStatus";

export interface IEscrow extends Document {
    contractId: ObjectId;
    milestoneId: ObjectId;
    clientId: ObjectId;
    freelancerId: ObjectId;
    amount: number;
    paymentId: ObjectId;
    status: EscrowStatus;
}
