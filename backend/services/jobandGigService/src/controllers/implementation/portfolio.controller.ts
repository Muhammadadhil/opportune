import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IJobController } from "../interface/IJobController";
import { TYPES } from "../../types/types";
import { IPortfolioController } from "../interface/IPortfolioController";
import { IPortfolioService } from "../../services/interfaces/IPortfolioServices";

@injectable()
export class PorfolioController implements IPortfolioController {
    private _portfolioService: IPortfolioService;

    constructor(@inject(TYPES.IPortfolioService) portfolioService: IPortfolioService) {
        this._portfolioService = portfolioService;
        this.postPortfolio= this.postPortfolio.bind(this);
    }

    /**
     * Handles the creation of a new portfolio.
     *
     * @param req - Express request object containing portfolio data in the body.
     * @param res - Express response object.
     * @param next - Express next middleware function for error handling.
     *
     * This endpoint expects a request body with the necessary portfolio data
     * and attempts to process it. In case of any errors, it passes control to the
     * next error-handling middleware.
     */

    async postPortfolio(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this._portfolioService.savePortfolio(req.body);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}
