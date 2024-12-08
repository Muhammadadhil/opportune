import { NextFunction, Request, Response } from "express";
import { JobService } from "../services/implementation/job.services";
import { IJobService } from "../services/interfaces/IJobService";
import { HTTPError } from "../utils/HttpError";

export class JobController {
    private jobService: IJobService;

    constructor() {
        this.jobService = new JobService();
    }

    getJobs = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const jobs = await this.jobService.getJobs();
        } catch (error) {
            next(error);
        }
    };

    getJobsByClient = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const jobs = await this.jobService.getJobsByClient(id);
            res.status(200).json(jobs);
        } catch (error) {
            next(error);
        }
    };

    postJob = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("in post job!!!!!!!!11111");

            const savedData = await this.jobService.saveJob(req.body);
            res.status(200).json(savedData);
        } catch (error) {
            next(error);
        }
    };

    editJob = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const editedJob = await this.jobService.editJob(req.body);
            if(!editedJob){
                throw new HTTPError("Error in Updating Job", 400);
            }
            res.status(200).json(editedJob);
        } catch (error) {
            console.log(error)
            next(error);
        }
    };
}
