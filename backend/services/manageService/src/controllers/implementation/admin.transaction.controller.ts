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
        this.recordTransaction = this.recordTransaction.bind(this);
        this.getTransactions = this.getTransactions.bind(this);
    }

    async recordTransaction(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { commissionAmount, updatedEscrow } = req.body;
            const response = await this._adminTransactionService.recordCommission(commissionAmount, updatedEscrow);
            res.status(201).json(response);
        } catch (error) {
            next(error);
        }
    }

    async getTransactions(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const transactions = await this._adminTransactionService.getTransactions();
            res.status(200).json(transactions);
        } catch (error) {
            next(error);
        }
    }
}