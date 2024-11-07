import { NextFunction, Request, Response } from "express";
import { JobService } from "../services/implementation/job.services";
import { IJobService } from "../services/interfaces/IJobService";


export class JobController {
    private jobService: IJobService;

    constructor() {
        this.jobService = new JobService();
    }

    postJob = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('in post job!!!!!!!!11111')
            
            const savedData = await this.jobService.saveJob(req.body);
            res.status(200).json(savedData);
        } catch (error) {
            next(error);
        }
    };
}
