import { Schema } from "mongoose";

import { MilestoneStatus } from "../enums/MIlestoneStatus";
import { IMilestone } from "../interfaces/IOffer";

const MilestoneSchema = new Schema<IMilestone>({
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    deadline: { type: Date, required: true },
    status: { type: String, MilestoneStatus, default: MilestoneStatus.UNPAID },
});


export default MilestoneSchema;