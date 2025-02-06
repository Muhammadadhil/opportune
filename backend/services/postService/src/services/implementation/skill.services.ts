import { inject, injectable } from "inversify";
import { ISkillService } from "../interfaces/ISkillService";
import { ISkillRepository } from "../../repositories/interfaces/ISkillRepository";
import  {ISkill} from '../../types/ISkill';
import { TYPES } from "../../types/types";

@injectable()
export class SkillService implements ISkillService {
    constructor(@inject(TYPES.ISkillRepository) private skillRepository: ISkillRepository) {}

    async getSkills(searchKey: string): Promise<ISkill[] | null> {
        const skills = await this.skillRepository.find({ skill_name: { $regex: searchKey, $options: "i" } });
        return skills;
    }


    async createSkill(skill: ISkill): Promise<ISkill> {
        return this.skillRepository.create(skill);
    }
}