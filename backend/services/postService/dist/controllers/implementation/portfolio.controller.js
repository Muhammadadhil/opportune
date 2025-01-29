"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PorfolioController = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../../types/types");
/**
 * Controller class for handling portfolio-related operations.
 * Implements the IPortfolioController interface.
 */
let PorfolioController = class PorfolioController {
    /**
     * Constructs an instance of the PorfolioController.
     *
     * @param portfolioService - Instance of IPortfolioService injected via DI.
     */
    constructor(portfolioService) {
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
    postPortfolio(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this._portfolioService.savePortfolio(req.body);
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
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
    getPortfolios(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const portfolios = yield this._portfolioService.getPortfolios(userId);
                res.status(200).json(portfolios);
            }
            catch (error) {
                next(error);
            }
        });
    }
};
exports.PorfolioController = PorfolioController;
exports.PorfolioController = PorfolioController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.IPortfolioService)),
    __metadata("design:paramtypes", [Object])
], PorfolioController);
