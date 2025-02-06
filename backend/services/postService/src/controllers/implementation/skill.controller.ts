import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { ISkillController } from "../interface/ISkillController";
import { TYPES } from "../../types/types";
import { ISkillService } from "../../services/interfaces/ISkillService";
import { ISkill } from "../../types/ISkill";

@injectable()
export class SkillController implements ISkillController {
    constructor(@inject(TYPES.ISkillService) private skillService: ISkillService) {
        this.getSkills = this.getSkills.bind(this);
        this.createSkill = this.createSkill.bind(this);
    }

    async getSkills(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const searchKey = req.query.searchKey;
            const skills = await this.skillService.getSkills(searchKey as string);
            res.json(skills);
        } catch (error) {
            next(error);
        }
    }

    async createSkill(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const skill = req.params.skill;
            const newskill:Partial<ISkill>= {
                _id: "",
                skill_name: skill
            }
            const skills = await this.skillService.createSkill(newskill as ISkill);
            res.json(skills);
        } catch (error) {
            next(error);
        }
    }
}
