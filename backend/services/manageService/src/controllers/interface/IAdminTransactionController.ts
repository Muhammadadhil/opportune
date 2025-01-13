import { Request, Response, NextFunction } from "express";

export interface IAdminTransactionController {
    recordTransaction(req: Request, res: Response, next: NextFunction): Promise<void>;
    getTransactions(req: Request, res: Response, next: NextFunction): Promise<void>;
}
