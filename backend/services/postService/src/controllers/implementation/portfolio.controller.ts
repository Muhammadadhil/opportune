import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types/types";
import { IPortfolioController } from "../interface/IPortfolioController";
import { IPortfolioService } from "../../services/interfaces/IPortfolioServices";

/**
 * Controller class for handling portfolio-related operations.
 * Implements the IPortfolioController interface.
 */
@injectable()
export class PorfolioController implements IPortfolioController {
    private _portfolioService: IPortfolioService;

    /**
     * Constructs an instance of the PorfolioController.
     * 
     * @param portfolioService - Instance of IPortfolioService injected via DI.
     */
    constructor(@inject(TYPES.IPortfolioService) portfolioService: IPortfolioService) {
        this._portfolioService = portfolioService;
        this.postPortfolio = this.postPortfolio.bind(this);
        this.getPortfolios = this.getPortfolios.bind(this);
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

    /**
     * Retrieves a list of all portfolios associated with the given user ID.
     *
     * @param req - Express request object containing the user ID in the params.
     * @param res - Express response object.
     * @param next - Express next middleware function for error handling.
     *
     * This endpoint expects a request parameter with the user ID and attempts
     * to retrieve all portfolios associated with that user. In case of any
     * errors, it passes control to the next error-handling middleware.
     */
    async getPortfolios(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            const portfolios = await this._portfolioService.getPortfolios(userId);
            res.status(200).json(portfolios);
        } catch (error) {
            next(error);
        }
    }
}

