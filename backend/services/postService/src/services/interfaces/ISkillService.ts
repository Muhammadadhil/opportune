import { ISkill } from "../../types/ISkill";

export interface ISkillService {
    getSkills(searchKey: string): Promise<ISkill[] | null>;
    createSkill(skill: ISkill): Promise<ISkill>;
}