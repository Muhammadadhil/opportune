import { Schema } from "mongoose";

import { MilestoneStatus } from "../enums/MIlestoneStatus";
import { IMilestone } from "../interfaces/IOffer";
import { EscrowStatus } from "../enums/EscrowStatus";

const MilestoneSchema = new Schema<IMilestone>({
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    deadline: { type: Date, required: true },
    status: { type: String, MilestoneStatus, default: MilestoneStatus.UNPAID },
    escrowId: { type: Schema.Types.ObjectId },
    escrowStatus: {
        type: String,
        enum: Object.values(EscrowStatus),
    },
});


export default MilestoneSchema;