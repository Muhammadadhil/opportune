import { ObjectId } from "mongoose";
import { ISkill } from "../../types/ISkill";
import SkillModel from "../../schema/skills.schema";
import { ISkillRepository } from "../interfaces/ISkillRepository";
import { BaseRepository } from "./baseRepository";
import { injectable } from "inversify";

@injectable()
export class SkillRepository extends BaseRepository<ISkill> implements ISkillRepository {
    constructor() {
        super(SkillModel);
    }

    
}
