import mongoose, { Schema } from "mongoose";
import { ISkill } from "../types/ISkill";

const skillSchema = new Schema<ISkill>(
    {
        skill_name: String
    },
    { timestamps: true }
);

const Skill = mongoose.model<ISkill>("Skill", skillSchema);
export default Skill;
