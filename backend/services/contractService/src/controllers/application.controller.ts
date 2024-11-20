import { ApplicationSerivce } from "../services/implementation/Application.services";
import { NextFunction, Request, Response } from "express";
import { IApplicationService } from "../services/interfaces/IApplicationService";


export class ApplicationController {
    private applicationService: IApplicationService;

    constructor() {
        this.applicationService = new ApplicationSerivce();
    }

    checkApplication = async (req: Request, res: Response) => {
        const { jobId, freelancerId } = req.query;

        console.log("checking existing application:", req.query);

        const application = await this.applicationService.checkApplicationExists(jobId as string, freelancerId as string);

        if (application) {
            return res.status(200).json({ exists: true });
        } else {
            return res.status(200).json({ exists: false });
        }
    };

    getApplications = async (req: Request, res: Response,next:NextFunction) => {
        try {
            const { clientId,jobId } = req.query;
            console.log("checking existing application:", req.query);

            const applications = await this.applicationService.getApplicationOfClient(clientId as string, jobId as string);
            console.log('appplcations from db:',applications);
            return res.status(200).json({applications});
            
        } catch (error) {
            console.log('Error in geting applications:',error);
            next(error);
        }
    };
}