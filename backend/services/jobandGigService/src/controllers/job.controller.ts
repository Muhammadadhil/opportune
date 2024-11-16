import { NextFunction, Request, Response } from "express";
import { JobService } from "../services/implementation/job.services";
import { IApplyJob, IJobService } from "../services/interfaces/IJobService";
import { HTTPError } from "../utils/HttpError";

export class JobController {
    private jobService: IJobService;

    constructor() {
        this.jobService = new JobService();
    }

    getJobs = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const jobs = await this.jobService.getJobs();
            res.status(200).json(jobs);
        } catch (error) {
            next(error);
        }
    };

    getJobsByClient = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const jobs = await this.jobService.getJobsByClient(id);
            console.log("jobs Active now:", jobs);
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
            if (!editedJob) {
                throw new HTTPError("Error in Updating Job", 400);
            }
            res.status(200).json(editedJob);
        } catch (error) {
            console.log(error);
            next(error);
        }
    };

    removeJob = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const jobId = req.params.id;
            console.log("going to remove ", jobId);
            const removedJob = await this.jobService.removeJob(jobId);
            if (!removedJob) {
                throw new HTTPError("Error in removing Job", 400);
            }
            res.status(200).json(removedJob);
        } catch (error) {
            console.log(error);
            next(error);
        }
    };

    applyForJob = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const applicationData: IApplyJob = req.body;
            const result = await this.jobService.applyJob(applicationData);

            return res.status(201).json({
                success: true,
                message: "Job application submitted successfully",
                data: result,
            });
        } catch (error) {
            console.error("Error in job application:", error);
            next(error);
        }
    };
}
