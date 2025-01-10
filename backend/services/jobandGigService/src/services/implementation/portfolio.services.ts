import { inject, injectable } from "inversify";
import { ObjectId } from "mongoose";
import { TYPES } from "../../types/types";
import { IPortfolio } from "../../types/IPortfolio";
import { IPortfolioService } from "../interfaces/IPortfolioServices";
import { IPortfolioRepository } from "../../repositories/interfaces/IPortFolioRepository";
import { getSignedImageURL, uploadTosS3 } from "../../utils/uploadToS3";
import IUploadFile from "../../types/IUploadFile";

@injectable()
export class PortfolioService implements IPortfolioService {
    constructor(@inject(TYPES.IPortfolioRepository) private _portfolioRepository: IPortfolioRepository) {}

    async savePortfolio(data: IPortfolio): Promise<IPortfolio | null> {
        try {
            console.log('datga portfolio:',data)
            const newPortfolio = await this._portfolioRepository.create(data as IPortfolio);
            return newPortfolio;
        } catch (error) {
            console.error("Error in savePortfolio:", error);
            throw error;
        }
    }

    async getPortfolios(freelancerId: string): Promise<IPortfolio[] | null> {
        try {
            console.log('freelancerId:',freelancerId)
            const portfolios = await this._portfolioRepository.findByFreelancerId(freelancerId);
            console.log('portfolios:',portfolios)   
            if (!portfolios) return null;

            // Get signed URLs for all images in each portfolio
            const portfoliosWithUrls = await Promise.all(
                portfolios.map(async (portfolio) => {
                    const imageUrls = await Promise.all(
                        portfolio.images.map(async (image) => {
                            return await getSignedImageURL(image);
                        })
                    );
                    return { ...portfolio.toObject(), imageUrls };
                })
            );

            return portfoliosWithUrls;
        } catch (error) {
            console.error("Error in getPortfolios:", error);
            throw error;
        }
    }

    async updatePortfolio(id: ObjectId, data: IPortfolio): Promise<IPortfolio | null> {
        try {
            return await this._portfolioRepository.updatePortfolio(id, data);
        } catch (error) {
            console.error("Error in updatePortfolio:", error);
            throw error;
        }
    }

    async deletePortfolio(id: ObjectId): Promise<boolean> {
        try {
            const result = await this._portfolioRepository.delete(id);
            return !!result;
        } catch (error) {
            console.error("Error in deletePortfolio:", error);
            throw error;
        }
    }

    async getAllPortfolios(): Promise<IPortfolio[] | null> {
        try {
            const portfolios = await this._portfolioRepository.find();

            if (!portfolios) return null;

            // Get signed URLs for all images in each portfolio
            const portfoliosWithUrls = await Promise.all(
                portfolios.map(async (portfolio) => {
                    const imageUrls = await Promise.all(
                        portfolio.images.map(async (image) => {
                            return await getSignedImageURL(image);
                        })
                    );
                    return { ...portfolio.toObject(), imageUrls };
                })
            );

            return portfoliosWithUrls;
        } catch (error) {
            console.error("Error in getAllPortfolios:", error);
            throw error;
        }
    }
}
