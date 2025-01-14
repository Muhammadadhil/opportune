import { ApplicationSerivce } from "../services/implementation/Application.services";
import { NextFunction, Request, Response } from "express";
import { IApplicationService } from "../services/interfaces/IApplicationService";

export class ApplicationController {
    private _applicationService: IApplicationService;

    constructor(private readonly applicationService: IApplicationService) {
        this._applicationService = applicationService;
    }

    checkApplication = async (req: Request, res: Response) => {
        const { jobId, freelancerId } = req.query;

        const application = await this._applicationService.checkApplicationExists(jobId as string, freelancerId as string);

        if (application) {
            return res.status(200).json({ exists: true });
        } else {
            return res.status(200).json({ exists: false });
        }
    };

    getApplications = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { clientId, jobId } = req.query;
            console.log("checking existing application:", req.query);

            const applications = await this._applicationService.getApplicationOfClient(clientId as string, jobId as string);
            console.log("appplcations from db:", applications);
            return res.status(200).json({ applications });
        } catch (error) {
            // console.log("Error in geting applications:", error);
            next(error);
        }
    };

    getFreelancerApplications = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { fId } = req.query;
            console.log("checking freelancers application:", req.query);

            const applications = await this._applicationService.getApplicationsOfFreelancer(fId as string);
            console.log("appplcations of freelancer:", applications);
            return res.status(200).json({ applications });
        } catch (error) {
            console.log("Error in geting applications:", error);
            next(error);
        }
    };

    getApplicationDetails = async (req: Request, res: Response, next: NextFunction) => {    
        try {
            const { jobId, freelancerId } = req.params;
            const application = await this._applicationService.getApplicationDetails(jobId, freelancerId);
            return res.status(200).json({ application });
        } catch (error) {
            console.log("Error in geting application details:", error);
            next(error);
        }
    }
}