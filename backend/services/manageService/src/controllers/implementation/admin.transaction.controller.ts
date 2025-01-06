import { inject, injectable } from "inversify";
import { IAdminTransactionController } from "../interface/IAdminTransactionController";
import { IAdminTransactionService } from "../../services/interfaces/IAdmin.transactionService";
import { TYPES } from "../../interfaces/types";
import { Request, Response,NextFunction } from "express";

@injectable()
export class AdminTransactionController implements IAdminTransactionController {
    private _adminTransactionService: IAdminTransactionService;

    constructor(@inject(TYPES.IAdminTransactionService) IAdminTransactionService: IAdminTransactionService) {
        this._adminTransactionService = IAdminTransactionService;
        this.recordTransaction= this.recordTransaction.bind(this);
    }

    async recordTransaction(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            console.log('!!!!!!!!!! recording transaction for the admin commission !!!!!!!!');
            const { commissionAmount, updatedEscrow } = req.body;

            console.log("commissionAmount:", commissionAmount);
            console.log("updatedEscrow:", updatedEscrow);

            const response = await this._adminTransactionService.recordCommission(commissionAmount, updatedEscrow);
            res.status(201).json(response);
        } catch (error) {
            next(error);
        }
    }

    async getTransactions(req: Request, res: Response, next: NextFunction){
        console.log('');
        
    }
}