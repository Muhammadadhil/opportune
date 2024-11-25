import { ContractService } from "../services/implementation/contract.services";
import { NextFunction, Request, Response } from "express";
import { IContractService } from "../services/interfaces/IContractService";

export class ContractController {
    private contractService: IContractService;

    constructor() {
        this.contractService = new ContractService();
    }

    getFreelancerContracts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { fId } = req.query;
            console.log("checking existing contracts of freelacner::", req.query);
            const contracts = await this.contractService.getFreelancerContracts(fId as string);
            return res.status(200).json(contracts);
        } catch (error) {
            console.log("Error in geting applications:", error);
            next(error);
        }
    };

    getJobContracts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { jobId } = req.query;
            console.log("checking contracts for job clinet:", req.query);
            const contracts = await this.contractService.getJobContracts(jobId as string);
            return res.status(200).json(contracts);
        } catch (error) {
            console.error("Error in getting contract:", error);
            next(error);
        }
    };
}
