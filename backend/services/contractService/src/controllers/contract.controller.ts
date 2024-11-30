import { NextFunction, Request, Response } from "express";
import { IContractService } from "../services/interfaces/IContractService";

export class ContractController {
    private _contractService: IContractService;

    constructor(contractService: IContractService) {
        this._contractService = contractService;
    }

    getFreelancerContracts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { fId } = req.query;
            console.log("checking existing contracts of freelacner::", req.query);
            const contracts = await this._contractService.getFreelancerContracts(fId as string);
            return res.status(200).json(contracts);
        } catch (error) {
            console.log("Error in geting applications:", error);
            next(error);
        }
    };

    getClientContracts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { cId } = req.query;
            console.log("checking existing contracts of client::", req.query);
            const contracts = await this._contractService.getClientContracts(cId as string);
            return res.status(200).json(contracts);
        } catch (error) {
            console.log("Error in geting applications:", error);
            next(error);
        }
    };
}
