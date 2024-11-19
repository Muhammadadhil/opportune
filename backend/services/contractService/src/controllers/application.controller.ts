import { ApplicationSerivce } from "../services/implementation/Application.services";
import { Request, Response } from "express";
import { IApplicationService } from "../services/interfaces/IApplicationService";


export class ContractController {
    private applicationService: IApplicationService;

    constructor() { 
        this.applicationService = new ApplicationSerivce();          
    }

    getAllGigs = async (req: Request, res: Response) => {
        
    };
}
