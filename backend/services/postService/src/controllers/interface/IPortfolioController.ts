import { Request, Response, NextFunction } from "express";

export interface IPortfolioController {
    postPortfolio(req: Request, res: Response, next: NextFunction): Promise<void>;
    getPortfolios(req: Request, res: Response, next: NextFunction): Promise<void>;
}
