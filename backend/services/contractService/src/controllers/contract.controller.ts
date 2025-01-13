import { NextFunction, Request, Response } from "express";
import { IContractService } from "../services/interfaces/IContractService";

export class ContractController {
    private _contractService: IContractService;

    
    constructor(contractService: IContractService) {
        this._contractService = contractService;
    }

    /**
     * Retrieves contracts associated with a freelancer.
     * 
     * @param req - Express request object, containing freelancer ID in query
     * @param res - Express response object
     * @param next - Express next function for error handling
     */
    getFreelancerContracts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { fId } = req.query;
            console.log("checking existing contracts of freelancer::", req.query);
            const contracts = await this._contractService.getFreelancerContracts(fId as string);
            return res.status(200).json(contracts);
        } catch (error) {
            console.log("Error in getting contracts:", error);
            next(error);
        }
    };

    /**
     * Retrieves contracts associated with a client.
     * 
     * @param req - Express request object, containing client ID in query
     * @param res - Express response object
     * @param next - Express next function for error handling
     */
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
