import { NextFunction, Request, Response } from "express";
import { JobService } from "../services/implementation/job.services";
import { IApplyJob, IJobService } from "../services/interfaces/IJobService";
import { HTTPError } from "../utils/HttpError";
import { IApproval } from "../interfaces/IApproval";
import { IFilters } from "../interfaces/IFilters";

export class JobController {
    private _jobService: IJobService;

    constructor() {
        this._jobService = new JobService();
    }

    getJobs = async (req: Request, res: Response, next: NextFunction) => {
        try { 
            console.log('req.query:',req.query);
            const { page = 1, limit = 10 } = req.query;
            let jobs;
            let totalPages;

            if(req.query.filters){
                console.log('req.query.filters:',req.query.filters);
                const { category, applications, budgetRange, search, sort } = req.query.filters as IFilters;
                const { Alljobs, totalPagesCount } = await this._jobService.getJobs(
                    page as number,
                    limit as number,
                    category as string,
                    applications as string,
                    budgetRange as string,
                    search as string,
                    sort as string
                );

                jobs = Alljobs;
                totalPages = totalPagesCount;
            }else{
                const { Alljobs, totalPagesCount } = await this._jobService.getJobs(page as number, limit as number);
                jobs = Alljobs;
                totalPages = totalPagesCount;
            }
            
            res.status(200).json({ jobs, totalPages });
        } catch (error) {
            next(error);
        }
    };

    getJobsByClient = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const jobs = await this._jobService.getJobsByClient(id);
            console.log("jobs Active now:", jobs);
            res.status(200).json(jobs);
        } catch (error) {
            next(error);
        }
    };

    postJob = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const savedData = await this._jobService.saveJob(req.body);
            res.status(200).json(savedData);
        } catch (error) {
            next(error);
        }
    };

    editJob = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const editedJob = await this._jobService.editJob(req.body);
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
            const removedJob = await this._jobService.removeJob(jobId);
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
            const result = await this._jobService.applyJob(applicationData);

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

    /**
     * Approves an application by the client.
     *
     * @route POST /job/approve
     * @param {Request} req - The request object, containing the application approval data in the body.
     * @param {Response} res - The response object, used to send back the HTTP response.
     * @param {NextFunction} next - The next middleware function in the Express stack.
     * @returns {Promise<void>} 201 - Returns a success message if the application is approved.
     * @throws {Error} 500 - Internal server error if approval fails.
     */

    approveApplication = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const approvalData: IApproval = req.body;
            await this._jobService.approveApplication(approvalData);
            res.status(201).json({ message: "Application approved successfully" });
        } catch (error) {
            console.error("Error in approve application :", error);
            next(error);
        }
    };

    /**
     * Get the details of multiple jobs by their IDs.
     *
     * @route GET /batch/jobs
     * @queryParam {string[]} jobIds - Array of job IDs to fetch details for.
     * @returns {Promise<Response>} 200 - Returns the job details.
     * @throws {Error} 500 - Internal server error.
     */

    getJobDetails = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { jobIds } = req.query;
            const jobs = await this._jobService.getJobDetails(jobIds as string[]);
            console.log("fetched jobs:", jobs);
            res.status(200).json(jobs);
        } catch (error) {
            next(error);
        }
    };

    /**
     * Retrieves the details of a specific job by its ID.
     *
     * @route GET /job
     * @queryParam {string} jobId - The ID of the job to retrieve details for.
     * @param {Request} req - The request object, containing the job ID in the query parameters.
     * @param {Response} res - The response object, used to send back the HTTP response.
     * @param {NextFunction} next - The next middleware function in the Express stack.
     * @returns {Promise<void>} 200 - Returns the job details.
     * @throws {Error} 500 - Internal server error if retrieval fails.
     */

    getJobDetail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            console.log("id:", id);
            const job = await this._jobService.getJobDetail(id as string);
            console.log("job:", job);
            res.status(200).json(job);
        } catch (error) {
            next(error);
        }
    };

    sendOffer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await this._jobService.sendOfferToFreelancer(req.body);
            res.status(200).json({ message: "Offer sent successfully" });
        } catch (error) {
            next(error);
        }
    };
}
