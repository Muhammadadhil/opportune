import { ApplicationSerivce } from "../services/implementation/Application.services";
import { Request, Response } from "express";
import { IApplicationService } from "../services/interfaces/IApplicationService";


export class ApplicationController {
    private applicationService: IApplicationService;

    constructor() {
        this.applicationService = new ApplicationSerivce();
    }

    checkApplication = async (req: Request, res: Response) => {
        const { jobId, freelancerId } = req.query;

        console.log("checking existing application:", req.query);

        const application = await this.applicationService.checkApplicationExists( jobId as string, freelancerId as string);    

        if (application) {
            return res.status(200).json({ exists: true });
        } else {
            return res.status(200).json({ exists: false });
        }
    };
}
