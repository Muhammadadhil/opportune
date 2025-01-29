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
exports.PortfolioService = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../../types/types");
const uploadToS3_1 = require("../../utils/uploadToS3");
let PortfolioService = class PortfolioService {
    constructor(_portfolioRepository) {
        this._portfolioRepository = _portfolioRepository;
    }
    savePortfolio(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('datga portfolio:', data);
                const newPortfolio = yield this._portfolioRepository.create(data);
                return newPortfolio;
            }
            catch (error) {
                console.error("Error in savePortfolio:", error);
                throw error;
            }
        });
    }
    getPortfolios(freelancerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const portfolios = yield this._portfolioRepository.findByFreelancerId(freelancerId);
                if (!portfolios)
                    return null;
                // Get signed URLs for all images in each portfolio
                const portfoliosWithUrls = yield Promise.all(portfolios.map((portfolio) => __awaiter(this, void 0, void 0, function* () {
                    const imageUrls = yield Promise.all(portfolio.images.map((image) => __awaiter(this, void 0, void 0, function* () {
                        return yield (0, uploadToS3_1.getSignedImageURL)(image);
                    })));
                    return Object.assign(Object.assign({}, portfolio.toObject()), { imageUrls });
                })));
                return portfoliosWithUrls;
            }
            catch (error) {
                console.error("Error in getPortfolios:", error);
                throw error;
            }
        });
    }
    updatePortfolio(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._portfolioRepository.updatePortfolio(id, data);
            }
            catch (error) {
                console.error("Error in updatePortfolio:", error);
                throw error;
            }
        });
    }
    deletePortfolio(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this._portfolioRepository.delete(id);
                return !!result;
            }
            catch (error) {
                console.error("Error in deletePortfolio:", error);
                throw error;
            }
        });
    }
    getAllPortfolios() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const portfolios = yield this._portfolioRepository.find();
                if (!portfolios)
                    return null;
                // Get signed URLs for all images in each portfolio
                const portfoliosWithUrls = yield Promise.all(portfolios.map((portfolio) => __awaiter(this, void 0, void 0, function* () {
                    const imageUrls = yield Promise.all(portfolio.images.map((image) => __awaiter(this, void 0, void 0, function* () {
                        return yield (0, uploadToS3_1.getSignedImageURL)(image);
                    })));
                    return Object.assign(Object.assign({}, portfolio.toObject()), { imageUrls });
                })));
                return portfoliosWithUrls;
            }
            catch (error) {
                console.error("Error in getAllPortfolios:", error);
                throw error;
            }
        });
    }
};
exports.PortfolioService = PortfolioService;
exports.PortfolioService = PortfolioService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.IPortfolioRepository)),
    __metadata("design:paramtypes", [Object])
], PortfolioService);
