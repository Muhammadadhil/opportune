
import { Request, Response, NextFunction } from "express";

export interface ISkillController {
    getSkills(req: Request, res: Response, next: NextFunction): Promise<void>;
    createSkill(req: Request, res: Response, next: NextFunction): Promise<void>;
}
